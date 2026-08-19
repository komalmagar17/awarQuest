/**
 * API base URL detection.
 * - On Vercel (awarquest.vercel.app): route to the deployed backend (Railway).
 *   Set BACKEND_URL in Vercel environment variables to your Railway URL.
 *   Fallback: hardcode the known Railway URL if env var is missing.
 * - On localhost: use the current origin (dev server).
 */
const API_BASE = (function () {
  const host = window.location.hostname;
  // Vercel deployment — route API to the backend server
  if (host.includes('vercel.app') || host.includes('awarquest')) {
    // Override this via Vercel env var or replace the string below with your Railway URL
    return window.__BACKEND_URL__ || 'https://awarquest-api.up.railway.app';
  }
  // Local development — API runs on same origin
  return window.location.origin;
})();

/* ── Full scenario data for offline / guest mode ── */
const MOCK_SCENARIOS = {
  'otp-scam-alert': {
    id: 1, slug: 'otp-scam-alert', title: 'The UPI Trap', skill: 'Digital Safety',
    summary: 'A "customer care" scam targets your UPI after a failed payment.',
    difficulty: 'Easy', skillTags: ['digital_safety'],
    clues: [
      { id: 'clue-urgency', title: 'Pressure Tactic' },
      { id: 'clue-otp-rule', title: 'OTP Danger' },
      { id: 'clue-verify', title: 'Official Verification' }
    ],
    options: [
      { id: 'opt-report', text: 'Report on cybercrime.gov.in and call 1930', stars: 3, outcome: 'Best choice! You reported the scam within the golden hour. Filing within 24 hours gives the best chance of freezing the fraudster\'s account. Follow @cyberdost for ongoing safety tips.' },
      { id: 'opt-bank', text: 'Call the bank using the number on my debit card', stars: 2, outcome: 'Good move — you verified through official channels. Your bank confirmed no freeze exists. Consider also reporting on cybercrime.gov.in to help others.' },
      { id: 'opt-ignore', text: 'Ignore it and move on', stars: 1, outcome: 'You\'re safe, but the scammer is still active. Reporting on cybercrime.gov.in or calling 1930 helps protect others from falling victim.' }
    ],
    learningObjectives: [
      'Never share OTP — it authorizes real money transactions',
      'Fake urgency ("10 minutes!") is the #1 scam pressure tactic',
      'Call 1930 within 24 hours for financial cyber fraud in India',
      'Report at https://cybercrime.gov.in — the National Cyber Crime Reporting Portal',
      'Follow @cyberdost (Indian Cyber Crime Coordination Centre) for safety tips'
    ]
  },
  'fake-job-offer': {
    id: 2, slug: 'fake-job-offer', title: 'The Job Offer DM', skill: 'Career Smarts',
    summary: 'A "work-from-home" offer with ₹25k/week — but asks for registration fees and your Aadhaar.',
    difficulty: 'Medium', skillTags: ['career_smarts'],
    clues: [
      { id: 'clue-fee', title: 'Upfront Fee Red Flag' },
      { id: 'clue-no-interview', title: 'No Interview Suspicion' },
      { id: 'clue-domain', title: 'Fake Company Website' }
    ],
    options: [
      { id: 'opt-report', text: 'Report the profile and warn others via cybercrime.gov.in', stars: 3, outcome: 'Excellent! You set boundaries, reported the scam, and protected others. Red flags: upfront fees, document requests, non-official emails.' },
      { id: 'opt-verify', text: 'Verify on ncs.gov.in and find real opportunities', stars: 2, outcome: 'Smart — you checked the National Career Service portal. Real jobs never ask for registration fees upfront.' },
      { id: 'opt-ignore', text: 'Just ignore the DM', stars: 1, outcome: 'You didn\'t fall for it, but reporting helps take down scam profiles. Consider filing on cybercrime.gov.in.' }
    ],
    learningObjectives: [
      'Real employers never charge registration or security deposit fees',
      'No interview + upfront fee = recruitment scam',
      'Verify companies on ncs.gov.in, MCA records, LinkedIn, Glassdoor',
      'Red flags: Gmail/WhatsApp HR contacts, domain created last week, no office',
      'Report fake job scams at cybercrime.gov.in and call 1930'
    ]
  },
  'upi-fraud-request': {
    id: 3, slug: 'upi-fraud-request', title: 'The "Wrong Transfer" Trick', skill: 'Money Skills',
    summary: 'A stranger claims they sent you ₹15,000 by mistake and pressures you to send it back.',
    difficulty: 'Medium', skillTags: ['money_skills'],
    clues: [
      { id: 'clue-balance', title: 'Balance Check' },
      { id: 'clue-upi-rule', title: 'Real UPI Dispute Process' },
      { id: 'clue-pressure', title: 'Emotional Manipulation' }
    ],
    options: [
      { id: 'opt-dispute', text: 'Raise a dispute in my UPI/bank app — let the bank handle it', stars: 3, outcome: 'Perfect! Wrong transfers are reversed through official bank channels. If money was truly received, the bank handles reversal — not WhatsApp pressure.' },
      { id: 'opt-report', text: 'Report to cybercrime.gov.in and call 1930', stars: 2, outcome: 'Good — you reported the scam. Also raise a dispute in your UPI app to document the fraudulent request.' },
      { id: 'opt-send', text: 'Send the money back to their new UPI ID', stars: 0, outcome: 'This was a scam. Screenshots can be edited in seconds. Never refund to a new UPI ID — use your bank app dispute system.' }
    ],
    learningObjectives: [
      'Screenshots can be faked — always check your actual UPI/bank app balance',
      'Wrong transfers are handled through bank dispute channels, not WhatsApp',
      'Never send money to a "new UPI ID" to reverse a transfer',
      'Emotional pressure ("my mother needs medicine") is a manipulation tactic',
      'Report UPI fraud at sachet.rbi.org.in and cybercrime.gov.in'
    ]
  },
  'cyberbullying-response': {
    id: 4, slug: 'cyberbullying-response', title: 'Stand Up Safely Online', skill: 'Empathy & Safety',
    summary: 'Cyberbullying is happening in your group chat. How do you respond?',
    difficulty: 'Hard', skillTags: ['empathy_safety'],
    clues: [
      { id: 'clue-evidence', title: 'Screenshot Evidence' },
      { id: 'clue-support', title: 'Private Support' },
      { id: 'clue-report', title: 'Report Channels' }
    ],
    options: [
      { id: 'opt-full', text: 'Screenshot evidence, support victim privately, tell a trusted adult', stars: 3, outcome: 'Best approach! You documented evidence, supported the victim privately, and involved a trusted adult. For serious cases, report at cybercrime.gov.in.' },
      { id: 'opt-support', text: 'Message the victim privately to show support', stars: 2, outcome: 'Good — private support matters. Also save screenshots and consider telling a trusted adult or counselor.' },
      { id: 'opt-fight', text: 'Call out the bullies publicly in the group', stars: 1, outcome: 'Standing up is brave, but public confrontation often escalates bullying and embarrasses the victim further.' }
    ],
    learningObjectives: [
      'Screenshot evidence before bullies delete messages',
      'Private support is more effective than public confrontation',
      'Tell a trusted teacher, counselor, or parent about serious bullying',
      'Call Childline 1098 for children in distress',
      'Report serious cyberbullying at cybercrime.gov.in'
    ]
  },
  'scholarship-scam': {
    id: 5, slug: 'scholarship-scam', title: 'Fake Scholarship Portal', skill: 'Education Guard',
    summary: 'A flashy scholarship site charges ₹500 processing fee. Is it real?',
    difficulty: 'Hard', skillTags: ['education_guard'],
    clues: [
      { id: 'clue-domain', title: 'Domain Verification' },
      { id: 'clue-fee', title: 'Processing Fee Red Flag' },
      { id: 'clue-nsp', title: 'Official NSP Portal' }
    ],
    options: [
      { id: 'opt-nsp', text: 'Apply on the real NSP at scholarships.gov.in', stars: 3, outcome: 'Correct! The National Scholarship Portal (scholarships.gov.in) is free. Also check myscheme.gov.in for other government schemes.' },
      { id: 'opt-report', text: 'Report the fake portal on cybercrime.gov.in', stars: 2, outcome: 'Good — reporting helps take down fake portals. The real NSP is scholarships.gov.in with zero fees.' },
      { id: 'opt-pay', text: 'Pay ₹500 before the deadline expires', stars: 0, outcome: 'This was a scam. Government scholarships never charge processing fees. The official portal is scholarships.gov.in.' }
    ],
    learningObjectives: [
      'Official National Scholarship Portal: scholarships.gov.in (.gov.in domains only)',
      'Government scholarships never charge processing or registration fees',
      'Fake sites use countdown timers and urgency to pressure you',
      'Find legitimate schemes on myscheme.gov.in',
      'Report fake scholarship portals at cybercrime.gov.in'
    ]
  }
};

