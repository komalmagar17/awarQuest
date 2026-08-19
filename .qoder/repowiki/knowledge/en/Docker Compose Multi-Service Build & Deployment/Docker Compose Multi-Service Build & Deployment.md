---
kind: build_system
name: Docker Compose Multi-Service Build & Deployment
category: build_system
scope:
    - '**'
source_files:
    - docker-compose.yml
    - backend/Dockerfile
    - backend/ai-service/Dockerfile
    - backend/package.json
    - DEPLOYMENT.md
---

## Build System Overview

The project uses a **Docker Compose-based multi-service build and deployment** system. There are no Makefiles, CI pipelines, or shell-based build scripts — the entire build and runtime orchestration is defined declaratively in `docker-compose.yml` with per-service Dockerfiles.

## Services and Images

Three services are built and run together:

1. **PostgreSQL 16** (`postgres:16-alpine`) — persistent relational database with a named volume `postgres_data`, health-checked via `pg_isready` before dependents start.
2. **AI Service** (Python FastAPI) — built from `backend/ai-service/Dockerfile` using `python:3.11-slim`, installs dependencies from `requirements.txt`, exposes port 8001, runs via `uvicorn app.main:app --host 0.0.0.0 --port 8001`.
3. **API Service** (Node.js Express) — built from `backend/Dockerfile` using a two-stage Node 20 Alpine image: a `builder` stage that copies `package.json` and runs `npm install`, then a minimal `runner` stage that installs production-only deps (`--omit=dev`) and copies built artifacts, exposing port 5000 and running `node server.js`.

## Environment Configuration

Environment variables are injected at compose time:
- Secrets (JWT secrets, AI tokens, DB credentials) are passed directly in `docker-compose.yml` for development; the guide recommends moving them to `.env` files for production.
- Optional third-party keys (`GEMINI_API_KEY`, SMTP settings) use `${VAR:-default}` syntax so the stack starts even without external credentials.
- The AI service communicates with the API via an internal shared token (`AI_SERVICE_TOKEN`).

## Build Scripts and Tooling

The Node backend defines npm scripts in `backend/package.json`:
- `start`: runs `server.js`
- `dev`: hot-reloads via `node --watch server.js`
- `migrate` / `migrate:undo`: Sequelize CLI migrations
- `grant-admin`, `seed`: one-off admin and data seeding scripts
- `test:game`: runs the single game-flow integration test
- `test`: runs Node's built-in test runner
- `lint`: syntax checks on `server.js` and `app.js` via `node --check`

The Python AI service has no build script beyond `pip install -r requirements.txt` during Docker build.

## Deployment Flow

Per `DEPLOYMENT.md`, production deployment is a single command:
```bash
docker compose up -d --build
```
Health endpoints are exposed at `/health` (API), `/health/ready` (DB readiness probe), and `/health` (AI service). Schema migrations are applied inside the running container via `docker exec -it life_skills_api npm run migrate`. Admin provisioning is done through `docker exec -it life_skills_api node scripts/grant-admin.js <username_or_email>`.

## Versioning and Constraints

- Node engine is pinned via `engines.node >= 20.0.0` in `package.json`; the Docker images use `node:20-alpine` and `python:3.11-slim`.
- No explicit semantic versioning strategy exists in the repository root; only `backend/package.json` declares `version: 1.0.0`.
- There is no CI/CD pipeline, no Makefile, no cross-compilation step, and no release artifact registry — builds are local Docker Compose invocations.

## Key Files

- `docker-compose.yml` — service orchestration, networking, environment injection, dependency ordering, and health checks
- `backend/Dockerfile` — two-stage Node.js image build
- `backend/ai-service/Dockerfile` — Python FastAPI image build
- `backend/package.json` — npm scripts, dependency declarations, Node engine constraint
- `DEPLOYMENT.md` — documented production deployment procedure
- `backend/.env.example` / `backend/ai-service/.env.example` — reference environment variable templates
- `backend/.dockerignore` — controls what is copied into the Node image context