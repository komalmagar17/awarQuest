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
  language: 'Language',
  continue: 'Continue',
  back: 'Back',
  solveChallenge: 'Solve Challenge',
  makeDecision: 'Make Final Decision',
  beginStory: 'Begin Story Adventure',
  lifeGuide: 'Life Guide',
  hintPlaceholder: 'Ask for a hint…',
  send: 'Send',
  finalDecision: 'Final Decision',
  decisionPrompt: 'You collected all evidence. What would you do in real life?',
  questResult: 'Quest Result',
  claimRewards: 'Claim Rewards & Level Up',
  evidence: 'Evidence',
  situationBrief: 'Situation Brief',
  goal: 'Goal',
  storyComplete: 'Story Complete!',
  storyCompleteSub: 'All chapters cleared — time for your real-world decision.',
  evidenceSecured: 'Evidence Secured!',
  levelComplete: 'Level Complete!',
  xpEarned: 'XP Earned',
  sessionTotal: 'Session Total',
  starsEarned: 'Stars',
  perfectQuest: 'Perfect Run — 3 Stars!',
  questCleared: 'Quest Cleared',
  puzzleChallenge: 'Challenge',
  puzzleAttempts: 'Attempts left',
  puzzleLocked: 'Lock My Answer',
  puzzleCollect: 'Collect Evidence',
  puzzleBack: 'Back to story',
  flowBriefing: 'Briefing',
  flowStory: 'Story',
  flowDecision: 'Decision',
  flowComplete: 'Complete',
  welcomeGuide: 'Welcome! Read each message, tap Continue, and solve chapter challenges.',
  chapterComplete: 'Chapter complete',
  verifiedResources: 'Verified Resources',
  quests: '← Quests',
  progress: 'Progress',
  logout: 'Logout',
  guestMode: 'Guest Mode',
  playGuest: 'Play as Guest — No Login',
  skillQuests: 'Skill Quests',
  allEvidence: 'All evidence collected! Make your real-world decision.',
  score: 'Score',
  chapterOf: 'Chapter',
  of: 'of',
  timeLeft: 'left tonight',
  puzzleTime: 'Time',
  puzzleTimeUp: 'Time is up! Review the hint and try again.',
  mathMarathon: 'Matiks Marathon',
  sudoku6: 'Expert 6×6 Sudoku',
  jigsaw4: '4×4 Slide Master',
  whatLearned: 'What you learned',
  storyLabel: 'Story',
  investigate: 'Investigate',
  defaultObjective: 'Read the story, solve timed puzzles chapter by chapter, then decide.',
  interactHint: 'or Click —',
  greatDetective: 'Great detective work! Now choose what you would actually do.',
  decisionReady: 'All evidence collected! Make your real-world decision →',
  storyModeHint: 'Story mode — read each message, solve timed puzzles, then decide.',
  chatPlaceholder: 'Type what you would say or do…',
  chatYourMove: 'Your turn — type how you would handle this situation.',
  chatFallback: 'Take a breath. Solve the puzzle to unlock the safest action and official helplines.',
  solveForSolution: 'Solve puzzle → unlock best action',
  officialHelp: 'Official help & helplines',
  aiSettingsTitle: 'Gemini AI — Live Chat Replies',
  aiSettingsHelp: 'Paste your free Google Gemini API key. NPCs will reply intelligently to what you type. Without a key, scripted replies still work.',
  aiKeyLabel: 'API Key',
  aiKeySave: 'Save Key',
  aiKeyClear: 'Remove Key',
  aiKeySaved: 'Gemini key saved — live AI replies enabled!',
  aiKeyRemoved: 'Key removed — using scripted replies.',
  aiKeyMissing: 'Enter your API key first.',
  mentorSub: 'Your mentor — ask when stuck',
  tierExpert: 'Expert — you cited real actions & official resources (+ full XP)',
  tierStandard: 'Standard — chat & puzzle path (50% XP)',
  tierPuzzle: 'Puzzle shortcut — review schemes below (50% XP)',
  expertBonus: 'expert bonus',
  xpReduced: '50% XP',
  evidenceYouFound: 'Evidence you unlocked',
  schemesAndHelplines: 'Schemes & official helplines',
  learningTip: 'Tip: Type real actions — e.g. "I visited cybercrime.gov.in and reported it" — for full XP next time.'
};