const MOCK_MISSIONS = [
  { id: 1, slug: 'otp-scam-alert', title: 'The UPI Trap', skill: 'Digital Safety', summary: 'A "customer care" scam targets your UPI after a failed payment.', description: 'A "customer care" scam targets your UPI after a failed payment.', difficulty: 'Easy', order: 1, skillTags: ['digital_safety'] },
  { id: 2, slug: 'fake-job-offer', title: 'The Job Offer DM', skill: 'Career Smarts', summary: 'A "work-from-home" offer with ₹25k/week — but asks for registration fees.', description: 'A "work-from-home" offer with ₹25k/week — but asks for registration fees.', difficulty: 'Medium', order: 2, skillTags: ['career_smarts'] },
  { id: 3, slug: 'upi-fraud-request', title: 'The "Wrong Transfer" Trick', skill: 'Money Skills', summary: 'A stranger claims they sent you ₹15,000 by mistake.', description: 'A stranger claims they sent you ₹15,000 by mistake.', difficulty: 'Medium', order: 3, skillTags: ['money_skills'] },
  { id: 4, slug: 'cyberbullying-response', title: 'Stand Up Safely Online', skill: 'Empathy & Safety', summary: 'Cyberbullying is happening in your group chat.', description: 'Cyberbullying is happening in your group chat.', difficulty: 'Hard', order: 4, skillTags: ['empathy_safety'] },
  { id: 5, slug: 'scholarship-scam', title: 'Fake Scholarship Portal', skill: 'Education Guard', summary: 'A flashy scholarship site charges ₹500 processing fee.', description: 'A flashy scholarship site charges ₹500 processing fee.', difficulty: 'Hard', order: 5, skillTags: ['education_guard'] }
];

