/**
 * Story-driven adventure — replaces 3D walk-around with narrative chapters + puzzles.
 * Each mission is a visual story teaching time management & life skills.
 */
window.STORY_SCRIPTS = {
  /* ───────────── 1. THE UPI TRAP ───────────── */
  'otp-scam-alert': {
    title: 'The UPI Trap',
    tagline: 'Financial Fraud & Quick Action',
    hero: { name: 'Rahul', emoji: '📱' },
    mentor: { name: 'Life Guide', emoji: '🦉' },
    sceneTheme: 'study-night',
    clockStart: 1080,
    chapters: [
      {
        clueId: 'clue-urgency',
        puzzleId: 'clue-urgency',
        scene: '📱 Instagram DM — Evening in Bhubaneswar',
        lines: [
          { speaker: 'Narrator', text: 'You\'re a college student in Bhubaneswar. You tried paying for books online — the UPI transaction failed.' },
          { speaker: 'Narrator', text: 'A DM pops up on Instagram from "PhonePe_Support_Official" with a blue tick.' },
          { speaker: 'Rinku', text: '"Hi Rahul! We noticed your payment failed. Don\'t worry — share the OTP that just came to your phone. We\'ll process your instant refund of ₹1,299 right away!"' },
          { speaker: 'Rinku', text: '"The OTP expires in 5 minutes so please hurry. This is a verified customer care channel. 🙏"' },
          { speaker: 'Life Guide', text: '⚠️ Pause. Look at this carefully. An official app support team would NEVER ask for your OTP. What do you notice?' }
        ]
      },
      {
        clueId: 'clue-otp-rule',
        puzzleId: 'clue-otp-rule',
        scene: '🔐 OTP arrives on your phone',
        lines: [
          { speaker: 'Narrator', text: 'Your phone buzzes. An OTP from your bank: "Do NOT share this code with anyone. Valid for 5 minutes."' },
          { speaker: 'Rinku', text: '"Great, I can see the OTP has been sent! Just read out the 6-digit number and your ₹1,299 refund will be processed instantly. Many customers have already benefited today!"' },
          { speaker: 'Rinku', text: '"We are running a special refund drive — if you don\'t share within 3 minutes, the refund window closes permanently."' },
          { speaker: 'Life Guide', text: '🛑 STOP. The bank message itself says "Do NOT share." OTP authorizes real money transactions — anyone with it can empty your account. Fake urgency is the #1 scammer weapon.' }
        ]
      },
      {
        clueId: 'clue-verify',
        puzzleId: 'clue-verify',
        scene: '✅ What would you actually do?',
        lines: [
          { speaker: 'Narrator', text: 'You open your official UPI app. There\'s no failed transaction — the payment never went through. Your balance is exactly the same.' },
          { speaker: 'Narrator', text: 'You check the Instagram profile. It was created 2 days ago. 12 followers. No verified badge when you look closely — the "blue tick" was edited into the display picture.' },
          { speaker: 'Rinku', text: '"Sir, time is running out! Please send the OTP otherwise the refund will be cancelled and you will lose ₹1,299 forever!"' },
          { speaker: 'Life Guide', text: 'Now you see the full picture. No failed transaction. Fake profile. Manufactured urgency. If this happened in real life, call 1930 immediately — especially within 24 hours for the best chance of fund freeze.' }
        ]
      }
    ],
    epilogue: 'You blocked the scammer, reported the profile, and called 1930. Your money was never at risk because you paused and verified. In real life: call 1930 within 24 hours and report at cybercrime.gov.in.'
  },

  /* ───────────── 2. THE JOB OFFER DM ───────────── */
  'fake-job-offer': {
    title: 'The Job Offer DM',
    tagline: 'Phishing, Identity & Assertive Communication',
    hero: { name: 'Neha', emoji: '💼' },
    mentor: { name: 'Life Guide', emoji: '🦉' },
    sceneTheme: 'bedroom',
    clockStart: 960,
    chapters: [
      {
        clueId: 'clue-fee',
        puzzleId: 'clue-fee',
        scene: '💬 LinkedIn DM — Midnight',
        lines: [
          { speaker: 'Narrator', text: 'You\'re a final-year student looking for internships. A message arrives on LinkedIn from "Rajesh Kumar — HR Director, DataMax Solutions".' },
          { speaker: 'Recruiter', text: '"Hello Neha! Impressive profile. We have a work-from-home data entry position — ₹25,000/week, flexible hours. We\'re hiring urgently for our Bangalore office."' },
          { speaker: 'Recruiter', text: '"To secure your slot, pay a one-time registration fee of ₹999. This covers your ID card, training materials, and software access. Offer valid for 2 hours only."' },
          { speaker: 'Recruiter', text: '"We also need a photo of your Aadhaar card and PAN card for background verification. Please send within 30 minutes."' },
          { speaker: 'Life Guide', text: '⚠️ Red flags are piling up. ₹25,000/week for data entry? Upfront fee? Document requests? Let\'s investigate before you respond.' }
        ]
      },
      {
        clueId: 'clue-no-interview',
        puzzleId: 'clue-no-interview',
        scene: '🔍 Investigating DataMax Solutions',
        lines: [
          { speaker: 'Narrator', text: 'You Google "DataMax Solutions Bangalore." The company website was registered 11 days ago. The office address leads to a residential plot on Google Maps.' },
          { speaker: 'Narrator', text: 'LinkedIn shows zero employees at "DataMax." The recruiter\'s profile photo appears on 3 other "HR" accounts with different names.' },
          { speaker: 'Recruiter', text: '"Neha, we have 50+ employees working from home already. See these testimonials? [attaches screenshots]. Only 2 slots left. Pay now before they\'re gone!"' },
          { speaker: 'Life Guide', text: 'Screenshots of testimonials can be fabricated in minutes. No LinkedIn employees, no office, no interview — this is textbook recruitment fraud. Real companies on ncs.gov.in never do this.' }
        ]
      },
      {
        clueId: 'clue-domain',
        puzzleId: 'clue-domain',
        scene: '🎯 Assertive Response',
        lines: [
          { speaker: 'Narrator', text: 'You have all the evidence. The website is fake, the company doesn\'t exist, and they want your Aadhaar + ₹999. Time to respond like a pro.' },
          { speaker: 'Recruiter', text: '"Last chance, Neha. If you don\'t pay in 10 minutes, we\'ll offer your slot to the next candidate. Don\'t miss this life-changing opportunity!"' },
          { speaker: 'Life Guide', text: 'This is the final pressure play. In real life, you can: (1) Ask for an official company email from a @datamax.com domain — watch them fail, (2) Report the profile on LinkedIn and cybercrime.gov.in, (3) Tell a friend/mentor before making any decision under pressure.' }
        ]
      }
    ],
    epilogue: 'You refused, reported the profile on LinkedIn, and filed a complaint at cybercrime.gov.in. Red flags to remember: upfront fees, personal document requests, non-official emails, and no interview. Real jobs are on ncs.gov.in.'
  },

  /* ───────────── 3. THE WRONG TRANSFER ───────────── */
  'upi-fraud-request': {
    title: 'The Wrong Transfer',
    tagline: 'Money & Minutes',
    hero: { name: 'Priya', emoji: '☕' },
    mentor: { name: 'Life Guide', emoji: '🦉' },
    sceneTheme: 'cafe',
    clockStart: 840,
    chapters: [
      {
        clueId: 'clue-balance',
        puzzleId: 'clue-balance',
        scene: '☕ Café — assignment deadline in 2 hours',
        lines: [
          { speaker: 'Stranger', text: '"Hi! I accidentally sent ₹15,000 to your UPI ID! Please check — screenshot attached. I\'m begging you, send it back NOW!"' },
          { speaker: 'Narrator', text: 'A WhatsApp message from an unknown number. Attached: a screenshot showing a "successful" UPI transfer to your ID.' },
          { speaker: 'Priya', text: 'Wait — ₹15,000? Let me check my actual UPI app before reacting…' },
          { speaker: 'Life Guide', text: 'Smart instinct. Screenshots can be edited in seconds with free apps. Your actual bank/UPI app balance is the ONLY truth.' }
        ]
      },
      {
        clueId: 'clue-upi-rule',
        puzzleId: 'clue-upi-rule',
        scene: '📲 Your actual UPI app',
        lines: [
          { speaker: 'Narrator', text: 'You open your official UPI app. Your balance is unchanged. No incoming transfer of ₹15,000. The transaction history shows nothing new.' },
          { speaker: 'Stranger', text: '"Please check again! Maybe it takes time to reflect? My mother needs medicine tonight — I\'m desperate! Send to this UPI ID: fraudster@pay — it\'s my other account."' },
          { speaker: 'Life Guide', text: 'The balance didn\'t change — the screenshot is fake. And they want you to send money to a DIFFERENT UPI ID? Real wrong transfers are reversed through the bank, not by you sending money elsewhere.' }
        ]
      },
      {
        clueId: 'clue-pressure',
        puzzleId: 'clue-pressure',
        scene: '⏰ Assignment timer ticking',
        lines: [
          { speaker: 'Stranger', text: '"You\'re stealing my mother\'s medicine money! I\'ll file a police complaint against YOU if you don\'t send it back in 5 minutes!"' },
          { speaker: 'Narrator', text: 'The stranger is now threatening you with police action to create panic.' },
          { speaker: 'Life Guide', text: 'Guilt + threats + urgency = classic emotional manipulation. If someone truly sent money to the wrong UPI, the CORRECT process is through their bank\'s dispute channel — not WhatsApp pressure. Report this at sachet.rbi.org.in.' }
        ]
      }
    ],
    epilogue: 'You filed a UPI dispute through your bank app, blocked the stranger, and reported the scam at cybercrime.gov.in / 1930. Your assignment got finished on time. Never refund to a new UPI ID — use your bank\'s dispute system.'
  },

  /* ───────────── 4. THE GROUP CHAT STORM ───────────── */
  'cyberbullying-response': {
    title: 'The Group Chat Storm',
    tagline: 'Courage on a Clock',
    hero: { name: 'Arjun', emoji: '💜' },
    mentor: { name: 'Life Guide', emoji: '🦉' },
    sceneTheme: 'classroom',
    clockStart: 900,
    chapters: [
      {
        clueId: 'clue-evidence',
        puzzleId: 'clue-evidence',
        scene: '📱 Group chat exploding',
        lines: [
          { speaker: 'Narrator', text: 'Your class WhatsApp group is blowing up. Someone is sharing embarrassing edited photos of your friend Ananya. 200 messages in 10 minutes.' },
          { speaker: 'Arjun', text: 'This is getting out of hand. People are laughing and forwarding. Ananya must be devastated.' },
          { speaker: 'Life Guide', text: 'Before you do anything — document first. Screenshots preserve evidence before bullies delete messages. This helps schools and cybercrime.gov.in.' }
        ]
      },
      {
        clueId: 'clue-support',
        puzzleId: 'clue-support',
        scene: '💬 Private message to victim',
        lines: [
          { speaker: 'Arjun', text: 'Should I fight back in the group chat? Or message Ananya privately?' },
          { speaker: 'Narrator', text: 'You see Ananya\'s status change to "Don\'t want to go to school tomorrow."' },
          { speaker: 'Life Guide', text: 'Public fights often make bullying worse and embarrass the victim more. Private support shows real courage. Message Ananya: "I\'m here for you. This isn\'t okay."' }
        ]
      },
      {
        clueId: 'clue-report',
        puzzleId: 'clue-report',
        scene: '🏫 Tomorrow\'s action plan',
        lines: [
          { speaker: 'Narrator', text: 'Ananya replies: "Thank you. No one else said anything. I thought everyone was laughing at me."' },
          { speaker: 'Arjun', text: 'I need to tell someone who can actually help. And save the evidence in case it gets serious.' },
          { speaker: 'Life Guide', text: 'Plan your next 24 hours: (1) Save all screenshots, (2) Support Ananya privately, (3) Tell a trusted teacher or counselor, (4) For serious cases, report at cybercrime.gov.in. Childline: 1098 for children in distress.' }
        ]
      }
    ],
    epilogue: 'You saved the evidence, supported Ananya privately, and told your school counselor the next day. The bullying stopped within a week. Remember: document first, support privately, report serious cases at cybercrime.gov.in.'
  },

  /* ───────────── 5. FAKE SCHOLARSHIP PORTAL ───────────── */
  'scholarship-scam': {
    title: 'The Scholarship Race',
    tagline: 'Deadlines & Deception',
    hero: { name: 'Meera', emoji: '🎓' },
    mentor: { name: 'Life Guide', emoji: '🦉' },
    sceneTheme: 'library',
    clockStart: 720,
    chapters: [
      {
        clueId: 'clue-domain',
        puzzleId: 'clue-domain',
        scene: '🌐 Fake scholarship portal',
        lines: [
          { speaker: 'Narrator', text: 'NSP scholarship deadline is tomorrow. A Google ad shows "National Scholarship India 2026 — Apply Now!" The site looks professional with a tricolor header.' },
          { speaker: 'Meera', text: 'The URL is scholarship-gov-india.org. Is this the same as scholarships.gov.in?' },
          { speaker: 'Life Guide', text: 'Look carefully — .org is NOT .gov.in. Government services in India use .gov.in or .nic.in. Anything else is potentially fake.' }
        ]
      },
      {
        clueId: 'clue-fee',
        puzzleId: 'clue-fee',
        scene: '💳 Payment form countdown',
        lines: [
          { speaker: 'Website', text: '"Pay ₹500 processing fee within 15 minutes to secure your scholarship seat! 847 students have already applied today."' },
          { speaker: 'Narrator', text: 'A countdown timer shows 14:32. Your debit card details form is ready to fill.' },
          { speaker: 'Life Guide', text: 'Countdown timers + "847 students already applied" = manufactured urgency. Government scholarships NEVER charge processing fees. The real NSP is 100% free.' }
        ]
      },
      {
        clueId: 'clue-nsp',
        puzzleId: 'clue-nsp',
        scene: '✅ Official NSP portal',
        lines: [
          { speaker: 'Narrator', text: 'You navigate to scholarships.gov.in directly. The official portal has no fee, no countdown, and lists all available schemes clearly.' },
          { speaker: 'Meera', text: 'The real portal is so much simpler. I almost paid ₹500 AND shared my card details with scammers.' },
          { speaker: 'Life Guide', text: 'Logical verification saves hours of regret. Official NSP: scholarships.gov.in. Find more schemes on myscheme.gov.in. Report fake portals at cybercrime.gov.in.' }
        ]
      }
    ],
    epilogue: 'You applied on the real NSP (scholarships.gov.in) and reported the fake portal. Government scholarships are always free — never pay a "processing fee." Check myscheme.gov.in for legitimate schemes.'
  }
};