const HI = {
  ...EN,
  language: 'भाषा',
  continue: 'आगे बढ़ें',
  back: 'वापस',
  solveChallenge: 'चुनौती हल करें',
  makeDecision: 'अंतिम निर्णय लें',
  beginStory: 'कहानी शुरू करें',
  lifeGuide: 'जीवन मार्गदर्शक',
  hintPlaceholder: 'संकेत पूछें…',
  send: 'भेजें',
  finalDecision: 'अंतिम निर्णय',
  decisionPrompt: 'आपने सभी साक्ष्य एकत्र किए। वास्तविक जीवन में आप क्या करेंगे?',
  questResult: 'क्वेस्ट परिणाम',
  claimRewards: 'इनाम लें और आगे बढ़ें',
  evidence: 'साक्ष्य',
  situationBrief: 'स्थिति संक्षिप्त',
  goal: 'लक्ष्य',
  storyComplete: 'कहानी पूर्ण!',
  storyCompleteSub: 'सभी अध्याय पूरे — अब वास्तविक निर्णय का समय।',
  evidenceSecured: 'साक्ष्य सुरक्षित!',
  levelComplete: 'स्तर पूरा!',
  xpEarned: 'XP मिला',
  sessionTotal: 'सत्र कुल',
  starsEarned: 'सितारे',
  perfectQuest: 'पूर्ण रन — 3 सितारे!',
  questCleared: 'क्वेस्ट पूरा',
  puzzleChallenge: 'चुनौती',
  puzzleAttempts: 'प्रयास शेष',
  puzzleLocked: 'मेरा उत्तर लॉक करें',
  puzzleCollect: 'साक्ष्य एकत्र करें',
  puzzleBack: 'कहानी पर वापस',
  flowBriefing: 'संक्षिप्त',
  flowStory: 'कहानी',
  flowDecision: 'निर्णय',
  flowComplete: 'पूर्ण',
  welcomeGuide: 'स्वागत है! संदेश पढ़ें, आगे बढ़ें दबाएँ, और समयबद्ध पहेलियाँ हल करें।',
  chapterComplete: 'अध्याय पूरा',
  verifiedResources: 'सत्यापित संसाधन',
  quests: '← क्वेस्ट',
  progress: 'प्रगति',
  logout: 'लॉग आउट',
  guestMode: 'अतिथि मोड',
  playGuest: 'बिना लॉगिन अतिथि के रूप में खेलें',
  skillQuests: 'कौशल क्वेस्ट',
  allEvidence: 'सभी साक्ष्य एकत्र! वास्तविक निर्णय लें।',
  score: 'स्कोर',
  chapterOf: 'अध्याय',
  of: 'में से',
  timeLeft: 'आज रात शेष',
  puzzleTime: 'समय',
  puzzleTimeUp: 'समय समाप्त! संकेत देखें और पुनः प्रयास करें।',
  mathMarathon: 'मैटिक्स मैराथन',
  sudoku6: 'विशेषज्ञ 6×6 सुडोकू',
  jigsaw4: '4×4 स्लाइड मास्टर',
  whatLearned: 'आपने क्या सीखा',
  storyLabel: 'कहानी',
  investigate: 'जांच करें',
  defaultObjective: 'कहानी पढ़ें, समयबद्ध पहेलियाँ हल करें, फिर निर्णय लें।',
  interactHint: 'या क्लिक —',
  greatDetective: 'शाबाश! अब चुनें कि वास्तव में क्या करेंगे।',
  decisionReady: 'सभी साक्ष्य एकत्र! अपना निर्णय लें →',
  storyModeHint: 'कहानी मोड — संदेश पढ़ें, चैट करें, पहेली हल करें, फिर निर्णय लें।',
  chatPlaceholder: 'आप क्या कहेंगे या करेंगे — लिखें…',
  chatYourMove: 'आपकी बारी — इस स्थिति में क्या करेंगे, लिखें।',
  chatFallback: 'शांत रहें। सबसे सुरक्षित कदम और हेल्पलाइन के लिए पहेली हल करें।',
  solveForSolution: 'पहेली हल करें → सही कदम जानें',
  officialHelp: 'आधिकारिक सहायता और हेल्पलाइन',
  aiSettingsTitle: 'Gemini AI — लाइव चैट जवाब',
  aiSettingsHelp: 'अपनी मुफ्त Google Gemini API key यहाँ चिपकाएँ। NPC आपके संदेशों का intelligent जवाब देंगे। Key के बिना scripted जवाब चलेंगे।',
  aiKeyLabel: 'API Key',
  aiKeySave: 'Key सहेजें',
  aiKeyClear: 'Key हटाएँ',
  aiKeySaved: 'Gemini key सहेजी — live AI चालू!',
  aiKeyRemoved: 'Key हटाई — scripted जवाब।',
  aiKeyMissing: 'पहले API key दर्ज करें।',
  mentorSub: 'आपका मार्गदर्शक — अटकें तो पूछें',
  tierExpert: 'विशेषज्ञ — आपने असली कार्य और आधिकारिक संसाधन बताए (+ पूरा XP)',
  tierStandard: 'सामान्य — चैट और पहेली (50% XP)',
  tierPuzzle: 'पहेली शॉर्टकट — नीचे योजनाएँ देखें (50% XP)',
  expertBonus: 'विशेषज्ञ बोनस',
  xpReduced: '50% XP',
  evidenceYouFound: 'आपने जो साक्ष्य खोले',
  schemesAndHelplines: 'योजनाएँ और आधिकारिक हेल्पलाइन',
  learningTip: 'सुझाव: असली कदम लिखें — जैसे "मैंने cybercrime.gov.in पर रिपोर्ट की" — पूरे XP के लिए।'
};