/* ── In-memory guest game state ── */
const _mockState = { sessions: {}, progress: [] };

function _getMockSession(sessionId) {
  return _mockState.sessions[sessionId] || null;
}

class GameAPI {
  constructor() {
    try {
      this.token = localStorage.getItem('accessToken') || '';
      const userData = localStorage.getItem('user');
      this.user = userData && userData !== 'undefined' ? JSON.parse(userData) : null;
    } catch (e) {
      console.warn('Auth state recovery failed:', e);
      this.token = '';
      this.user = null;
    }
  }

  setAuth(token, user) {
    this.token = token;
    this.user = user;
    localStorage.setItem('accessToken', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  clearAuth() {
    this.token = '';
    this.user = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  }

  async request(path, options = {}) {
    // Guest mode always uses mock data (works on Vercel static hosting)
    if (localStorage.getItem('guestMode') === 'true') {
      return this.mockRequest(path, options);
    }

    // Non-guest: try real backend; fall back to mock if unreachable (e.g. no backend deployed)
    const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
    if (this.token) headers.Authorization = `Bearer ${this.token}`;

    let res;
    try {
      res = await fetch(`${API_BASE}${path}`, { ...options, headers, credentials: 'include' });
    } catch {
      // If backend is unreachable (no Railway deployed, localhost without docker), fall back to mock
      console.warn(`[API] Backend unreachable at ${API_BASE}, falling back to mock data.`);
      return this.mockRequest(path, options);
    }

    const data = await res.json().catch(() => ({}));

    if (res.status === 401 && this.token) {
      this.clearAuth();
      throw new Error('Session expired. Please log in again.');
    }

    if (!res.ok) {
      const msg = data.error?.message || data.message || `Request failed (${res.status})`;
      const err = new Error(msg);
      err.code = data.error?.code;
      err.status = res.status;
      throw err;
    }
    return data;
  }

  register(username, email, password, ageGroup = '18-24') {
    return this.request('/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password, ageGroup })
    });
  }

  async login(identifier, password) {
    return this.request('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({ identifier, password })
    });
  }

