from functools import lru_cache
from pydantic import SecretStr, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    gemini_api_key: SecretStr | None = None
    gemini_model: str = "gemini-1.5-flash"
    ai_service_token: SecretStr
    ai_port: int = 8001
    ai_log_level: str = "INFO"

    @field_validator("ai_service_token")
    @classmethod
    def validate_internal_token(cls, value: SecretStr) -> SecretStr:
        if len(value.get_secret_value()) < 32:
            raise ValueError("AI_SERVICE_TOKEN must be at least 32 characters")
        return value

@lru_cache
def get_settings() -> Settings:
    return Settings()
