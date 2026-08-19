---
kind: configuration_system
name: Validated Environment Configuration with Joi and Pydantic Settings
category: configuration_system
scope:
    - '**'
source_files:
    - backend/config/env.js
    - backend/config/db.js
    - backend/config/logger.js
    - backend/.env.example
    - backend/server.js
    - backend/app.js
    - backend/ai-service/app/config.py
    - backend/ai-service/.env.example
    - docker-compose.yml
---

## Overview

The repository uses a validated, layered configuration system across two services: a Node.js/Express backend and a Python FastAPI AI microservice. Configuration is loaded from `.env` files (via `dotenv`) and Docker Compose environment variables, then strictly validated at startup using schema validators before the application proceeds.

## Backend (Node.js) — `backend/config/env.js`

- **Loading**: `dotenv.config()` loads `.env` from `process.cwd()`. All runtime values are read from `process.env`.
- **Validation**: A single `Joi.object(...)` schema defines every required and optional config key:
  - `NODE_ENV` (`development|test|production`, default `development`)
  - `PORT` (number, port range, default `5000`)
  - `DATABASE_URL` (required PostgreSQL URI)
  - `DB_SSL` (boolean via truthy/falsy string coercion, default `false`)
  - `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET` (both required, ≥48 chars, refresh secret must differ from access secret)
  - `JWT_ACCESS_TTL` (`15m`), `JWT_REFRESH_TTL` (`7d`)
  - `CORS_ORIGINS` (comma-separated list; post-validation split into `env.corsOrigins` array)
  - `COOKIE_DOMAIN`, `TRUST_PROXY` (default `1`)
  - `LOG_LEVEL` (pino levels: fatal/error/warn/info/debug/trace/silent, default `info`)
  - `AUTO_SYNC` (boolean, default `false`)
  - `AI_ENABLED`, `AI_SERVICE_URL` (default `http://127.0.0.1:8001`), `AI_SERVICE_TOKEN` (≥32 chars when `AI_ENABLED=true`, otherwise empty string allowed), `AI_REQUEST_TIMEOUT_MS` (500–10000, default `3500`)
  - SMTP settings (`SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM`)
  - `GUEST_PLAY_ENABLED` (default `true`)
- **Derived fields**: `env.corsOrigins` is computed by splitting/comma-splitting `CORS_ORIGINS`; `env.isProduction = NODE_ENV === 'production'`; in production `GUEST_PLAY_ENABLED` is forcibly set to `false`.
- **Failure mode**: Validation errors abort startup with `Invalid environment configuration: ...` listing all `abortEarly: false` details.
- **Consumers**: `app.js` reads `TRUST_PROXY`, `corsOrigins`, `PORT`; `server.js` reads `PORT`, `NODE_ENV`; `config/db.js` reads `DATABASE_URL`, `DB_SSL`, `AUTO_SYNC`; `services/email-service.js` reads SMTP keys; `services/ai-service.js` reads `AI_*` keys.

## Database Connection — `backend/config/db.js`

- Uses `Sequelize` with `dialect: 'postgres'`, connecting via `env.DATABASE_URL`.
- SSL enabled conditionally based on `env.DB_SSL` (`rejectUnauthorized: false`).
- Pool sizing: `max: 20, min: 2, acquire: 30000, idle: 10000, evict: 1000`.
- `connectDatabase()` authenticates, then if `AUTO_SYNC=true` runs `sequelize.sync({ alter: false })` and applies pending SQL migrations found as `migrations-*.sql` files at the project root.
- **Enforced rule**: `if (env.isProduction) throw new Error('AUTO_SYNC must never be enabled in production. Use migrations.')` — prevents accidental schema drift in production.

## Logging — `backend/config/logger.js`

- Uses `pino` with level driven by `process.env.LOG_LEVEL`.
- In non-production environments, attaches `pino-pretty` transport for colored console output when available.
- Used throughout the app via `require('./config/logger')`.

## AI Microservice (Python) — `backend/ai-service/app/config.py`

- Uses `pydantic_settings.BaseSettings` with `model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")`.
- Fields: `gemini_api_key` (SecretStr, optional), `gemini_model` (default `gemini-1.5-flash`), `ai_service_token` (SecretStr, required), `ai_port` (default `8001`), `ai_log_level` (default `INFO`).
- Custom validator enforces `ai_service_token` length ≥ 32 characters.
- Cached singleton via `@lru_cache` `get_settings()`.

## Docker Compose — `docker-compose.yml`

- Defines three services: `postgres`, `ai-service`, `api`.
- Environment variables are passed directly under each service's `environment:` block, mirroring the `.env.example` keys (e.g., `DATABASE_URL`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `CORS_ORIGINS`, `AI_ENABLED`, `AI_SERVICE_URL`, `AI_SERVICE_TOKEN`, `SMTP_*`, `GUEST_PLAY_ENABLED`).
- `ai-service` receives `AI_SERVICE_TOKEN`, `GEMINI_API_KEY`, `GEMINI_MODEL`.
- `api` depends on `postgres` (health check) and `ai-service` (started).
- `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD` are hardcoded in compose (not recommended for production).

## Example Files

- `backend/.env.example`: documents every configurable key with defaults and comments (e.g., `# Use 'ai-service' as host when running in Docker, 'localhost' for local dev.`).
- `backend/ai-service/.env.example`: documents Gemini API key, inter-service token, port, and log level.

## Conventions and Constraints Observed

1. **All configuration is validated at import/startup time** — no undefined or malformed env vars are tolerated; validation failures cause immediate process exit.
2. **Secrets are never hard-coded** — JWT secrets, SMTP passwords, AI tokens, and database URLs come exclusively from environment sources (`.env` or Docker Compose `environment:`).
3. **Environment-specific behavior is derived from `NODE_ENV`** — `isProduction` is computed, guest play is disabled in production, and pretty logging is suppressed.
4. **Cross-service secrets must match** — `AI_SERVICE_TOKEN` in the backend `.env` must exactly match the one configured for the `ai-service` (documented in both `.env.example` files).
5. **Migrations are file-based SQL** — any `migrations-YYYYMMDD-*.sql` file at the project root is applied automatically when `AUTO_SYNC=true`, but this path is blocked in production.
6. **Configuration is centralized per service** — each service has its own dedicated config module (`backend/config/env.js`, `backend/ai-service/app/config.py`) rather than scattered `process.env` reads.