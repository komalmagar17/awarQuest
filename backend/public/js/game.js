const PHASE_LABELS = {
  presentation: 'Briefing',
  exploration: 'Investigation',
  reveal: 'Decision Made',
  completed: 'Complete'
};

const state = {
  missions: [],
  progress: [],
  sessionId: null,
  scenario: null,
  gameState: null,
  revealedClues: {},
  busy: false,
  world: null,
  sessionXp: 0,
  sceneEntered: false,
  learningObjectives: []
};

function $(sel) { return document.querySelector(sel); }
function $$(sel) { return document.querySelectorAll(sel); }

function showScreen(id) {
  $$('.screen').forEach(s => s.classList.remove('active'));
  $(`#screen-${id}`).classList.add('active');
  document.body.classList.toggle('auth-cursor-active', id === 'auth' && !window.matchMedia('(pointer: coarse)').matches);
  if (id !== 'game' && state.world) {
    state.world.dispose();
    state.world = null;
    state.sceneEntered = false;
  }
  if (id !== 'game') window.StoryEngine?.unmount();
}

function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.remove('hidden');
  setTimeout(() => el.classList.add('hidden'), 3500);
}

function showXpPopup(amount, label) {
  const el = $('#xp-popup');
  el.textContent = `+${amount} XP — ${label}`;
  el.classList.remove('hidden');
  setTimeout(() => el.classList.add('hidden'), 1200);
}

function showError(el, msg) {
  el.textContent = msg;
  el.classList.remove('hidden');
}

function hideError(el) {
  el.classList.add('hidden');
  el.textContent = '';
}

const otpState = { sessionId: null };

function showAuthForms(mode) {
  const tabs = $('.tabs');
  const loginForm = $('#form-login');
  const registerForm = $('#form-register');
  const otpForm = $('#form-otp');

  hideError($('#auth-error'));
  tabs.classList.toggle('hidden', mode === 'otp');
  loginForm.classList.toggle('hidden', mode !== 'login');
  registerForm.classList.toggle('hidden', mode !== 'register');
  otpForm.classList.toggle('hidden', mode !== 'otp');
}

function showOtpStep(data) {
  otpState.sessionId = data.otpSessionId;
  showAuthForms('otp');
  hideError($('#auth-error'));

  const codeBox = $('#otp-code-box');
  const codeDisplay = $('#otp-code-display');
  const codeInput = $('#otp-code-input');
  const devHint = $('#otp-dev-hint');

  if (data.devOtp) {
    $('#otp-message').textContent = `Enter the code below to verify ${data.email || 'your account'}.`;
    codeDisplay.textContent = data.devOtp;
    codeBox.classList.remove('hidden');
    codeInput.value = data.devOtp;
    devHint.classList.add('hidden');
    toast(`Your code is ${data.devOtp}`);
  } else {
    $('#otp-message').textContent = data.message || `Enter the 6-digit code sent to ${data.email}.`;
    codeBox.classList.add('hidden');
    codeInput.value = '';
    devHint.classList.add('hidden');
  }

  codeInput.focus();
  codeInput.select();
}

$('#btn-copy-otp')?.addEventListener('click', () => {
  const code = $('#otp-code-input')?.value;
  if (!code) return;
  navigator.clipboard.writeText(code).then(() => toast('Code copied!')).catch(() => toast(code));
});

function setBusy(isBusy) {
  state.busy = isBusy;
  document.body.classList.toggle('is-busy', isBusy);
  $$('button, .clue-item, .option-btn, .puzzle-option').forEach(el => {
    if (isBusy) el.setAttribute('disabled', 'disabled');
    else el.removeAttribute('disabled');
  });
}

