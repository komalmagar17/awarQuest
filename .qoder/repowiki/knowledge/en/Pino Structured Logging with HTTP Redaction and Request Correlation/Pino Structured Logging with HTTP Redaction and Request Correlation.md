---
kind: logging_system
name: Pino Structured Logging with HTTP Redaction and Request Correlation
category: logging_system
scope:
    - '**'
source_files:
    - backend/config/logger.js
    - backend/app.js
    - backend/config/db.js
    - backend/middleware/error-handler.js
    - backend/sockets/index.js
    - backend/server.js
    - backend/services/ai-service.js
    - backend/services/email-service.js
---

## What system/approach is used

The backend uses **Pino** (`pino`) as the structured JSON logging library, configured centrally in `backend/config/logger.js`. In non-production environments, if the optional `pino-pretty` package is installed, Pino's transport is switched to pretty-printed colored output for developer readability. The log level is driven by the `LOG_LEVEL` environment variable (defaulting to `info`).

HTTP request/response logging is handled by **`pino-http`**, mounted as an Express middleware in `backend/app.js`. It automatically logs each request with a correlation ID generated via `genReqId: (req) => req.id`, where `req.id` comes from the shared `requestId` security middleware. Sensitive headers (`authorization`, `cookie`) are redacted at the transport level via the `redact` option.

Database query logging is wired into Sequelize through its `logging` callback, which forwards every query to `logger.debug({ message }, 'database query')`, so SQL statements appear only at debug level.

## Key files and packages

- `backend/config/logger.js` — single Pino instance creation, level and pretty-print transport configuration.
- `backend/app.js` — mounts `pino-http` with logger reference, request ID propagation, and header redaction; also wires the global error handler.
- `backend/config/db.js` — configures Sequelize with a `logging` callback that emits debug-level database queries; logs connection, sync, and migration events.
- `backend/middleware/error-handler.js` — central error formatter that logs server errors at `error` level and client errors at `warn` level, always including `requestId`, `method`, `url`, and optionally `userId`.
- `backend/sockets/index.js` — Socket.IO connection lifecycle logged with `socketId` context.
- `backend/server.js` — startup/shutdown lifecycle events (`API server listening`, graceful shutdown signals, fatal start failures).
- `backend/services/ai-service.js`, `backend/services/email-service.js` — domain services emit warnings/info when AI fallback or SMTP is unavailable.

## Architecture and conventions

1. **Single logger singleton**: Every module imports the same logger instance from `./config/logger`; there is no per-module logger factory. This ensures consistent formatting and level filtering across the process.

2. **Structured fields over positional messages**: Log calls consistently pass a first argument object of key-value fields and a second string message. Examples observed:
   - `logger.info({ socketId: socket.id }, 'New socket connection')`
   - `logger.error({ err, requestId, method, url, userId }, 'Request error')`
   - `logger.warn({ err }, 'AI decision unavailable; using deterministic fallback')`
   - `logger.debug({ message }, 'database query')`
   - `logger.info({ file }, 'Applied SQL migration')`

3. **Log levels by concern**:
   - `debug`: raw database queries (Sequelize), verbose internals.
   - `info`: service lifecycle (DB connect, migrations, server listen), socket join/disconnect, OTP dev logging.
   - `warn`: recoverable issues (AUTO_SYNC enabled, AI fallback, missing SMTP).
   - `error`: unhandled exceptions and failed DB connections.
   - `fatal`: unrecoverable server start failure.

4. **Request correlation**: Every HTTP request gets a `requestId` (via `security.requestId` middleware). The error handler and pino-http both attach it to logs, enabling tracing a request end-to-end across HTTP, controller, service, and DB layers.

5. **Sensitive data redaction**: `pino-http` is configured with `redact: ['req.headers.authorization', req.headers.cookie']` so secrets never leak into access logs.

6. **Environment-driven behavior**: Pretty-printing is gated on `process.env.NODE_ENV !== 'production'` and the presence of `pino-pretty`. Database SSL, CORS origins, and other runtime settings are loaded via `config/env` and influence what gets logged (e.g., `env.isProduction` guards AUTO_SYNC).

7. **Centralized error logging**: All uncaught Express errors funnel through `middleware/error-handler.js`, which decides between `error` (server-side, ≥500) and `warn` (client-side, <500) based on status code and Sequelize error names. Stack traces are suppressed in production responses but still logged server-side.

## Conventions and constraints

- **Always use the shared logger**: Modules import `./config/logger` rather than creating ad-hoc loggers; this is enforced by the project structure (no alternative logger modules exist in the codebase).
- **Structured log entries**: New log statements should follow the `{ fields }, 'message'` pattern already used everywhere — passing a plain string without fields is not observed in any usage site.
- **Include `requestId` in request-scoped logs**: The error handler automatically injects `requestId`; business logic can include it explicitly when needed (as seen in socket and service logs).
- **Do not log secrets**: Authorization and cookie headers are redacted by pino-http; developers must avoid adding sensitive values to log field objects manually.
- **Database queries are debug-only**: Sequelize's `logging` callback routes all SQL to `logger.debug`, so production logs will be quiet about queries unless `LOG_LEVEL` is raised.
- **No application-specific log sinks**: There is no file, syslog, or external log aggregation sink configured beyond Pino's default stdout/stderr transport; pretty-printing is purely a development convenience.