/**
 * Real-world skill puzzles — each clue unlocks only after solving a mini-challenge
 * that teaches how scams and safety issues work in practice.
 */
window.MISSION_WORLDS = {
  'otp-scam-alert': {
    theme: 'home-office',
    floorColor: 0x243044,
    wallColor: 0x1a2332,
    accent: 0x3b82f6,
    spawn: { x: 0, z: 3.5 },
    objects: [
      { id: 'phone', get label() { return window.i18n?.t('worldPhone') || 'Ringing Phone'; }, clueId: 'clue-urgency', x: -2.2, z: -0.8, color: 0xef4444, shape: 'phone' },
      { id: 'sms', get label() { return window.i18n?.t('worldSmsInbox') || 'SMS Inbox'; }, clueId: 'clue-otp-rule', x: 0, z: -1.5, color: 0x22c55e, shape: 'tablet' },
      { id: 'bank-app', get label() { return window.i18n?.t('worldBankApp') || 'Official Bank App'; }, clueId: 'clue-verify', x: 2.2, z: -0.8, color: 0x3b82f6, shape: 'laptop' }
    ]
  },
  'fake-job-offer': {
    theme: 'bedroom-desk',
    floorColor: 0x2a2035,
    wallColor: 0x1e1528,
    accent: 0xa855f7,
    spawn: { x: 0, z: 3.5 },
    objects: [
      { id: 'whatsapp', get label() { return window.i18n?.t('worldWhatsapp') || 'WhatsApp Message'; }, clueId: 'clue-fee', x: -1.5, z: -1, color: 0x25d366, shape: 'phone' },
      { id: 'company-site', get label() { return window.i18n?.t('worldCompanySite') || 'Company Website'; }, clueId: 'clue-no-interview', x: 1.5, z: -1, color: 0xf59e0b, shape: 'laptop' },
      { id: 'verify-desk', get label() { return window.i18n?.t('worldVerifyDesk') || 'Government Portal'; }, clueId: 'clue-domain', x: 0, z: -2.2, color: 0x3b82f6, shape: 'tablet' }
    ]
  },
  'upi-fraud-request': {
    theme: 'cafe-table',
    floorColor: 0x3d2e1f,
    wallColor: 0x2a1f14,
    accent: 0xf97316,
    spawn: { x: 0, z: 3.5 },
    objects: [
      { id: 'screenshot', get label() { return window.i18n?.t('worldScreenshot') || 'Transfer Screenshot'; }, clueId: 'clue-balance', x: -2, z: -1, color: 0xef4444, shape: 'tablet' },
      { id: 'upi-app', get label() { return window.i18n?.t('worldUpiApp') || 'Your UPI App'; }, clueId: 'clue-upi-rule', x: 2, z: -1, color: 0x22c55e, shape: 'phone' },
      { id: 'message', get label() { return window.i18n?.t('worldStrangerMsg') || 'Stranger Message'; }, clueId: 'clue-pressure', x: 0, z: -2, color: 0xf59e0b, shape: 'phone' }
    ]
  },
  'scholarship-scam': {
    theme: 'study-room',
    floorColor: 0x1e3a2f,
    wallColor: 0x142820,
    accent: 0x10b981,
    spawn: { x: 0, z: 3.5 },
    objects: [
      { id: 'fake-site', get label() { return window.i18n?.t('worldScholarshipSite') || 'Scholarship Website'; }, clueId: 'clue-domain', x: -2, z: -1.2, color: 0xef4444, shape: 'laptop' },
      { id: 'fee-form', get label() { return window.i18n?.t('worldFeeForm') || 'Payment Form'; }, clueId: 'clue-fee', x: 0, z: -2, color: 0xf59e0b, shape: 'tablet' },
      { id: 'nsp', get label() { return window.i18n?.t('worldNsp') || 'Official NSP Portal'; }, clueId: 'clue-nsp', x: 2, z: -1.2, color: 0x22c55e, shape: 'laptop' }
    ]
  },
  'cyberbullying-response': {
    theme: 'classroom',
    floorColor: 0x2d3748,
    wallColor: 0x1a202c,
    accent: 0x6366f1,
    spawn: { x: 0, z: 3.5 },
    objects: [
      { id: 'group-chat', get label() { return window.i18n?.t('worldGroupChat') || 'Group Chat'; }, clueId: 'clue-evidence', x: -1.8, z: -1, color: 0xef4444, shape: 'phone' },
      { id: 'victim-dm', get label() { return window.i18n?.t('worldVictimDm') || 'Message Victim'; }, clueId: 'clue-support', x: 1.8, z: -1, color: 0x3b82f6, shape: 'phone' },
      { id: 'report-desk', get label() { return window.i18n?.t('worldReportDesk') || 'Report Desk'; }, clueId: 'clue-report', x: 0, z: -2.2, color: 0x22c55e, shape: 'tablet' }
    ]
  }
};

