import asyncio
import hmac
import logging
from fastapi import Depends, FastAPI, Header, HTTPException, Request
from fastapi.responses import JSONResponse
from .config import Settings, get_settings
from .provider import build_provider, deterministic_decision
from .schemas import DecisionRequest, DecisionResponse

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("lifeguide")
app = FastAPI(title="LifeGuide AI Service")

def verify_token(x_ai_service_token: str = Header(default=""), settings: Settings = Depends(get_settings)):
    if not hmac.compare_digest(x_ai_service_token, settings.ai_service_token.get_secret_value()):
        raise HTTPException(status_code=401, detail="Unauthorized")

@app.get("/health")
async def health(settings: Settings = Depends(get_settings)):
    return {"status": "ok", "provider": "gemini" if settings.gemini_api_key else "deterministic"}

@app.post("/v1/decision", response_model=DecisionResponse, dependencies=[Depends(verify_token)])
async def decision(request: DecisionRequest, settings: Settings = Depends(get_settings)):
    provider = build_provider(settings)
    if not provider:
        return DecisionResponse(decision=deterministic_decision(request), provider="deterministic", fallback_used=True)
    try:
        result = await asyncio.wait_for(provider.decide(request), timeout=5.0)
        return DecisionResponse(decision=result, provider="gemini", fallback_used=False)
    except Exception as e:
        logger.error(f"AI Error: {e}")
        return DecisionResponse(decision=deterministic_decision(request), provider="deterministic", fallback_used=True)
