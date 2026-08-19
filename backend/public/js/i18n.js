/**
 * UI strings for all 22 official languages of India (+ English default).
 * Non-English locales inherit full Hindi strings, then apply language-specific overrides.
 */
window.INDIAN_LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'as', name: 'Assamese', native: 'অসমীয়া' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'brx', name: 'Bodo', native: 'बड़ो' },
  { code: 'doi', name: 'Dogri', native: 'डोगरी' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ks', name: 'Kashmiri', native: 'कॉशुर' },
  { code: 'kok', name: 'Konkani', native: 'कोंकणी' },
  { code: 'mai', name: 'Maithili', native: 'मैथिली' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'mni', name: 'Manipuri', native: 'মৈতৈলোন্' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'ne', name: 'Nepali', native: 'नेपाली' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'sa', name: 'Sanskrit', native: 'संस्कृतम्' },
  { code: 'sat', name: 'Santali', native: 'ᱥᱟᱱᱛᱟᱲᱤ' },
  { code: 'sd', name: 'Sindhi', native: 'سنڌي' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'ur', name: 'Urdu', native: 'اردو' }
];

const EN = {
  language: 'Language', searchLanguage: 'Search language...', continue: 'Continue', back: 'Back',
  solveChallenge: 'Solve Challenge', makeDecision: 'Make Final Decision', beginStory: 'Begin Story Adventure',
  lifeGuide: 'Life Guide', hintPlaceholder: 'Ask for a hint…', send: 'Send',
  finalDecision: 'Final Decision', decisionPrompt: 'You collected all evidence. What would you do in real life?',
  questResult: 'Quest Result', claimRewards: 'Claim Rewards & Level Up', evidence: 'Evidence',
  situationBrief: 'Situation Brief', goal: 'Goal', storyComplete: 'Story Complete!',
  storyCompleteSub: 'All chapters cleared — time for your real-world decision.',
  evidenceSecured: 'Evidence Secured!', levelComplete: 'Level Complete!',
  xpEarned: 'XP Earned', sessionTotal: 'Session Total', starsEarned: 'Stars',
  perfectQuest: 'Perfect Run — 3 Stars!', questCleared: 'Quest Cleared',
  puzzleChallenge: 'Challenge', puzzleAttempts: 'Attempts left', puzzleLocked: 'Lock My Answer',
  puzzleCollect: 'Collect Evidence', puzzleBack: 'Back to story',
  flowBriefing: 'Briefing', flowStory: 'Story', flowDecision: 'Decision', flowComplete: 'Complete',
  welcomeGuide: 'Welcome! Read each message, tap Continue, and solve chapter challenges.',
  chapterComplete: 'Chapter complete', verifiedResources: 'Verified Resources',
  quests: '← Quests', progress: 'Progress', logout: 'Logout',
  guestMode: 'Guest Mode', playGuest: 'Play as Guest — No Login', skillQuests: 'Skill Quests',
  allEvidence: 'All evidence collected! Make your real-world decision.',
  score: 'Score', chapterOf: 'Chapter', of: 'of', timeLeft: 'left tonight',
  puzzleTime: 'Time', puzzleTimeUp: 'Time is up! Review the hint and try again.',
  mathMarathon: 'Matiks Marathon', sudoku6: 'Expert 6×6 Sudoku', jigsaw4: '4×4 Slide Master',
  whatLearned: 'What you learned', storyLabel: 'Story', investigate: 'Investigate',
  defaultObjective: 'Read the story, solve timed puzzles chapter by chapter, then decide.',
  interactHint: 'or Click —', greatDetective: 'Great detective work! Now choose what you would actually do.',
  decisionReady: 'All evidence collected! Make your real-world decision →',
  storyModeHint: 'Story mode — read each message, solve timed puzzles, then decide.',
  chatPlaceholder: 'Type what you would say or do…', chatYourMove: 'Your turn — type how you would handle this situation.',
  chatFallback: 'Take a breath. Solve the puzzle to unlock the safest action and official helplines.',
  solveForSolution: 'Solve puzzle → unlock best action', officialHelp: 'Official help & helplines',
  aiSettingsTitle: 'Gemini AI — Live Chat Replies',
  aiSettingsHelp: 'Paste your free Google Gemini API key. NPCs will reply intelligently. Without a key, scripted replies still work.',
  aiKeyLabel: 'API Key', aiKeySave: 'Save Key', aiKeyClear: 'Remove Key',
  aiKeySaved: 'Gemini key saved — live AI replies enabled!',
  aiKeyRemoved: 'Key removed — using scripted replies.', aiKeyMissing: 'Enter your API key first.',
  mentorSub: 'Your mentor — ask when stuck',
  tierExpert: 'Expert — real actions & official resources (+ full XP)',
  tierStandard: 'Standard — chat & puzzle path (50% XP)',
  tierPuzzle: 'Puzzle shortcut — review schemes below (50% XP)',
  expertBonus: 'expert bonus', xpReduced: '50% XP',
  evidenceYouFound: 'Evidence you unlocked', schemesAndHelplines: 'Schemes & official helplines',
  learningTip: 'Tip: Type real actions — e.g. "I visited cybercrime.gov.in" — for full XP next time.',
  brandName: 'AwarQuest', brandTagline: 'Explore 3D scenarios, solve real-world puzzles, and level up skills you actually need',
  login: 'Login', register: 'Register', emailOrUsername: 'Email or Username', password: 'Password',
  username: 'Username', email: 'Email', enterAdventure: 'Enter the Adventure', or: 'or',
  guestNote: 'Try all 5 quests level-by-level. Login & email verification available when deployed.',
  createProfile: 'Create Hero Profile', createPasswordPlaceholder: 'Create a strong password',
  pwRuleLength: 'At least 8 characters', pwRuleLower: 'One lowercase letter', pwRuleUpper: 'One uppercase letter',
  pwRuleDigit: 'One number', pwRuleSpecial: 'One special character',
  otpMessage: 'Enter the 6-digit code sent to your email.', otpCodeLabel: 'Your verification code',
  copyCode: 'Copy code', otpDevNote: 'Email is not configured yet — use this code to continue.',
  verificationCode: 'Verification Code', verifyContinue: 'Verify & Continue',
  resendCode: 'Resend code', backToLogin: '← Back to login',
  welcomePlayer: 'Welcome, Player', questsDone: 'Quests Done', totalStars: 'Total Stars',
  skillXp: 'Skill XP', questsCount: 'Quests',
  winBanner: '🏆 Skill Master! You completed every quest with excellence — you\'re ready for real-world challenges!',
  missionIntro: 'Each quest is an interactive story with puzzles — Sudoku, logic, crosswords, jigsaw & time-planning challenges. Complete levels in order.',
  digitalSafety: 'Digital Safety', briefing: 'Briefing', scene: 'Scene', chapterProgress: 'Chapter 1 of 3',
  wasdMove: 'WASD move', mouseLook: 'Mouse look', clickToStart: 'Click scene to start',
  yourSkillJourney: 'Your Skill Journey', howToMaster: 'How to Master the Game',
  howStep1: 'Enter each 3D quest scene and explore with WASD',
  howStep2: 'Investigate objects — solve the skill puzzle to collect evidence',
  howStep3: 'Make the safest real-world decision (earn 3 stars)',
  howStep4: 'Chat with Life Guide when stuck',
  howStep5: 'Use Verified Resources to learn official help channels',
  day: 'Day', night: 'Night',
  phasePresentation: 'Briefing', phaseExploration: 'Investigation', phaseReveal: 'Decision Made', phaseCompleted: 'Complete',
  codeCopied: 'Code copied!', yourCodeIs: 'Your code is',
  passwordWeakError: 'Password must include uppercase, lowercase, a number, and a special character.',
  notRegistered: 'You are not registered. Please register.',
  createAccountHint: 'Create an account to start playing.',
  newCodeSent: 'New verification code sent.',
  systemInitError: 'System initialization incomplete. Please refresh.',
  guestModeReady: 'Guest mode — Quest 1 is ready. Complete each level to unlock the next.',
  welcomeGuestPlayer: 'Welcome, Guest Player — explore quest by quest',
  noQuestsAvailable: 'No quests available yet. Run the seed script on the server.',
  levelLabel: 'Level', difficultyLabel: 'Difficulty',
  completePrevFirst: 'Complete previous level first', completed: 'Completed', locked: 'Locked',
  questLabel: 'Quest', completeFirstToUnlock: 'Complete "{title}" first to unlock this level.',
  storyEngineLoading: 'Story engine loading…',
  noResourcesLinked: 'No verified resources linked.', resourcesUnavailable: 'Resources unavailable.',
  evidenceAlreadyCollected: 'Evidence already collected.',
  evidenceLoggedKeepGoing: 'Evidence logged. Keep going!',
  done: 'Done', notStarted: 'Not started',
  keepInvestigating: 'Keep investigating the glowing objects in the 3D scene.',
  exploreSceneSolvePuzzle: 'Explore the scene and solve each skill puzzle.',
  enterValidEmail: 'Please enter a valid email address.',
  enterEmailOrUsername: 'Please enter your email or username.',
  puzzleOutOfAttempts: 'Out of attempts — review the story hint and try again from Back.',
  puzzleCorrectPickOne: 'Correct! Real-world safety skill applied.',
  puzzleWrongPickOne: 'Not quite — think about what scammers actually do.',
  puzzleSkillPoint: 'Skill point',
  puzzleCheckAnswer: 'Check Answer',
  puzzleSpottedFlags: '✓ You spotted {count} real-world red flags!',
  puzzleDetectiveBonus: 'Detective bonus',
  puzzleFindMinCorrect: 'Find at least {min} correct signs without picking safe/normal ones.',
  puzzleVerifyMatches: 'Verify Matches',
  puzzlePerfectMatch: '✓ Perfect! You matched real-world verification steps.',
  puzzleAnalystBonus: 'Analyst bonus',
  puzzleSomeWrong: 'Some matches are wrong — think about official vs unofficial channels.',
  puzzleChoose: 'Choose…',
  skillDigitalSafety: 'Digital Safety', skillCareerSmarts: 'Career Smarts',
  skillMoneySkills: 'Money Skills', skillEducationGuard: 'Education Guard',
  skillEmpathySafety: 'Empathy & Safety',
  worldPhone: 'Ringing Phone', worldSmsInbox: 'SMS Inbox', worldBankApp: 'Official Bank App',
  worldWhatsapp: 'WhatsApp Message', worldCompanySite: 'Company Website', worldVerifyDesk: 'Government Portal',
  worldScreenshot: 'Transfer Screenshot', worldUpiApp: 'Your UPI App', worldStrangerMsg: 'Stranger Message',
  worldScholarshipSite: 'Scholarship Website', worldFeeForm: 'Payment Form', worldNsp: 'Official NSP Portal',
  worldGroupChat: 'Group Chat', worldVictimDm: 'Message Victim', worldReportDesk: 'Report Desk',
  takeawayOtp1: 'Banks never ask for OTPs on phone calls — OTP authorizes real payments.',
  takeawayOtp2: 'Fake urgency ("10 minutes or frozen") is a pressure tactic to stop you thinking.',
  takeawayOtp3: 'Always verify through your official bank app or the number on your debit card.',
  takeawayOtp4: 'Report fraud at the National Cyber Crime Portal or dial 1930.',
  takeawayJob1: 'Real employers never charge registration or security deposits.',
  takeawayJob2: 'Legitimate jobs require interviews — instant hiring is a red flag.',
  takeawayJob3: 'Verify companies on National Career Service (NCS) and MCA portal.',
  takeawayJob4: 'Never pay WhatsApp recruiters before verifying on official .gov.in sites.',
  takeawayUpi1: 'Screenshots of UPI transfers can be edited — check your real app balance.',
  takeawayUpi2: 'Never send money to a new UPI ID under pressure from strangers.',
  takeawayUpi3: 'Wrong-transfer disputes go through your bank app, not WhatsApp.',
  takeawayUpi4: 'Report UPI fraud at cybercrime.gov.in or call 1930.',
  takeawayScholar1: 'Official scholarships use scholarships.gov.in — never pay processing fees.',
  takeawayScholar2: 'Government sites end in .gov.in or .nic.in, not .org or .com.',
  takeawayScholar3: 'Artificial countdown timers are used to rush bad decisions.',
  takeawayScholar4: 'Find real schemes on myScheme and the National Scholarship Portal (NSP).',
  takeawayCyber1: 'Save screenshots of bullying before messages are deleted.',
  takeawayCyber2: 'Support victims privately first — public fights often make it worse.',
  takeawayCyber3: 'Tell a trusted teacher, counsellor, or parent for serious cases.',
  takeawayCyber4: 'Report serious cyberbullying at cybercrime.gov.in; Childline is 1098.',
  missionTitle1: 'Mission 1: The Exam Eve — OTP Scam',
  missionSummary1: 'Board exam tomorrow. A scam call threatens your account — and steals your study time. A time-management story.',
  missionTitle2: 'Mission 2: Too Good to Be True Job',
  missionSummary2: 'You receive a WhatsApp message offering a work-from-home job with instant payment — but they want a "registration fee" first.',
  missionTitle3: 'Mission 3: The "Wrong Transfer" Trick',
  missionSummary3: 'A stranger says they accidentally sent you ₹15,000 via UPI and asks you to send it back — but the SMS looks fake.',
  missionTitle4: 'Mission 4: Stand Up Safely Online',
  missionSummary4: 'A classmate is being targeted in a group chat with mean messages and edited photos. You witness it happening live.',
  missionTitle5: 'Mission 5: Fake Scholarship Portal',
  missionSummary5: 'A website promises a ₹50,000 government scholarship — but asks for your Aadhaar, bank details, and a "processing fee".',
  guestSudokuDone: 'Sudoku complete',
  guestPuzzleComplete: 'Puzzle Complete!',
  whatYoullLearn: 'What you\'ll learn',
  guestIntroTip: 'Tip: Solve each puzzle to unlock the next story chapter. Chat with Life Guide for bonus XP!',
  startAdventure: 'Start Adventure'
};