  async guestLogin() {
    localStorage.setItem('guestMode', 'true');
    try {
      const data = await this.request('/api/v1/auth/guest', { method: 'POST', body: '{}' });
      this.setAuth(data.accessToken, data.user);
      return data;
    } catch (e) {
      const mockData = {
        accessToken: 'mock_guest_token',
        user: { id: 'guest_' + Date.now(), username: 'Guest Hero', isGuest: true }
      };
      this.setAuth(mockData.accessToken, mockData.user);
      return mockData;
    }
  }

  mockRequest(path, options) {
    console.log(`[Mock API] ${options.method || 'GET'} ${path}`);

    if (path === '/api/v1/auth/guest') {
      return Promise.resolve({ accessToken: 'mock_token', user: { username: 'Guest Hero', isGuest: true } });
    }

    if (path === '/api/v1/game/challenges') {
      return Promise.resolve({ data: MOCK_MISSIONS });
    }

    if (path.startsWith('/api/v1/resources/')) {
      const idOrSlug = path.split('/').pop();
      const mission = MOCK_MISSIONS.find(m => String(m.id) === idOrSlug || m.slug === idOrSlug);
      const slug = mission?.slug || idOrSlug;
      const resources = {
        'otp-scam-alert': [
          { title: 'National Cyber Crime Portal', url: 'https://cybercrime.gov.in/' },
          { title: 'Cyber Crime Helpline (24×7)', url: 'tel:1930' },
          { title: '@cyberdost — Official Tips', url: 'https://twitter.com/cyberdost' }
        ],
        'fake-job-offer': [
          { title: 'National Career Service', url: 'https://www.ncs.gov.in/' },
          { title: 'Report Cyber Job Scams', url: 'https://cybercrime.gov.in/' },
          { title: 'myScheme — Government Schemes', url: 'https://www.myscheme.gov.in/' }
        ],
        'upi-fraud-request': [
          { title: 'RBI Sachet Portal — Report Fraud', url: 'https://sachet.rbi.org.in/' },
          { title: 'Cyber Crime Helpline', url: 'tel:1930' }
        ],
        'scholarship-scam': [
          { title: 'National Scholarship Portal', url: 'https://scholarships.gov.in/' },
          { title: 'myScheme', url: 'https://www.myscheme.gov.in/' }
        ],
        'cyberbullying-response': [
          { title: 'Childline India', url: 'https://www.childlineindia.org.in/' },
          { title: 'Cyber Crime Portal', url: 'https://cybercrime.gov.in/' }
        ]
      };
      return Promise.resolve({ data: resources[slug] || [] });
    }

    if (path === '/api/v1/game/start') {
      const body = JSON.parse(options.body || '{}');
      const scenarioId = body.scenarioId;
      const mission = MOCK_MISSIONS.find(m => m.id === scenarioId);
      const slug = mission?.slug || 'otp-scam-alert';
      const scenario = MOCK_SCENARIOS[slug];
      const sessionId = 'mock_session_' + Date.now();

      _mockState.sessions[sessionId] = {
        scenarioSlug: slug,
        collectedClueIds: [],
        selectedOptionId: null,
        phase: 'presentation',
        score: 0,
        stars: 0,
        outcome: ''
      };

      return Promise.resolve({
        data: {
          sessionId,
          challenge: JSON.parse(JSON.stringify(scenario)),
          state: { phase: 'presentation', collectedClueIds: [], selectedOptionId: null, score: 0, stars: 0, outcome: '' }
        }
      });
    }

    if (path === '/api/v1/game/action') {
      const body = JSON.parse(options.body || '{}');
      const session = _getMockSession(body.sessionId);

      if (!session) {
        return Promise.resolve({ data: { status: 'success' } });
      }

      if (body.type === 'collect_clue') {
        if (!session.collectedClueIds.includes(body.clueId)) {
          session.collectedClueIds.push(body.clueId);
        }
        const scenario = MOCK_SCENARIOS[session.scenarioSlug];
        const clue = scenario?.clues?.find(c => c.id === body.clueId);
        return Promise.resolve({
          data: {
            state: { ...session },
            revealedClue: {
              id: body.clueId,
              title: clue?.title || 'Evidence',
              description: `✓ ${clue?.title || 'Evidence'} secured. Keep investigating!`
            }
          }
        });
      }

      if (body.type === 'choose_option') {
        const scenario = MOCK_SCENARIOS[session.scenarioSlug];
        const option = scenario?.options?.find(o => o.id === body.optionId);
        session.selectedOptionId = body.optionId;
        session.phase = 'reveal';
        session.stars = option?.stars || 1;
        session.score = (option?.stars || 1) * 100;
        session.outcome = option?.outcome || 'Decision recorded.';
        return Promise.resolve({ data: { state: { ...session } } });
      }

      if (body.type === 'complete') {
        session.phase = 'completed';
        return Promise.resolve({ data: { status: 'success' } });
      }

      return Promise.resolve({ data: { status: 'success' } });
    }

    if (path === '/api/v1/game/chat') {
      return Promise.resolve({ data: { message: 'Keep investigating the clues and solve each chapter puzzle.' } });
    }

    if (path === '/api/v1/progress/') {
      return Promise.resolve({ data: _mockState.progress });
    }

    if (path === '/api/v1/progress/submit') {
      const body = JSON.parse(options.body || '{}');
      const session = _getMockSession(body.sessionId);
      const stars = session?.stars || 0;
      const existing = _mockState.progress.find(p => p.scenarioId === body.scenarioId);
      if (existing) {
        existing.bestStars = Math.max(existing.bestStars, stars);
      } else {
        _mockState.progress.push({ scenarioId: body.scenarioId, status: 'completed', bestStars: stars });
      }
      return Promise.resolve({ data: { status: 'saved' } });
    }

    if (path === '/api/v1/scores/summary') {
      const completed = _mockState.progress.filter(p => p.status === 'completed');
      return Promise.resolve({
        data: {
          completedCount: completed.length,
          totalStars: completed.reduce((s, p) => s + (p.bestStars || 0), 0),
          totalXp: completed.length * 300,
          missionsCompleted: completed.length,
          missionsTotal: MOCK_MISSIONS.length,
          winReady: completed.length >= MOCK_MISSIONS.length
        }
      });
    }

    return Promise.resolve({ data: {} });
  }

