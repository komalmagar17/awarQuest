/**
 * Integration smoke test — run: node test/game-flow.test.js
 * Requires API at http://localhost:5001 (or API_URL env).
 */
const assert = require('node:assert/strict');

const BASE = process.env.API_URL || 'http://localhost:5001';

async function req(method, path, body, token) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${BASE}${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, data };
}

async function run() {
  const suffix = Date.now();
  const email = `qa${suffix}@test.com`;

  let r = await req('GET', '/');
  assert.equal(r.status, 200);

  r = await req('POST', '/api/v1/auth/register', { username: `qa${suffix}`, email, password: 'TestPass123!' });
  assert.equal(r.status, 201);
  assert.ok(r.data.requiresOtp, 'register should require OTP');
  assert.ok(r.data.otpSessionId);

  r = await req('POST', '/api/v1/auth/login', { identifier: email, password: 'WrongPass1!' });
  assert.equal(r.status, 401, 'wrong password should be 401');

  r = await req('POST', '/api/v1/auth/login', { identifier: 'notregistered@test.com', password: 'WrongPass1!' });
  assert.equal(r.status, 404, 'unknown email should return not registered');
  assert.equal(r.data.error?.code, 'NOT_REGISTERED');

  r = await req('POST', '/api/v1/auth/login', { identifier: email, password: 'TestPass123!' });
  assert.equal(r.status, 200);
  assert.ok(r.data.requiresOtp, 'login should require OTP');
  assert.ok(r.data.devOtp, 'dev mode should expose OTP for tests');

  r = await req('POST', '/api/v1/auth/login', { identifier: `qa${suffix}`, password: 'TestPass123!' });
  assert.equal(r.status, 200, 'login with username should work');

  r = await req('POST', '/api/v1/auth/verify-otp', { otpSessionId: r.data.otpSessionId, code: r.data.devOtp });
  assert.equal(r.status, 200);
  const token = r.data.accessToken;

  r = await req('GET', '/api/v1/game/challenges', null, token);
  assert.equal(r.status, 200);
  assert.ok(r.data.data.length >= 5);

  const mission = r.data.data[0];
  assert.ok(!JSON.stringify(mission).includes('"stars"'), 'mission brief must not leak stars');

  r = await req('POST', '/api/v1/game/start', { scenarioId: mission.id }, token);
  assert.equal(r.status, 201);
  const sessionId = r.data.data.sessionId;
  const challenge = r.data.data.challenge;
  assert.ok(challenge.clues.length > 0);
  assert.ok(!challenge.clues[0].description, 'clues should not leak descriptions at start');
  assert.ok(challenge.options.every(o => o.stars === undefined), 'options must not leak stars');

  r = await req('POST', '/api/v1/game/action', { sessionId, type: 'choose_option', optionId: challenge.options[0].id }, token);
  assert.equal(r.status, 409, 'must collect clues before choosing');

  for (const clue of challenge.clues) {
    r = await req('POST', '/api/v1/game/action', { sessionId, type: 'collect_clue', clueId: clue.id }, token);
    assert.equal(r.status, 200);
    assert.ok(r.data.data.revealedClue?.description, 'revealed clue should include description');
  }

  r = await req('POST', '/api/v1/game/chat', { sessionId, message: 'hint please' }, token);
  assert.equal(r.status, 200);
  assert.ok(r.data.data?.message || r.data.message);

  const best = challenge.options.reduce((a, b) => (a.id > b.id ? a : b));
  r = await req('POST', '/api/v1/game/action', { sessionId, type: 'choose_option', optionId: best.id }, token);
  assert.equal(r.status, 200);

  r = await req('POST', '/api/v1/game/action', { sessionId, type: 'complete' }, token);
  assert.equal(r.status, 200);

  r = await req('POST', '/api/v1/progress/submit', {
    sessionId,
    scenarioId: mission.id,
    status: 'completed'
  }, token);
  assert.equal(r.status, 201);

  r = await req('POST', '/api/v1/progress/submit', {
    sessionId,
    scenarioId: mission.id,
    status: 'completed',
    stars: 3,
    score: 9999
  }, token);
  assert.equal(r.status, 200);

  r = await req('GET', '/api/v1/scores/summary', null, token);
  assert.equal(r.status, 200);

  r = await req('GET', '/api/v1/lifeguide/tips');
  assert.equal(r.status, 200);

  console.log('All integration checks passed.');
}

run().catch((err) => {
  console.error('Test failed:', err.message);
  process.exit(1);
});