const HI = {
  ...EN, language: 'भाषा', searchLanguage: 'भाषा खोजें...', continue: 'आगे बढ़ें', back: 'वापस',
  solveChallenge: 'चुनौती हल करें', makeDecision: 'अंतिम निर्णय लें', beginStory: 'कहानी शुरू करें',
  lifeGuide: 'जीवन मार्गदर्शक', hintPlaceholder: 'संकेत पूछें…', send: 'भेजें',
  finalDecision: 'अंतिम निर्णय', decisionPrompt: 'आपने सभी साक्ष्य एकत्र किए। वास्तविक जीवन में आप क्या करेंगे?',
  questResult: 'क्वेस्ट परिणाम', claimRewards: 'इनाम लें और आगे बढ़ें', evidence: 'साक्ष्य',
  situationBrief: 'स्थिति संक्षिप्त', goal: 'लक्ष्य', storyComplete: 'कहानी पूर्ण!',
  storyCompleteSub: 'सभी अध्याय पूरे — अब वास्तविक निर्णय का समय।',
  evidenceSecured: 'साक्ष्य सुरक्षित!', levelComplete: 'स्तर पूरा!',
  xpEarned: 'XP मिला', sessionTotal: 'सत्र कुल', starsEarned: 'सितारे',
  perfectQuest: 'पूर्ण रन — 3 सितारे!', questCleared: 'क्वेस्ट पूरा',
  puzzleChallenge: 'चुनौती', puzzleAttempts: 'प्रयास शेष', puzzleLocked: 'मेरा उत्तर लॉक करें',
  puzzleCollect: 'साक्ष्य एकत्र करें', puzzleBack: 'कहानी पर वापस',
  flowBriefing: 'संक्षिप्त', flowStory: 'कहानी', flowDecision: 'निर्णय', flowComplete: 'पूर्ण',
  welcomeGuide: 'स्वागत है! संदेश पढ़ें, आगे बढ़ें दबाएँ, और समयबद्ध पहेलियाँ हल करें।',
  chapterComplete: 'अध्याय पूरा', verifiedResources: 'सत्यापित संसाधन',
  quests: '← क्वेस्ट', progress: 'प्रगति', logout: 'लॉग आउट',
  guestMode: 'अतिथि मोड', playGuest: 'बिना लॉगिन अतिथि के रूप में खेलें', skillQuests: 'कौशल क्वेस्ट',
  allEvidence: 'सभी साक्ष्य एकत्र! वास्तविक निर्णय लें।',
  score: 'स्कोर', chapterOf: 'अध्याय', of: 'में से', timeLeft: 'आज रात शेष',
  puzzleTime: 'समय', puzzleTimeUp: 'समय समाप्त! संकेत देखें और पुनः प्रयास करें।',
  mathMarathon: 'मैटिक्स मैराथन', sudoku6: 'विशेषज्ञ 6×6 सुडोकू', jigsaw4: '4×4 स्लाइड मास्टर',
  whatLearned: 'आपने क्या सीखा', storyLabel: 'कहानी', investigate: 'जांच करें',
  defaultObjective: 'कहानी पढ़ें, समयबद्ध पहेलियाँ हल करें, फिर निर्णय लें।',
  interactHint: 'या क्लिक —', greatDetective: 'शाबाश! अब चुनें कि वास्तव में क्या करेंगे।',
  decisionReady: 'सभी साक्ष्य एकत्र! अपना निर्णय लें →',
  storyModeHint: 'कहानी मोड — संदेश पढ़ें, चैट करें, पहेली हल करें, फिर निर्णय लें।',
  chatPlaceholder: 'आप क्या कहेंगे या करेंगे — लिखें…', chatYourMove: 'आपकी बारी — इस स्थिति में क्या करेंगे, लिखें।',
  chatFallback: 'शांत रहें। सबसे सुरक्षित कदम और हेल्पलाइन के लिए पहेली हल करें।',
  solveForSolution: 'पहेली हल करें → सही कदम जानें', officialHelp: 'आधिकारिक सहायता और हेल्पलाइन',
  aiSettingsTitle: 'Gemini AI — लाइव चैट जवाब',
  aiSettingsHelp: 'अपनी मुफ्त Google Gemini API key यहाँ चिपकाएँ। NPC intelligent जवाब देंगे।',
  aiKeyLabel: 'API Key', aiKeySave: 'Key सहेजें', aiKeyClear: 'Key हटाएँ',
  aiKeySaved: 'Gemini key सहेजी — live AI चालू!', aiKeyRemoved: 'Key हटाई — scripted जवाब।',
  aiKeyMissing: 'पहले API key दर्ज करें।', mentorSub: 'आपका मार्गदर्शक — अटकें तो पूछें',
  tierExpert: 'विशेषज्ञ — असली कार्य और आधिकारिक संसाधन (+ पूरा XP)',
  tierStandard: 'सामान्य — चैट और पहेली (50% XP)',
  tierPuzzle: 'पहेली शॉर्टकट — नीचे योजनाएँ देखें (50% XP)',
  expertBonus: 'विशेषज्ञ बोनस', xpReduced: '50% XP',
  evidenceYouFound: 'आपने जो साक्ष्य खोले', schemesAndHelplines: 'योजनाएँ और आधिकारिक हेल्पलाइन',
  learningTip: 'सुझाव: असली कदम लिखें — जैसे "मैंने cybercrime.gov.in पर रिपोर्ट की"।',
  brandName: 'AwarQuest', brandTagline: '3D परिदृश्यों का अन्वेषण करें, वास्तविक पहेलियाँ हल करें, और ज़रूरी कौशल सीखें',
  login: 'लॉग इन', register: 'रजिस्टर', emailOrUsername: 'ईमेल या उपयोगकर्ता नाम', password: 'पासवर्ड',
  username: 'उपयोगकर्ता नाम', email: 'ईमेल', enterAdventure: 'रोमांच में प्रवेश करें', or: 'या',
  guestNote: 'सभी 5 क्वेस्ट स्तर-दर-स्तर आज़माएँ। तैनात होने पर लॉगिन और ईमेल सत्यापन उपलब्ध।',
  createProfile: 'हीरो प्रोफ़ाइल बनाएँ', createPasswordPlaceholder: 'मज़बूत पासवर्ड बनाएँ',
  pwRuleLength: 'कम से कम 8 अक्षर', pwRuleLower: 'एक छोटा अक्षर', pwRuleUpper: 'एक बड़ा अक्षर',
  pwRuleDigit: 'एक संख्या', pwRuleSpecial: 'एक विशेष चिह्न',
  otpMessage: 'अपने ईमेल पर भेजा गया 6-अंकीय कोड दर्ज करें।', otpCodeLabel: 'आपका सत्यापन कोड',
  copyCode: 'कोड कॉपी करें', otpDevNote: 'ईमेल अभी कॉन्फ़िगर नहीं है — जारी रखने के लिए यह कोड उपयोग करें।',
  verificationCode: 'सत्यापन कोड', verifyContinue: 'सत्यापित करें और जारी रखें',
  resendCode: 'कोड पुनः भेजें', backToLogin: '← लॉगिन पर वापस',
  welcomePlayer: 'स्वागत है, खिलाड़ी', questsDone: 'क्वेस्ट पूर्ण', totalStars: 'कुल सितारे',
  skillXp: 'कौशल XP', questsCount: 'क्वेस्ट',
  winBanner: '🏆 कौशल मास्टर! आपने हर क्वेस्ट उत्कृष्टता से पूरा किया — आप वास्तविक चुनौतियों के लिए तैयार हैं!',
  missionIntro: 'हर क्वेस्ट पहेलियों के साथ एक इंटरैक्टिव कहानी है — सुडोकू, तर्क, क्रॉसवर्ड, जिगसॉ और समय-योजना चुनौतियाँ। स्तर क्रम से पूरे करें।',
  digitalSafety: 'डिजिटल सुरक्षा', briefing: 'संक्षिप्त', scene: 'दृश्य', chapterProgress: 'अध्याय 1 का 3',
  wasdMove: 'WASD चाल', mouseLook: 'माउस लुक', clickToStart: 'दृश्य शुरू करने के लिए क्लिक करें',
  yourSkillJourney: 'आपकी कौशल यात्रा', howToMaster: 'गेम में महारत कैसे प्राप्त करें',
  howStep1: 'प्रत्येक 3D क्वेस्ट दृश्य में प्रवेश करें और WASD से अन्वेषण करें',
  howStep2: 'वस्तुओं की जाँच करें — साक्ष्य एकत्र करने के लिए कौशल पहेली हल करें',
  howStep3: 'सबसे सुरक्षित वास्तविक निर्णय लें (3 सितारे अर्जित करें)',
  howStep4: 'अटकने पर जीवन मार्गदर्शक से बात करें',
  howStep5: 'आधिकारिक सहायता चैनल सीखने के लिए सत्यापित संसाधन उपयोग करें',
  day: 'दिन', night: 'रात',
  phasePresentation: 'संक्षिप्त', phaseExploration: 'जांच', phaseReveal: 'निर्णय लिया', phaseCompleted: 'पूर्ण',
  codeCopied: 'कोड कॉपी हो गया!', yourCodeIs: 'आपका कोड है',
  passwordWeakError: 'पासवर्ड में बड़ा अक्षर, छोटा अक्षर, संख्या और विशेष चिह्न होना चाहिए।',
  notRegistered: 'आप रजिस्टर नहीं हैं। कृपया रजिस्टर करें।',
  createAccountHint: 'खेलना शुरू करने के लिए अकाउंट बनाएँ।',
  newCodeSent: 'नया सत्यापन कोड भेजा गया।',
  systemInitError: 'सिस्टम इनिशियलाइज़ेशन अधूरा है। कृपया रिफ्रेश करें।',
  guestModeReady: 'अतिथि मोड — क्वेस्ट 1 तैयार है। अगला स्तर खोलने के लिए प्रत्येक स्तर पूरा करें।',
  welcomeGuestPlayer: 'स्वागत, अतिथि खिलाड़ी — क्वेस्ट दर क्वेस्ट अन्वेषण करें',
  noQuestsAvailable: 'अभी कोई क्वेस्ट उपलब्ध नहीं। सर्वर पर सीड स्क्रिप्ट चलाएँ।',
  levelLabel: 'स्तर', difficultyLabel: 'कठिनाई',
  completePrevFirst: 'पहले पिछला स्तर पूरा करें', completed: 'पूर्ण', locked: 'लॉक',
  questLabel: 'क्वेस्ट', completeFirstToUnlock: '"{title}" को पहले पूरा करें इस स्तर को खोलने के लिए।',
  storyEngineLoading: 'कहानी इंजन लोड हो रहा है…',
  noResourcesLinked: 'कोई सत्यापित संसाधन जुड़ा नहीं।', resourcesUnavailable: 'संसाधन अनुपलब्ध।',
  evidenceAlreadyCollected: 'साक्ष्य पहले से एकत्र।',
  evidenceLoggedKeepGoing: 'साक्ष्य दर्ज। जारी रखें!',
  done: 'पूर्ण', notStarted: 'शुरू नहीं',
  keepInvestigating: '3D दृश्य में चमकती वस्तुओं की जांच जारी रखें।',
  exploreSceneSolvePuzzle: 'दृश्य का अन्वेषण करें और प्रत्येक कौशल पहेली हल करें।',
  enterValidEmail: 'कृपया एक मान्य ईमेल पता दर्ज करें।',
  enterEmailOrUsername: 'कृपया अपना ईमेल या उपयोगकर्ता नाम दर्ज करें।',
  puzzleOutOfAttempts: 'प्रयास समाप्त — कहानी का संकेत देखें और वापस से पुनः प्रयास करें।',
  puzzleCorrectPickOne: 'सही! वास्तविक सुरक्षा कौशल लागू किया।',
  puzzleWrongPickOne: 'गलत — सोचें कि धोखेबाज वास्तव में क्या करते हैं।',
  puzzleSkillPoint: 'कौशल अंक',
  puzzleCheckAnswer: 'उत्तर जांचें',
  puzzleSpottedFlags: '✓ आपने {count} वास्तविक खतरे के संकेत पहचाने!',
  puzzleDetectiveBonus: 'जासूस बोनस',
  puzzleFindMinCorrect: 'कम से कम {min} सही संकेत चुनें बिना सुरक्षित/सामान्य वाले चुने।',
  puzzleVerifyMatches: 'मिलान सत्यापित करें',
  puzzlePerfectMatch: '✓ बिल्कुल सही! आपने वास्तविक सत्यापन चरणों का मिलान किया।',
  puzzleAnalystBonus: 'विश्लेषक बोनस',
  puzzleSomeWrong: 'कुछ मिलान गलत हैं — आधिकारिक बनाम अनधिकारिक चैनलों के बारे में सोचें।',
  puzzleChoose: 'चुनें…',
  skillDigitalSafety: 'डिजिटल सुरक्षा', skillCareerSmarts: 'करियर समझदारी',
  skillMoneySkills: 'पैसे का कौशल', skillEducationGuard: 'शिक्षा रक्षक',
  skillEmpathySafety: 'सहानुभूति और सुरक्षा',
  worldPhone: 'बजता फोन', worldSmsInbox: 'SMS इनबॉक्स', worldBankApp: 'आधिकारिक बैंक ऐप',
  worldWhatsapp: 'WhatsApp संदेश', worldCompanySite: 'कंपनी वेबसाइट', worldVerifyDesk: 'सरकारी पोर्टल',
  worldScreenshot: 'ट्रांसफर स्क्रीनशॉट', worldUpiApp: 'आपका UPI ऐप', worldStrangerMsg: 'अजनबी का संदेश',
  worldScholarshipSite: 'छात्रवृत्ति वेबसाइट', worldFeeForm: 'भुगतान फॉर्म', worldNsp: 'आधिकारिक NSP पोर्टल',
  worldGroupChat: 'ग्रुप चैट', worldVictimDm: 'पीड़ित को संदेश', worldReportDesk: 'रिपोर्ट डेस्क',
  takeawayOtp1: 'बैंक कभी फोन पर OTP नहीं माँगते — OTP असली भुगतान अधिकृत करता है।',
  takeawayOtp2: 'नकली जल्दबाजी ("10 मिनट या फ्रीज") एक दबाव की चाल है ताकि आप सोच न सकें।',
  takeawayOtp3: 'हमेशा अपने आधिकारिक बैंक ऐप या डेबिट कार्ड पर दिए नंबर से सत्यापित करें।',
  takeawayOtp4: 'राष्ट्रीय साइबर अपराध पोर्टल पर रिपोर्ट करें या 1930 पर कॉल करें।',
  takeawayJob1: 'असली नियोक्ता कभी पंजीकरण या सुरक्षा जमा राशि नहीं लेते।',
  takeawayJob2: 'वैध नौकरियों में इंटरव्यू होता है — तुरंत भर्ती खतरे का संकेत है।',
  takeawayJob3: 'National Career Service (NCS) और MCA पोर्टल पर कंपनियाँ सत्यापित करें।',
  takeawayJob4: 'आधिकारिक .gov.in साइटों पर सत्यापन से पहले WhatsApp भर्तीकर्ताओं को भुगतान न करें।',
  takeawayUpi1: 'UPI ट्रांसफर के स्क्रीनशॉट एडिट हो सकते हैं — अपना असली ऐप बैलेंस चेक करें।',
  takeawayUpi2: 'अजनबियों के दबाव में कभी नए UPI ID पर पैसे न भेजें।',
  takeawayUpi3: 'गलत ट्रांसफर विवाद आपके बैंक ऐप से होते हैं, WhatsApp से नहीं।',
  takeawayUpi4: 'cybercrime.gov.in पर UPI धोखाधड़ी रिपोर्ट करें या 1930 पर कॉल करें।',
  takeawayScholar1: 'आधिकारिक छात्रवृत्ति scholarships.gov.in पर — कभी प्रोसेसिंग फीस न दें।',
  takeawayScholar2: 'सरकारी साइटें .gov.in या .nic.in में होती हैं, .org या .com में नहीं।',
  takeawayScholar3: 'नकली काउंटडाउन टाइमर जल्दबाजी में गलत निर्णय लेने के लिए होते हैं।',
  takeawayScholar4: 'myScheme और National Scholarship Portal (NSP) पर असली योजनाएँ खोजें।',
  takeawayCyber1: 'संदेश डिलीट होने से पहले बुलिंग के स्क्रीनशॉट सेव करें।',
  takeawayCyber2: 'पहले निजी रूप से पीड़ित का साथ दें — सार्वजनिक लड़ाई अक्सर और बिगाड़ देती है।',
  takeawayCyber3: 'गंभीर मामलों में किसी विश्वसनीय शिक्षक, काउंसलर या माता-पिता को बताएँ।',
  takeawayCyber4: 'गंभीर साइबरबुलिंग cybercrime.gov.in पर रिपोर्ट करें; चाइल्डलाइन 1098 है।',
  missionTitle1: 'मिशन 1: परीक्षा की पूर्व संध्या — OTP धोखा',
  missionSummary1: 'कल बोर्ड परीक्षा। एक धोखाधड़ी कॉल आपके खाते को खतरा देती है — और आपका पढ़ाई का समय चुराती है।',
  missionTitle2: 'मिशन 2: बहुत अच्छा दिखने वाला जॉब ऑफर',
  missionSummary2: 'आपको WhatsApp पर वर्क-फ्रॉम-होम जॉब का संदेश मिलता है — लेकिन पहले "पंजीकरण शुल्क" चाहिए।',
  missionTitle3: 'मिशन 3: "गलत ट्रांसफर" का जाल',
  missionSummary3: 'एक अजनबी कहता है कि उसने गलती से ₹15,000 UPI से भेजे और वापस माँगता है — लेकिन SMS नकली लगता है।',
  missionTitle4: 'मिशन 4: ऑनलाइन सुरक्षित रूप से खड़े हों',
  missionSummary4: 'एक सहपाठी ग्रुप चैट में बुरे संदेशों और एडिट की गई फोटो से निशाना बनाया जा रहा है।',
  missionTitle5: 'मिशन 5: नकली छात्रवृत्ति पोर्टल',
  missionSummary5: 'एक वेबसाइट ₹50,000 सरकारी छात्रवृत्ति का वादा करती है — लेकिन आधार, बैंक विवरण और "प्रोसेसिंग फीस" माँगती है।',
  guestSudokuDone: 'सुडोकू पूर्ण',
  guestPuzzleComplete: 'पहेली पूर्ण!',
  whatYoullLearn: 'आप क्या सीखेंगे',
  guestIntroTip: 'सुझाव: हर पहेली हल करने से अगला कहानी अध्याय खुलेगा। बोनस XP के लिए Life Guide से चैट करें!',
  startAdventure: 'रोमांच शुरू करें'
};