function buildLocale(overrides = {}) {
  return { ...EN, ...HI, ...overrides };
}

window.I18N_STRINGS = {
  en: EN,
  hi: HI,
  bn: buildLocale({ continue: 'চালিয়ে যান', back: 'পিছনে', beginStory: 'গল্প শুরু করুন', lifeGuide: 'জীবন গাইড', hintPlaceholder: 'ইঙ্গিত চান…', send: 'পাঠান', levelComplete: 'স্তর সম্পূর্ণ!', claimRewards: 'পুরস্কার নিন', quests: '← কвест', flowBriefing: 'সংক্ষিপ্ত', flowStory: 'গল্প', flowDecision: 'সিদ্ধান্ত', flowComplete: 'সম্পূর্ণ', evidence: 'প্রমাণ', situationBrief: 'পরিস্থিতি', goal: 'লক্ষ্য', welcomeGuide: 'স্বাগত! বার্তা পড়ুন, চালিয়ে যান চাপুন, সময়সীমা পাজল সমাধান করুন।' }),
  ta: buildLocale({ continue: 'தொடரவும்', back: 'பின்னால்', beginStory: 'கதையை தொடங்குங்கள்', lifeGuide: 'வாழ்க்கை வழிகாட்டி', hintPlaceholder: 'குறிப்பு கேளுங்கள்…', send: 'அனுப்பு', levelComplete: 'நிலை முடிந்தது!', claimRewards: 'பரிசை பெறுங்கள்', quests: '← கвест்', flowBriefing: 'சுருக்கம்', flowStory: 'கதை', flowDecision: 'முடிவு', flowComplete: 'முடிந்தது', evidence: 'சான்று', situationBrief: 'நிலைமை', goal: 'இலக்கு', welcomeGuide: 'வரவேற்கிறோம்! செய்திகளைப் படித்து, தொடரவும் அழுத்தி, நேர விளையாட்டுகளைத் தீர்க்கவும்.' }),
  te: buildLocale({ continue: 'కొనసాగించు', back: 'వెనక్కి', beginStory: 'కథ ప్రారంభించండి', lifeGuide: 'జీవిత మార్గదర్శి', hintPlaceholder: 'హింట్ అడగండి…', send: 'పంపు', levelComplete: 'స్థాయి పూర్తి!', claimRewards: 'బహుమతి పొందండి' }),
  mr: buildLocale({ continue: 'पुढे जा', back: 'मागे', beginStory: 'कथा सुरू करा', lifeGuide: 'जीवन मार्गदर्शक', hintPlaceholder: 'सूचना विचारा…', send: 'पाठवा', levelComplete: 'स्तर पूर्ण!', claimRewards: 'बक्षीस घ्या' }),
  gu: buildLocale({ continue: 'આગળ વધો', back: 'પાછળ', beginStory: 'કથા શરૂ કરો', lifeGuide: 'જીવન માર્ગદર્શક', hintPlaceholder: 'સંકેત પૂછો…', send: 'મોકલો', levelComplete: 'લેવલ પૂર્ણ!', claimRewards: 'ઇનામ લો' }),
  kn: buildLocale({ continue: 'ಮುಂದುವರಿಸಿ', back: 'ಹಿಂದೆ', beginStory: 'ಕಥೆ ಪ್ರಾರಂಭಿಸಿ', lifeGuide: 'ಜೀವನ ಮಾರ್ಗದರ್ಶಕ', hintPlaceholder: 'ಸುಳಿವು ಕೇಳಿ…', send: 'ಕಳುಹಿಸಿ', levelComplete: 'ಮಟ್ಟ ಪೂರ್ಣ!', claimRewards: 'ಬಹುಮಾನ ಪಡೆಯಿರಿ' }),
  ml: buildLocale({ continue: 'തുടരുക', back: 'പിന്നോട്ട്', beginStory: 'കഥ തുടങ്ങുക', lifeGuide: 'ജീവിത ഗൈഡ്', hintPlaceholder: 'സൂചന ചോദിക്കുക…', send: 'അയയ്ക്കുക', levelComplete: 'ലെവൽ പൂർത്തി!', claimRewards: 'സമ്മാനം നേടുക' }),
  pa: buildLocale({ continue: 'ਜਾਰੀ ਰੱਖੋ', back: 'ਪਿੱਛੇ', beginStory: 'ਕਹਾਣੀ ਸ਼ੁਰੂ ਕਰੋ', lifeGuide: 'ਜੀਵਨ ਗਾਈਡ', hintPlaceholder: 'ਸੰਕੇਤ ਪੁੱਛੋ…', send: 'ਭੇਜੋ', levelComplete: 'ਪੱਧਰ ਪੂਰਾ!', claimRewards: 'ਇਨਾਮ ਲਵੋ' }),
  or: buildLocale({ continue: 'ଆଗକୁ ବଢ଼ନ୍ତୁ', back: 'ପଛକୁ', beginStory: 'କାହାଣୀ ଆରମ୍ଭ', lifeGuide: 'ଜୀବନ ଗାଇଡ୍', hintPlaceholder: 'ସୂଚନା ପଚାରନ୍ତୁ…', send: 'ପଠାନ୍ତୁ', levelComplete: 'ସ୍ତର ସମ୍ପୂର୍ଣ!', claimRewards: 'ପୁରସ୍କାର ନିଅନ୍ତୁ' }),
  as: buildLocale({ continue: 'আগবাঢ়ক', back: 'পিছলৈ', beginStory: 'কাহিনী আৰম্ভ', lifeGuide: 'জীৱন গাইড', hintPlaceholder: 'ইংগিত সুধিব…', send: 'পঠিয়াওক', levelComplete: 'স্তৰ সম্পূৰ্ণ!', claimRewards: 'পুৰস্কাৰ লওক' }),
  ur: buildLocale({ continue: 'جاری رکھیں', back: 'واپس', beginStory: 'کہانی شروع', lifeGuide: 'زندگی رہنما', hintPlaceholder: 'اشارہ پوچھیں…', send: 'بھیجیں', levelComplete: 'لیول مکمل!', claimRewards: 'انعام لیں', quests: '← کویسٹ', flowBriefing: 'خلاصہ', flowStory: 'کہانی', flowDecision: 'فیصلہ', flowComplete: 'مکمل', evidence: 'ثبوت', situationBrief: 'صورتحال', goal: 'مقصد', welcomeGuide: 'خوش آمدید! پیغامات پڑھیں، جاری رکھیں دبائیں، اور وقت والی پہیلیاں حل کریں۔' })
};

['brx', 'doi', 'ks', 'kok', 'mai', 'mni', 'ne', 'sa', 'sat', 'sd'].forEach((code) => {
  if (!window.I18N_STRINGS[code]) window.I18N_STRINGS[code] = buildLocale({});
});

window.i18n = {
  locale: localStorage.getItem('locale') || 'en',

  t(key) {
    const pack = window.I18N_STRINGS[this.locale] || EN;
    return pack[key] || EN[key] || key;
  },

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
      else el.textContent = val;
    });
    const sel = document.getElementById('lang-select');
    if (sel) sel.value = this.locale;
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
    this.apply();
  }
};

document.addEventListener('DOMContentLoaded', () => window.i18n.init());
