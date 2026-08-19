---
kind: external_dependency
name: PostgreSQL Database
slug: postgresql
category: external_dependency
category_hints:
    - vendor_identity
scope:
    - '**'
source_files:
    - docker-compose.yml
    - backend/config/db.js
    - backend/models/index.js
    - backend/package.json
---

Primary relational datastore for the project, running as a Docker service (`postgres:16-alpine`) on port 5432 with database `sihBackend`. The Node.js backend connects via Sequelize ORM using `DATABASE_URL` and `DB_SSL` env vars. All persistent entities — User, PlayerProfile, Scenario, PlayerProgress, PlayerSkill, GovResource, AiInteraction, AuditEvent, AnalyticsEvent — are modelled as Sequelize models under `backend/models/`. Migrations are managed through `sequelize-cli` and SQL migration files in the repo root.