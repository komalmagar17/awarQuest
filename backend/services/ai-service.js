const env = require('../config/env');
const logger = require('../config/logger');

function localFallback(context) {
  const playerMessage = context.player_message || '';
  const safeHint = context.challenge?.safe_hint || 'Collect all clues before deciding.';
  const explanation = context.challenge?.verified_explanation || safeHint;
  const alerts = context.challenge?.verified_alerts || [];
  const mistakes = context.player?.mistakes_for_topic || 0;
  const wantsHint = /\b(hint|help|what should|otp|pin|password|clue)\b/i.test(playerMessage);
  const alert = alerts[0];

  if (wantsHint) return { action: 'GIVE_HINT', message: safeHint, reason: 'Curated hint fallback.', confidence: 1 };
  if (mistakes >= 2 && alert) return { action: 'SHOW_ALERT', message: explanation, reason: 'Curated safety reinforcement.', alert, confidence: 1 };
  return { action: 'NPC_REPLY', message: explanation, reason: 'Curated explanation fallback.', confidence: 1 };
}

async function makeGameDecision(context) {
  if (!env.AI_ENABLED) return { decision: localFallback(context), provider: 'deterministic', fallbackUsed: true };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), env.AI_REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${env.AI_SERVICE_URL}/v1/decision`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-ai-service-token': env.AI_SERVICE_TOKEN
      },
      body: JSON.stringify(context),
      signal: controller.signal
    });

    if (!response.ok) throw new Error(`AI service responded ${response.status}`);
    const payload = await response.json();
    return {
      decision: payload.decision,
      provider: payload.provider,
      fallbackUsed: payload.fallback_used
    };
  } catch (error) {
    logger.warn({ err: error }, 'AI decision unavailable; using deterministic fallback');
    return { decision: localFallback(context), provider: 'deterministic', fallbackUsed: true };
  } finally {
    clearTimeout(timeout);
  }
}

module.exports = { makeGameDecision, localFallback };