window.SKILL_LABELS = {
  digital_safety: { get name() { return window.i18n?.t('skillDigitalSafety') || 'Digital Safety'; }, icon: '🛡️', color: '#3b82f6' },
  career_awareness: { get name() { return window.i18n?.t('skillCareerSmarts') || 'Career Smarts'; }, icon: '💼', color: '#a855f7' },
  career_smarts: { get name() { return window.i18n?.t('skillCareerSmarts') || 'Career Smarts'; }, icon: '💼', color: '#a855f7' },
  financial_literacy: { get name() { return window.i18n?.t('skillMoneySkills') || 'Money Skills'; }, icon: '💰', color: '#f97316' },
  money_skills: { get name() { return window.i18n?.t('skillMoneySkills') || 'Money Skills'; }, icon: '💰', color: '#f97316' },
  education_awareness: { get name() { return window.i18n?.t('skillEducationGuard') || 'Education Guard'; }, icon: '🎓', color: '#10b981' },
  education_guard: { get name() { return window.i18n?.t('skillEducationGuard') || 'Education Guard'; }, icon: '🎓', color: '#10b981' },
  mental_health: { get name() { return window.i18n?.t('skillEmpathySafety') || 'Empathy & Safety'; }, icon: '💜', color: '#6366f1' },
  empathy_safety: { get name() { return window.i18n?.t('skillEmpathySafety') || 'Empathy & Safety'; }, icon: '💜', color: '#6366f1' }
};

