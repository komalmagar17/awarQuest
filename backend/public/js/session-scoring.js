/**
 * Tracks how the player engaged (expert chat vs casual vs puzzle-only)
 * and builds the end-of-session "What you learned" recap with schemes & helplines.
 */
window.SessionScore = {
  slug: '',
  tier: 'standard',
  expertHits: 0,
  expertCategories: new Set(),
  totalPlayerMessages: 0,
  puzzleSkips: 0,
  chaptersWithChat: 0,
  _lastPuzzleChapter: -1,

  XP_MULT: { expert: 1, standard: 0.5, puzzle_rush: 0.5 },

  EXPERT_CHECKS: [
    { cat: 'report', re: /report(ed|ing)?|complaint|cybercrime|1930|फ़िर्याद|रिपोर्ट/i },
    { cat: 'portal', re: /cybercrime\.gov|scholarships\.gov|ncs\.gov|myscheme\.gov|sachet\.rbi|\.gov\.in/i },
    { cat: 'visit', re: /visit(ed|ing)?|check(ed|ing)?|open(ed|ing)?|went to|looked at|verified|जाँच|देख|वेबसाइट|portal|website|ऐप|app/i },
    { cat: 'action', re: /hang\s*up|disconnect|block(ed|ing)?|dispute|helpline|1098|childline|cut the call|phone काट|ब्लॉक/i },
    { cat: 'official', re: /official|bank card|debit card|never share otp|don't share|official number|आधिकारिक/i }
  ],

  LEARNING_PACKS: {
    'otp-scam-alert': {
      takeaways: [
        'Banks never ask for OTPs on phone calls — OTP authorizes real payments.',
        'Fake urgency ("10 minutes or frozen") is a pressure tactic to stop you thinking.',
        'Always verify through your official bank app or the number on your debit card.',
        'Report fraud at the National Cyber Crime Portal or dial 1930.'
      ],
      schemes: [
        { title: 'National Cyber Crime Portal', url: 'https://cybercrime.gov.in/', desc: 'Report OTP fraud & cyber scams online' },
        { title: 'Cyber Crime Helpline', phone: '1930', desc: '24×7 fraud reporting hotline' },
        { title: 'RBI Sachet Portal', url: 'https://sachet.rbi.org.in/', desc: 'Report unauthorized transactions & banking fraud' },
        { title: 'myScheme', url: 'https://www.myscheme.gov.in/', desc: 'Find verified government schemes' }
      ]
    },
    'fake-job-offer': {
      takeaways: [
        'Real employers never charge registration or security deposits.',
        'Legitimate jobs require interviews — instant hiring is a red flag.',
        'Verify companies on National Career Service (NCS) and MCA portal.',
        'Never pay WhatsApp recruiters before verifying on official .gov.in sites.'
      ],
      schemes: [
        { title: 'National Career Service', url: 'https://www.ncs.gov.in/', desc: 'Verified jobs & career counselling' },
        { title: 'myScheme — Employment', url: 'https://www.myscheme.gov.in/', desc: 'Government employment schemes' },
        { title: 'Cyber Crime Portal', url: 'https://cybercrime.gov.in/', phone: '1930', desc: 'Report job scams' }
      ]
    },
    'upi-fraud-request': {
      takeaways: [
        'Screenshots of UPI transfers can be edited — check your real app balance.',
        'Never send money to a new UPI ID under pressure from strangers.',
        'Wrong-transfer disputes go through your bank app, not WhatsApp.',
        'Report UPI fraud at cybercrime.gov.in or call 1930.'
      ],
      schemes: [
        { title: 'RBI Sachet Portal', url: 'https://sachet.rbi.org.in/', desc: 'Banking & UPI fraud reporting' },
        { title: 'Cyber Crime Helpline', phone: '1930', desc: 'Report digital payment fraud' },
        { title: 'Cyber Crime Portal', url: 'https://cybercrime.gov.in/', desc: 'File an online complaint' }
      ]
    },
    'scholarship-scam': {
      takeaways: [
        'Official scholarships use scholarships.gov.in — never pay processing fees.',
        'Government sites end in .gov.in or .nic.in, not .org or .com.',
        'Artificial countdown timers are used to rush bad decisions.',
        'Find real schemes on myScheme and the National Scholarship Portal (NSP).'
      ],
      schemes: [
        { title: 'National Scholarship Portal', url: 'https://scholarships.gov.in/', desc: 'Apply for genuine scholarships — zero fee' },
        { title: 'myScheme', url: 'https://www.myscheme.gov.in/', desc: 'Browse all government schemes by category' },
        { title: 'Cyber Crime Portal', url: 'https://cybercrime.gov.in/', phone: '1930', desc: 'Report fake scholarship sites' }
      ]
    },
    'cyberbullying-response': {
      takeaways: [
        'Save screenshots of bullying before messages are deleted.',
        'Support victims privately first — public fights often make it worse.',
        'Tell a trusted teacher, counsellor, or parent for serious cases.',
        'Report serious cyberbullying at cybercrime.gov.in; Childline is 1098.'
      ],
      schemes: [
        { title: 'Cyber Crime Portal', url: 'https://cybercrime.gov.in/', desc: 'Report serious online harassment' },
        { title: 'Childline India', url: 'https://www.childlineindia.org.in/', phone: '1098', desc: '24×7 support for children & youth' },
        { title: 'myScheme — Education support', url: 'https://www.myscheme.gov.in/', desc: 'Counselling & welfare schemes' }
      ]
    }
  },

  reset(slug) {
    this.slug = slug || '';
    this.tier = 'standard';
    this.expertHits = 0;
    this.expertCategories = new Set();
    this.totalPlayerMessages = 0;
    this.puzzleSkips = 0;
    this.chaptersWithChat = 0;
    this._lastPuzzleChapter = -1;
    this._currentChapterHadChat = false;
  },

  recordPlayerMessage(text) {
    this.totalPlayerMessages += 1;
    this._currentChapterHadChat = true;
    const lower = String(text || '').toLowerCase();
    this.EXPERT_CHECKS.forEach(({ cat, re }) => {
      if (re.test(lower)) {
        if (!this.expertCategories.has(cat)) {
          this.expertCategories.add(cat);
          this.expertHits += 1;
        }
      }
    });
    this.recalcTier();
  },

  recordChapterPuzzle(chapterIndex, chapterHadChat) {
    if (this._lastPuzzleChapter === chapterIndex) return;
    this._lastPuzzleChapter = chapterIndex;
    if (!chapterHadChat) this.puzzleSkips += 1;
    this.recalcTier();
  },

  recalcTier() {
    if (this.expertCategories.size >= 2 || (this.expertCategories.size >= 1 && this.expertHits >= 2)) {
      this.tier = 'expert';
    } else if (this.puzzleSkips >= 2 && this.totalPlayerMessages <= 2) {
      this.tier = 'puzzle_rush';
    } else {
      this.tier = 'standard';
    }
  },

  getXpMultiplier() {
    return this.XP_MULT[this.tier] ?? 0.5;
  },

  scaleXp(base) {
    return Math.max(5, Math.round(base * this.getXpMultiplier()));
  },

  tierLabel() {
    const t = window.i18n?.t.bind(window.i18n);
    if (this.tier === 'expert') return t?.('tierExpert') || 'Expert — you cited real actions & official resources';
    if (this.tier === 'puzzle_rush') return t?.('tierPuzzle') || 'Puzzle path — review schemes below to earn more next time';
    return t?.('tierStandard') || 'Standard — mention websites you visited or where you reported for bonus XP';
  },

  tierBadgeClass() {
    return `tier-badge tier-${this.tier}`;
  },

  buildLearningHtml(scenario, collectedClueIds = []) {
    const pack = this.LEARNING_PACKS[this.slug] || {};
    const clues = scenario?.clues || [];
    const collected = collectedClueIds || [];
    const apiResources = scenario?.resources || [];

    // Get translated takeaways if available
    const locTakeaways = window.StoryI18n?.getLearningTakeaways(this.slug);
    const takeaways = locTakeaways || pack.takeaways || scenario?.learningObjectives || [];

    let html = `<div class="learning-recap">`;

    html += `<p class="learning-tier-note ${this.tierBadgeClass()}">${this.escapeHtml(this.tierLabel())}</p>`;

    html += `<h4 class="learning-recap-title">${window.i18n?.t('whatLearned') || 'What you learned'}</h4>`;
    html += '<ul class="learning-takeaways">';
    takeaways.forEach((line) => {
      html += `<li>${this.escapeHtml(line)}</li>`;
    });
    html += '</ul>';

    if (collected.length && clues.length) {
      html += `<h4 class="learning-recap-sub">${window.i18n?.t('evidenceYouFound') || 'Evidence you unlocked'}</h4><ul class="learning-clues">`;
      clues.filter((c) => collected.includes(c.id)).forEach((c) => {
        html += `<li><strong>${this.escapeHtml(c.title)}</strong> — ${this.escapeHtml(c.description || '')}</li>`;
      });
      html += '</ul>';
    }

    const schemes = [...(pack.schemes || []), ...apiResources.map((r) => ({ title: r.title, url: r.url }))];
    const seen = new Set();
    const unique = schemes.filter((s) => {
      const key = s.url || s.phone || s.title;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    if (unique.length) {
      html += `<h4 class="learning-recap-sub">${window.i18n?.t('schemesAndHelplines') || 'Schemes & official helplines'}</h4>`;
      html += '<div class="learning-schemes">';
      unique.forEach((s) => {
        html += '<div class="learning-scheme-card">';
        if (s.url) {
          html += `<a href="${this.escapeHtml(s.url)}" target="_blank" rel="noopener" class="learning-scheme-link">${this.escapeHtml(s.title)}</a>`;
        } else {
          html += `<span class="learning-scheme-link">${this.escapeHtml(s.title)}</span>`;
        }
        if (s.phone) html += `<span class="learning-scheme-phone">📞 ${this.escapeHtml(s.phone)}</span>`;
        if (s.desc) html += `<p class="learning-scheme-desc">${this.escapeHtml(s.desc)}</p>`;
        html += '</div>';
      });
      html += '</div>';
    }

    html += `<p class="learning-recap-tip">${window.i18n?.t('learningTip') || 'Tip: Next time, type what you would really do — e.g. "I checked cybercrime.gov.in and reported it" — for maximum XP.'}</p>`;
    html += '</div>';
    return html;
  },

  escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
};