window.StoryEngine = {
  chapterIndex: 0,
  lineIndex: 0,
  onClueSolved: null,
  awaitingDecision: false,
  chatHistory: [],
  playerTurns: 0,
  isSending: false,
  interactiveMode: false,

  getScript(slug) {
    const base = window.STORY_SCRIPTS[slug] || window.STORY_SCRIPTS['otp-scam-alert'];
    return window.StoryI18n?.apply(base, slug) || base;
  },

  cleanSceneTitle(title) {
    return (title || '').replace(/^(\p{Extended_Pictographic}|\p{Emoji_Presentation})+\s*/u, '').trim();
  },

  getSpeakerMeta(speaker) {
    const hero = this.script?.hero?.name;
    const t = (k, fb) => window.i18n?.t(k) || fb;
    if (speaker === 'Life Guide') return { role: 'guide', initials: 'LG', label: t('lifeGuide', 'Life Guide') };
    if (speaker === 'Narrator') return { role: 'narrator', initials: '···', label: t('storyLabel', 'Story') };
    if (speaker === hero) return { role: 'hero', initials: hero.slice(0, 2).toUpperCase(), label: hero };
    return { role: 'other', initials: speaker.slice(0, 2).toUpperCase(), label: speaker };
  },

  mount(slug) {
    this._slug = slug;
    this.awaitingDecision = false;
    this.script = this.getScript(slug);
    this.chapterIndex = 0;
    this.lineIndex = 0;
    this.chatHistory = [];
    this.playerTurns = 0;
    this.interactiveMode = false;
    this._currentChapterHadChat = false;
    this.minutesLeft = this.script.clockStart || 720;

    window.SessionScore?.reset(slug);

    const vp = document.getElementById('story-viewport');
    const world = document.getElementById('world-container');
    if (vp) vp.className = `story-viewport theme-${this.script.sceneTheme || 'default'}`;
    if (world) world.classList.add('hidden');
    document.getElementById('screen-game')?.classList.add('story-mode');
    document.getElementById('controls-hint')?.classList.add('hidden');
    document.getElementById('interact-hint')?.classList.add('hidden');
    document.getElementById('clue-hud')?.classList.add('hidden');

    const thread = document.getElementById('story-thread');
    if (thread) thread.innerHTML = '';

    this.startChapter();
    this.syncEvidenceBar();
  },

  unmount() {
    const vp = document.getElementById('story-viewport');
    if (vp) vp.className = 'story-viewport hidden';
    document.getElementById('screen-game')?.classList.remove('story-mode');
    document.getElementById('clue-hud')?.classList.remove('hidden');
    this.setComposerMode('hidden');
  },

  setComposerMode(mode) {
    const chatForm = document.getElementById('story-chat-form');
    const puzzleBtn = document.getElementById('story-puzzle-btn');
    const advanceBtn = document.getElementById('story-advance');
    const backBtn = document.getElementById('story-back');
    const chatInput = document.getElementById('story-chat-input');

    chatForm?.classList.toggle('hidden', mode !== 'chat');
    puzzleBtn?.classList.toggle('hidden', mode !== 'chat');
    advanceBtn?.classList.toggle('hidden', mode !== 'decision');
    backBtn?.classList.add('hidden');

    if (mode === 'chat') {
      puzzleBtn?.classList.toggle('pulse-btn', this.playerTurns >= 1);
      chatInput?.focus();
    }
    if (mode === 'decision') {
      advanceBtn.textContent = window.i18n?.t('makeDecision') || 'Make Final Decision';
      advanceBtn.classList.remove('hidden');
    }
  },

  startChapter() {
    this.lineIndex = 0;
    this.playerTurns = 0;
    this.interactiveMode = false;
    const thread = document.getElementById('story-thread');
    if (thread) thread.innerHTML = '';

    this.renderChapterHeader();
    this.appendChapterDivider();
    const lines = this.script.chapters[this.chapterIndex]?.lines || [];
    lines.forEach((line) => this.appendMessage(line, false));

    this.interactiveMode = true;
    this.setComposerMode('chat');
    this.appendSystemHint(window.i18n?.t('chatYourMove') || 'Type your response — handle this situation yourself.');
  },

  appendSystemHint(text) {
    const thread = document.getElementById('story-thread');
    if (!thread) return;
    const row = document.createElement('div');
    row.className = 'story-system-hint';
    row.textContent = text;
    thread.appendChild(row);
    thread.scrollTop = thread.scrollHeight;
  },

  appendPlayerMessage(text) {
    const hero = this.script?.hero?.name || 'You';
    this.appendMessage({ speaker: hero, text }, true);
    this.chatHistory.push({ role: 'player', speaker: hero, text });
    this.playerTurns += 1;
    this.minutesLeft = Math.max(0, this.minutesLeft - 5);
    this.renderChapterHeader();
  },

  async handlePlayerChat(text) {
    if (!text.trim() || this.isSending || this.awaitingDecision || !this.interactiveMode) return;
    this.isSending = true;
    const input = document.getElementById('story-chat-input');
    const sendBtn = document.getElementById('story-chat-send');
    if (input) input.disabled = true;
    if (sendBtn) sendBtn.disabled = true;

    this.appendPlayerMessage(text.trim());
    window.SessionScore?.recordPlayerMessage(text.trim());
    if (input) input.value = '';

    const ch = this.script.chapters[this.chapterIndex];
    try {
      const reply = await window.ChatAgent.reply({
        slug: this._slug,
        playerMessage: text.trim(),
        chapter: ch,
        script: this.script,
        chatHistory: this.chatHistory
      });
      await this.delay(reply.source === 'gemini' ? 400 : 700);
      this.appendMessage({ speaker: reply.speaker || 'Life Guide', text: reply.text }, true);
      this.chatHistory.push({ role: 'npc', speaker: reply.speaker, text: reply.text });
    } catch {
      this.appendMessage({
        speaker: 'Life Guide',
        text: window.i18n?.t('chatFallback') || 'Take a breath. Solve the puzzle below to unlock the safest action and official helplines.'
      }, true);
    }

    document.getElementById('story-puzzle-btn')?.classList.add('pulse-btn');
    if (input) input.disabled = false;
    if (sendBtn) sendBtn.disabled = false;
    input?.focus();
    this.isSending = false;
  },

  delay(ms) {
    return new Promise((r) => setTimeout(r, ms));
  },

  appendResourceLinks(resources) {
    if (!resources?.length) return;
    const thread = document.getElementById('story-thread');
    if (!thread) return;
    const box = document.createElement('div');
    box.className = 'story-resource-box';
    const label = window.i18n?.t('officialHelp') || 'Official help';
    box.innerHTML = `<span class="story-resource-label">${this.escapeHtml(label)}</span>`;
    resources.forEach((r) => {
      const item = document.createElement('div');
      item.className = 'story-resource-item';
      if (r.url) {
        item.innerHTML = `<a href="${this.escapeHtml(r.url)}" target="_blank" rel="noopener">${this.escapeHtml(r.title)}</a>`;
      } else {
        item.textContent = `${r.title}${r.phone ? ` — ${r.phone}` : ''}`;
      }
      box.appendChild(item);
    });
    thread.appendChild(box);
    thread.scrollTop = thread.scrollHeight;
  },

  syncEvidenceBar() {
    const bar = document.getElementById('story-evidence-bar');
    const chips = document.querySelectorAll('#clue-chips .clue-chip');
    if (!bar) return;
    if (!chips.length) {
      bar.innerHTML = '';
      bar.classList.add('hidden');
      return;
    }
    bar.classList.remove('hidden');
    const done = Array.from(chips).filter(c => c.classList.contains('done')).length;
    const evLabel = window.i18n?.t('evidence') || 'Evidence';
    bar.innerHTML = `
      <span class="story-evidence-label">${evLabel} ${done}/${chips.length}</span>
      ${Array.from(chips).map(c => `<span class="story-evidence-chip${c.classList.contains('done') ? ' done' : ''}">${c.textContent}</span>`).join('')}
    `;
  },

  renderChapterHeader() {
    const ch = this.script.chapters[this.chapterIndex];
    const el = document.getElementById('story-scene-title');
    const prog = document.getElementById('story-chapter-progress');
    const clock = document.getElementById('story-clock');
    if (el) el.textContent = this.cleanSceneTitle(ch?.scene);
    if (prog) {
      const t = (k, fb) => window.StoryI18n?.tUi(k, fb) || fb;
      prog.textContent = `${t('chapterOf', 'Chapter')} ${this.chapterIndex + 1} ${t('of', 'of')} ${this.script.chapters.length}`;
    }
    if (clock) {
      const h = Math.floor(this.minutesLeft / 60);
      const m = this.minutesLeft % 60;
      clock.textContent = `${h}h ${String(m).padStart(2, '0')}m ${window.StoryI18n?.tUi('timeLeft', 'left tonight')}`;
    }
  },

  appendChapterDivider() {
    const ch = this.script.chapters[this.chapterIndex];
    const thread = document.getElementById('story-thread');
    if (!thread || !ch) return;
    const div = document.createElement('div');
    div.className = 'story-chapter-divider';
    const chLabel = window.i18n?.t('chapterOf') || 'Chapter';
    div.innerHTML = `<span>${chLabel} ${this.chapterIndex + 1}</span><span>${this.cleanSceneTitle(ch.scene)}</span>`;
    thread.appendChild(div);
    thread.scrollTop = thread.scrollHeight;
  },

  appendMessage(line, animate = true) {
    const thread = document.getElementById('story-thread');
    if (!thread || !line) return;

    const meta = this.getSpeakerMeta(line.speaker);
    const row = document.createElement('div');
    row.className = `story-bubble-row ${meta.role}${animate ? ' story-bubble-enter' : ''}`;

    if (meta.role === 'narrator') {
      row.innerHTML = `<div class="story-bubble narrator"><p>${this.escapeHtml(line.text)}</p></div>`;
    } else {
      row.innerHTML = `
        <div class="story-bubble-avatar" aria-hidden="true">${meta.initials}</div>
        <div class="story-bubble-wrap">
          <span class="story-bubble-name">${this.escapeHtml(meta.label)}</span>
          <div class="story-bubble ${meta.role}"><p>${this.escapeHtml(line.text)}</p></div>
        </div>
      `;
    }

    thread.appendChild(row);
    thread.scrollTop = thread.scrollHeight;
  },

  escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  },

  rebuildThread() {
    const thread = document.getElementById('story-thread');
    if (!thread) return;
    thread.innerHTML = '';
    this.appendChapterDivider();
    const lines = this.script.chapters[this.chapterIndex]?.lines || [];
    for (let i = 0; i <= this.lineIndex; i++) {
      this.appendMessage(lines[i], i === this.lineIndex);
    }
  },

  appendCurrentLine(animate = true) {
    const lines = this.script.chapters[this.chapterIndex]?.lines || [];
    if (this.lineIndex === 0) this.appendChapterDivider();
    this.appendMessage(lines[this.lineIndex], animate);
  },

  updateNavButtons() {
    this.setComposerMode(this.awaitingDecision ? 'decision' : 'chat');
  },

  async offerPuzzle() {
    if (this.awaitingDecision || !this.interactiveMode) return;
    const ch = this.script.chapters[this.chapterIndex];
    this.setComposerMode('hidden');
    await this.startChapterPuzzle(ch);
  },

  async startChapterPuzzle(ch) {
    window.SessionScore?.recordChapterPuzzle(this.chapterIndex, this.playerTurns > 0);
    const puzzleId = ch.puzzleId || ch.clueId;
    const puzzle = window.CLUE_PUZZLES?.[puzzleId];
    const solved = await window.PuzzleEngine.run(puzzleId);
    if (!solved) {
      this.setComposerMode('chat');
      return;
    }
    if (puzzle?.resources?.length) {
      this.appendResourceLinks(puzzle.resources);
    }
    if (typeof this.onClueSolved === 'function') {
      await this.onClueSolved(ch.clueId);
    }
    this.syncEvidenceBar();
    this.chapterIndex += 1;
    this.chatHistory = [];
    if (this.chapterIndex >= this.script.chapters.length) {
      this.showEpilogue();
      return;
    }
    this.startChapter();
  },

  showEpilogue() {
    this.awaitingDecision = true;
    this.interactiveMode = false;
    const thread = document.getElementById('story-thread');
    const t = (k, fb) => window.i18n?.t(k) || fb;
    const meta = { role: 'guide', initials: 'LG', label: t('lifeGuide', 'Life Guide') };
    const row = document.createElement('div');
    row.className = 'story-bubble-row guide story-bubble-enter';
    row.innerHTML = `
      <div class="story-bubble-avatar" aria-hidden="true">${meta.initials}</div>
      <div class="story-bubble-wrap">
        <span class="story-bubble-name">${t('chapterComplete', 'Chapter complete')}</span>
        <div class="story-bubble guide"><p>${this.escapeHtml(this.script.epilogue || t('storyCompleteSub', 'Story complete!'))}</p></div>
      </div>
    `;
    thread?.appendChild(row);
    if (thread) thread.scrollTop = thread.scrollHeight;
    this.setComposerMode('decision');
  },

  finishStory() {
    if (!this.awaitingDecision) return;
    this.awaitingDecision = false;
    this.unmount();
    if (typeof this.onStoryComplete === 'function') this.onStoryComplete();
  },

  reloadLocale() {
    if (!this.script) return;
    const currentSlug = this._slug || 'otp-scam-alert';
    this.script = this.getScript(currentSlug);
    this.renderChapterHeader();
    this.syncEvidenceBar();
    this.setComposerMode(this.awaitingDecision ? 'decision' : 'chat');
  }
};

document.getElementById('story-advance')?.addEventListener('click', () => {
  if (window.StoryEngine?.awaitingDecision) window.StoryEngine.finishStory();
});

document.getElementById('story-puzzle-btn')?.addEventListener('click', () => {
  window.StoryEngine?.offerPuzzle();
});

document.getElementById('story-chat-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('story-chat-input');
  const text = input?.value?.trim();
  if (text) window.StoryEngine?.handlePlayerChat(text);
});