window.CLUE_PUZZLES = {
  'clue-urgency': {
    title: 'Spot the Pressure Tactic',
    intro: 'Scammers create fake urgency so you act before thinking. Which message uses a pressure tactic?',
    type: 'pick-one',
    skillTip: 'Real banks give you time to verify. "Act in 10 minutes or lose everything" is a classic scam pattern.',
    options: [
      { text: '"Your account will be frozen in 10 minutes unless you share the OTP now."', correct: true },
      { text: '"Please visit your branch during business hours to update KYC."', correct: false },
      { text: '"Your statement is ready in the bank app."', correct: false }
    ]
  },
  'clue-otp-rule': {
    title: 'What Does OTP Really Do?',
    intro: 'Understanding OTP helps you protect your money in real life.',
    type: 'pick-one',
    skillTip: 'OTP = One-Time Password. It authorizes a transaction. Anyone with your OTP can move money.',
    options: [
      { text: 'It proves your identity to customer support', correct: false },
      { text: 'It authorizes a payment or login — sharing it gives access to your account', correct: true },
      { text: 'It is just for marketing verification', correct: false }
    ]
  },
  'clue-verify': {
    title: 'Verify Like a Pro',
    intro: 'Drag each situation to the correct real-world verification method.',
    type: 'match-pairs',
    skillTip: 'Always use the number on your card or your official bank app — never the number a caller gives you.',
    pairs: [
      { item: 'Suspicious bank call', match: 'Call number on your debit card' },
      { item: 'Strange SMS link', match: 'Open official app directly' },
      { item: 'Email asking for password', match: 'Ignore — banks never ask' }
    ],
    choices: ['Call number on your debit card', 'Open official app directly', 'Ignore — banks never ask', 'Reply to the SMS']
  },
  'clue-fee': {
    title: 'Job Fee Red Flag',
    intro: 'Which request would a LEGITIMATE employer never make?',
    type: 'pick-one',
    skillTip: 'Employers pay you — you never pay them for a job offer, security deposit, or registration.',
    options: [
      { text: 'Pay ₹2,000 security deposit before joining', correct: true },
      { text: 'Attend an interview next week', correct: false },
      { text: 'Submit your resume and portfolio', correct: false }
    ]
  },
  'clue-no-interview': {
    title: 'Interview Reality Check',
    intro: 'Pick all the signs that this "instant hire" is suspicious.',
    type: 'pick-many',
    skillTip: 'Real companies interview candidates, verify backgrounds, and have a registered office.',
    minCorrect: 2,
    options: [
      { text: 'No interview required — start tomorrow', correct: true },
      { text: 'Salary 3× market rate for simple data entry', correct: true },
      { text: 'HR schedules a video call with your manager', correct: false },
      { text: 'Offer letter after background check', correct: false }
    ]
  },
  'clue-domain': {
    title: 'Spot the Fake Website',
    intro: 'Government services in India use official domains. Which URL is trustworthy?',
    type: 'pick-one',
    skillTip: 'Look for .gov.in or .nic.in — not .org, .com, or clever misspellings like "scholarship-gov-india.org".',
    options: [
      { text: 'scholarships.gov.in', correct: true },
      { text: 'scholarship-gov-india.org', correct: false },
      { text: 'pm-scholarship-india.com', correct: false }
    ]
  },
  'clue-nsp': {
    title: 'Official Portal Hunt',
    intro: 'Match each resource to whether it is an official government channel.',
    type: 'match-pairs',
    skillTip: 'The National Scholarship Portal is scholarships.gov.in — listed on IGOD government directory.',
    pairs: [
      { item: 'scholarships.gov.in', match: 'Official — safe to use' },
      { item: 'scholarship-gov-india.org', match: 'Fake — do not use' },
      { item: 'Asks for ₹500 processing fee', match: 'Fake — do not use' }
    ],
    choices: ['Official — safe to use', 'Fake — do not use', 'Needs more research', 'Share with friends']
  },
  'clue-balance': {
    title: 'Trust Your App, Not a Screenshot',
    intro: 'Someone shows a "successful transfer" screenshot. What do you check FIRST in real life?',
    type: 'pick-one',
    skillTip: 'Screenshots can be edited in seconds. Your actual bank/UPI app balance is the only truth.',
    options: [
      { text: 'Open your official UPI/bank app and check if money actually arrived', correct: true },
      { text: 'Zoom into the screenshot for the transaction ID', correct: false },
      { text: 'Send money back quickly because they seem desperate', correct: false }
    ]
  },
  'clue-pressure': {
    title: 'Emotional Manipulation',
    intro: 'Scammers use guilt and urgency. Which message is trying to manipulate your emotions?',
    type: 'pick-one',
    skillTip: '"My mother needs medicine" creates guilt so you send money without verifying. Real disputes go through the bank.',
    options: [
      { text: '"Please return ₹15,000 — my mother needs medicine tonight!"', correct: true },
      { text: '"Please raise a UPI dispute through your bank app."', correct: false },
      { text: '"Your bank statement is available for download."', correct: false }
    ]
  },
  'clue-upi-rule': {
    title: 'How Real UPI Mistakes Work',
    intro: 'If someone truly sent money to the wrong UPI ID, what is the correct process?',
    type: 'pick-one',
    skillTip: 'Mistaken transfers are reversed through bank/UPI dispute channels — never by sending money to a new number.',
    options: [
      { text: 'Raise a dispute in the UPI/bank app — the bank handles reversal', correct: true },
      { text: 'Send the money to a different UPI ID they provide', correct: false },
      { text: 'Share your UPI PIN so they can reverse it', correct: false }
    ]
  },
  'clue-evidence': {
    title: 'Document Before You Act',
    intro: 'Before reporting cyberbullying, what should you do first?',
    type: 'pick-one',
    skillTip: 'Screenshots preserve evidence before bullies delete messages. This helps schools and cybercrime.gov.in.',
    options: [
      { text: 'Screenshot the bullying messages before they get deleted', correct: true },
      { text: 'Publicly argue with the bullies in the group', correct: false },
      { text: 'Delete the chat to forget about it', correct: false }
    ]
  },
  'clue-support': {
    title: 'Support the Right Way',
    intro: 'How should you help someone being cyberbullied?',
    type: 'pick-one',
    skillTip: 'Reach out privately — public confrontation can escalate bullying and embarrass the victim further.',
    options: [
      { text: 'Message them privately to show support and ask if they are okay', correct: true },
      { text: 'Call out the bullies loudly in the group chat', correct: false },
      { text: 'Share the embarrassing photos to "show what happened"', correct: false }
    ]
  },
  'clue-report': {
    title: 'Report Channels',
    intro: 'Pick the correct combination for a serious cyberbullying case.',
    type: 'pick-many',
    skillTip: 'Trusted adults + official channels: teacher/counselor, and cybercrime.gov.in for serious cases.',
    minCorrect: 2,
    options: [
      { text: 'Tell a trusted teacher or school counselor', correct: true },
      { text: 'Report on cybercrime.gov.in for serious cases', correct: true },
      { text: 'Join in so you are not targeted next', correct: false },
      { text: 'Do nothing — it is not your problem', correct: false }
    ]
  },

  /* ── Hard timed challenges (5–10 min each) ── */
  'puzzle-hard-math': {
    title: 'Matiks Marathon — Time Under Pressure',
    type: 'math-marathon',
    timeLimitSec: 420,
    maxAttempts: 2,
    difficulty: 4,
    prompt: 'Solve ALL 5 problems correctly. Scammers exploit panic — clear math saves your evening.',
    skillTip: 'Plan study time: 2h revision + 30m dinner + sleep by 10 PM = safe schedule.',
    required: 5,
    problems: [
      { q: 'Exam in 14 hours. You planned 8h study. Scam call wastes 45 min. What % of study time is lost?', a: '9.4', accept: ['9.4', '9.375', '9.38', '9.3'] },
      { q: '12 × 17 + 8 = ?', a: '212', accept: ['212'] },
      { q: 'Series: 3, 9, 27, 81, ?', a: '243', accept: ['243'] },
      { q: 'If OTP has 6 digits, how many total combinations (0-9)?', a: '1000000', accept: ['1000000', '10^6', '1e6'] },
      { q: 'Study 6:00–8:00 PM (2h), dinner 30m, sleep 10 PM. How many minutes for light review before sleep?', a: '90', accept: ['90', '1.5h'] }
    ]
  },
  'puzzle-hard-sudoku-6': {
    title: 'Expert 6×6 Sudoku',
    type: 'sudoku-6',
    timeLimitSec: 480,
    maxAttempts: 2,
    difficulty: 4,
    skillTip: 'OTP authorizes payments. Never share — solve calmly like this grid.',
    solution: [
      [1,2,3,4,5,6],[4,5,6,1,2,3],[2,3,1,5,6,4],
      [5,6,4,2,3,1],[3,1,2,6,4,5],[6,4,5,3,1,2]
    ],
    givens: { '0,0': 1, '1,4': 2, '2,2': 1, '3,3': 2, '4,1': 1, '5,5': 2 }
  },
  'puzzle-hard-jigsaw-4': {
    title: '4×4 Slide Puzzle — CHECK YOUR APP',
    type: 'jigsaw-4x4',
    timeLimitSec: 420,
    maxAttempts: 2,
    difficulty: 4,
    prompt: 'Restore the message in the 4×4 grid. Screenshots lie — your bank app is truth.',
    skillTip: 'Verify balance in official app, never via WhatsApp screenshots.',
    size: 4,
    tiles: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0],
    solution: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0],
    labels: {
      1: 'C', 2: 'H', 3: 'E', 4: 'C', 5: 'K', 6: ' ', 7: 'Y', 8: 'O',
      9: 'U', 10: 'R', 11: ' ', 12: 'A', 13: 'P', 14: 'P', 15: '!'
    }
  },

  'puzzle-tm-schedule': {
    title: 'Plan Your Exam Eve',
    type: 'schedule-grid',
    maxAttempts: 3,
    difficulty: 2,
    prompt: 'Aisha\'s evening — drag tasks to the RIGHT time slots before the scam call wastes her night.',
    skillTip: 'Protect deep-study blocks. Never slot "answer scam call" — hang up and verify later.',
    tasks: [
      { id: 'study', label: 'Physics revision (2 hrs)' },
      { id: 'dinner', label: 'Dinner break (30 min)' },
      { id: 'scam', label: 'Answer scam caller' },
      { id: 'sleep', label: 'Sleep by 10 PM' }
    ],
    slots: [
      { id: 'evening', time: '6:00–8:00 PM', label: 'Deep work block' },
      { id: 'break', time: '8:00–8:30 PM', label: 'Break' },
      { id: 'wind', time: '8:30–9:30 PM', label: 'Light review + sleep prep' },
      { id: 'trap', time: '⛔ Trap zone', label: 'Never do this' }
    ],
    correct: { evening: 'study', break: 'dinner', wind: 'sleep', trap: 'scam' }
  },
  'puzzle-tm-sudoku': {
    title: 'Calm Mind Sudoku',
    type: 'sudoku-mini',
    skillTip: 'OTP = One-Time Password. It authorizes payments. Never share it — solve problems calmly first.',
    solution: [[1,2,3,4],[3,4,1,2],[2,1,4,3],[4,3,2,1]],
    givens: { '0,0': 1, '3,3': 4, '2,1': 4, '1,2': 1 },
    maxAttempts: 3,
    difficulty: 2
  },
  'puzzle-tm-logic': {
    title: 'UPSC-Style Deduction',
    type: 'logical-reasoning',
    maxAttempts: 2,
    difficulty: 3,
    timeLimitSec: 480,
    stem: 'Statement 1: The bank app shows no security alert.\nStatement 2: The caller claims the account is frozen.\nConclusion?',
    skillTip: 'Always trust verified apps over urgent phone calls.',
    resources: [
      { title: 'Cyber Crime Portal — cybercrime.gov.in', url: 'https://cybercrime.gov.in/' },
      { title: 'National Cyber Crime Helpline', phone: '1930' },
      { title: 'RBI Sachet — report fraud', url: 'https://sachet.rbi.org.in/' }
    ],
    options: [
      { text: 'The caller is likely a scammer — verify via official channels', correct: true },
      { text: 'The app must be broken — share OTP to fix it', correct: false },
      { text: 'Both sources are equally trustworthy', correct: false }
    ]
  },
  'puzzle-brain-ops-otp': {
    title: 'Operation Puzzle — Spot the Pattern',
    type: 'brain-ops',
    timeLimitSec: 420,
    maxAttempts: 3,
    difficulty: 3,
    prompt: 'Scammers rush you — calm down and fill BOTH operations to make the equation TRUE:',
    parts: ['3', '?', '7', '?', '2', '=', '12'],
    ops: ['+', '−', '×'],
    answers: ['+', '+'],
    skillTip: 'OTP = One-Time Password. Never share it. Report at cybercrime.gov.in or call 1930.',
    resources: [
      { title: 'Cyber Crime Portal', url: 'https://cybercrime.gov.in/' },
      { title: 'Helpline', phone: '1930' }
    ]
  },
  'puzzle-brain-ops-fee': {
    title: 'Fee Trap — Operation Puzzle',
    type: 'brain-ops',
    timeLimitSec: 420,
    maxAttempts: 3,
    difficulty: 3,
    prompt: 'Find the operations that make this equation true (think, don\'t guess formulas):',
    parts: ['2', '?', '4', '?', '3', '=', '24'],
    ops: ['+', '−', '×', '÷'],
    answers: ['×', '×'],
    skillTip: 'Real jobs on ncs.gov.in never charge registration fees upfront.',
    resources: [
      { title: 'National Career Service', url: 'https://www.ncs.gov.in/' },
      { title: 'myScheme — Govt schemes', url: 'https://www.myscheme.gov.in/' }
    ]
  },
  'puzzle-brain-ops-upi': {
    title: 'Balance Check — Operation Puzzle',
    type: 'brain-ops',
    timeLimitSec: 420,
    maxAttempts: 3,
    difficulty: 3,
    prompt: 'Fill operations to complete the equation (order matters left-to-right):',
    parts: ['10', '?', '2', '?', '3', '=', '16'],
    ops: ['+', '−', '×', '÷'],
    answers: ['+', '×'],
    skillTip: 'Wrong-transfer scams use fake screenshots. Dispute via your bank app.',
    resources: [
      { title: 'RBI Sachet Portal', url: 'https://sachet.rbi.org.in/' },
      { title: 'Cyber Crime Helpline', phone: '1930' }
    ]
  },
  'puzzle-brain-ops-edu': {
    title: 'Scholarship Countdown Puzzle',
    type: 'brain-ops',
    timeLimitSec: 420,
    maxAttempts: 3,
    difficulty: 3,
    prompt: 'Fake portals use countdown pressure. Solve this operation puzzle:',
    parts: ['4', '?', '5', '?', '2', '=', '18'],
    ops: ['+', '−', '×'],
    answers: ['×', '−'],
    skillTip: 'Official portal: scholarships.gov.in — zero processing fee.',
    resources: [
      { title: 'National Scholarship Portal', url: 'https://scholarships.gov.in/' },
      { title: 'myScheme', url: 'https://www.myscheme.gov.in/' }
    ]
  },
  'puzzle-brain-ops-cyber': {
    title: 'Support Steps — Operation Puzzle',
    type: 'brain-ops',
    timeLimitSec: 420,
    maxAttempts: 3,
    difficulty: 3,
    prompt: 'Plan your steps — which operations make this true?',
    parts: ['6', '?', '4', '?', '2', '=', '12'],
    ops: ['+', '−', '×', '÷'],
    answers: ['+', '+'],
    skillTip: 'Save evidence, support privately, tell a trusted adult. Childline: 1098.',
    resources: [
      { title: 'Cyber Crime Portal', url: 'https://cybercrime.gov.in/' },
      { title: 'Childline India', url: 'https://www.childlineindia.org.in/', phone: '1098' }
    ]
  },
  'puzzle-career-numbers': {
    title: 'SSC Number Series',
    type: 'number-series',
    display: '2, 6, 12, 20, 30, ?',
    answer: '42',
    prompt: 'Find the next number (pattern: +4, +6, +8, +10, +12)',
    skillTip: 'If a job offer rushes you to pay before you can think — it\'s a trap, not a pattern.'
  },
  'puzzle-career-logic': {
    title: 'Syllogism Check',
    type: 'logical-reasoning',
    stem: 'All legitimate employers conduct interviews.\nThis "employer" skips interviews and demands fees.\nTherefore?',
    skillTip: 'No interview + upfront fee = recruitment scam.',
    options: [
      { text: 'This offer is not from a legitimate employer', correct: true },
      { text: 'They must be a fast-growing startup', correct: false },
      { text: 'Fees are normal for all jobs', correct: false }
    ]
  },
  'puzzle-career-crossword': {
    title: 'Official Portal Crossword',
    type: 'crossword-fill',
    prompt: 'Fill the official terms:',
    skillTip: 'Verify on ncs.gov.in and MCA — never pay WhatsApp recruiters.',
    clues: [
      { hint: 'National Career Service domain suffix', answer: 'gov' },
      { hint: 'Employers never ask for this upfront', answer: 'fee' },
      { hint: 'Real jobs require this meeting', answer: 'interview' }
    ]
  },
  'puzzle-upi-jigsaw': {
    title: 'Reveal the Truth',
    type: 'jigsaw-slide',
    prompt: 'Slide tiles to read the message: CHECK YOUR APP',
    skillTip: 'Screenshots lie. Your real UPI balance is the truth.',
    tiles: [2, 1, 3, 4, 5, 6, 7, 0, 8],
    solution: [1, 2, 3, 4, 5, 6, 7, 8, 0],
    labels: { 1: 'C', 2: 'H', 3: 'E', 4: 'C', 5: 'K', 6: 'A', 7: 'P', 8: 'P' }
  },
  'puzzle-upi-logic': {
    title: 'Banking Logic',
    type: 'logical-reasoning',
    stem: 'If money was truly received, your bank app balance would increase.\nBalance unchanged + edited screenshot = ?',
    skillTip: 'Dispute through the bank app — never refund to a new UPI ID.',
    options: [
      { text: 'A refund scam — do not send money', correct: true },
      { text: 'Send money quickly to help them', correct: false },
      { text: 'Share UPI PIN to verify', correct: false }
    ]
  },
  'puzzle-upi-schedule': {
    title: 'Protect Your Deadline',
    type: 'schedule-grid',
    prompt: 'Priya has 2 hours for her assignment. Schedule wisely:',
    skillTip: 'Don\'t let strangers hijack your deadline with guilt trips.',
    tasks: [
      { id: 'assign', label: '📝 Finish assignment' },
      { id: 'verify', label: '🔍 Check UPI app (5 min)' },
      { id: 'reply', label: '💸 Send ₹15,000 back' },
      { id: 'report', label: '🚨 Report to bank' }
    ],
    slots: [
      { id: 'first', time: '0–15 min', label: 'First action' },
      { id: 'main', time: '15–105 min', label: 'Main block' },
      { id: 'last', time: 'Last 15 min', label: 'Wrap up' },
      { id: 'skip', time: 'Never', label: 'Do NOT do' }
    ],
    correct: { first: 'verify', main: 'assign', last: 'report', skip: 'reply' }
  },
  'puzzle-edu-crossword': {
    title: 'Scholarship Crossword',
    type: 'crossword-fill',
    prompt: 'Official scholarship vocabulary:',
    skillTip: 'Real portal: scholarships.gov.in',
    clues: [
      { hint: 'National Scholarship Portal abbreviation', answer: 'nsp' },
      { hint: 'Government sites end in .___ .in', answer: 'gov' },
      { hint: 'Fake portals ask for processing ___', answer: 'fee' }
    ]
  },
  'puzzle-edu-numbers': {
    title: 'Countdown Pattern',
    type: 'number-series',
    display: '15, 14, 12, 9, 5, ?',
    answer: '0',
    prompt: 'Fake countdown timer — what comes next?',
    skillTip: 'Artificial urgency counts DOWN your decision time. Step away.'
  },
  'puzzle-edu-logic': {
    title: 'Portal Logic',
    type: 'logical-reasoning',
    stem: 'All official Indian scholarship portals use .gov.in.\nThis site uses .org and charges fees.\nConclusion?',
    skillTip: 'scholarships.gov.in is the National Scholarship Portal.',
    options: [
      { text: 'This is a fake portal — use scholarships.gov.in', correct: true },
      { text: 'Pay quickly before deadline', correct: false },
      { text: '.org is the same as .gov.in', correct: false }
    ]
  },
  'puzzle-cyber-jigsaw': {
    title: 'Evidence Puzzle',
    type: 'jigsaw-slide',
    prompt: 'Arrange tiles: SCREENSHOT FIRST',
    skillTip: 'Save evidence before bullies delete messages.',
    tiles: [2, 1, 3, 4, 5, 0, 7, 8, 6],
    solution: [1, 2, 3, 4, 5, 6, 7, 8, 0],
    labels: { 1: 'S', 2: 'C', 3: 'R', 4: 'E', 5: 'E', 6: 'N', 7: 'S', 8: 'H' }
  },
  'puzzle-cyber-logic': {
    title: 'Support Logic',
    type: 'logical-reasoning',
    stem: 'Public confrontation may embarrass the victim and escalate bullying.\nPrivate support shows care without exposure.\nBest action?',
    skillTip: 'Message privately first. Offer to go with them to a trusted adult.',
    options: [
      { text: 'Private message offering support', correct: true },
      { text: 'Fight bullies in the group chat', correct: false },
      { text: 'Share the photos to "expose" bullies', correct: false }
    ]
  },
  'puzzle-cyber-schedule': {
    title: '24-Hour Action Plan',
    type: 'schedule-grid',
    prompt: 'Plan the next day — balance exams AND doing the right thing:',
    skillTip: 'Good time management includes standing up for others.',
    tasks: [
      { id: 'screenshot', label: '📸 Save evidence' },
      { id: 'support', label: '💬 Message victim privately' },
      { id: 'ignore', label: '🙈 Ignore everything' },
      { id: 'adult', label: '👩‍🏫 Tell trusted adult' }
    ],
    slots: [
      { id: 'now', time: 'Tonight', label: 'Immediate' },
      { id: 'morning', time: 'Tomorrow AM', label: 'Morning' },
      { id: 'exam', time: 'Exam day', label: 'Focus time' },
      { id: 'never', time: 'Skip', label: 'Never choose' }
    ],
    correct: { now: 'screenshot', morning: 'support', exam: 'adult', never: 'ignore' }
  }
};