async function withBusy(fn) {
  if (state.busy) return;
  setBusy(true);
  try {
    await fn();
  } finally {
    setBusy(false);
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function getWorldConfig(scenario) {
  const slug = scenario.slug;
  return window.MISSION_WORLDS?.[slug] || {
    theme: 'default',
    floorColor: 0x243044,
    wallColor: 0x1a2332,
    accent: 0x3b82f6,
    spawn: { x: 0, z: 3.5 },
    objects: (scenario.interactables || []).map((item, i) => ({
      id: item.id,
      label: item.label,
      clueId: (scenario.clues[i] || {}).id,
      x: (i - 1) * 2,
      z: -1.2,
      color: 0x3b82f6,
      shape: i % 2 ? 'phone' : 'laptop'
    }))
  };
}

function setGameFlow(step) {
  document.querySelectorAll('#game-flow .flow-step').forEach((el) => {
    el.classList.toggle('active', el.dataset.flow === step);
    const order = ['briefing', 'story', 'decision', 'complete'];
    el.classList.toggle('done', order.indexOf(el.dataset.flow) < order.indexOf(step));
  });
}

function updateFlowFromState() {
  const gs = state.gameState;
  if (!gs) return;
  if (gs.phase === 'reveal' || gs.phase === 'completed') setGameFlow('complete');
  else if ($('#options-section') && !$('#options-section').classList.contains('hidden')) setGameFlow('decision');
  else if (state.sceneEntered) setGameFlow('story');
  else setGameFlow('briefing');
}

function updateXpHud() {
  const fill = $('#xp-fill');
  const label = $('#xp-label');
  const pct = Math.min(100, (state.sessionXp % 300) / 3);
  if (fill) fill.style.width = `${pct}%`;
  if (label) label.textContent = `${state.sessionXp} XP`;
}

function updateSkillBadge() {
  const tag = (state.scenario?.skillTags || [])[0] || 'digital_safety';
  const skill = window.SKILL_LABELS?.[tag] || { name: 'Life Skills' };
  const el = $('#skill-badge');
  if (el) el.textContent = skill.name;
}

function renderClueChips() {
  const clues = state.scenario?.clues || [];
  const collected = state.gameState?.collectedClueIds || [];
  const container = $('#clue-chips');
  if (!container) return;
  container.innerHTML = clues.map(c => {
    const done = collected.includes(c.id);
    const title = window.StoryI18n?.getClueTitle?.(c.id, c.title) || c.title;
    return `<span class="clue-chip${done ? ' done' : ''}">${escapeHtml(title)}</span>`;
  }).join('');
  $('#clue-count').textContent = `${collected.length}/${clues.length}`;
  window.StoryEngine?.syncEvidenceBar?.();
}

$$('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    $$('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    showAuthForms(tab.dataset.tab);
  });
});

$('#form-login').addEventListener('submit', (e) => {
  e.preventDefault();
  withBusy(async () => {
    hideError($('#auth-error'));
    const fd = new FormData(e.target);
    const identifier = fd.get('identifier');
    const password = fd.get('password');
    const identifierInput = $('#login-identifier');

    if (window.AuthUI && !window.AuthUI.validateLoginIdentifier(identifierInput)) return;
    if (window.AuthUI && !window.AuthUI.isStrongPassword(password)) {
      showError($('#auth-error'), 'Password must include uppercase, lowercase, a number, and a special character.');
      return;
    }
    try {
      const data = await window.api.login(identifier, password);
      showOtpStep(data);
    } catch (err) {
      if (err.code === 'NOT_REGISTERED') {
        showError($('#auth-error'), 'You are not registered. Please register.');
        alert('You are not registered. Please register.');
        window.AuthUI?.switchToRegisterTab();
        toast('Create an account to start playing.');
      } else {
        showError($('#auth-error'), err.message);
      }
    }
  });
});

$('#form-register').addEventListener('submit', (e) => {
  e.preventDefault();
  withBusy(async () => {
    hideError($('#auth-error'));
    const fd = new FormData(e.target);
    const password = fd.get('password');
    const emailInput = $('#register-email');

    if (window.AuthUI && !window.AuthUI.validateEmailField(emailInput)) return;
    if (window.AuthUI && !window.AuthUI.isStrongPassword(password)) {
      showError($('#auth-error'), 'Password must include uppercase, lowercase, a number, and a special character.');
      window.AuthUI.updatePasswordRules(password);
      return;
    }
    try {
      const data = await window.api.register(fd.get('username'), fd.get('email'), password);
      showOtpStep(data);
    } catch (err) {
      showError($('#auth-error'), err.message);
    }
  });
});