  verifyOtp(otpSessionId, code) {
    return this.request('/api/v1/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ otpSessionId, code })
    }).then((data) => {
      this.setAuth(data.accessToken, data.user);
      return data;
    });
  }

  resendOtp(otpSessionId) {
    return this.request('/api/v1/auth/resend-otp', {
      method: 'POST',
      body: JSON.stringify({ otpSessionId })
    });
  }

  completeAuth(data) {
    this.setAuth(data.accessToken, data.user);
    return data;
  }

  async logout() {
    try {
      await this.request('/api/v1/auth/logout', { method: 'POST' });
    } finally {
      this.clearAuth();
    }
  }

  getChallenges() {
    return this.request('/api/v1/game/challenges');
  }

  getScoreSummary() {
    return this.request('/api/v1/scores/summary');
  }

  startGame(scenarioId) {
    return this.request('/api/v1/game/start', {
      method: 'POST',
      body: JSON.stringify({ scenarioId })
    });
  }

  gameAction(sessionId, type, extra = {}) {
    return this.request('/api/v1/game/action', {
      method: 'POST',
      body: JSON.stringify({ sessionId, type, ...extra })
    });
  }

  chat(sessionId, message) {
    return this.request('/api/v1/game/chat', {
      method: 'POST',
      body: JSON.stringify({ sessionId, message })
    });
  }

  getResources(scenarioId) {
    return this.request(`/api/v1/resources/${scenarioId}`);
  }

  submitProgress(payload) {
    return this.request('/api/v1/progress/submit', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  getProgress() {
    return this.request('/api/v1/progress/');
  }
}

window.api = new GameAPI();
