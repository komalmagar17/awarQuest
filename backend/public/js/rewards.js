/**
 * Celebration overlays — XP bursts, level complete, confetti energy.
 */
window.RewardFX = {
  confetti(count = 48) {
    const wrap = document.createElement('div');
    wrap.className = 'confetti-layer';
    const colors = ['#a855f7', '#f59e0b', '#22c55e', '#3b82f6', '#ec4899', '#fde047'];
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = 'confetti-piece';
      p.style.left = `${Math.random() * 100}%`;
      p.style.background = colors[i % colors.length];
      p.style.animationDelay = `${Math.random() * 0.6}s`;
      p.style.animationDuration = `${0.9 + Math.random() * 0.8}s`;
      wrap.appendChild(p);
    }
    document.body.appendChild(wrap);
    setTimeout(() => wrap.remove(), 2200);
  },

  xpBurst(amount, label) {
    window.dispatchEvent(new CustomEvent('game:xp', { detail: { amount, label } }));
    const burst = document.createElement('div');
    burst.className = 'xp-burst';
    burst.innerHTML = `<span class="xp-burst-amount">+${amount} XP</span><span class="xp-burst-label">${label || ''}</span>`;
    document.body.appendChild(burst);
    setTimeout(() => burst.remove(), 1400);
  },

  showCelebration(opts = {}) {
    const modal = document.getElementById('reward-celebration');
    if (!modal) return;
    const title = modal.querySelector('#reward-title');
    const subtitle = modal.querySelector('#reward-subtitle');
    const xpEl = modal.querySelector('#reward-xp');
    const starsEl = modal.querySelector('#reward-stars');
    const totalEl = modal.querySelector('#reward-total');
    const badge = modal.querySelector('#reward-badge');

    title.textContent = opts.title || 'Level Complete!';
    subtitle.textContent = opts.subtitle || '';
    xpEl.textContent = opts.xp != null ? `+${opts.xp} XP` : '';
    totalEl.textContent = opts.totalXp != null ? `Total: ${opts.totalXp} XP` : '';
    starsEl.innerHTML = opts.stars != null
      ? `${'★'.repeat(opts.stars)}${'☆'.repeat(3 - opts.stars)}`
      : '';
    badge.textContent = opts.badge || 'Quest Cleared';
    badge.className = `reward-badge${opts.perfect ? ' perfect' : ''}`;

    modal.classList.remove('hidden');
    this.confetti(opts.perfect ? 72 : 40);

    return new Promise((resolve) => {
      const btn = modal.querySelector('#reward-dismiss');
      const done = () => {
        modal.classList.add('hidden');
        btn.removeEventListener('click', done);
        resolve();
      };
      btn.addEventListener('click', done);
      if (opts.autoMs) setTimeout(done, opts.autoMs);
    });
  }
};
