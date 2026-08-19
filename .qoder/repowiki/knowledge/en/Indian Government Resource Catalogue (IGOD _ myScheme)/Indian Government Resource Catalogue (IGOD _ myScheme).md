---
kind: external_dependency
name: Indian Government Resource Catalogue (IGOD / myScheme)
slug: igod
category: external_dependency
category_hints:
    - client_constraint
scope:
    - '**'
source_files:
    - RESOURCE_CATALOGUE.md
    - backend/config/resource-catalogue.js
    - backend/routes/resource-routes.js
---

The game's verified resource catalogue is curated from the Integrated Government Online Directory (IGOD) and myScheme portals. It covers all 28 Indian states and 8 Union Territories, filtered by profession, organisation type, and access model. Non-government entries are explicitly labelled PRIVATE_LIMITED, NONPROFIT, or EDUCATIONAL and are not presented as government-endorsed. The catalogue exposes `/api/v1/resources/regions` and `/api/v1/resources/catalogue` for the frontend to browse official `.gov.in` services related to skills, health, and legal aid.