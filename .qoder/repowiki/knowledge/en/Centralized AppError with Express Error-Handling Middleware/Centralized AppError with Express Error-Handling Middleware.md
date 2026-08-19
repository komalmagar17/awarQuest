---
kind: error_handling
name: Centralized AppError with Express Error-Handling Middleware
category: error_handling
scope:
    - '**'
source_files:
    - backend/utils/app-error.js
    - backend/utils/async-handler.js
    - backend/middleware/error-handler.js
    - backend/middleware/validate.js
    - backend/config/logger.js
    - backend/controllers/auth-controller.js
    - backend/controllers/game-controller.js
    - backend/middleware/authMiddleware.js
    - backend/middleware/adminMiddleware.js
---

## Overview

The backend uses a centralized error-handling system built around a custom `AppError` class, an Express error-handler middleware, and a thin async wrapper. Errors are thrown as typed instances from controllers/middleware and caught in one place to produce consistent JSON responses.

## Core Components

### Custom Error Type — `utils/app-error.js`

```js
class AppError extends Error {
  constructor(statusCode, code, message) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
```

Every business or client error is raised as `new AppError(statusCode, code, message)` where:
- `statusCode` maps to the HTTP status (400/401/403/404/409).
- `code` is a stable machine-readable string (e.g. `EMAIL_TAKEN`, `UNAUTHORIZED`, `SCENARIO_NOT_FOUND`, `ALREADY_DECIDED`).
- `message` is the user-facing text.
- `isOperational = true` signals that the error is expected and safe to expose to clients.

### Async Wrapper — `utils/async-handler.js`

```js
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
```

Wraps every async controller so that rejected promises are forwarded to Express's error pipeline via `next(err)` instead of causing unhandled rejections.

### Central Error Handler — `middleware/error-handler.js`

A single Express error middleware (`err, req, res, next`) handles all errors:

1. **Status resolution** — prefers `err.statusCode`; falls back to mapped Sequelize error codes; otherwise 500.
2. **Sequelize mapping** — translates DB errors into HTTP codes: `SequelizeValidationError` → 400, `SequelizeUniqueConstraintError` → 409, `SequelizeForeignKeyConstraintError` → 400.
3. **Code resolution** — uses `err.code` for operational errors; maps Sequelize 409 → `DUPLICATE_ENTRY`, 400 → `VALIDATION_ERROR`; defaults to `INTERNAL_ERROR`.
4. **Message redaction** — if `err.isOperational` is true (i.e. an `AppError`), the original message is returned; otherwise the generic `An unexpected error occurred. Please try again.` is sent to clients.
5. **Structured logging** — uses `pino` logger; logs full stack + request context (`requestId`, `method`, `url`, `userId`) at `error` level for 5xx, and `warn` level for client errors.
6. **Response shape** — always returns `{ error: { code, message, requestId, ...(development-only detail) } }`. The raw `err.message` is included only when `NODE_ENV !== 'production'` and status ≥ 500.
7. **Not-found fallback** — a separate `notFound` middleware calls `next(new AppError(404, 'NOT_FOUND', ...))` for unmatched routes.

### Validation Errors — `middleware/validate.js`

Joi-based validation middleware converts schema failures into `AppError(400, 'VALIDATION_ERROR', <joined messages>)`, using `abortEarly: false` so all field errors are reported together.

## Usage Pattern Across Controllers

Controllers consistently follow this pattern:

```js
const asyncHandler = require('../utils/async-handler');
const AppError = require('../utils/app-error');

const register = asyncHandler(async (req, res) => {
  // ...business logic...
  if (existing) throw new AppError(409, 'EMAIL_TAKEN', '...');
  if (!user) throw new AppError(404, 'USER_NOT_FOUND', '...');
  res.json({ /* success payload */ });
});
```

Observed error codes include: `EMAIL_TAKEN`, `NOT_REGISTERED`, `INVALID_CREDENTIALS`, `USER_NOT_FOUND`, `UNAUTHORIZED`, `GUEST_DISABLED`, `SESSION_NOT_FOUND`, `ALREADY_DECIDED`, `INVALID_CLUE`, `CLUE_ALREADY_COLLECTED`, `CLUES_REQUIRED`, `INVALID_OPTION`, `DECISION_REQUIRED`, `INVALID_ACTION`, `PROFILE_NOT_FOUND`, `SCENARIO_NOT_FOUND`, `SESSION_INCOMPLETE`, `FORBIDDEN`, `CORS_ORIGIN_DENIED`, plus Sequelize-derived `DUPLICATE_ENTRY` / `VALIDATION_ERROR`.

## Architecture & Conventions

| Aspect | Convention |
|---|---|
| Error origin | Controllers and middleware throw `AppError`; raw `throw new Error(...)` is reserved for unexpected bugs. |
| Propagation | Errors flow through Express's error pipeline; no per-route try/catch blocks. |
| Client vs server errors | `isOperational === true` means the error is expected and safe to return verbatim; non-operational errors are sanitized. |
| Database errors | Centralized mapping in `sequelizeStatus()` normalizes Sequelize exceptions to HTTP codes without leaking internals. |
| Logging | All errors logged via structured pino logger with request correlation fields; 5xx get full stack, 4xx get summary. |
| Response contract | Uniform `{ error: { code, message, requestId } }` envelope; extra `detail` only in development for 5xx. |
| Validation | Joi schemas validated by shared `validate(schema, source)` middleware producing `VALIDATION_ERROR`. |
| Authz/auth | Auth and admin middleware raise `AppError` (401/403) rather than returning early. |

## Constraints Enforced by the Code

- Every async route must be wrapped with `asyncHandler`; otherwise promise rejections bypass the error pipeline.
- Business errors must use `AppError` with a three-argument constructor `(statusCode, code, message)`; arbitrary strings are not accepted.
- Unknown/uncaught errors are never leaked to clients — they receive a sanitized message and are logged with full context.
- Sequelize constraint violations are normalized to stable HTTP codes and codes (`DUPLICATE_ENTRY`, `VALIDATION_ERROR`) regardless of underlying driver dialect.
- Production deployments strip internal error details from the response body.