$('#form-otp').addEventListener('submit', (e) => {
  e.preventDefault();
  withBusy(async () => {
    hideError($('#auth-error'));
    const code = new FormData(e.target).get('code').trim();
    try {
      await window.api.verifyOtp(otpState.sessionId, code);
      if (window.AuthUI?.transitionToMissions) {
        await window.AuthUI.transitionToMissions(loadMissions);
      } else {
        await loadMissions();
        showScreen('missions');
      }
      showAuthForms('login');
    } catch (err) {
      showError($('#auth-error'), err.message);
    }
  });
});

$('#btn-resend-otp').addEventListener('click', () => {
  withBusy(async () => {
    hideError($('#auth-error'));
    try {
      const data = await window.api.resendOtp(otpState.sessionId);
      showOtpStep(data);
      toast('New verification code sent.');
    } catch (err) {
      showError($('#auth-error'), err.message);
    }
  });
});

$('#btn-back-auth').addEventListener('click', () => {
  otpState.sessionId = null;
  showAuthForms('login');
  $$('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === 'login'));
});

$('#btn-guest-play').addEventListener('click', () => {
  withBusy(async () => {
    hideError($('#auth-error'));
    try {
      const api = window.api;
      if (!api) throw new Error('System initialization incomplete. Please refresh.');
      await window.api.guestLogin();
      if (window.AuthUI?.transitionToMissions) {
        await window.AuthUI.transitionToMissions(loadMissions);
      } else {
        await loadMissions();
        showScreen('missions');
      }
      toast('Guest mode — Quest 1 is ready. Complete each level to unlock the next.');
    } catch (err) {
      showError($('#auth-error'), err.message);
    }
  });
});

$('#btn-logout').addEventListener('click', () => {
  withBusy(async () => {
    const api = window.api;
    if (!api) { showScreen('auth'); return; }
    try { await window.api.logout(); } catch { window.api.clearAuth(); }
    showScreen('auth');
    showAuthForms('login');
    $$('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === 'login'));
  });
});

$('#btn-back-missions').addEventListener('click', () => {
  withBusy(async () => {
    if (state.world) {
      state.world.dispose();
      state.world = null;
    }
    await loadMissions();
    showScreen('missions');
  });
});

$('#btn-progress').addEventListener('click', () => showProgressModal());
$$('[data-close]').forEach(btn => {
  btn.addEventListener('click', () => $(`#${btn.dataset.close}`).classList.add('hidden'));
});

$('#btn-enter-scene').addEventListener('click', () => beginStory());

window.addEventListener('game:xp', (e) => {
  const raw = e.detail.amount || 0;
  const amount = window.SessionScore?.scaleXp(raw) ?? raw;
  state.sessionXp += amount;
  updateXpHud();
  showXpPopup(amount, e.detail.label || 'XP');
});

window.addEventListener('world:interact-hint', (e) => {
  const hint = $('#interact-hint');
  const label = $('#interact-label');
  if (!hint || !state.sceneEntered) return;
  if (document.getElementById('screen-game')?.classList.contains('story-mode')) {
    hint.classList.add('hidden');
    return;
  }
  const obj = e.detail.object;
  if (obj && state.gameState?.phase !== 'reveal' && state.gameState?.phase !== 'completed') {
    hint.classList.remove('hidden');
    label.textContent = obj.label;
  } else {
    hint.classList.add('hidden');
  }
});

window.addEventListener('keydown', (e) => {
  if (e.code === 'KeyE' && state.world && state.sceneEntered && !state.busy) {
    const nearest = state.world.nearestObject;
    if (nearest) handleObjectInteract(nearest.userData);
  }
});

async function loadMissions() {
  const api = window.api;
  if (!api) {
    console.error('API not initialized');
    return;
  }
  const [challenges, progressRes, scoreRes] = await Promise.all([
   window.api.getChallenges().catch(() => ({ data: [] })),
   window.api.getProgress().catch(() => ({ data: [] })),
   window.api.getScoreSummary().catch(() => ({ data: {} }))
  ]);

  state.missions = challenges.data || [];
  state.progress = progressRes.data || [];

  const summary = scoreRes.data || {};
  const totalXp = state.progress.filter(p => p.status === 'completed').reduce((s, p) => s + (p.bestStars || 0) * 100, 0);

  const isGuest = window.api.user?.isGuest;
  $('#guest-badge')?.classList.toggle('hidden', !isGuest);
  $('#player-greeting').textContent = isGuest
    ? 'Welcome, Guest Player — explore quest by quest'
    : `Welcome, ${window.api.user?.username || 'Player'}`;
  $('#stat-completed').textContent = summary.missionsCompleted ?? state.progress.filter(p => p.status === 'completed').length;
  $('#stat-stars').textContent = summary.totalStars ?? state.progress.filter(p => p.status === 'completed').reduce((s, p) => s + (p.bestStars || 0), 0);
  $('#stat-xp').textContent = totalXp;
  $('#stat-total').textContent = summary.missionsTotal ?? state.missions.length;

  $('#win-banner').classList.toggle('hidden', !summary.winReady);
  renderMissionList();
}

function getProgressFor(scenarioId) {
  return state.progress.find(p => p.scenarioId === scenarioId);
}

function renderMissionList() {
  const list = $('#mission-list');
  list.innerHTML = '';

  if (!state.missions.length) {
    list.innerHTML = '<p class="empty-state">No quests available yet. Run the seed script on the server.</p>';
    return;
  }

  state.missions.forEach((mission, idx) => {
    const prog = getProgressFor(mission.id);
    const done = prog?.status === 'completed';
    const stars = prog?.bestStars || 0;
    const prevMission = idx > 0 ? state.missions[idx - 1] : null;
    const prevDone = !prevMission || getProgressFor(prevMission.id)?.status === 'completed';
    const locked = !prevDone;
    const skillTag = (mission.skillTags || [])[0];
    const skill = window.SKILL_LABELS?.[skillTag] || { icon: '🎯', name: 'Life Skills' };
    const card = document.createElement('div');
    card.className = `mission-card${done ? ' completed' : ''}${locked ? ' locked' : ''}`;
    card.innerHTML = `
      <div class="mission-info">
        <h3>${locked ? '🔒 ' : ''}${escapeHtml(mission.title)}</h3>
        <p>${escapeHtml(mission.summary || '')}</p>
        <div class="mission-meta">
          <span class="badge">${escapeHtml(skill.name)}</span>
          <span class="badge">Level ${idx + 1}</span>
          <span class="badge">Difficulty ${mission.difficulty}</span>
          ${locked ? '<span class="badge locked-badge">Complete previous level first</span>' : ''}
          ${done ? '<span class="badge done">Completed</span>' : ''}
        </div>
      </div>
      <div>
        ${done ? `<div class="stars">${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>` : `<span class="badge">${locked ? 'Locked' : `Quest ${idx + 1}`}</span>`}
      </div>
    `;
    card.addEventListener('click', () => {
      if (locked) {
        toast(`Complete "${prevMission.title.replace(/^Mission \d+: /, '')}" first to unlock this level.`);
        return;
      }
      withBusy(() => startMission(mission));
    });
    list.appendChild(card);
  });
}

async function startMission(mission) {
  const res = await window.api.startGame(mission.id);
  state.sessionId = res.data.sessionId;
  state.scenario = res.data.challenge;
  state.gameState = res.data.state || { phase: 'presentation', collectedClueIds: [], selectedOptionId: null, score: 0 };
  state.revealedClues = {};
  state.sessionXp = 0;
  state.sceneEntered = false;
  state.learningObjectives = state.scenario.learningObjectives || [];
  window.SessionScore?.reset(state.scenario?.slug || 'otp-scam-alert');

  const chatMsgEl = $('#chat-messages');
  if (chatMsgEl) chatMsgEl.innerHTML = '';
  await loadResources(mission.id);
  renderGame();
  showScreen('game');
  addChatMessage('guide', window.i18n?.t('welcomeGuide') || 'Welcome! Read each message, tap Continue, and solve chapter challenges.');
}

function beginStory() {
  if (!window.StoryEngine) {
    toast('Story engine loading…');
    return;
  }
  $('#briefing-panel').classList.add('hidden');
  $('#controls-hint')?.classList.add('hidden');
  state.sceneEntered = true;

  const slug = state.scenario?.slug || 'otp-scam-alert';
  window.StoryEngine.onClueSolved = async (clueId) => {
    await withBusy(async () => {
      await collectClue(clueId);
    });
  };
  window.StoryEngine.onStoryComplete = () => {
    document.getElementById('screen-game')?.classList.remove('story-mode');
    window.RewardFX?.confetti(32);
    window.RewardFX?.xpBurst(50, window.i18n?.t('storyComplete') || 'Story complete');
    renderGame();
    setGameFlow('decision');
    window.RewardFX?.confetti(32);
    window.RewardFX?.xpBurst(50, window.i18n?.t('storyComplete') || 'Story complete');
    addChatMessage('guide', window.i18n?.t('allEvidence') || 'All evidence collected! Choose the safest real-world action.');
    setTimeout(() => $('#options-section')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 400);
  };
  window.StoryEngine.mount(slug);
  setGameFlow('story');
  toast(window.i18n?.t('storyModeHint') || 'Story mode — read, solve, decide.');
}

async function loadResources(scenarioId) {
  try {
    const res = await window.api.getResources(scenarioId);
    const list = $('#resource-list');
    list.innerHTML = '';
    const items = res.data || [];
    if (!items.length) {
      list.innerHTML = '<p class="muted-text">No verified resources linked.</p>';
      return;
    }
    items.forEach(r => {
      const a = document.createElement('a');
      a.className = 'resource-link';
      a.href = r.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = r.title;
      list.appendChild(a);
    });
  } catch {
    $('#resource-list').innerHTML = '<p class="muted-text">Resources unavailable.</p>';
  }
}

async function handleObjectInteract(data) {
  if (!data?.clueId || state.busy) return;
  const collected = state.gameState.collectedClueIds || [];
  if (collected.includes(data.clueId)) {
    toast('Evidence already collected.');
    return;
  }
  if (state.gameState.phase === 'reveal' || state.gameState.phase === 'completed') return;

  if (document.pointerLockElement) document.exitPointerLock();

  const solved = await window.PuzzleEngine.run(data.clueId);
  if (!solved) return;

  await withBusy(async () => {
    await collectClue(data.clueId);
    if (state.world) state.world.markClueCollected(data.clueId);
  });
}

function renderGame() {
  const s = state.scenario;
  const gs = state.gameState;

  $('#game-title').textContent = s.title;
  $('#phase-badge').textContent = PHASE_LABELS[gs.phase] || gs.phase;
  const brief = window.StoryI18n?.getBriefing?.(s.slug);
  $('#scenario-text').textContent = brief?.hook || s.presentation?.hook || s.summary || '';
  $('#objective-text').textContent = brief?.objective || s.presentation?.objective || window.i18n?.t('defaultObjective') || '';

  updateSkillBadge();
  updateXpHud();
  renderClueChips();

  const briefing = $('#briefing-panel');
  if (gs.phase === 'presentation' && !state.sceneEntered) {
    briefing.classList.remove('hidden');
  } else {
    briefing.classList.add('hidden');
  }

  const clues = s.clues || [];
  const collected = gs.collectedClueIds || [];
  const allCluesCollected = collected.length >= clues.length && clues.length > 0;
  const optionsSection = $('#options-section');
  const optionList = $('#option-list');

  if (gs.phase === 'reveal' || gs.phase === 'completed') {
    optionsSection.classList.remove('hidden');
    optionList.innerHTML = '';
    (s.options || []).forEach(opt => {
      const btn = document.createElement('button');
      btn.className = `option-btn${gs.selectedOptionId === opt.id ? ' selected' : ''}`;
      btn.textContent = opt.text;
      btn.disabled = true;
      optionList.appendChild(btn);
    });
    showOutcome(gs);
    $('#interact-hint').classList.add('hidden');
    $('#controls-hint').classList.add('hidden');
  } else if (allCluesCollected) {
    optionsSection.classList.remove('hidden');
    optionList.innerHTML = '';
    (s.options || []).forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt.text;
      btn.addEventListener('click', () => withBusy(() => chooseOption(opt.id)));
      optionList.appendChild(btn);
    });
    $('#outcome-section').classList.add('hidden');
    if (!state._decisionToastShown) {
      state._decisionToastShown = true;
      toast(window.i18n?.t('decisionReady') || 'All evidence collected! Make your real-world decision →');
      addChatMessage('guide', window.i18n?.t('greatDetective') || 'Great detective work! Now choose what you would actually do.');
    }
  } else {
    optionsSection.classList.add('hidden');
    $('#outcome-section').classList.add('hidden');
    state._decisionToastShown = false;
  }
  updateFlowFromState();
}

async function collectClue(clueId) {
  const res = await window.api.gameAction(state.sessionId, 'collect_clue', { clueId });
  state.gameState = res.data.state;
  if (res.data.revealedClue) state.revealedClues[clueId] = res.data.revealedClue;
  const xp = 45;
  window.RewardFX?.xpBurst(xp, window.i18n?.t('evidenceSecured') || 'Evidence');
  renderGame();
  addChatMessage('guide', res.data.revealedClue?.description || 'Evidence logged. Keep going!');
}

async function chooseOption(optionId) {
  const res = await window.api.gameAction(state.sessionId, 'choose_option', { optionId });
  state.gameState = res.data.state;
  const bonus = (state.gameState.stars || 0) * 100;
  window.RewardFX?.confetti(state.gameState.stars >= 3 ? 60 : 28);
  window.RewardFX?.xpBurst(bonus, `${state.gameState.stars}★`);
  renderGame();
  setGameFlow('complete');
}

function showOutcome(gs) {
  $('#outcome-section').classList.remove('hidden');
  const perfect = (gs.stars || 0) >= 3;
  const tier = window.SessionScore?.tier || 'standard';
  const tierBonus = tier === 'expert' ? 150 : 0;
  const displayScore = (gs.score || 0) + tierBonus;
  const scaledStarXp = window.SessionScore?.scaleXp((gs.stars || 0) * 100) ?? (gs.stars || 0) * 100;

  $('#outcome-content').innerHTML = `
    <div class="outcome-hero${perfect ? ' perfect' : ''}">
      <div class="outcome-badge">${perfect ? window.i18n?.t('perfectQuest') : window.i18n?.t('questCleared')}</div>
      <p class="${window.SessionScore?.tierBadgeClass() || ''}">${escapeHtml(window.SessionScore?.tierLabel() || '')}</p>
      <div class="stars-display outcome-stars">${'★'.repeat(gs.stars || 0)}${'☆'.repeat(3 - (gs.stars || 0))}</div>
      <p class="score">${window.i18n?.t('score') || 'Score'}: ${displayScore}${tierBonus ? ` <small>(+${tierBonus} ${window.i18n?.t('expertBonus') || 'expert bonus'})</small>` : ''}</p>
      <p class="outcome-xp-flash">+${scaledStarXp} ${window.i18n?.t('xpEarned') || 'XP'} ${tier !== 'expert' ? `<small>(${window.i18n?.t('xpReduced') || '50% — cite official sites & reporting for full XP'})</small>` : ''}</p>
    </div>
    <p class="outcome-text">${escapeHtml(gs.outcome || '')}</p>
  `;

  const learningBox = $('#learning-box');
  const learningList = $('#learning-list');
  learningBox.classList.remove('hidden');
  if (window.SessionScore?.buildLearningHtml) {
    learningList.innerHTML = window.SessionScore.buildLearningHtml(state.scenario, gs.collectedClueIds || []);
  } else if (state.learningObjectives.length) {
    learningList.innerHTML = state.learningObjectives.map(o => `<li>${escapeHtml(o)}</li>`).join('');
  } else {
    learningList.innerHTML = `<li>${window.i18n?.t('learningTip') || 'Review official schemes in the sidebar.'}</li>`;
  }

  $('#btn-complete-mission').onclick = () => withBusy(() => completeMission(gs));
  setTimeout(() => $('#outcome-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
}

async function completeMission(gs) {
  await window.api.gameAction(state.sessionId, 'complete');
  await window.api.submitProgress({
    sessionId: state.sessionId,
    scenarioId: state.scenario.id,
    status: 'completed',
    evidence: { collectedClues: gs.collectedClueIds?.length || 0, sessionXp: state.sessionXp }
  });

  const perfect = gs.stars >= 3;
  await window.RewardFX?.showCelebration({
    title: window.i18n?.t('levelComplete') || 'Level Complete!',
    subtitle: state.scenario?.title?.replace(/^Mission \d+: /, '') || '',
    xp: state.sessionXp,
    totalXp: state.sessionXp,
    stars: gs.stars || 0,
    perfect,
    badge: perfect ? window.i18n?.t('perfectQuest') : window.i18n?.t('questCleared')
  });

  if (state.world) {
    state.world.dispose();
    state.world = null;
  }
  state.sceneEntered = false;
  await loadMissions();
  showScreen('missions');
  window.i18n?.apply();
}

$('#form-chat')?.addEventListener('submit', (e) => {
  e.preventDefault();
  withBusy(async () => {
    const input = $('#chat-input');
    const msg = input.value.trim();
    if (!msg || !state.sessionId) return;

    addChatMessage('user', msg);
    input.value = '';

    try {
      const res = await window.api.chat(state.sessionId, msg);
      const payload = res.data || res;
      if (payload.alert) {
        addChatMessage('alert', `${payload.alert.type}: ${payload.alert.priority} priority alert`);
      }
      addChatMessage('guide', payload.message || 'Keep investigating the glowing objects in the 3D scene.');
    } catch (err) {
      addChatMessage('guide', err.message || 'Explore the scene and solve each skill puzzle.');
    }
  });
});

function addChatMessage(type, text) {
  const el = document.createElement('div');
  el.className = `chat-msg ${type}`;
  el.textContent = text;
  const container = $('#chat-messages');
  if (!container) return;
  container.appendChild(el);
  container.scrollTop = container.scrollHeight;
}

async function showProgressModal() {
  await loadMissions();
  const details = $('#progress-details');
  details.innerHTML = '';

  state.missions.forEach(m => {
    const prog = getProgressFor(m.id);
    const item = document.createElement('div');
    item.className = 'progress-item';
    item.innerHTML = `
      <span>${escapeHtml(m.title.replace(/^Mission \d+: /, ''))}</span>
      <span>${prog?.status === 'completed' ? `${'★'.repeat(prog.bestStars || 0)} Done` : 'Not started'}</span>
    `;
    details.appendChild(item);
  });

  $('#modal-progress').classList.remove('hidden');
}

function initAiKeySettings() {
  const btn = document.getElementById('btn-ai-settings');
  const modal = document.getElementById('modal-ai-key');
  const input = document.getElementById('gemini-api-key-input');
  const status = document.getElementById('ai-key-status');
  if (!btn || !modal) return;

  const refreshStatus = () => {
    if (!status) return;
    status.textContent = window.ChatAgent?.hasApiKey()
      ? (window.i18n?.t('aiKeySaved') || 'Key saved')
      : '';
    status.className = 'ai-key-status' + (window.ChatAgent?.hasApiKey() ? ' ok' : '');
  };

  btn.addEventListener('click', () => {
    if (input) input.value = window.ChatAgent?.getApiKey() || '';
    refreshStatus();
    modal.classList.remove('hidden');
  });

  document.getElementById('btn-save-ai-key')?.addEventListener('click', () => {
    const key = input?.value?.trim();
    if (!key) {
      toast(window.i18n?.t('aiKeyMissing') || 'Enter API key');
      return;
    }
    window.ChatAgent?.setApiKey(key);
    refreshStatus();
    toast(window.i18n?.t('aiKeySaved') || 'Key saved');
  });

  document.getElementById('btn-clear-ai-key')?.addEventListener('click', () => {
    window.ChatAgent?.setApiKey('');
    if (input) input.value = '';
    refreshStatus();
    toast(window.i18n?.t('aiKeyRemoved') || 'Key removed');
  });

  document.querySelectorAll('[data-close="modal-ai-key"]').forEach((el) => {
    el.addEventListener('click', () => modal.classList.add('hidden'));
  });
}

async function init() {
  showScreen('auth');
  showAuthForms('login');
  initAiKeySettings();
  window.addEventListener('locale:change', () => {
    window.i18n?.apply();
    if (state.scenario && document.getElementById('screen-game')?.classList.contains('active')) {
      renderGame();
    }
    if (window.StoryEngine?.script && !document.getElementById('story-viewport')?.classList.contains('hidden')) {
      window.StoryEngine._slug = window.StoryEngine._slug || 'otp-scam-alert';
      window.StoryEngine.script = window.StoryEngine.getScript(window.StoryEngine._slug);
      window.StoryEngine.renderChapterHeader();
      window.StoryEngine.syncEvidenceBar();
      window.StoryEngine.setComposerMode(window.StoryEngine.awaitingDecision ? 'decision' : 'chat');
    } else {
      window.StoryEngine?.updateNavButtons?.();
    }
  });
}

init();
