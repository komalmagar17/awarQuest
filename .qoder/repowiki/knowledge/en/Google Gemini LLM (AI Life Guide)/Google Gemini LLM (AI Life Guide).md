---
kind: external_dependency
name: Google Gemini LLM (AI Life Guide)
slug: google-gemini
category: external_dependency
category_hints:
    - vendor_identity
    - auth_protocol
scope:
    - '**'
source_files:
    - backend/ai-service/.env.example
    - backend/ai-service/requirements.txt
    - docker-compose.yml
    - backend/services/ai-service.js
---

The AI Life Guide is provided by Google's Gemini API, accessed through a standalone Python FastAPI microservice (`backend/ai-service`). The client authenticates to this microservice via an internal `AI_SERVICE_TOKEN` header that must match between the backend `.env` and the AI service `.env`. The default model is `gemini-1.5-flash`, configured via `GEMINI_MODEL`; the actual API key is supplied through `GEMINI_API_KEY` from Google AI Studio. The AI service is orchestrated by `docker-compose.yml` and exposed at `http://ai-service:8001` inside the compose network; the Express API proxies chat requests to it when `AI_ENABLED=true`.