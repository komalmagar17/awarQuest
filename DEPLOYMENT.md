# AwarQuest — Production Deployment Guide

This guide details how to deploy the enterprise-grade **AwarQuest** backend and FastAPI AI microservice for production use.

## Architecture Overview

The system consists of three main containerized components:
1. **PostgreSQL 16**: Authoritative relational database for user accounts, game sessions, progress metrics, verified government resources, and audit logs.
2. **Node.js / Express.js REST & WebSocket API**: Authoritative game engine handling authentication (HttpOnly JWT cookies), scenario distribution, telemetry ingestion, and rule validation.
3. **Python FastAPI AI Service**: Modular AI decision service leveraging `google-generativeai` with strict JSON schema validation and deterministic fallback (guaranteeing 100% uptime even without an active AI API key).

---

## Configuration & Environment Variables

### Backend (`backend/.env`)
- `NODE_ENV`: Set to `production`.
- `PORT`: API server port (default: `5000`).
- `DATABASE_URL`: PostgreSQL connection string (`postgresql://user:pass@host:5432/dbname`).
- `JWT_ACCESS_SECRET` / `JWT_REFRESH_SECRET`: Secure cryptographic secrets (minimum 48 characters).
- `AI_ENABLED`: Set to `true` to enable AI integration.
- `AI_SERVICE_URL`: Internal URL to FastAPI AI service (e.g., `http://ai-service:8001`).
- `AI_SERVICE_TOKEN`: Shared secret for secure inter-service communication between Node.js and Python.

### AI Service (`backend/ai-service/.env`)
- `GEMINI_API_KEY`: Your Google Gemini API key. If left blank, the system automatically runs on safe, high-performance deterministic fallback logic.
- `GEMINI_MODEL`: Model identifier (default: `gemini-1.5-flash`).

---

## Quick Deployment via Docker Compose

1. Clone or copy the repository to your production server.
2. (Optional) Provide your Gemini API key in `docker-compose.yml` or export `GEMINI_API_KEY`.
3. Start the stack:
   ```bash
   docker compose up -d --build
   ```
4. Verify health endpoints:
   - API Health: `curl http://localhost:5000/health`
   - API Readiness (DB): `curl http://localhost:5000/health/ready`
   - AI Service Health: `curl http://localhost:8001/health`

---

## Running Database Migrations

In production (`AUTO_SYNC=false`), schema changes must be applied via Sequelize migrations:
```bash
docker exec -it awarquest_api npm run migrate
```

---

## Admin Provisioning

To grant administrator privileges to a registered user:
```bash
docker exec -it awarquest_api node scripts/grant-admin.js <username_or_email>
```
