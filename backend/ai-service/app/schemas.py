from enum import Enum
from typing import Literal, List, Optional
from pydantic import BaseModel, ConfigDict, Field, field_validator

class AIAction(str, Enum):
    NPC_REPLY = "NPC_REPLY"
    NEXT_CHALLENGE = "NEXT_CHALLENGE"
    SHOW_ALERT = "SHOW_ALERT"
    GIVE_HINT = "GIVE_HINT"
    COMPLETE_CHALLENGE = "COMPLETE_CHALLENGE"
    COMPLETE_DAY = "COMPLETE_DAY"
    RETRY_CHALLENGE = "RETRY_CHALLENGE"
    CHANGE_DIFFICULTY = "CHANGE_DIFFICULTY"
    UNLOCK_CONTENT = "UNLOCK_CONTENT"
    RECOMMEND_CONTENT = "RECOMMEND_CONTENT"
    ASK_CLARIFICATION = "ASK_CLARIFICATION"
    NO_ACTION = "NO_ACTION"

class Difficulty(str, Enum):
    easy = "easy"
    medium = "medium"
    hard = "hard"

class Alert(BaseModel):
    model_config = ConfigDict(extra="forbid")
    type: str = Field(min_length=1, max_length=50, pattern=r"^[A-Z_]+$")
    priority: Literal["LOW", "MEDIUM", "HIGH", "CRITICAL"]

class PlayerSnapshot(BaseModel):
    model_config = ConfigDict(extra="forbid")
    age_group: str
    current_challenge_id: str
    topic: str
    mistakes_for_topic: int
    topic_mastery: float
    challenge_streak: int

class ChallengeContext(BaseModel):
    model_config = ConfigDict(extra="forbid")
    id: str
    title: str
    scenario: str
    verified_explanation: str
    safe_hint: str
    allowed_answer_ids: List[str]
    verified_alerts: List[Alert] = []

class DecisionRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")
    interaction_type: Literal["game_action", "chat"]
    player: PlayerSnapshot
    challenge: ChallengeContext
    player_message: str
    allowed_actions: List[AIAction]

class AIDecision(BaseModel):
    model_config = ConfigDict(extra="forbid")
    action: AIAction
    message: str = Field(min_length=1, max_length=500)
    reason: str = Field(min_length=1, max_length=160)
    challenge_id: Optional[str] = None
    alert: Optional[Alert] = None
    difficulty: Optional[Difficulty] = None
    confidence: float = Field(ge=0, le=1)

class DecisionResponse(BaseModel):
    model_config = ConfigDict(extra="forbid")
    decision: AIDecision
    provider: Literal["gemini", "deterministic"]
    fallback_used: bool