function B(o = {}) { return { ...EN, ...HI, ...o }; }

window.I18N_STRINGS = {
  en: EN, hi: HI,
  bn: B({ searchLanguage:'ভাষা খুঁজুন...', continue:'চালিয়ে যান', back:'পিছনে', solveChallenge:'চ্যালেঞ্জ সমাধান করুন', makeDecision:'চূড়ান্ত সিদ্ধান্ত নিন', beginStory:'গল্প শুরু করুন', lifeGuide:'জীবন গাইড', hintPlaceholder:'ইঙ্গিত চান…', send:'পাঠান', finalDecision:'চূড়ান্ত সিদ্ধান্ত', decisionPrompt:'আপনি সমস্ত প্রমাণ সংগ্রহ করেছেন। বাস্তবে আপনি কী করবেন?', questResult:'কোয়েস্ট ফলাফল', claimRewards:'পুরস্কার নিন', evidence:'প্রমাণ', situationBrief:'পরিস্থিতি', goal:'লক্ষ্য', storyComplete:'গল্প সম্পূর্ণ!', storyCompleteSub:'সব অধ্যায় শেষ — এখন বাস্তব সিদ্ধান্তের সময়।', evidenceSecured:'প্রমাণ সুরক্ষিত!', levelComplete:'স্তর সম্পূর্ণ!', xpEarned:'XP অর্জিত', sessionTotal:'সেশন মোট', starsEarned:'তারা', perfectQuest:'পারফেক্ট — ৩ তারা!', questCleared:'কোয়েস্ট সম্পন্ন', puzzleChallenge:'চ্যালেঞ্জ', puzzleAttempts:'প্রচেষ্টা বাকি', puzzleLocked:'উত্তর লক', puzzleCollect:'প্রমাণ সংগ্রহ', puzzleBack:'গল্পে ফিরুন', flowBriefing:'সংক্ষিপ্ত', flowStory:'গল্প', flowDecision:'সিদ্ধান্ত', flowComplete:'সম্পূর্ণ', welcomeGuide:'স্বাগত! বার্তা পড়ুন, চালিয়ে যান চাপুন।', chapterComplete:'অধ্যায় সম্পূর্ণ', verifiedResources:'যাচাইকৃত সম্পদ', quests:'← কোয়েস্ট', progress:'অগ্রগতি', logout:'লগ আউট', guestMode:'অতিথি মোড', playGuest:'লগইন ছাড়া খেলুন', skillQuests:'দক্ষতা কোয়েস্ট', allEvidence:'সব প্রমাণ সংগৃহীত!', score:'স্কোর', chapterOf:'অধ্যায়', of:'এর', timeLeft:'আজ রাতে বাকি', puzzleTime:'সময়', puzzleTimeUp:'সময় শেষ!', whatLearned:'আপনি কী শিখেছেন', storyLabel:'গল্প', investigate:'তদন্ত করুন', defaultObjective:'গল্প পড়ুন, পাজল সমাধান করুন, সিদ্ধান্ত নিন।', interactHint:'বা ক্লিক —', greatDetective:'দারুণ! বাস্তবে আপনি কী করবেন?', decisionReady:'সব প্রমাণ সংগৃহীত! সিদ্ধান্ত নিন →', chatPlaceholder:'আপনি কী বলবেন — লিখুন…', chatYourMove:'আপনার পালা।', chatFallback:'শান্ত থাকুন। পাজল সমাধান করুন।', solveForSolution:'পাজল → সেরা পদক্ষেপ', officialHelp:'অফিসিয়াল সাহায্য', mentorSub:'আপনার মেন্টর', evidenceYouFound:'আপনার প্রমাণ', schemesAndHelplines:'প্রকল্প ও হেল্পলাইন', learningTip:'বাস্তব পদক্ষেপ লিখুন।' }),
  ta: B({ searchLanguage:'மொழியைத் தேடு...', continue:'தொடரவும்', back:'பின்னால்', solveChallenge:'சவாலைத் தீர்க்கவும்', makeDecision:'இறுதி முடிவு', beginStory:'கதையைத் தொடங்குங்கள்', lifeGuide:'வாழ்க்கை வழிகாட்டி', hintPlaceholder:'குறிப்பு கேளுங்கள்…', send:'அனுப்பு', finalDecision:'இறுதி முடிவு', decisionPrompt:'நீங்கள் அனைத்து ஆதாரங்களையும் சேகரித்தீர்கள். நிஜ வாழ்க்கையில் என்ன செய்வீர்கள்?', questResult:'குவெஸ்ட் முடிவு', claimRewards:'பரிசுகளைப் பெறுங்கள்', evidence:'சான்று', situationBrief:'நிலைமை', goal:'இலக்கு', storyComplete:'கதை முடிந்தது!', storyCompleteSub:'அனைத்து அத்தியாயங்களும் முடிந்தன.', evidenceSecured:'சான்று பாதுகாக்கப்பட்டது!', levelComplete:'நிலை முடிந்தது!', xpEarned:'XP பெற்றது', sessionTotal:'அமர்வு மொத்தம்', starsEarned:'நட்சத்திரங்கள்', perfectQuest:'சரியான — 3 நட்சத்திரங்கள்!', questCleared:'குவெஸ்ட் முடிந்தது', puzzleChallenge:'சவால்', puzzleAttempts:'முயற்சிகள் மீதம்', puzzleLocked:'பதிலைப் பூட்டு', puzzleCollect:'சான்று சேகரி', puzzleBack:'கதைக்குத் திரும்பு', flowBriefing:'சுருக்கம்', flowStory:'கதை', flowDecision:'முடிவு', flowComplete:'முடிந்தது', welcomeGuide:'வரவேற்கிறோம்! செய்திகளைப் படித்து தொடரவும்.', chapterComplete:'அத்தியாயம் முடிந்தது', verifiedResources:'சரிபார்க்கப்பட்ட வளங்கள்', quests:'← குவெஸ்ட்', progress:'முன்னேற்றம்', logout:'வெளியேறு', guestMode:'விருந்தினர்', playGuest:'உள்நுழையாமல் விளையாடு', skillQuests:'திறன் குவெஸ்ட்கள்', allEvidence:'அனைத்து சான்றுகளும் சேகரிக்கப்பட்டன!', score:'மதிப்பெண்', chapterOf:'அத்தியாயம்', of:'இல்', timeLeft:'இன்றிரவு மீதம்', puzzleTime:'நேரம்', puzzleTimeUp:'நேரம் முடிந்தது!', whatLearned:'நீங்கள் கற்றுக்கொண்டது', storyLabel:'கதை', investigate:'விசாரிக்கவும்', defaultObjective:'கதையைப் படித்து புதிர்களைத் தீர்த்து முடிவெடுங்கள்.', interactHint:'அல்லது கிளிக் —', greatDetective:'சிறந்த வேலை! நீங்கள் என்ன செய்வீர்கள்?', decisionReady:'அனைத்து சான்றுகளும்! முடிவை எடுங்கள் →', chatPlaceholder:'நீங்கள் என்ன சொல்வீர்கள் — தட்டச்சு…', chatYourMove:'உங்கள் முறை.', chatFallback:'அமைதியாக இருங்கள். புதிரைத் தீர்க்கவும்.', solveForSolution:'புதிர் → சிறந்த செயல்', officialHelp:'அதிகாரப்பூர்வ உதவி', mentorSub:'உங்கள் வழிகாட்டி', evidenceYouFound:'நீங்கள் திறந்த சான்றுகள்', schemesAndHelplines:'திட்டங்கள் & ஹெல்ப்லைன்கள்', learningTip:'உண்மையான செயல்களை எழுதுங்கள்.' }),
  te: B({ searchLanguage:'భాషను వెతకండి...', continue:'కొనసాగించు', back:'వెనక్కి', solveChallenge:'సవాలును పరిష్కరించండి', makeDecision:'తుది నిర్ణయం', beginStory:'కథ ప్రారంభించండి', lifeGuide:'జీవిత మార్గదర్శి', hintPlaceholder:'హింట్ అడగండి…', send:'పంపు', finalDecision:'తుది నిర్ణయం', decisionPrompt:'మీరు అన్ని ఆధారాలు సేకరించారు. నిజ జీవితంలో ఏమి చేస్తారు?', questResult:'క్వెస్ట్ ఫలితం', claimRewards:'బహుమతులు పొందండి', evidence:'ఆధారం', situationBrief:'పరిస్థితి', goal:'లక్ష్యం', storyComplete:'కథ పూర్తయింది!', storyCompleteSub:'అన్ని అధ్యాయాలు పూర్తయ్యాయి.', evidenceSecured:'ఆధారం భద్రం!', levelComplete:'స్థాయి పూర్తి!', xpEarned:'XP సంపాదించారు', sessionTotal:'సెషన్ మొత్తం', starsEarned:'నక్షత్రాలు', perfectQuest:'పరిపూర్ణ — 3 నక్షత్రాలు!', questCleared:'క్వెస్ట్ పూర్తయింది', puzzleChallenge:'సవాలు', puzzleAttempts:'ప్రయత్నాలు మిగిలి', puzzleLocked:'సమాధానం లాక్', puzzleCollect:'ఆధారం సేకరించండి', puzzleBack:'కథకు తిరిగి', flowBriefing:'సంక్షిప్తం', flowStory:'కథ', flowDecision:'నిర్ణయం', flowComplete:'పూర్తి', welcomeGuide:'స్వాగతం! సందేశాలు చదవండి.', chapterComplete:'అధ్యాయం పూర్తయింది', verifiedResources:'ధృవీకరించబడిన వనరులు', quests:'← క్వెస్ట్', progress:'పురోగతి', logout:'లాగ్ అవుట్', guestMode:'అతిథి మోడ్', playGuest:'లాగిన్ లేకుండా ఆడండి', skillQuests:'నైపుణ్య క్వెస్ట్‌లు', allEvidence:'అన్ని ఆధారాలు సేకరించబడ్డాయి!', score:'స్కోర్', chapterOf:'అధ్యాయం', of:'లో', timeLeft:'ఈ రాత్రి మిగిలింది', puzzleTime:'సమయం', puzzleTimeUp:'సమయం అయిపోయింది!', whatLearned:'మీరు నేర్చుకున్నది', storyLabel:'కథ', investigate:'దర్యాప్తు', defaultObjective:'కథ చదవండి, పజిల్స్ పరిష్కరించండి, నిర్ణయం తీసుకోండి.', interactHint:'లేదా క్లిక్ —', greatDetective:'గొప్ప పని! మీరు ఏమి చేస్తారు?', decisionReady:'అన్ని ఆధారాలు! నిర్ణయం తీసుకోండి →', chatPlaceholder:'మీరు ఏమి చెబుతారు — టైప్ చేయండి…', chatYourMove:'మీ వంతు.', chatFallback:'ప్రశాంతంగా ఉండండి. పజిల్ పరిష్కరించండి.', solveForSolution:'పజిల్ → ఉత్తమ చర్య', officialHelp:'అధికారిక సహాయం', mentorSub:'మీ మార్గదర్శి', evidenceYouFound:'మీ ఆధారాలు', schemesAndHelplines:'పథకాలు & హెల్ప్‌లైన్‌లు', learningTip:'నిజమైన చర్యలు రాయండి.' }),
  mr: B({ searchLanguage:'भाषा शोधा...', continue:'पुढे जा', back:'मागे', solveChallenge:'आव्हान सोडवा', makeDecision:'अंतिम निर्णय घ्या', beginStory:'कथा सुरू करा', lifeGuide:'जीवन मार्गदर्शक', hintPlaceholder:'सूचना विचारा…', send:'पाठवा', finalDecision:'अंतिम निर्णय', decisionPrompt:'तुम्ही सर्व पुरावे गोळा केले. खऱ्या आयुष्यात काय कराल?', questResult:'क्वेस्ट निकाल', claimRewards:'बक्षिसे घ्या', evidence:'पुरावा', situationBrief:'परिस्थिती', goal:'ध्येय', storyComplete:'कथा पूर्ण!', storyCompleteSub:'सर्व प्रकरणे पूर्ण.', evidenceSecured:'पुरावा सुरक्षित!', levelComplete:'स्तर पूर्ण!', xpEarned:'XP मिळाले', sessionTotal:'सत्र एकूण', starsEarned:'तारे', perfectQuest:'परिपूर्ण — 3 तारे!', questCleared:'क्वेस्ट पूर्ण', puzzleChallenge:'आव्हान', puzzleAttempts:'प्रयत्न शिल्लक', puzzleLocked:'उत्तर लॉक करा', puzzleCollect:'पुरावा गोळा करा', puzzleBack:'कथेकडे परत', flowBriefing:'संक्षिप्त', flowStory:'कथा', flowDecision:'निर्णय', flowComplete:'पूर्ण', welcomeGuide:'स्वागत! संदेश वाचा, पुढे जा दाबा.', chapterComplete:'प्रकरण पूर्ण', verifiedResources:'सत्यापित संसाधने', quests:'← क्वेस्ट', progress:'प्रगती', logout:'लॉग आउट', guestMode:'अतिथी मोड', playGuest:'लॉगिनशिवाय खेळा', skillQuests:'कौशल्य क्वेस्ट', allEvidence:'सर्व पुरावे गोळा!', score:'गुण', chapterOf:'प्रकरण', of:'मधील', timeLeft:'आज रात्री शिल्लक', puzzleTime:'वेळ', puzzleTimeUp:'वेळ संपला!', whatLearned:'तुम्ही काय शिकलात', storyLabel:'कथा', investigate:'तपास करा', defaultObjective:'कथा वाचा, पझल्स सोडवा, निर्णय घ्या.', interactHint:'किंवा क्लिक —', greatDetective:'छान! तुम्ही खरोखर काय कराल?', decisionReady:'सर्व पुरावे! निर्णय घ्या →', chatPlaceholder:'तुम्ही काय म्हणाल — टाइप करा…', chatYourMove:'तुमची पाळी.', chatFallback:'शांत राहा. पझल सोडवा.', solveForSolution:'पझल → सर्वोत्तम कृती', officialHelp:'अधिकृत मदत', mentorSub:'तुमचा मार्गदर्शक', evidenceYouFound:'तुमचे पुरावे', schemesAndHelplines:'योजना आणि हेल्पलाइन्स', learningTip:'खऱ्या कृती लिहा.' }),
  gu: B({ searchLanguage:'ભાષા શોધો...', continue:'આગળ વધો', back:'પાછળ', solveChallenge:'પડકાર ઉકેલો', makeDecision:'અંતિમ નિર્ણય લો', beginStory:'કથા શરૂ કરો', lifeGuide:'જીવન માર્ગદર્શક', hintPlaceholder:'સંકેત પૂછો…', send:'મોકલો', finalDecision:'અંતિમ નિર્ણય', decisionPrompt:'તમે બધા પુરાવા એકત્ર કર્યા. વાસ્તવિક જીવનમાં શું કરશો?', questResult:'ક્વેસ્ટ પરિણામ', claimRewards:'ઇનામ લો', evidence:'પુરાવો', situationBrief:'પરિસ્થિતિ', goal:'લક્ષ્ય', storyComplete:'કથા પૂર્ણ!', storyCompleteSub:'બધા પ્રકરણો પૂર્ણ.', evidenceSecured:'પુરાવો સુરક્ષિત!', levelComplete:'લેવલ પૂર્ણ!', xpEarned:'XP મળ્યું', sessionTotal:'સત્ર કુલ', starsEarned:'તારા', perfectQuest:'સંપૂર્ણ — 3 તારા!', questCleared:'ક્વેસ્ટ પૂર્ણ', puzzleChallenge:'પડકાર', puzzleAttempts:'પ્રયાસો બાકી', puzzleLocked:'જવાબ લૉક', puzzleCollect:'પુરાવો એકત્ર', puzzleBack:'કથા પર પાછા', flowBriefing:'સંક્ષિપ્ત', flowStory:'કથા', flowDecision:'નિર્ણય', flowComplete:'પૂર્ણ', welcomeGuide:'સ્વાગત! સંદેશા વાંચો, આગળ વધો.', chapterComplete:'પ્રકરણ પૂર્ણ', verifiedResources:'ચકાસાયેલ સંસાધનો', quests:'← ક્વેસ્ટ', progress:'પ્રગતિ', logout:'લૉગ આઉટ', guestMode:'મહેમાન મોડ', playGuest:'લૉગિન વિના રમો', skillQuests:'કૌશલ્ય ક્વેસ્ટ', allEvidence:'બધા પુરાવા એકત્ર!', score:'સ્કોર', chapterOf:'પ્રકરણ', of:'માં', timeLeft:'આજ રાત્રે બાકી', puzzleTime:'સમય', puzzleTimeUp:'સમય પૂરો!', whatLearned:'તમે શું શીખ્યા', storyLabel:'કથા', investigate:'તપાસ કરો', defaultObjective:'કથા વાંચો, પઝલ ઉકેલો, નિર્ણય લો.', interactHint:'અથવા ક્લિક —', greatDetective:'સરસ! તમે શું કરશો?', decisionReady:'બધા પુરાવા! નિર્ણય લો →', chatPlaceholder:'તમે શું કહેશો — ટાઇપ કરો…', chatYourMove:'તમારો વારો.', chatFallback:'શાંત રહો. પઝલ ઉકેલો.', solveForSolution:'પઝલ → શ્રેષ્ઠ ક્રિયા', officialHelp:'સત્તાવાર મદદ', mentorSub:'તમારા માર્ગદર્શક', evidenceYouFound:'તમારા પુરાવા', schemesAndHelplines:'યોજનાઓ અને હેલ્પલાઇન', learningTip:'વાસ્તવિક ક્રિયાઓ લખો.' }),
  kn: B({ searchLanguage:'ಭಾಷೆ ಹುಡುಕಿ...', continue:'ಮುಂದುವರಿಸಿ', back:'ಹಿಂದೆ', solveChallenge:'ಸವಾಲನ್ನು ಪರಿಹರಿಸಿ', makeDecision:'ಅಂತಿಮ ನಿರ್ಧಾರ', beginStory:'ಕಥೆ ಪ್ರಾರಂಭಿಸಿ', lifeGuide:'ಜೀವನ ಮಾರ್ಗದರ್ಶಕ', hintPlaceholder:'ಸುಳಿವು ಕೇಳಿ…', send:'ಕಳುಹಿಸಿ', finalDecision:'ಅಂತಿಮ ನಿರ್ಧಾರ', decisionPrompt:'ನೀವು ಎಲ್ಲಾ ಸಾಕ್ಷ್ಯಗಳನ್ನು ಸಂಗ್ರಹಿಸಿದ್ದೀರಿ. ನಿಜ ಜೀವನದಲ್ಲಿ ಏನು ಮಾಡುತ್ತೀರಿ?', questResult:'ಕ್ವೆಸ್ಟ್ ಫಲಿತಾಂಶ', claimRewards:'ಬಹುಮಾನ ಪಡೆಯಿರಿ', evidence:'ಸಾಕ್ಷ್ಯ', situationBrief:'ಪರಿಸ್ಥಿತಿ', goal:'ಗುರಿ', storyComplete:'ಕಥೆ ಪೂರ್ಣ!', storyCompleteSub:'ಎಲ್ಲಾ ಅಧ್ಯಾಯಗಳು ಪೂರ್ಣ.', evidenceSecured:'ಸಾಕ್ಷ್ಯ ಭದ್ರ!', levelComplete:'ಮಟ್ಟ ಪೂರ್ಣ!', xpEarned:'XP ಗಳಿಸಿದಿರಿ', sessionTotal:'ಅಧಿವೇಶನ ಒಟ್ಟು', starsEarned:'ನಕ್ಷತ್ರಗಳು', perfectQuest:'ಪರಿಪೂರ್ಣ — 3 ನಕ್ಷತ್ರಗಳು!', questCleared:'ಕ್ವೆಸ್ಟ್ ಪೂರ್ಣ', puzzleChallenge:'ಸವಾಲು', puzzleAttempts:'ಪ್ರಯತ್ನಗಳು ಉಳಿದಿವೆ', puzzleLocked:'ಉತ್ತರ ಲಾಕ್', puzzleCollect:'ಸಾಕ್ಷ್ಯ ಸಂಗ್ರಹಿಸಿ', puzzleBack:'ಕಥೆಗೆ ಹಿಂತಿರುಗಿ', flowBriefing:'ಸಂಕ್ಷಿಪ್ತ', flowStory:'ಕಥೆ', flowDecision:'ನಿರ್ಧಾರ', flowComplete:'ಪೂರ್ಣ', welcomeGuide:'ಸ್ವಾಗತ! ಸಂದೇಶಗಳನ್ನು ಓದಿ.', chapterComplete:'ಅಧ್ಯಾಯ ಪೂರ್ಣ', verifiedResources:'ಪರಿಶೀಲಿಸಿದ ಸಂಪನ್ಮೂಲಗಳು', quests:'← ಕ್ವೆಸ್ಟ್', progress:'ಪ್ರಗತಿ', logout:'ಲಾಗ್ ಔಟ್', guestMode:'ಅತಿಥಿ ಮೋಡ್', playGuest:'ಲಾಗಿನ್ ಇಲ್ಲದೆ ಆಡಿ', skillQuests:'ಕೌಶಲ್ಯ ಕ್ವೆಸ್ಟ್‌ಗಳು', allEvidence:'ಎಲ್ಲಾ ಸಾಕ್ಷ್ಯ ಸಂಗ್ರಹಿಸಲಾಗಿದೆ!', score:'ಸ್ಕೋರ್', chapterOf:'ಅಧ್ಯಾಯ', of:'ರಲ್ಲಿ', timeLeft:'ಇಂದು ರಾತ್ರಿ ಉಳಿದಿದೆ', puzzleTime:'ಸಮಯ', puzzleTimeUp:'ಸಮಯ ಮುಗಿಯಿತು!', whatLearned:'ನೀವು ಕಲಿತದ್ದು', storyLabel:'ಕಥೆ', investigate:'ತನಿಖೆ', defaultObjective:'ಕಥೆ ಓದಿ, ಪಜಲ್ ಪರಿಹರಿಸಿ, ನಿರ್ಧರಿಸಿ.', interactHint:'ಅಥವಾ ಕ್ಲಿಕ್ —', greatDetective:'ಅದ್ಭುತ! ನೀವು ಏನು ಮಾಡುತ್ತೀರಿ?', decisionReady:'ಎಲ್ಲಾ ಸಾಕ್ಷ್ಯ! ನಿರ್ಧಾರ ತೆಗೆದುಕೊಳ್ಳಿ →', chatPlaceholder:'ನೀವು ಏನು ಹೇಳುತ್ತೀರಿ — ಟೈಪ್ ಮಾಡಿ…', chatYourMove:'ನಿಮ್ಮ ಸರದಿ.', chatFallback:'ಶಾಂತವಾಗಿರಿ. ಪಜಲ್ ಪರಿಹರಿಸಿ.', solveForSolution:'ಪಜಲ್ → ಉತ್ತಮ ಕ್ರಮ', officialHelp:'ಅಧಿಕೃತ ಸಹಾಯ', mentorSub:'ನಿಮ್ಮ ಮಾರ್ಗದರ್ಶಿ', evidenceYouFound:'ನಿಮ್ಮ ಸಾಕ್ಷ್ಯ', schemesAndHelplines:'ಯೋಜನೆಗಳು ಮತ್ತು ಹೆಲ್ಪ್‌ಲೈನ್‌ಗಳು', learningTip:'ನಿಜವಾದ ಕ್ರಮಗಳನ್ನು ಬರೆಯಿರಿ.' }),
  ml: B({ searchLanguage:'ഭാഷ തിരയുക...', continue:'തുടരുക', back:'പിന്നോട്ട്', solveChallenge:'വെല്ലുവിളി പരിഹരിക്കുക', makeDecision:'അന്തിമ തീരുമാനം', beginStory:'കഥ തുടങ്ങുക', lifeGuide:'ജീവിത ഗൈഡ്', hintPlaceholder:'സൂചന ചോദിക്കുക…', send:'അയയ്ക്കുക', finalDecision:'അന്തിമ തീരുമാനം', decisionPrompt:'നിങ്ങൾ എല്ലാ തെളിവുകളും ശേഖരിച്ചു. യഥാർത്ഥ ജീവിതത്തിൽ എന്തുചെയ്യും?', questResult:'ക്വെസ്റ്റ് ഫലം', claimRewards:'സമ്മാനം നേടുക', evidence:'തെളിവ്', situationBrief:'സ്ഥിതി', goal:'ലക്ഷ്യം', storyComplete:'കഥ പൂർത്തി!', storyCompleteSub:'എല്ലാ അധ്യായങ്ങളും പൂർത്തി.', evidenceSecured:'തെളിവ് സുരക്ഷിതം!', levelComplete:'ലെവൽ പൂർത്തി!', xpEarned:'XP നേടി', sessionTotal:'സെഷൻ ആകെ', starsEarned:'നക്ഷത്രങ്ങൾ', perfectQuest:'പൂർണ്ണ — 3 നക്ഷത്രങ്ങൾ!', questCleared:'ക്വെസ്റ്റ് പൂർത്തി', puzzleChallenge:'വെല്ലുവിളി', puzzleAttempts:'ശ്രമങ്ങൾ ബാക്കി', puzzleLocked:'ഉത്തരം ലോക്ക്', puzzleCollect:'തെളിവ് ശേഖരിക്കുക', puzzleBack:'കഥയിലേക്ക് മടങ്ങുക', flowBriefing:'സംഗ്രഹം', flowStory:'കഥ', flowDecision:'തീരുമാനം', flowComplete:'പൂർത്തി', welcomeGuide:'സ്വാഗതം! സന്ദേശങ്ങൾ വായിക്കുക.', chapterComplete:'അധ്യായം പൂർത്തി', verifiedResources:'പരിശോധിച്ച വിഭവങ്ങൾ', quests:'← ക്വെസ്റ്റ്', progress:'പുരോഗതി', logout:'ലോഗ് ഔട്ട്', guestMode:'അതിഥി മോഡ്', playGuest:'ലോഗിൻ ഇല്ലാതെ കളിക്കുക', skillQuests:'വൈദഗ്ധ്യ ക്വെസ്റ്റുകൾ', allEvidence:'എല്ലാ തെളിവുകളും ശേഖരിച്ചു!', score:'സ്കോർ', chapterOf:'അധ്യായം', of:'ൽ', timeLeft:'ഇന്ന് രാത്രി ബാക്കി', puzzleTime:'സമയം', puzzleTimeUp:'സമയം കഴിഞ്ഞു!', whatLearned:'നിങ്ങൾ പഠിച്ചത്', storyLabel:'കഥ', investigate:'അന്വേഷിക്കുക', defaultObjective:'കഥ വായിക്കുക, പസിൽ പരിഹരിക്കുക, തീരുമാനിക്കുക.', interactHint:'അല്ലെങ്കിൽ ക്ലിക്ക് —', greatDetective:'മികച്ചത്! നിങ്ങൾ എന്തുചെയ്യും?', decisionReady:'എല്ലാ തെളിവുകളും! തീരുമാനം എടുക്കുക →', chatPlaceholder:'നിങ്ങൾ എന്തു പറയുമോ — ടൈപ്പ് ചെയ്യുക…', chatYourMove:'നിങ്ങളുടെ ഊഴം.', chatFallback:'ശാന്തമായിരിക്കുക. പസിൽ പരിഹരിക്കുക.', solveForSolution:'പസിൽ → മികച്ച നടപടി', officialHelp:'ഔദ്യോഗിക സഹായം', mentorSub:'നിങ്ങളുടെ മാർഗ്ഗദർശി', evidenceYouFound:'നിങ്ങളുടെ തെളിവുകൾ', schemesAndHelplines:'പദ്ധതികളും ഹെൽപ്പ്‌ലൈനുകളും', learningTip:'യഥാർത്ഥ നടപടികൾ എഴുതുക.' }),
  pa: B({ searchLanguage:'ਭਾਸ਼ਾ ਖੋਜੋ...', continue:'ਜਾਰੀ ਰੱਖੋ', back:'ਪਿੱਛੇ', solveChallenge:'ਚੁਣੌਤੀ ਹੱਲ ਕਰੋ', makeDecision:'ਅੰਤਿਮ ਫੈਸਲਾ ਲਓ', beginStory:'ਕਹਾਣੀ ਸ਼ੁਰੂ ਕਰੋ', lifeGuide:'ਜੀਵਨ ਗਾਈਡ', hintPlaceholder:'ਸੰਕੇਤ ਪੁੱਛੋ…', send:'ਭੇਜੋ', finalDecision:'ਅੰਤਿਮ ਫੈਸਲਾ', decisionPrompt:'ਤੁਸੀਂ ਸਾਰੇ ਸਬੂਤ ਇਕੱਠੇ ਕੀਤੇ. ਅਸਲ ਜ਼ਿੰਦਗੀ ਵਿੱਚ ਕੀ ਕਰੋਗੇ?', questResult:'ਕਵੈਸਟ ਨਤੀਜਾ', claimRewards:'ਇਨਾਮ ਲਓ', evidence:'ਸਬੂਤ', situationBrief:'ਸਥਿਤੀ', goal:'ਟੀਚਾ', storyComplete:'ਕਹਾਣੀ ਪੂਰੀ!', storyCompleteSub:'ਸਾਰੇ ਅਧਿਆਏ ਪੂਰੇ.', evidenceSecured:'ਸਬੂਤ ਸੁਰੱਖਿਅਤ!', levelComplete:'ਪੱਧਰ ਪੂਰਾ!', xpEarned:'XP ਕਮਾਇਆ', sessionTotal:'ਸੈਸ਼ਨ ਕੁੱਲ', starsEarned:'ਤਾਰੇ', perfectQuest:'ਸੰਪੂਰਨ — 3 ਤਾਰੇ!', questCleared:'ਕਵੈਸਟ ਪੂਰਾ', puzzleChallenge:'ਚੁਣੌਤੀ', puzzleAttempts:'ਕੋਸ਼ਿਸ਼ਾਂ ਬਾਕੀ', puzzleLocked:'ਜਵਾਬ ਲਾਕ', puzzleCollect:'ਸਬੂਤ ਇਕੱਠਾ ਕਰੋ', puzzleBack:'ਕਹਾਣੀ ਵੱਲ ਵਾਪਸ', flowBriefing:'ਸੰਖੇਪ', flowStory:'ਕਹਾਣੀ', flowDecision:'ਫੈਸਲਾ', flowComplete:'ਪੂਰਾ', welcomeGuide:'ਸਵਾਗਤ! ਸੁਨੇਹੇ ਪੜ੍ਹੋ.', chapterComplete:'ਅਧਿਆਏ ਪੂਰਾ', verifiedResources:'ਤਸਦੀਕ ਸ਼ੁਦਾ ਸਰੋਤ', quests:'← ਕਵੈਸਟ', progress:'ਤਰੱਕੀ', logout:'ਲਾਗ ਆਊਟ', guestMode:'ਮਹਿਮਾਨ ਮੋਡ', playGuest:'ਲਾਗਇਨ ਤੋਂ ਬਿਨਾਂ ਖੇਡੋ', skillQuests:'ਹੁਨਰ ਕਵੈਸਟ', allEvidence:'ਸਾਰੇ ਸਬੂਤ ਇਕੱਠੇ!', score:'ਸਕੋਰ', chapterOf:'ਅਧਿਆਏ', of:'ਵਿੱਚ', timeLeft:'ਅੱਜ ਰਾਤ ਬਾਕੀ', puzzleTime:'ਸਮਾਂ', puzzleTimeUp:'ਸਮਾਂ ਖਤਮ!', whatLearned:'ਤੁਸੀਂ ਕੀ ਸਿੱਖਿਆ', storyLabel:'ਕਹਾਣੀ', investigate:'ਜਾਂਚ ਕਰੋ', defaultObjective:'ਕਹਾਣੀ ਪੜ੍ਹੋ, ਪਹੇਲੀ ਹੱਲ ਕਰੋ, ਫੈਸਲਾ ਲਓ.', interactHint:'ਜਾਂ ਕਲਿੱਕ —', greatDetective:'ਵਧੀਆ! ਤੁਸੀਂ ਕੀ ਕਰੋਗੇ?', decisionReady:'ਸਾਰੇ ਸਬੂਤ! ਫੈਸਲਾ ਲਓ →', chatPlaceholder:'ਤੁਸੀਂ ਕੀ ਕਹੋਗੇ — ਟਾਈਪ ਕਰੋ…', chatYourMove:'ਤੁਹਾਡੀ ਵਾਰੀ.', chatFallback:'ਸ਼ਾਂਤ ਰਹੋ. ਪਹੇਲੀ ਹੱਲ ਕਰੋ.', solveForSolution:'ਪਹੇਲੀ → ਵਧੀਆ ਕਦਮ', officialHelp:'ਸਰਕਾਰੀ ਮਦਦ', mentorSub:'ਤੁਹਾਡਾ ਮਾਰਗਦਰਸ਼ਕ', evidenceYouFound:'ਤੁਹਾਡੇ ਸਬੂਤ', schemesAndHelplines:'ਸਕੀਮਾਂ ਅਤੇ ਹੈਲਪਲਾਈਨ', learningTip:'ਅਸਲ ਕਦਮ ਲਿਖੋ.' }),
  or: B({ searchLanguage:'ଭାଷା ଖୋଜନ୍ତୁ...', continue:'ଆଗକୁ ବଢ଼ନ୍ତୁ', back:'ପଛକୁ', solveChallenge:'ଚ୍ୟାଲେଞ୍ଜ ସମାଧାନ', makeDecision:'ଚୂଡ଼ାନ୍ତ ନିଷ୍ପତ୍ତି', beginStory:'କାହାଣୀ ଆରମ୍ଭ', lifeGuide:'ଜୀବନ ଗାଇଡ୍', hintPlaceholder:'ସୂଚନା ପଚାରନ୍ତୁ…', send:'ପଠାନ୍ତୁ', finalDecision:'ଚୂଡ଼ାନ୍ତ ନିଷ୍ପତ୍ତି', decisionPrompt:'ଆପଣ ସମସ୍ତ ପ୍ରମାଣ ସଂଗ୍ରହ କରିଛନ୍ତି. ବାସ୍ତବରେ କଣ କରିବେ?', questResult:'କ୍ୱେଷ୍ଟ ଫଳାଫଳ', claimRewards:'ପୁରସ୍କାର ନିଅନ୍ତୁ', evidence:'ପ୍ରମାଣ', situationBrief:'ପରିସ୍ଥିତି', goal:'ଲକ୍ଷ୍ୟ', storyComplete:'କାହାଣୀ ସମ୍ପୂର୍ଣ!', storyCompleteSub:'ସମସ୍ତ ଅଧ୍ୟାୟ ସମ୍ପୂର୍ଣ.', evidenceSecured:'ପ୍ରମାଣ ସୁରକ୍ଷିତ!', levelComplete:'ସ୍ତର ସମ୍ପୂର୍ଣ!', xpEarned:'XP ଅର୍ଜନ', sessionTotal:'ସେସନ ମୋଟ', starsEarned:'ତାରା', perfectQuest:'ସମ୍ପୂର୍ଣ — 3 ତାରା!', questCleared:'କ୍ୱେଷ୍ଟ ସମ୍ପୂର୍ଣ', puzzleChallenge:'ଚ୍ୟାଲେଞ୍ଜ', puzzleAttempts:'ପ୍ରୟାସ ବାକି', puzzleLocked:'ଉତ୍ତର ଲକ୍', puzzleCollect:'ପ୍ରମାଣ ସଂଗ୍ରହ', puzzleBack:'କାହାଣୀକୁ ଫେରନ୍ତୁ', flowBriefing:'ସଂକ୍ଷିପ୍ତ', flowStory:'କାହାଣୀ', flowDecision:'ନିଷ୍ପତ୍ତି', flowComplete:'ସମ୍ପୂର୍ଣ', welcomeGuide:'ସ୍ୱାଗତ! ବାର୍ତ୍ତା ପଢ଼ନ୍ତୁ.', chapterComplete:'ଅଧ୍ୟାୟ ସମ୍ପୂର୍ଣ', verifiedResources:'ଯାଞ୍ଚ ହୋଇଥିବା ସମ୍ବଳ', quests:'← କ୍ୱେଷ୍ଟ', progress:'ପ୍ରଗତି', logout:'ଲଗ୍ ଆଉଟ୍', guestMode:'ଅତିଥି ମୋଡ୍', playGuest:'ଲଗଇନ୍ ବିନା ଖେଳନ୍ତୁ', skillQuests:'ଦକ୍ଷତା କ୍ୱେଷ୍ଟ', allEvidence:'ସମସ୍ତ ପ୍ରମାଣ ସଂଗୃହୀତ!', score:'ସ୍କୋର୍', chapterOf:'ଅଧ୍ୟାୟ', of:'ର', timeLeft:'ଆଜି ରାତି ବାକି', puzzleTime:'ସମୟ', puzzleTimeUp:'ସମୟ ସମାପ୍ତ!', whatLearned:'ଆପଣ କଣ ଶିଖିଲେ', storyLabel:'କାହାଣୀ', investigate:'ତଦନ୍ତ', defaultObjective:'କାହାଣୀ ପଢ଼ନ୍ତୁ, ପଜଲ୍ ସମାଧାନ, ନିଷ୍ପତ୍ତି ନିଅନ୍ତୁ.', interactHint:'କିମ୍ବା କ୍ଲିକ୍ —', greatDetective:'ଚମତ୍କାର! ଆପଣ କଣ କରିବେ?', decisionReady:'ସମସ୍ତ ପ୍ରମାଣ! ନିଷ୍ପତ୍ତି ନିଅନ୍ତୁ →', chatPlaceholder:'ଆପଣ କଣ କହିବେ — ଟାଇପ୍…', chatYourMove:'ଆପଣଙ୍କ ପାଳି.', chatFallback:'ଶାନ୍ତ ରୁହନ୍ତୁ. ପଜଲ୍ ସମାଧାନ.', solveForSolution:'ପଜଲ୍ → ଶ୍ରେଷ୍ଠ ପଦକ୍ଷେପ', officialHelp:'ସରକାରୀ ସାହାଯ୍ୟ', mentorSub:'ଆପଣଙ୍କ ମାର୍ଗଦର୍ଶକ', evidenceYouFound:'ଆପଣଙ୍କ ପ୍ରମାଣ', schemesAndHelplines:'ଯୋଜନା ଓ ହେଲ୍ପଲାଇନ୍', learningTip:'ବାସ୍ତବ ପଦକ୍ଷେପ ଲେଖନ୍ତୁ.' }),
  as: B({ searchLanguage:'ভাষা বিচাৰক...', continue:'আগবাঢ়ক', back:'পিছলৈ', solveChallenge:'প্ৰত্যাহ্বান সমাধান', makeDecision:'চূড়ান্ত সিদ্ধান্ত', beginStory:'কাহিনী আৰম্ভ', lifeGuide:'জীৱন গাইড', hintPlaceholder:'ইংগিত সুধিব…', send:'পঠিয়াওক', finalDecision:'চূড়ান্ত সিদ্ধান্ত', decisionPrompt:'আপুনি সকলো প্ৰমাণ সংগ্ৰহ কৰিছে. বাস্তৱত কি কৰিব?', questResult:'কুৱেষ্ট ফলাফল', claimRewards:'পুৰস্কাৰ লওক', evidence:'প্ৰমাণ', situationBrief:'পৰিস্থিতি', goal:'লক্ষ্য', storyComplete:'কাহিনী সম্পূৰ্ণ!', storyCompleteSub:'সকলো অধ্যায় সম্পূৰ্ণ.', evidenceSecured:'প্ৰমাণ সুৰক্ষিত!', levelComplete:'স্তৰ সম্পূৰ্ণ!', xpEarned:'XP অৰ্জন', sessionTotal:'ছেছন মুঠ', starsEarned:'তৰা', perfectQuest:'সম্পূৰ্ণ — 3 তৰা!', questCleared:'কুৱেষ্ট সম্পূৰ্ণ', puzzleChallenge:'প্ৰত্যাহ্বান', puzzleAttempts:'প্ৰচেষ্টা বাকী', puzzleLocked:'উত্তৰ লক', puzzleCollect:'প্ৰমাণ সংগ্ৰহ', puzzleBack:'কাহিনীলৈ ঘূৰক', flowBriefing:'সংক্ষিপ্ত', flowStory:'কাহিনী', flowDecision:'সিদ্ধান্ত', flowComplete:'সম্পূৰ্ণ', welcomeGuide:'স্বাগতম! বাৰ্তা পঢ়ক.', chapterComplete:'অধ্যায় সম্পূৰ্ণ', verifiedResources:'যাচাই কৰা সম্পদ', quests:'← কুৱেষ্ট', progress:'প্ৰগতি', logout:'লগ আউট', guestMode:'অতিথি ম\'ড', playGuest:'লগইন অবিহনে খেলক', skillQuests:'দক্ষতা কুৱেষ্ট', allEvidence:'সকলো প্ৰমাণ সংগৃহীত!', score:'স্ক\'ৰ', chapterOf:'অধ্যায়', of:'ৰ', timeLeft:'আজি ৰাতি বাকি', puzzleTime:'সময়', puzzleTimeUp:'সময় শেষ!', whatLearned:'আপুনি কি শিকিলে', storyLabel:'কাহিনী', investigate:'তদন্ত', defaultObjective:'কাহিনী পঢ়ক, পাজল সমাধান, সিদ্ধান্ত লওক.', interactHint:'বা ক্লিক —', greatDetective:'বঢ়িয়া! আপুনি কি কৰিব?', decisionReady:'সকলো প্ৰমাণ! সিদ্ধান্ত লওক →', chatPlaceholder:'আপুনি কি ক\'ব — টাইপ কৰক…', chatYourMove:'আপোনাৰ পাল.', chatFallback:'শান্ত থাকক. পাজল সমাধান.', solveForSolution:'পাজল → শ্ৰেষ্ঠ পদক্ষেপ', officialHelp:'চৰকাৰী সহায়', mentorSub:'আপোনাৰ পথ প্ৰদৰ্শক', evidenceYouFound:'আপোনাৰ প্ৰমাণ', schemesAndHelplines:'আঁচনি আৰু হেল্পলাইন', learningTip:'বাস্তব পদক্ষেপ লিখক.' }),
  ur: B({ searchLanguage:'زبان تلاش کریں...', continue:'جاری رکھیں', back:'واپس', solveChallenge:'چیلنج حل کریں', makeDecision:'حتمی فیصلہ کریں', beginStory:'کہانی شروع', lifeGuide:'زندگی رہنما', hintPlaceholder:'اشارہ پوچھیں…', send:'بھیجیں', finalDecision:'حتمی فیصلہ', decisionPrompt:'آپ نے تمام ثبوت جمع کر لیے. حقیقی زندگی میں کیا کریں گے؟', questResult:'کویسٹ نتیجہ', claimRewards:'انعام لیں', evidence:'ثبوت', situationBrief:'صورتحال', goal:'مقصد', storyComplete:'کہانی مکمل!', storyCompleteSub:'تمام ابواب مکمل.', evidenceSecured:'ثبوت محفوظ!', levelComplete:'لیول مکمل!', xpEarned:'XP کمایا', sessionTotal:'سیشن کل', starsEarned:'ستارے', perfectQuest:'مکمل — 3 ستارے!', questCleared:'کویسٹ مکمل', puzzleChallenge:'چیلنج', puzzleAttempts:'کوششیں باقی', puzzleLocked:'جواب لاک', puzzleCollect:'ثبوت جمع کریں', puzzleBack:'کہانی پر واپس', flowBriefing:'خلاصہ', flowStory:'کہانی', flowDecision:'فیصلہ', flowComplete:'مکمل', welcomeGuide:'خوش آمدید! پیغامات پڑھیں.', chapterComplete:'باب مکمل', verifiedResources:'تصدیق شدہ وسائل', quests:'← کویسٹ', progress:'پیشرفت', logout:'لاگ آؤٹ', guestMode:'مہمان موڈ', playGuest:'لاگ ان کے بغیر کھیلیں', skillQuests:'مہارت کویسٹ', allEvidence:'تمام ثبوت جمع!', score:'اسکور', chapterOf:'باب', of:'میں', timeLeft:'آج رات باقی', puzzleTime:'وقت', puzzleTimeUp:'وقت ختم!', whatLearned:'آپ نے کیا سیکھا', storyLabel:'کہانی', investigate:'تحقیق کریں', defaultObjective:'کہانی پڑھیں، پہیلی حل کریں، فیصلہ کریں.', interactHint:'یا کلک —', greatDetective:'بہت اچھا! آپ کیا کریں گے؟', decisionReady:'تمام ثبوت! فیصلہ کریں →', chatPlaceholder:'آپ کیا کہیں گے — ٹائپ کریں…', chatYourMove:'آپ کی باری.', chatFallback:'پرسکون رہیں. پہیلی حل کریں.', solveForSolution:'پہیلی → بہترین اقدام', officialHelp:'سرکاری مدد', mentorSub:'آپ کا رہنما', evidenceYouFound:'آپ کے ثبوت', schemesAndHelplines:'اسکیمیں اور ہیلپ لائن', learningTip:'حقیقی اقدامات لکھیں.' }),
  ne: B({ searchLanguage:'भाषा खोज्नुहोस्...', continue:'जारी राख्नुहोस्', back:'पछाडि', solveChallenge:'चुनौती समाधान', makeDecision:'अन्तिम निर्णय', beginStory:'कथा सुरु', lifeGuide:'जीवन मार्गदर्शक', hintPlaceholder:'संकेत सोध्नुहोस्…', send:'पठाउनुहोस्', finalDecision:'अन्तिम निर्णय', decisionPrompt:'तपाईंले सबै प्रमाण संकलन गर्नुभयो. वास्तविक जीवनमा के गर्नुहुन्छ?', questResult:'क्वेस्ट नतिजा', claimRewards:'पुरस्कार लिनुहोस्', evidence:'प्रमाण', situationBrief:'परिस्थिति', goal:'लक्ष्य', storyComplete:'कथा पूरा!', storyCompleteSub:'सबै अध्याय पूरा.', evidenceSecured:'प्रमाण सुरक्षित!', levelComplete:'तह पूरा!', xpEarned:'XP कमाइयो', sessionTotal:'सत्र कुल', starsEarned:'तारा', perfectQuest:'पूर्ण — ३ तारा!', questCleared:'क्वेस्ट पूरा', puzzleChallenge:'चुनौती', puzzleAttempts:'प्रयास बाँकी', puzzleLocked:'उत्तर लक', puzzleCollect:'प्रमाण संकलन', puzzleBack:'कथामा फर्कनुहोस्', flowBriefing:'संक्षिप्त', flowStory:'कथा', flowDecision:'निर्णय', flowComplete:'पूरा', welcomeGuide:'स्वागत छ! सन्देश पढ्नुहोस्.', chapterComplete:'अध्याय पूरा', verifiedResources:'प्रमाणित स्रोत', quests:'← क्वेस्ट', progress:'प्रगति', logout:'लग आउट', guestMode:'पाहुना मोड', playGuest:'लगइन बिना खेल्नुहोस्', skillQuests:'सीप क्वेस्ट', allEvidence:'सबै प्रमाण संकलित!', score:'स्कोर', chapterOf:'अध्याय', of:'मा', timeLeft:'आज राति बाँकी', puzzleTime:'समय', puzzleTimeUp:'समय सकियो!', whatLearned:'तपाईंले के सिक्नुभयो', storyLabel:'कथा', investigate:'अनुसन्धान', defaultObjective:'कथा पढ्नुहोस्, पजल समाधान, निर्णय लिनुहोस्.', interactHint:'वा क्लिक —', greatDetective:'राम्रो! तपाईं के गर्नुहुन्छ?', decisionReady:'सबै प्रमाण! निर्णय लिनुहोस् →', chatPlaceholder:'तपाईं के भन्नुहुन्छ — टाइप…', chatYourMove:'तपाईंको पालो.', chatFallback:'शान्त रहनुहोस्. पजल समाधान.', solveForSolution:'पजल → उत्तम कदम', officialHelp:'सरकारी सहयोग', mentorSub:'तपाईंको मार्गदर्शक', evidenceYouFound:'तपाईंको प्रमाण', schemesAndHelplines:'योजना र हेल्पलाइन', learningTip:'वास्तविक कदम लेख्नुहोस्.' }),
  kok: B({ searchLanguage:'भास सोदात...', continue:'फुडें वचात', back:'फाटीं', solveChallenge:'आव्हान सोडोवयात', makeDecision:'निमाणो निर्णय', beginStory:'काणी सुरू', lifeGuide:'जीवन मार्गदर्शक', hintPlaceholder:'संकेत विचारात…', send:'धाडात', finalDecision:'निमाणो निर्णय', decisionPrompt:'तुमी सगळे पुरावे एकठांय केल्यात. खऱ्या जिवितांत कितें करतले?', questResult:'क्वेस्ट परिणाम', claimRewards:'इनाम घेयात', evidence:'पुरावो', situationBrief:'परिस्थिती', goal:'ध्येय', storyComplete:'काणी पूर्ण!', storyCompleteSub:'सगळे प्रकरण पूर्ण.', evidenceSecured:'पुरावो सुरक्षित!', levelComplete:'पावंडो पूर्ण!', xpEarned:'XP मेळ्ळे', sessionTotal:'सत्र एकूण', starsEarned:'ताऱ्यांक', perfectQuest:'पूर्ण — 3 ताऱ्यांक!', questCleared:'क्वेस्ट पूर्ण', puzzleChallenge:'आव्हान', puzzleAttempts:'यत्न उरल्यात', puzzleLocked:'जाप लक', puzzleCollect:'पुरावो एकठांय', puzzleBack:'काणियेर परतात', flowBriefing:'थोडक्यांत', flowStory:'काणी', flowDecision:'निर्णय', flowComplete:'पूर्ण', welcomeGuide:'येवकार! संदेश वाचात.', chapterComplete:'प्रकरण पूर्ण', verifiedResources:'तपासिल्लीं साधनां', quests:'← क्वेस्ट', progress:'प्रगती', logout:'लॉग आउट', guestMode:'पावणे मोड', playGuest:'लॉगिन शिवाय खेळात', skillQuests:'कौशल्य क्वेस्ट', allEvidence:'सगळे पुरावे एकठांय!', score:'गुण', chapterOf:'प्रकरण', of:'मदीं', timeLeft:'आयज राती उरलां', puzzleTime:'वेळ', puzzleTimeUp:'वेळ सोंपलो!', whatLearned:'तुमी कितें शिकले', storyLabel:'काणी', investigate:'तपास', defaultObjective:'काणी वाचात, पझल सोडोवयात, निर्णय घेयात.', interactHint:'वो क्लिक —', greatDetective:'बरें! तुमी कितें करतलें?', decisionReady:'सगळे पुरावे! निर्णय घेयात →', chatPlaceholder:'तुमी कितें म्हणटले — टायप…', chatYourMove:'तुमचो पाळो.', chatFallback:'शांत रावात. पझल सोडोवयात.', solveForSolution:'पझल → बरी कृती', officialHelp:'सरकारी मजत', mentorSub:'तुमचो मार्गदर्शक', evidenceYouFound:'तुमचे पुरावे', schemesAndHelplines:'येवजण्यो आनी हेल्पलाइन', learningTip:'खऱ्यो कृती बरयात.' }),
  mai: B({ searchLanguage:'भाषा खोजू...', continue:'आगू बढ़ू', back:'पाछू', solveChallenge:'चुनौती हल करू', makeDecision:'अंतिम निर्णय', beginStory:'कथा शुरू', lifeGuide:'जीवन मार्गदर्शक', hintPlaceholder:'संकेत पूछू…', send:'पठाबू', finalDecision:'अंतिम निर्णय', decisionPrompt:'अहाँ सब प्रमाण इकट्ठा कयलहुँ. असल जीवन मे की करब?', questResult:'क्वेस्ट परिणाम', claimRewards:'इनाम लियऽ', evidence:'प्रमाण', situationBrief:'स्थिति', goal:'लक्ष्य', storyComplete:'कथा पूर्ण!', storyCompleteSub:'सब अध्याय पूर्ण.', evidenceSecured:'प्रमाण सुरक्षित!', levelComplete:'स्तर पूर्ण!', xpEarned:'XP कमाएल', sessionTotal:'सत्र कुल', starsEarned:'तारा', perfectQuest:'पूर्ण — 3 तारा!', questCleared:'क्वेस्ट पूर्ण', puzzleChallenge:'चुनौती', puzzleAttempts:'प्रयास बाकी', puzzleLocked:'उत्तर लक', puzzleCollect:'प्रमाण इकट्ठा', puzzleBack:'कथा पर वापस', flowBriefing:'संक्षिप्त', flowStory:'कथा', flowDecision:'निर्णय', flowComplete:'पूर्ण', welcomeGuide:'स्वागत! संदेश पढ़ू.', chapterComplete:'अध्याय पूर्ण', verifiedResources:'सत्यापित संसाधन', quests:'← क्वेस्ट', progress:'प्रगति', logout:'लॉग आउट', guestMode:'अतिथि मोड', playGuest:'लॉगिन बिना खेलू', skillQuests:'कौशल क्वेस्ट', allEvidence:'सब प्रमाण इकट्ठा!', score:'स्कोर', chapterOf:'अध्याय', of:'मे', timeLeft:'आइ राति बाकी', puzzleTime:'समय', puzzleTimeUp:'समय खतम!', whatLearned:'अहाँ की सीखलहुँ', storyLabel:'कथा', investigate:'जांच', defaultObjective:'कथा पढ़ू, पहेली हल करू, निर्णय लियऽ.', interactHint:'वा क्लिक —', greatDetective:'बढ़िया! अहाँ की करब?', decisionReady:'सब प्रमाण! निर्णय लियऽ →', chatPlaceholder:'अहाँ की कहब — टाइप करू…', chatYourMove:'अहाँक बारी.', chatFallback:'शांत रहू. पहेली हल करू.', solveForSolution:'पहेली → सर्वोत्तम कदम', officialHelp:'सरकारी मदद', mentorSub:'अहाँक मार्गदर्शक', evidenceYouFound:'अहाँक प्रमाण', schemesAndHelplines:'योजना आ हेल्पलाइन', learningTip:'असल कदम लिखू.' }),
  sa: B({ searchLanguage:'भाषा अन्वेषयतु...', continue:'अग्रे गच्छतु', back:'पृष्ठतः', solveChallenge:'आह्वानं समाधत्तु', makeDecision:'अन्तिमं निर्णयम्', beginStory:'कथां आरभताम्', lifeGuide:'जीवनमार्गदर्शकः', hintPlaceholder:'सङ्केतं पृच्छतु…', send:'प्रेषयतु', finalDecision:'अन्तिमं निर्णयम्', decisionPrompt:'भवान् सर्वाणि प्रमाणानि अङ्गीकृतवान्. वास्तविकजीवने किं करोति?', questResult:'क्वेस्टफलम्', claimRewards:'पुरस्कारं गृह्णातु', evidence:'प्रमाणम्', situationBrief:'स्थितिः', goal:'लक्ष्यम्', storyComplete:'कथा पूर्णा!', storyCompleteSub:'सर्वे अध्यायाः पूर्णाः.', evidenceSecured:'प्रमाणं सुरक्षितम्!', levelComplete:'स्तरः पूर्णः!', xpEarned:'XP अर्जितम्', sessionTotal:'सत्रयोगः', starsEarned:'ताराः', perfectQuest:'पूर्णम् — 3 ताराः!', questCleared:'क्वेस्टः पूर्णः', puzzleChallenge:'आह्वानम्', puzzleAttempts:'प्रयत्नाः शेषाः', puzzleLocked:'उत्तरं निरुणद्धि', puzzleCollect:'प्रमाणं सङ्गृह्णातु', puzzleBack:'कथां प्रति', flowBriefing:'संक्षेपः', flowStory:'कथा', flowDecision:'निर्णयः', flowComplete:'पूर्णम्', welcomeGuide:'स्वागतम्! सन्देशान् पठतु.', chapterComplete:'अध्यायः पूर्णः', verifiedResources:'प्रमाणितानि साधनानि', quests:'← क्वेस्ट', progress:'प्रगतिः', logout:'बहिर्गच्छतु', guestMode:'अतिथिप्रकारः', playGuest:'प्रवेशं विना क्रीडतु', skillQuests:'कौशलक्वेस्टाः', allEvidence:'सर्वाणि प्रमाणानि!', score:'अङ्काः', chapterOf:'अध्यायः', of:'मध्ये', timeLeft:'अद्य रात्रौ शेषम्', puzzleTime:'समयः', puzzleTimeUp:'समयः समाप्तः!', whatLearned:'भवता किं शिक्षितम्', storyLabel:'कथा', investigate:'अन्वेषणम्', defaultObjective:'कथां पठतु, प्रहेलिकां समाधत्तु, निर्णयं करोतु.', interactHint:'अथवा क्लिक् —', greatDetective:'शोभनम्! भवान् किं करोति?', decisionReady:'सर्वाणि प्रमाणानि! निर्णयं करोतु →', chatPlaceholder:'भवान् किं वक्ति — टङ्कयतु…', chatYourMove:'भवतः वारः.', chatFallback:'शान्तः भवतु. प्रहेलिकां समाधत्तु.', solveForSolution:'प्रहेलिका → उत्तमं कर्म', officialHelp:'सरकारी सहायता', mentorSub:'भवतः मार्गदर्शकः', evidenceYouFound:'भवतः प्रमाणानि', schemesAndHelplines:'योजनाः हेल्पलैन् च', learningTip:'वास्तविकानि कर्माणि लिखतु.' }),
  sd: B({ searchLanguage:'ٻولي ڳوليو...', continue:'جاري رکو', back:'پوئتي', solveChallenge:'چئلينج حل ڪريو', makeDecision:'آخري فيصلو', beginStory:'ڪهاڻي شروع', lifeGuide:'زندگي رهنما', hintPlaceholder:'اشارو پڇو…', send:'موڪليو', finalDecision:'آخري فيصلو', decisionPrompt:'توهان سڀ ثبوت گڏ ڪيا. حقيقي زندگي ۾ ڇا ڪندا؟', questResult:'ڪوئسٽ نتيجو', claimRewards:'انعام وٺو', evidence:'ثبوت', situationBrief:'حالت', goal:'مقصد', storyComplete:'ڪهاڻي مڪمل!', storyCompleteSub:'سڀ باب مڪمل.', evidenceSecured:'ثبوت محفوظ!', levelComplete:'ليول مڪمل!', xpEarned:'XP ڪمايو', sessionTotal:'سيشن ڪل', starsEarned:'تارا', perfectQuest:'مڪمل — 3 تارا!', questCleared:'ڪوئسٽ مڪمل', puzzleChallenge:'چئلينج', puzzleAttempts:'ڪوششون باقي', puzzleLocked:'جواب لاڪ', puzzleCollect:'ثبوت گڏ ڪريو', puzzleBack:'ڪهاڻي ڏانهن واپس', flowBriefing:'خلاصو', flowStory:'ڪهاڻي', flowDecision:'فيصلو', flowComplete:'مڪمل', welcomeGuide:'ڀلي ڪري آيا! پيغام پڙهو.', chapterComplete:'باب مڪمل', verifiedResources:'تصديق ٿيل وسيلا', quests:'← ڪوئسٽ', progress:'ترقي', logout:'لاگ آئوٽ', guestMode:'مهمان موڊ', playGuest:'لاگ ان کان بغير کيڏو', skillQuests:'مهارت ڪوئسٽ', allEvidence:'سڀ ثبوت گڏ!', score:'اسڪور', chapterOf:'باب', of:'۾', timeLeft:'اڄ رات باقي', puzzleTime:'وقت', puzzleTimeUp:'وقت ختم!', whatLearned:'توهان ڇا سکيو', storyLabel:'ڪهاڻي', investigate:'تحقيق', defaultObjective:'ڪهاڻي پڙهو، پزل حل ڪريو، فيصلو ڪريو.', interactHint:'يا ڪلڪ —', greatDetective:'سٺو! توهان ڇا ڪندا؟', decisionReady:'سڀ ثبوت! فيصلو ڪريو →', chatPlaceholder:'توهان ڇا چئو — ٽائيپ…', chatYourMove:'توهان جو وارو.', chatFallback:'پرسڪون رهو. پزل حل ڪريو.', solveForSolution:'پزل → بهترين قدم', officialHelp:'سرڪاري مدد', mentorSub:'توهان جو رهنما', evidenceYouFound:'توهان جا ثبوت', schemesAndHelplines:'اسڪيمون ۽ هيلپ لائين', learningTip:'حقيقي قدم لکو.' }),
  ks: B({ searchLanguage:'زَبان ژھانٛڈِو...', continue:'آگے بڑھِو', back:'پَتھ', solveChallenge:'چیلنج حَل', makeDecision:'آخری فٲصلہ', beginStory:'کہانی شُروع', lifeGuide:'زندگی رہنما', hintPlaceholder:'اشارٕ پوچھِو…', send:'بھیجِو', finalDecision:'آخری فٲصلہ', decisionPrompt:'توہے تمام ثبوٗٹ جمع کٔر. اصلی زندگے مَنٛز کیا کَرِو؟', questResult:'کویسٛٹ نتٲجہ', claimRewards:'انعام حٲصل', evidence:'ثبوٗٹ', situationBrief:'حالت', goal:'مقصد', storyComplete:'کہانی مُکمل!', storyCompleteSub:'تمام باب مُکمل.', evidenceSecured:'ثبوٗٹ محفوٗظ!', levelComplete:'لیوَل مُکمل!', xpEarned:'XP کٔمایا', sessionTotal:'سیشن کل', starsEarned:'تارے', perfectQuest:'مُکمل — 3 تارے!', questCleared:'کویسٛٹ مُکمل', puzzleChallenge:'چیلنج', puzzleAttempts:'کوشِش بٲقے', puzzleLocked:'جواب لاک', puzzleCollect:'ثبوٗٹ جمع', puzzleBack:'کہانے پَتھ', flowBriefing:'خلاصہ', flowStory:'کہانی', flowDecision:'فٲصلہ', flowComplete:'مُکمل', welcomeGuide:'خٲش آمدٲد! پیغام پڑِھو.', chapterComplete:'باب مُکمل', verifiedResources:'تصدٲق شوٗدہ وسٲیل', quests:'← کویسٛٹ', progress:'ترقی', logout:'لاگ آؤٹ', guestMode:'مہمان موڈ', playGuest:'لاگ اِن بٲگر کھیلِو', skillQuests:'مہارت کویسٛٹ', allEvidence:'تمام ثبوٗٹ جمع!', score:'سکور', chapterOf:'باب', of:'مَنٛز', timeLeft:'آج رات بٲقے', puzzleTime:'وقت', puzzleTimeUp:'وقت ختم!', whatLearned:'توہے کیا سیکھ', storyLabel:'کہانی', investigate:'تحقیق', defaultObjective:'کہانی پڑِھو، پزل حَل، فٲصلہ.', interactHint:'یا کلِک —', greatDetective:'بوہت ٲچھ! توہے کیا کَرِو؟', decisionReady:'تمام ثبوٗٹ! فٲصلہ →', chatPlaceholder:'توہے کیا وَنِو — ٹائپ…', chatYourMove:'تہند وارو.', chatFallback:'پُرسکوٗن رَہِو. پزل حَل.', solveForSolution:'پزل → بہتریٖن قدم', officialHelp:'سرکٲری مدد', mentorSub:'تہند رہنما', evidenceYouFound:'تہند ثبوٗٹ', schemesAndHelplines:'اسکیم تہ ہیلپ لائِن', learningTip:'حقیقی قدم لِکھِو.' }),
  doi: B({ searchLanguage:'भाशा लब्बो...', continue:'अग्गें बधो', back:'पिच्छें', solveChallenge:'चुनौती हल करो', makeDecision:'आखरी फैसला', beginStory:'कहानी शुरू', lifeGuide:'जिंदगी मार्गदर्शक', hintPlaceholder:'संकेत पुच्छो…', send:'भेजो', finalDecision:'आखरी फैसला', decisionPrompt:'तुसी सारे सबूत इकट्ठे कीते. असली जिंदगी च की करोगे?', questResult:'क्वेस्ट नतीजा', claimRewards:'इनाम लओ', evidence:'सबूत', situationBrief:'हालत', goal:'मकसद', storyComplete:'कहानी पूरी!', storyCompleteSub:'सारे अध्याय पूरे.', evidenceSecured:'सबूत सुरक्षिय!', levelComplete:'पधरा पूरा!', xpEarned:'XP कमाया', sessionTotal:'सेशन कुल', starsEarned:'तारे', perfectQuest:'पूरी — 3 तारे!', questCleared:'क्वेस्ट पूरा', puzzleChallenge:'चुनौती', puzzleAttempts:'कोशशां बाकी', puzzleLocked:'जवाब लाक', puzzleCollect:'सबूत इकट्ठा', puzzleBack:'कहानी कन्नै', flowBriefing:'संक्षेप', flowStory:'कहानी', flowDecision:'फैसला', flowComplete:'पूरा', welcomeGuide:'स्वागत! संदेश पढ़ो.', chapterComplete:'अध्याय पूरा', verifiedResources:'तसदीक शुदा साधन', quests:'← क्वेस्ट', progress:'तरक्की', logout:'लाग आउट', guestMode:'मेहमान मोड', playGuest:'लागइन बिना खेलो', skillQuests:'हुनर क्वेस्ट', allEvidence:'सारे सबूत इकट्ठे!', score:'स्कोर', chapterOf:'अध्याय', of:'च', timeLeft:'अज्ज रात बाकी', puzzleTime:'वेला', puzzleTimeUp:'वेला खतम!', whatLearned:'तुसी की सिख्या', storyLabel:'कहानी', investigate:'जांच', defaultObjective:'कहानी पढ़ो, पहेली हल करो, फैसला करो.', interactHint:'जां क्लिक —', greatDetective:'बढ़िया! तुसी की करोगे?', decisionReady:'सारे सबूत! फैसला →', chatPlaceholder:'तुसी की बोलोगे — टाइप…', chatYourMove:'तुंदा बारी.', chatFallback:'शांत रो. पहेली हल करो.', solveForSolution:'पहेली → बढ़िया कदम', officialHelp:'सरकारी मदद', mentorSub:'तुंदा मार्गदर्शक', evidenceYouFound:'तुंदे सबूत', schemesAndHelplines:'सकीमां ते हेल्पलाइन', learningTip:'असली कदम लिक्खो.' }),
  mni: B({ searchLanguage:'লোন্ থিব...', continue:'মখা চৎলো', back:'মমাংদা', solveChallenge:'চেলেঞ্জ লোইশিল্লো', makeDecision:'অরোইবা ৱারেপ', beginStory:'ৱারী হৌরক্লো', lifeGuide:'পুন্সি লমজিং', hintPlaceholder:'তেংথাং হাংলো…', send:'থাগৎলো', finalDecision:'অরোইবা ৱারেপ', decisionPrompt:'অদোম্না পুম্নমক অরাইবা লৌখ্রে. অচুম্বা পুন্সিদা করি তৌগদগে?', questResult:'ক্বেষ্ট ফল', claimRewards:'মানা লৌ', evidence:'অরাইবা', situationBrief:'ফিভম', goal:'পান্দম', storyComplete:'ৱারী লোইরে!', storyCompleteSub:'চ্যাপ্টর পুম্নমক লোইরে.', evidenceSecured:'অরাইবা শেন্দোক্রে!', levelComplete:'লেবেল লোইরে!', xpEarned:'XP ফংলে', sessionTotal:'সেসন মশীং', starsEarned:'থোইবী', perfectQuest:'পূর্ণা — 3 থোইবী!', questCleared:'ক্বেষ্ট লোইরে', puzzleChallenge:'চেলেঞ্জ', puzzleAttempts:'হোৎনবা লৈরি', puzzleLocked:'পাউখুম লক', puzzleCollect:'অরাইবা লৌশিল্লো', puzzleBack:'ৱারীদা হনবা', flowBriefing:'খোমজিল', flowStory:'ৱারী', flowDecision:'ৱারেপ', flowComplete:'লোইরে', welcomeGuide:'তরাম্না ওকচরি! পাউতাক পাবিয়ু.', chapterComplete:'চ্যাপ্টর লোইরে', verifiedResources:'য়েংশিনবা রিসোর্স', quests:'← ক্বেষ্ট', progress:'চাউখৎপা', logout:'লোগ আউট', guestMode:'মীথি মোদ', playGuest:'লোগইন য়াউদনা শান্নবীয়ু', skillQuests:'স্কিল ক্বেষ্ট', allEvidence:'অরাইবা পুম্নমক লৌশিনখ্রে!', score:'স্কোর', chapterOf:'চ্যাপ্টর', of:'গী', timeLeft:'থৌরাংগী লৈরি', puzzleTime:'মতম', puzzleTimeUp:'মতম লোইরে!', whatLearned:'অদোম্না করি তমখি', storyLabel:'ৱারী', investigate:'য়েংশিনবীয়ু', defaultObjective:'ৱারী পাবিয়ু, পজল লোইশিল্লো, ৱারেপ লৌবীয়ু.', interactHint:'নৎত্রগা ক্লিক —', greatDetective:'ফরে! অদোম্না করি তৌগদগে?', decisionReady:'অরাইবা পুম্নমক! ৱারেপ লৌবীয়ু →', chatPlaceholder:'অদোম্না করি হায়গদগে — টাইপ…', chatYourMove:'অদোমগী মতম.', chatFallback:'শান্তি লৈবীয়ু. পজল লোইশিল্লো.', solveForSolution:'পজল → ফবা থৌওং', officialHelp:'সরকারী মতেং', mentorSub:'অদোমগী লমজিংবা', evidenceYouFound:'অদোমগী অরাইবা', schemesAndHelplines:'স্কিম অমসুং হেল্পলাইন', learningTip:'অচুম্বা থৌওং ইবীয়ু.' }),
  brx: B({ searchLanguage:'राव सोल...', continue:'गावनो थां', back:'दावसालो', solveChallenge:'चैलेंज सोल', makeDecision:'जोबथा गोसो', beginStory:'राजानाय होनाय', lifeGuide:'जावनी गायदि', hintPlaceholder:'हेनाय…', send:'थाबाय', finalDecision:'जोबथा गोसो', decisionPrompt:'नंगनि गासो प्रमाण जादों. साबखो जावनियाव माथै?', questResult:'क्वेस्ट रेजाल्ट', claimRewards:'मानाय ना', evidence:'प्रमाण', situationBrief:'जायगा', goal:'गोसो', storyComplete:'राजानाय जाथाय!', storyCompleteSub:'गासो च्याप्टार जाथाय.', evidenceSecured:'प्रमाण सुरक्षित!', levelComplete:'लेबेल जाथाय!', xpEarned:'XP नागों', sessionTotal:'सेसन गासो', starsEarned:'सान', perfectQuest:'जाथाय — 3 सान!', questCleared:'क्वेस्ट जाथाय', puzzleChallenge:'चैलेंज', puzzleAttempts:'होथाय बाहाय', puzzleLocked:'जोबथा लक', puzzleCollect:'प्रमाण जादों', puzzleBack:'राजानायफराय', flowBriefing:'बिजिर', flowStory:'राजानाय', flowDecision:'गोसो', flowComplete:'जाथाय', welcomeGuide:'जोंगोम! मेसेज पार.', chapterComplete:'च्याप्टार जाथाय', verifiedResources:'जाथाय रिसोर्स', quests:'← क्वेस्ट', progress:'गावनो', logout:'लग आउट', guestMode:'गिजि मोड', playGuest:'लगइन जाया गिजि', skillQuests:'स्किल क्वेस्ट', allEvidence:'गासो प्रमाण जादों!', score:'स्कोर', chapterOf:'च्याप्टार', of:'याव', timeLeft:'दिननाय बाहाय', puzzleTime:'सानसे', puzzleTimeUp:'सानसे जाथाय!', whatLearned:'नंगनि मासेन', storyLabel:'राजानाय', investigate:'हेफा', defaultObjective:'राजानाय पार, पजल सोल, गोसो.', interactHint:'खारो क्लिक —', greatDetective:'गिबिथि! नंगनि गोसो?', decisionReady:'गासो प्रमाण! गोसो →', chatPlaceholder:'नंगनि माथै — टाइप…', chatYourMove:'नंगनि थार.', chatFallback:'सानसे. पजल सोल.', solveForSolution:'पजल → गिबिथि', officialHelp:'सरकारी हेल्प', mentorSub:'नंगनि गायदि', evidenceYouFound:'नंगनि प्रमाण', schemesAndHelplines:'स्किम हेल्पलाइन', learningTip:'साबखो थानाय लिख.' }),
  sat: B({ searchLanguage:'ᱯᱟᱹᱨᱥᱤ ᱥᱮᱱ...', continue:'ᱞᱟᱦᱟ ᱥᱮᱱ', back:'ᱛᱟᱭᱚᱢ', solveChallenge:'ᱪᱮᱞᱮᱱᱡ ᱥᱟᱹᱨᱤᱭᱟᱹ', makeDecision:'ᱢᱩᱪᱟᱹᱫ ᱜᱚᱴᱟ', beginStory:'ᱠᱟᱦᱱᱤ ᱮᱦᱚᱵ', lifeGuide:'ᱡᱤᱭᱚᱱ ᱜᱟᱭᱰ', hintPlaceholder:'ᱦᱤᱱᱴ…', send:'ᱠᱩᱞ', finalDecision:'ᱢᱩᱪᱟᱹᱫ ᱜᱚᱴᱟ', decisionPrompt:'ᱟᱢ ᱡᱚᱛᱚ ᱯᱟᱨᱢᱟᱱ ᱡᱟᱣᱨᱟ ᱟᱠᱟᱫᱟᱢ. ᱥᱟᱹᱨᱤ ᱡᱤᱭᱚᱱ ᱨᱮ ᱪᱮᱫ ᱠᱚᱨᱟᱣ?', questResult:'ᱠᱣᱮᱥᱴ ᱨᱤᱡᱟᱞᱴ', claimRewards:'ᱤᱱᱟᱢ ᱦᱟᱛᱟᱣ', evidence:'ᱯᱟᱨᱢᱟᱱ', situationBrief:'ᱥᱤᱛᱩᱣᱮᱥᱚᱱ', goal:'ᱜᱚᱞ', storyComplete:'ᱠᱟᱦᱱᱤ ᱯᱩᱨᱟᱹ!', storyCompleteSub:'ᱡᱚᱛᱚ ᱪᱟᱯᱴᱟᱨ ᱯᱩᱨᱟᱹ.', evidenceSecured:'ᱯᱟᱨᱢᱟᱱ ᱥᱩᱨᱚᱠᱥᱤᱛ!', levelComplete:'ᱞᱮᱵᱮᱞ ᱯᱩᱨᱟᱹ!', xpEarned:'XP ᱠᱟᱢᱟᱣ', sessionTotal:'ᱥᱮᱥᱚᱱ ᱴᱚᱴᱟᱞ', starsEarned:'ᱥᱟᱱ', perfectQuest:'ᱯᱩᱨᱟᱹ — 3 ᱥᱟᱱ!', questCleared:'ᱠᱣᱮᱥᱴ ᱯᱩᱨᱟᱹ', puzzleChallenge:'ᱪᱮᱞᱮᱱᱡ', puzzleAttempts:'ᱦᱚᱛ ᱵᱟᱹᱠᱤ', puzzleLocked:'ᱡᱚᱵᱟᱵ ᱞᱚᱠ', puzzleCollect:'ᱯᱟᱨᱢᱟᱱ ᱡᱟᱣᱨᱟ', puzzleBack:'ᱠᱟᱦᱱᱤ ᱨᱩᱣᱟᱹᱲ', flowBriefing:'ᱵᱨᱤᱯᱷ', flowStory:'ᱠᱟᱦᱱᱤ', flowDecision:'ᱜᱚᱴᱟ', flowComplete:'ᱯᱩᱨᱟᱹ', welcomeGuide:'ᱡᱚᱦᱟᱨ! ᱢᱮᱥᱮᱡ ᱯᱟᱲᱦᱟᱣ.', chapterComplete:'ᱪᱟᱯᱴᱟᱨ ᱯᱩᱨᱟᱹ', verifiedResources:'ᱵᱷᱮᱨᱤᱯᱷᱟᱭᱰ ᱨᱤᱥᱚᱨᱥ', quests:'← ᱠᱣᱮᱥᱴ', progress:'ᱯᱨᱚᱜᱨᱮᱥ', logout:'ᱞᱚᱜ ᱟᱣᱴ', guestMode:'ᱜᱮᱥᱴ ᱢᱚᱰ', playGuest:'ᱞᱚᱜᱤᱱ ᱵᱟᱝ ᱮᱱᱮᱡ', skillQuests:'ᱥᱠᱤᱞ ᱠᱣᱮᱥᱴ', allEvidence:'ᱡᱚᱛᱚ ᱯᱟᱨᱢᱟᱱ ᱡᱟᱣᱨᱟ!', score:'ᱥᱠᱚᱨ', chapterOf:'ᱪᱟᱯᱴᱟᱨ', of:'ᱨᱮ', timeLeft:'ᱧᱤᱫᱟ ᱵᱟᱹᱠᱤ', puzzleTime:'ᱥᱚᱢᱚᱭ', puzzleTimeUp:'ᱥᱚᱢᱚᱭ ᱪᱟᱵᱟ!', whatLearned:'ᱟᱢ ᱪᱮᱫ ᱥᱮᱬᱟ', storyLabel:'ᱠᱟᱦᱱᱤ', investigate:'ᱤᱱᱵᱷᱮᱥᱴᱤᱜᱮᱴ', defaultObjective:'ᱠᱟᱦᱱᱤ ᱯᱟᱲᱦᱟᱣ, ᱯᱟᱡᱞ ᱥᱟᱹᱨᱤᱭᱟᱹ, ᱜᱚᱴᱟ.', interactHint:'ᱵᱟᱝ ᱠᱞᱤᱠ —', greatDetective:'ᱵᱮᱥ! ᱟᱢ ᱪᱮᱫ ᱠᱚᱨᱟᱣ?', decisionReady:'ᱡᱚᱛᱚ ᱯᱟᱨᱢᱟᱱ! ᱜᱚᱴᱟ →', chatPlaceholder:'ᱟᱢ ᱪᱮᱫ ᱢᱮᱱᱟᱜ — ᱴᱟᱭᱯ…', chatYourMove:'ᱟᱢᱟᱜ ᱴᱟᱨᱱ.', chatFallback:'ᱥᱟᱱᱛᱤ ᱨᱮ ᱛᱟᱦᱮᱸᱱ. ᱯᱟᱡᱞ ᱥᱟᱹᱨᱤᱭᱟᱹ.', solveForSolution:'ᱯᱟᱡᱞ → ᱵᱮᱥ ᱠᱟᱹᱢᱤ', officialHelp:'ᱥᱚᱨᱠᱟᱨᱤ ᱜᱚᱲᱚ', mentorSub:'ᱟᱢᱟᱜ ᱜᱟᱭᱰ', evidenceYouFound:'ᱟᱢᱟᱜ ᱯᱟᱨᱢᱟᱱ', schemesAndHelplines:'ᱥᱠᱤᱢ ᱟᱨ ᱦᱮᱞᱯᱞᱟᱭᱤᱱ', learningTip:'ᱴᱤᱯ: ᱥᱟᱹᱨᱤ ᱠᱟᱹᱢᱤ ᱚᱞ.' })
};

