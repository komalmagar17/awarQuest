---
kind: dependency_management
name: Dual-Lang Dependency Management (npm + pip with lockfiles and Dockerized builds)
category: dependency_management
scope:
    - '**'
source_files:
    - backend/package.json
    - backend/package-lock.json
    - backend/Dockerfile
    - backend/ai-service/requirements.txt
    - backend/ai-service/Dockerfile
    - docker-compose.yml
---

## What system/approach is used

The repository manages dependencies for two separate runtime environments using their native package managers:

- **Node.js backend** (`backend/`): Declared in `backend/package.json`, resolved via `package-lock.json` (lockfile v3), installed with `npm install`. The Docker build uses a multi-stage `node:20-alpine` image, installing production-only deps with `npm install --omit=dev`.
- **Python AI microservice** (`backend/ai-service/`): Declared in `backend/ai-service/requirements.txt`, installed via `pip install -r requirements.txt` inside a `python:3.11-slim` container.

There is no monorepo-level dependency manifest; each service owns its own dependency file. No vendoring of third-party code is used — all packages are pulled from the public npm registry and PyPI at build time.

## Key files and packages

- `backend/package.json` — declares Node runtime engine (`>=20.0.0`) and all runtime/dev dependencies (Express, Sequelize, pg, socket.io, Joi, helmet, pino, jsonwebtoken, etc.).
- `backend/package-lock.json` — deterministic lockfile pinning every transitive dependency to an exact version and integrity hash; committed to the repo so installs are reproducible across machines and CI.
- `backend/Dockerfile` — multi-stage build that copies only `package.json` first to cache `node_modules`, then copies source; production stage installs with `--omit=dev`.
- `backend/ai-service/requirements.txt` — pins exact versions of FastAPI, Uvicorn, Google Generative AI SDK, Pydantic, and pydantic-settings.
- `backend/ai-service/Dockerfile` — installs pinned Python deps from `requirements.txt` into a slim image.
- `docker-compose.yml` — orchestrates both services along with a PostgreSQL container, passing env vars but not dependency configuration.

## Architecture and conventions

- **Per-service manifests**: Each language/runtime has its own canonical manifest file (`package.json` / `requirements.txt`). There is no shared or aggregated dependency list.
- **Exact pinning in Python, caret ranges in Node**: Python deps use `==` pins (e.g. `fastapi==0.115.0`), while Node deps use semver caret ranges (e.g. `express: ^4.21.1`). Determinism for Node is delegated to `package-lock.json` rather than explicit pins in `package.json`.
- **Lockfile as source of truth**: `package-lock.json` is committed alongside `package.json`; this is what guarantees identical installs across environments. The Docker build relies on it rather than vendored `node_modules`.
- **Docker-first installation**: Both services are built inside containers, which isolates dependency resolution from the host environment. Production images install only runtime dependencies (Node) or use `--no-cache-dir` (Python).
- **No private registries or proxies configured**: Neither `.npmrc` nor `pip.conf`/`pip.ini` was found; packages resolve against the default public registries.
- **Engine constraint**: `backend/package.json` specifies `engines.node >= 20.0.0`, ensuring the correct Node version is used when tools honor the field (e.g., nvm, Docker base image `node:20-alpine`).

## Conventions and constraints

- **Node dependencies must be declared in `backend/package.json`** under `dependencies` (runtime) or `devDependencies` (tooling such as `sequelize-cli`); there is no ad-hoc `require` of unlisted packages visible in the checked-in source.
- **Python dependencies must be declared in `backend/ai-service/requirements.txt`** with exact `==` pins; this is the single source of truth for the AI service's Python environment.
- **`package-lock.json` must stay in sync with `package.json`**: because it is committed, any change to `package.json` should be followed by regenerating the lockfile so the tree remains deterministic.
- **Production images exclude dev dependencies**: the Node Dockerfile runs `npm install --omit=dev`, so anything needed only during development (like `sequelize-cli`) must remain in `devDependencies` and will not be present in the runtime image.
- **No vendoring**: `backend/node_modules/` appears empty in the snapshot (likely ignored or not committed), confirming that dependencies are fetched fresh at build time rather than vendored into the repo.
- **Environment-driven optional features**: Dependencies like the AI SDK (`google-generativeai`) are gated by runtime flags (`AI_ENABLED`, `AI_SERVICE_URL`) in `docker-compose.yml`, but they are still installed unconditionally in the container image.