/**
 * Renders and runs a puzzle overlay. Resolves when solved correctly.
 */
window.PuzzleEngine = {
  run(puzzleId) {
    const puzzle = window.CLUE_PUZZLES[puzzleId];
    if (!puzzle) return Promise.resolve(true);

    // Get translated puzzle content
    const locPuzzle = window.StoryI18n?.getCluePuzzle(puzzleId);
    const pTitle = locPuzzle?.title || puzzle.title;
    const pIntro = locPuzzle?.intro || puzzle.intro;
    const pSkillTip = locPuzzle?.skillTip || puzzle.skillTip;

    return new Promise((resolve) => {
      const overlay = document.createElement('div');
      overlay.className = 'puzzle-overlay';
      overlay.innerHTML = `
        <div class="puzzle-card puzzle-card-vivid">
          <div class="puzzle-header">
            <span class="puzzle-badge">${escapeHtml(window.i18n?.t('puzzleChallenge') || 'Challenge')}${puzzle.difficulty ? ` · Lv ${puzzle.difficulty}` : ''}</span>
            <h3>${escapeHtml(pTitle)}</h3>
            ${pIntro ? `<p class="puzzle-intro">${escapeHtml(pIntro)}</p>` : ''}
            <p class="puzzle-attempts" id="puzzle-attempts"></p>
            <p class="puzzle-timer" id="puzzle-timer"></p>
          </div>
          <div class="puzzle-body" id="puzzle-body"></div>
          <p class="puzzle-feedback hidden" id="puzzle-feedback"></p>
          <div class="puzzle-actions">
            <button type="button" class="btn ghost" id="puzzle-cancel">${escapeHtml(window.i18n?.t('puzzleBack') || 'Back to story')}</button>
            <button type="button" class="btn primary hidden pulse-btn" id="puzzle-continue">${escapeHtml(window.i18n?.t('puzzleCollect') || 'Collect Evidence')}</button>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);

      const body = overlay.querySelector('#puzzle-body');
      const feedback = overlay.querySelector('#puzzle-feedback');
      const continueBtn = overlay.querySelector('#puzzle-continue');
      const cancelBtn = overlay.querySelector('#puzzle-cancel');
      const attemptsEl = overlay.querySelector('#puzzle-attempts');
      let attemptsLeft = puzzle.maxAttempts ?? 3;

      function refreshAttempts() {
        if (!attemptsEl) return;
        const label = window.i18n?.t('puzzleAttempts') || 'Attempts left';
        attemptsEl.textContent = `${label}: ${attemptsLeft}`;
      }
      refreshAttempts();

      function useAttempt() {
        attemptsLeft -= 1;
        refreshAttempts();
        return attemptsLeft >= 0;
      }

      function onPuzzleFail(msg, tip) {
        if (!useAttempt()) {
          showFeedback(feedback, false, window.i18n?.t('puzzleOutOfAttempts') || 'Out of attempts — review the story hint and try again from Back.', pSkillTip);
          return false;
        }
        showFeedback(feedback, false, msg, tip);
        return true;
      }

      function cleanup(result) {
        if (timerId) clearInterval(timerId);
        overlay.remove();
        resolve(result);
      }

      let timerId = null;
      const timerEl = overlay.querySelector('#puzzle-timer');
      const limitSec = puzzle.timeLimitSec || 0;
      if (limitSec > 0 && timerEl) {
        let remaining = limitSec;
        const tick = () => {
          const m = Math.floor(remaining / 60);
          const s = remaining % 60;
          const label = window.i18n?.t('puzzleTime') || 'Time';
          timerEl.textContent = `${label}: ${m}:${String(s).padStart(2, '0')}`;
          timerEl.classList.toggle('urgent', remaining <= 60);
          if (remaining <= 0) {
            clearInterval(timerId);
            showFeedback(feedback, false, window.i18n?.t('puzzleTimeUp') || 'Time is up!', pSkillTip);
            setTimeout(() => cleanup(false), 1500);
          }
          remaining -= 1;
        };
        tick();
        timerId = setInterval(tick, 1000);
      } else if (timerEl) {
        timerEl.textContent = '';
      }

      cancelBtn.addEventListener('click', () => cleanup(false));

      if (puzzle.type === 'pick-one') {
        renderPickOne(body, puzzle, feedback, continueBtn, () => cleanup(true), onPuzzleFail);
      } else if (puzzle.type === 'pick-many') {
        renderPickMany(body, puzzle, feedback, continueBtn, () => cleanup(true), onPuzzleFail);
      } else if (puzzle.type === 'match-pairs') {
        renderMatchPairs(body, puzzle, feedback, continueBtn, () => cleanup(true), onPuzzleFail);
      } else if (window.PuzzleRenderers?.[puzzle.type]) {
        window.PuzzleRenderers[puzzle.type](body, puzzle, feedback, continueBtn, () => cleanup(true), onPuzzleFail);
      } else {
        cleanup(true);
      }
    });
  }
};

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function showFeedback(el, ok, msg, tip, resources) {
  el.classList.remove('hidden', 'ok', 'fail');
  el.classList.add(ok ? 'ok' : 'fail');
  let html = `${msg}${tip ? `<br><small class="skill-tip">💡 ${escapeHtml(tip)}</small>` : ''}`;
  if (resources?.length) {
    html += `<div class="puzzle-resources"><strong>${window.i18n?.t('officialHelp') || 'Official help:'}</strong><ul>`;
    resources.forEach((r) => {
      if (r.url) {
        html += `<li><a href="${escapeHtml(r.url)}" target="_blank" rel="noopener">${escapeHtml(r.title)}</a>${r.phone ? ` · ${escapeHtml(r.phone)}` : ''}</li>`;
      } else {
        html += `<li>${escapeHtml(r.title)}${r.phone ? ` — ${escapeHtml(r.phone)}` : ''}</li>`;
      }
    });
    html += '</ul></div>';
  }
  el.innerHTML = html;
}

function renderPickOne(body, puzzle, feedback, continueBtn, onSuccess, onFail) {
  puzzle.options.forEach((opt) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'puzzle-option';
    btn.textContent = opt.text;
    btn.addEventListener('click', () => {
      body.querySelectorAll('.puzzle-option').forEach(b => b.disabled = true);
      if (opt.correct) {
        showFeedback(feedback, true, window.i18n?.t('puzzleCorrectPickOne') || 'Correct! Real-world safety skill applied.', pSkillTip);
        continueBtn.classList.remove('hidden');
        continueBtn.onclick = onSuccess;
        window.RewardFX?.xpBurst(50, window.i18n?.t('puzzleSkillPoint') || 'Skill point');
        window.RewardFX?.confetti(16);
      } else {
        body.querySelectorAll('.puzzle-option').forEach(b => { b.disabled = false; });
        if (onFail) onFail(window.i18n?.t('puzzleWrongPickOne') || 'Not quite — think about what scammers actually do.', pSkillTip);
        else showFeedback(feedback, false, window.i18n?.t('puzzleWrongPickOne') || 'Not quite — think about what scammers actually do.', pSkillTip);
      }
    });
    body.appendChild(btn);
  });
}

function renderPickMany(body, puzzle, feedback, continueBtn, onSuccess) {
  const selected = new Set();
  puzzle.options.forEach((opt, i) => {
    const label = document.createElement('label');
    label.className = 'puzzle-check';
    label.innerHTML = `<input type="checkbox" data-idx="${i}"> <span>${escapeHtml(opt.text)}</span>`;
    body.appendChild(label);
  });
  const submit = document.createElement('button');
  submit.type = 'button';
  submit.className = 'btn primary puzzle-submit';
  submit.textContent = window.i18n?.t('puzzleCheckAnswer') || 'Check Answer';
  body.appendChild(submit);

  submit.addEventListener('click', () => {
    const checks = body.querySelectorAll('input[type=checkbox]');
    let correctCount = 0;
    let wrongSelected = false;
    checks.forEach((cb, i) => {
      const opt = puzzle.options[i];
      if (cb.checked && opt.correct) correctCount += 1;
      if (cb.checked && !opt.correct) wrongSelected = true;
    });
    const min = puzzle.minCorrect || 1;
    if (correctCount >= min && !wrongSelected) {
      checks.forEach(cb => { cb.disabled = true; });
      submit.disabled = true;
      const flagsMsg = (window.i18n?.t('puzzleSpottedFlags') || '✓ You spotted {count} real-world red flags!').replace('{count}', correctCount);
      showFeedback(feedback, true, flagsMsg, pSkillTip);
      continueBtn.classList.remove('hidden');
      continueBtn.onclick = onSuccess;
      window.dispatchEvent(new CustomEvent('game:xp', { detail: { amount: 75, label: window.i18n?.t('puzzleDetectiveBonus') || 'Detective bonus' } }));
    } else {
      const minMsg = (window.i18n?.t('puzzleFindMinCorrect') || 'Find at least {min} correct signs without picking safe/normal ones.').replace('{min}', min);
      showFeedback(feedback, false, minMsg, pSkillTip);
    }
  });
}

function renderMatchPairs(body, puzzle, feedback, continueBtn, onSuccess) {
  const assignments = {};
  puzzle.pairs.forEach((pair, i) => {
    const row = document.createElement('div');
    row.className = 'puzzle-match-row';
    row.innerHTML = `
      <span class="match-item">${escapeHtml(pair.item)}</span>
      <select data-pair="${i}">
        <option value="">${window.i18n?.t('puzzleChoose') || 'Choose…'}</option>
        ${puzzle.choices.map(c => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('')}
      </select>
    `;
    body.appendChild(row);
  });
  const submit = document.createElement('button');
  submit.type = 'button';
  submit.className = 'btn primary puzzle-submit';
  submit.textContent = window.i18n?.t('puzzleVerifyMatches') || 'Verify Matches';
  body.appendChild(submit);

  submit.addEventListener('click', () => {
    let allCorrect = true;
    body.querySelectorAll('select').forEach((sel, i) => {
      if (sel.value !== puzzle.pairs[i].match) allCorrect = false;
    });
    if (allCorrect) {
      body.querySelectorAll('select').forEach(s => { s.disabled = true; });
      submit.disabled = true;
      showFeedback(feedback, true, window.i18n?.t('puzzlePerfectMatch') || '✓ Perfect! You matched real-world verification steps.', pSkillTip);
      continueBtn.classList.remove('hidden');
      continueBtn.onclick = onSuccess;
      window.dispatchEvent(new CustomEvent('game:xp', { detail: { amount: 60, label: window.i18n?.t('puzzleAnalystBonus') || 'Analyst bonus' } }));
    } else {
      showFeedback(feedback, false, window.i18n?.t('puzzleSomeWrong') || 'Some matches are wrong — think about official vs unofficial channels.', pSkillTip);
    }
  });
}