window.i18n = {
  locale: localStorage.getItem('locale') || 'en',
  t(key) { const pack = window.I18N_STRINGS[this.locale] || EN; return pack[key] || EN[key] || key; },
  setLocale(code) {
    this.locale = code;
    localStorage.setItem('locale', code);
    document.documentElement.lang = code === 'en' ? 'en' : code;
    this.apply();
    window.dispatchEvent(new CustomEvent('locale:change', { detail: { locale: code } }));
  },
  apply() {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      const val = this.t(key);
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = val;
      else if (el.dataset.i18nHtml === 'true') el.innerHTML = val;
      else el.textContent = val;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.dataset.i18nPlaceholder;
      el.placeholder = this.t(key);
    });
    const sel = document.getElementById('lang-select');
    if (sel) sel.value = this.locale;
    const btnLabel = document.getElementById('lang-btn-label');
    if (btnLabel) {
      const lang = window.INDIAN_LANGUAGES.find(l => l.code === this.locale);
      btnLabel.textContent = lang ? lang.name.substring(0, 2).toUpperCase() : 'EN';
    }
    document.querySelectorAll('.lang-item').forEach(item => {
      item.classList.toggle('active', item.dataset.code === this.locale);
      item.setAttribute('aria-selected', item.dataset.code === this.locale ? 'true' : 'false');
    });
    const search = document.getElementById('lang-search');
    if (search) search.placeholder = this.t('searchLanguage') || 'Search language...';
  },
  _closeDropdown() {
    const dd = document.getElementById('lang-dropdown');
    if (dd) dd.classList.remove('open');
    const btn = document.getElementById('lang-btn');
    if (btn) btn.setAttribute('aria-expanded', 'false');
    const bd = document.getElementById('lang-backdrop');
    if (bd) bd.remove();
  },
  _openDropdown() {
    const dd = document.getElementById('lang-dropdown');
    if (!dd) return;
    dd.classList.add('open');
    const btn = document.getElementById('lang-btn');
    if (btn) btn.setAttribute('aria-expanded', 'true');
    if (!document.getElementById('lang-backdrop')) {
      const bd = document.createElement('div');
      bd.id = 'lang-backdrop';
      bd.className = 'lang-backdrop';
      bd.addEventListener('click', () => this._closeDropdown());
      document.body.appendChild(bd);
    }
    const search = document.getElementById('lang-search');
    if (search) { search.value = ''; search.focus(); this._filterLangs(''); }
    requestAnimationFrame(() => {
      const active = dd.querySelector('.lang-item.active');
      if (active) active.scrollIntoView({ block: 'nearest' });
    });
  },
  _filterLangs(query) {
    const q = query.toLowerCase().trim();
    document.querySelectorAll('.lang-item').forEach(item => {
      const name = (item.dataset.search || '').toLowerCase();
      item.style.display = (!q || name.includes(q)) ? '' : 'none';
    });
  },
  init() {
    const sel = document.getElementById('lang-select');
    if (sel && !sel.options.length) {
      window.INDIAN_LANGUAGES.forEach((lang) => {
        const opt = document.createElement('option');
        opt.value = lang.code;
        opt.textContent = `${lang.native} (${lang.name})`;
        sel.appendChild(opt);
      });
      sel.value = this.locale;
      sel.addEventListener('change', () => this.setLocale(sel.value));
    }
    const list = document.getElementById('lang-list');
    const btn = document.getElementById('lang-btn');
    const dd = document.getElementById('lang-dropdown');
    const search = document.getElementById('lang-search');
    if (list && btn && dd) {
      list.innerHTML = '';
      window.INDIAN_LANGUAGES.forEach((lang) => {
        const li = document.createElement('li');
        li.className = 'lang-item' + (lang.code === this.locale ? ' active' : '');
        li.dataset.code = lang.code;
        li.dataset.search = `${lang.name} ${lang.native} ${lang.code}`;
        li.setAttribute('role', 'option');
        li.setAttribute('aria-selected', lang.code === this.locale ? 'true' : 'false');
        li.tabIndex = 0;
        li.innerHTML = `<svg class="lang-item-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg><span class="lang-item-native">${lang.native}</span><span class="lang-item-en">${lang.name}</span>`;
        li.addEventListener('click', () => { this.setLocale(lang.code); this._closeDropdown(); });
        li.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.setLocale(lang.code); this._closeDropdown(); } });
        list.appendChild(li);
      });
      btn.addEventListener('click', () => { if (dd.classList.contains('open')) this._closeDropdown(); else this._openDropdown(); });
      if (search) {
        search.addEventListener('input', () => this._filterLangs(search.value));
        search.addEventListener('keydown', (e) => { if (e.key === 'Escape') this._closeDropdown(); });
      }
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && dd.classList.contains('open')) this._closeDropdown(); });
    }
    this.apply();
  }
};

document.addEventListener('DOMContentLoaded', () => window.i18n.init());
