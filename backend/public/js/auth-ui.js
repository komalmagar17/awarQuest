const PASSWORD_RULES = {
  length: (p) => p.length >= 8,
  lower: (p) => /[a-z]/.test(p),
  upper: (p) => /[A-Z]/.test(p),
  digit: (p) => /\d/.test(p),
  special: (p) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(p)
};

const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,128}$/;

function isStrongPassword(password) {
  return PASSWORD_PATTERN.test(password);
}

function updatePasswordRules(password) {
  const list = document.getElementById('password-rules');
  if (!list) return;
  list.querySelectorAll('li').forEach((item) => {
    const rule = item.dataset.rule;
    item.classList.toggle('valid', PASSWORD_RULES[rule]?.(password));
  });
}

function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  toggle?.setAttribute('aria-pressed', saved === 'dark' ? 'true' : 'false');

  toggle?.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    toggle.setAttribute('aria-pressed', next === 'dark' ? 'true' : 'false');
  });
}

function initAuthCursor() {
  const cursor = document.getElementById('auth-cursor');
  const authScreen = document.getElementById('screen-auth');
  if (!cursor || !authScreen || window.matchMedia('(pointer: coarse)').matches) return;

  document.body.classList.add('auth-cursor-active');

  const move = (x, y) => {
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
  };

  window.addEventListener('mousemove', (e) => move(e.clientX, e.clientY));

  authScreen.querySelectorAll('a, button, input, .tab, .auth-card').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

  document.addEventListener('mouseleave', () => cursor.classList.add('hidden'));
  document.addEventListener('mouseenter', () => cursor.classList.remove('hidden'));
}

function initParticleBackground() {
  const canvas = document.getElementById('auth-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;
  let w = 0;
  let h = 0;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function spawn() {
    const count = Math.min(55, Math.floor(window.innerWidth / 28));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2.2 + 0.6,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.35 + 0.15
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const color = isDark ? '186, 104, 255' : '251, 146, 60';

    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${p.alpha})`;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          ctx.strokeStyle = `rgba(${color}, ${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    });

    animId = requestAnimationFrame(draw);
  }

  resize();
  spawn();
  draw();

  window.addEventListener('resize', () => {
    resize();
    spawn();
  });

  const observer = new MutationObserver(() => {
    const active = document.getElementById('screen-auth')?.classList.contains('active');
    if (!active && animId) cancelAnimationFrame(animId);
    else if (active && !animId) draw();
  });
  observer.observe(document.getElementById('screen-auth'), { attributes: true, attributeFilter: ['class'] });
}

async function transitionToMissions(loadFn) {
  const auth = document.getElementById('screen-auth');
  const missions = document.getElementById('screen-missions');
  auth?.classList.add('auth-exiting');

  await new Promise((resolve) => setTimeout(resolve, 650));
  await loadFn();

  document.querySelectorAll('.screen').forEach((s) => s.classList.remove('active'));
  missions?.classList.add('active');
  missions?.classList.add('missions-entering');
  document.body.classList.remove('auth-cursor-active');

  setTimeout(() => {
    auth?.classList.remove('auth-exiting');
    missions?.classList.remove('missions-entering');
  }, 900);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function getFieldErrorEl(input) {
  const id = input.id;
  if (!id) return null;
  return document.querySelector(`.field-error[data-for="${id}"]`);
}

function showFieldError(input, message) {
  const el = getFieldErrorEl(input);
  input.classList.add('input-invalid');
  if (el) {
    el.textContent = message;
    el.classList.remove('hidden');
  }
}

function clearFieldError(input) {
  const el = getFieldErrorEl(input);
  input.classList.remove('input-invalid');
  if (el) {
    el.textContent = '';
    el.classList.add('hidden');
  }
}

function validateEmailField(input, { allowEmpty = false } = {}) {
  const value = input.value.trim();
  const t = window.i18n?.t?.bind(window.i18n) || ((k) => k);
  if (!value) {
    if (allowEmpty) {
      clearFieldError(input);
      return true;
    }
    const msg = t('enterValidEmail');
    showFieldError(input, msg);
    alert(msg);
    return false;
  }
  if (!isValidEmail(value)) {
    const msg = t('enterValidEmail');
    showFieldError(input, msg);
    alert(msg);
    return false;
  }
  clearFieldError(input);
  return true;
}

function validateLoginIdentifier(input) {
  const value = input.value.trim();
  const t = window.i18n?.t?.bind(window.i18n) || ((k) => k);
  if (!value) {
    const msg = t('enterEmailOrUsername');
    showFieldError(input, msg);
    alert(msg);
    return false;
  }
  if (value.includes('@') && !isValidEmail(value)) {
    const msg = t('enterValidEmail');
    showFieldError(input, msg);
    alert(msg);
    return false;
  }
  clearFieldError(input);
  return true;
}

function switchToRegisterTab() {
  document.querySelectorAll('.tab').forEach((t) => {
    t.classList.toggle('active', t.dataset.tab === 'register');
  });
  document.getElementById('form-login')?.classList.add('hidden');
  document.getElementById('form-register')?.classList.remove('hidden');
  document.getElementById('form-otp')?.classList.add('hidden');
  document.querySelector('.tabs')?.classList.remove('hidden');
}

function initEmailValidation() {
  const registerEmail = document.getElementById('register-email');
  registerEmail?.addEventListener('blur', () => validateEmailField(registerEmail));

  const loginIdentifier = document.getElementById('login-identifier');
  loginIdentifier?.addEventListener('blur', () => validateLoginIdentifier(loginIdentifier));

  registerEmail?.addEventListener('input', () => {
    if (registerEmail.classList.contains('input-invalid')) validateEmailField(registerEmail, { allowEmpty: true });
  });
  loginIdentifier?.addEventListener('input', () => {
    if (loginIdentifier.classList.contains('input-invalid')) {
      const value = loginIdentifier.value.trim();
      if (!value || (value.includes('@') && !isValidEmail(value))) return;
      clearFieldError(loginIdentifier);
    }
  });
}

function initPasswordValidation() {
  const input = document.getElementById('register-password');
  input?.addEventListener('input', (e) => updatePasswordRules(e.target.value));
}

window.AuthUI = {
  isStrongPassword,
  isValidEmail,
  updatePasswordRules,
  transitionToMissions,
  validateEmailField,
  validateLoginIdentifier,
  switchToRegisterTab,
  showFieldError,
  clearFieldError,
  init() {
    initThemeToggle();
    initAuthCursor();
    initParticleBackground();
    initPasswordValidation();
    initEmailValidation();
  }
};

document.addEventListener('DOMContentLoaded', () => window.AuthUI.init());
