import json
from abc import ABC, abstractmethod
import google.generativeai as genai
from google.generativeai.types import GenerationConfig
from .config import Settings
from .schemas import AIAction, AIDecision, DecisionRequest, Difficulty

class AIProvider(ABC):
    @abstractmethod
    async def decide(self, request: DecisionRequest) -> AIDecision: ...

def deterministic_decision(request: DecisionRequest) -> AIDecision:
    wants_hint = any(word in request.player_message.lower() for word in ("hint", "help", "what should"))
    if wants_hint and AIAction.GIVE_HINT in request.allowed_actions:
        return AIDecision(action=AIAction.GIVE_HINT, message=request.challenge.safe_hint, reason="Player requested hint.", confidence=1.0)
    return AIDecision(action=AIAction.NPC_REPLY, message=request.challenge.verified_explanation, reason="Default explanation.", confidence=1.0)

class GeminiProvider(AIProvider):
    def __init__(self, settings: Settings):
        genai.configure(api_key=settings.gemini_api_key.get_secret_value())
        self.model = genai.GenerativeModel(
            model_name=settings.gemini_model,
            generation_config=GenerationConfig(
                response_mime_type="application/json",
                response_schema=AIDecision.model_json_schema(),
            ),
        )

    async def decide(self, request: DecisionRequest) -> AIDecision:
        prompt = f"Act as a guide for a life skills game. Decide the next action based on this state: {request.model_dump_json()}"
        response = await self.model.generate_content_async(prompt)
        return AIDecision.model_validate_json(response.text)

def build_provider(settings: Settings) -> AIProvider | None:
    if not settings.gemini_api_key or not settings.gemini_api_key.get_secret_value():
        return None
    return GeminiProvider(settings)
