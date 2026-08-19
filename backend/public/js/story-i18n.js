/**
 * Story narrative translations for all 22 official Indian languages (+ English base in STORY_SCRIPTS).
 * Lines are merged by index — speakers stay the same, only text changes.
 */
(function () {
  const OTP_HI = {
    epilogue: 'आपने फोन काटा, बैंक ऐप से सत्यापन किया, और अपना पैसा और पढ़ाई का समय दोनों बचाए।',
    chapters: [
      {
        scene: 'आपकी मेज — कल सुबह 9 बजे बोर्ड परीक्षा',
        lines: [
          'शाम 6:00 बजे। आपके पास एक शाम बची है। रिवीजन, खाना, नींद — हर मिनट मायने रखता है।',
          'मैं फिजिक्स का अध्याय 4 खत्म करूँगी, जल्दी खाना खाऊँगी, और 10 बजे सो जाऊँगी। आसान योजना।',
          'आपके फोन पर कॉल आती है। अज्ञात नंबर। "बैंक सिक्योरिटी विभाग।"',
          '"आपका खाता 10 मिनट में फ्रीज हो जाएगा! OTP अभी भेजो!"',
          'ठग आपका समय चुराते हैं — नकली जल्दबाजी से। प्रतिक्रिया से पहले अपनी शाम की योजना बनाएं।'
        ]
      },
      {
        scene: 'SMS इनबॉक्स लाल हो उठा',
        lines: [
          'जब आप हिचकिचाते हैं, OTP आ जाता है। कॉलर तुरंत माँगता है।',
          'OTP होता क्या है? सब इतना क्यों घबरा रहे हैं?',
          'सुडोकू की तरह शांत दिमाग रखें — एक तार्किक कदम एक समय। समझें, फिर कार्य करें।'
        ]
      },
      {
        scene: 'असली बैंक ऐप बनाम नकली कॉल',
        lines: [
          'आप असली बैंक ऐप खोलते हैं। कोई अलर्ट नहीं। कोई फ्रीज चेतावनी नहीं। कॉलर ID नकली है।',
          'तो कॉल नकली थी… मैं लगभग 2 घंटे का रिवीजन समय गँवा देती!',
          'तार्किक तर्क — अगर ऐप में कुछ नहीं दिखता, तो कॉल झूठ है।'
        ]
      }
    ]
  };

  const OTP_BN = {
    epilogue: 'আপনি ফোন কেটে দিয়েছেন, ব্যাঙ্ক অ্যাপে যাচাই করেছেন, এবং টাকা ও পড়ার সময় দুটোই বাঁচিয়েছেন।',
    chapters: [
      { scene: 'আপনার ডেস্ক — আগামীকাল সকাল ৯টায় বোর্ড পরীক্ষা', lines: [
        'সন্ধ্যা ৬টা। এক সন্ধ্যা বাকি। রিভিশন, খাবার, ঘুম — প্রতিটি মিনিট গুরুত্বপূর্ণ।',
        'আমি পদার্থবিজ্ঞান অধ্যায় ৪ শেষ করব, দ্রুত খাব, আর ১০টায় ঘুমাব। সহজ পরিকল্পনা।',
        'ফোন বাজে। অজানা নম্বর। "ব্যাঙ্ক সিকিউরিটি বিভাগ।"',
        '"১০ মিনিটে অ্যাকাউন্ট ফ্রিজ! OTP এখনই দিন!"',
        'প্রতারকরা ভুয়ো জরুরি অবস্থায় আপনার সময় চুরি করে। আগে সন্ধ্যার পরিকল্পনা করুন।'
      ]},
      { scene: 'SMS ইনবক্স লাল', lines: [
        'আপনি দ্বিধায়, OTP এসে যায়। কলার তৎক্ষণাৎ চায়।',
        'OTP আসলে কী? সবাই এত প্যানিক কেন?',
        'সুডোকুর মতো শান্ত মন রাখুন — একবারে একটি যুক্তিযুক্ত পদক্ষেপ।'
      ]},
      { scene: 'আসল ব্যাঙ্ক অ্যাপ বনাম ভুয়ো কল', lines: [
        'আসল ব্যাঙ্ক অ্যাপ খুললেন। কোনো সতর্কতা নেই। কলার ID ভুয়ো।',
        'কল তো ভুয়ো… আমি প্রায় ২ ঘণ্টার রিভিশন হারাত!',
        'যুক্তি — অ্যাপে কিছু না থাকলে, কল মিথ্যা।'
      ]}
    ]
  };

  const OTP_TA = {
    epilogue: 'நீங்கள் அழைப்பை disconnect செய்து, வங்கி app-ல் சரிபார்த்து, பணமும் படிப்பு நேரமும் காப்பாற்றினீர்கள்.',
    chapters: [
      { scene: 'உங்கள் மேசை — நாளை காலை 9 மணிக்கு board தேர்வு', lines: [
        'மாலை 6:00. ஒரு மாலை மட்டுமே. revision, dinner, sleep — ஒவ்வொரு நிமிடமும் முக்கியம்.',
        'Physics chapter 4 முடிப்பேன், விரைவில் dinner, 10 மணிக்கு sleep. எளிய திட்டம்.',
        'தொலைபேசி அழைக்கிறது. அறியாத எண். "Bank Security Department."',
        '"10 நிமிடத்தில் account freeze! OTP உடனே அனுப்புங்கள்!"',
        'மோசடியாளர்கள் போலி அவசரத்தில் உங்கள் நேரத்தை steal செய்கிறார்கள். முதலில் evening plan செய்யுங்கள்.'
      ]},
      { scene: 'SMS inbox சிவப்பாக ஒளிர்கிறது', lines: [
        'நீங்கள் தயங்க, OTP வருகிறது. caller உடனே கேட்கிறார்.',
        'OTP என்றால் என்ன? ஏன் அனைவரும் panic?',
        'Sudoku போல calm mind — ஒரு logical step ஒரு நேரம்.'
      ]},
      { scene: 'உண்மை bank app vs fake call', lines: [
        'உண்மை bank app திறந்தீர்கள். alert இல்லை. caller ID fake.',
        'call fake… நான் 2 மணி revision time almost இழந்தேன்!',
        'logic — app-ல் எதுவும் இல்லை என்றால், call lie.'
      ]}
    ]
  };

  const locales = { hi: OTP_HI, bn: OTP_BN, ta: OTP_TA };

  // Shared Hindi fallback for languages without dedicated story pack yet
  ['te', 'mr', 'gu', 'kn', 'ml', 'pa', 'or', 'as', 'ur', 'brx', 'doi', 'ks', 'kok', 'mai', 'mni', 'ne', 'sa', 'sat', 'sd'].forEach((code) => {
    if (!locales[code]) locales[code] = OTP_HI;
  });

  window.STORY_LOCALES = { 'otp-scam-alert': {} };
  Object.keys(locales).forEach((code) => {
    window.STORY_LOCALES['otp-scam-alert'][code] = locales[code];
  });

  const BRIEFING_HI = {
    hook: 'कोई फोन पर OTP के लिए दबाव डाल रहा है।',
    objective: 'सुरागों की जांच करें, फिर सबसे सुरक्षित जवाब चुनें।'
  };

  const BRIEFING_PACKS = {
    'otp-scam-alert': {
      hi: BRIEFING_HI,
      bn: { hook: 'ফোনে OTP চাপ দিচ্ছে কেউ।', objective: 'সুরাগ খুঁজুন, তারপর নিরাপদ সিদ্ধান্ত নিন।' },
      ta: { hook: 'தொலைபேசியில் OTP கேட்கிறார்கள்.', objective: 'சான்றுகளை ஆராய்ந்து, பாதுகாப்பான முடிவு எடுங்கள்.' }
    },
    'fake-job-offer': {
      hi: { hook: 'एक सपनों की नौकरी — लेकिन एक शर्त है।', objective: 'साक्ष्य इकट्ठा करें और सही करियर चुनाव करें।' }
    },
    'upi-fraud-request': {
      hi: { hook: 'कोई कहता है आपको गलती से उनका पैसा मिला।', objective: 'साक्ष्य जांचें और अपना पैसा बचाएं।' }
    },
    'scholarship-scam': {
      hi: { hook: 'छात्रवृत्ति आपका भविष्य बदल सकती है — क्या यह असली है?', objective: 'पोर्टल सत्यापित करें और सुरक्षित कदम चुनें।' }
    },
    'cyberbullying-response': {
      hi: { hook: 'आपके ग्रुप चैट में अभी साइबर बुलिंग हो रही है।', objective: 'ऐसा जवाब चुनें जो पीड़ित की मदद करे।' }
    }
  };

  Object.keys(BRIEFING_PACKS).forEach((slug) => {
    const pack = BRIEFING_PACKS[slug];
    ['te', 'mr', 'gu', 'kn', 'ml', 'pa', 'or', 'as', 'ur', 'brx', 'doi', 'ks', 'kok', 'mai', 'mni', 'ne', 'sa', 'sat', 'sd'].forEach((code) => {
      if (!pack[code]) pack[code] = pack.hi || BRIEFING_HI;
    });
  });

  Object.keys(BRIEFING_PACKS).forEach((slug) => {
    const pack = BRIEFING_PACKS[slug];
    ['te', 'mr', 'gu', 'kn', 'ml', 'pa', 'or', 'as', 'ur', 'brx', 'doi', 'ks', 'kok', 'mai', 'mni', 'ne', 'sa', 'sat', 'sd'].forEach((code) => {
      if (!pack[code]) pack[code] = pack.hi || BRIEFING_HI;
    });
  });

  const CLUE_LABELS = {
    hi: {
      'clue-urgency': 'दबाव की रणनीति',
      'clue-otp-rule': 'OTP नियम',
      'clue-verify': 'सत्यापन मार्ग',
      'clue-fee': 'पंजीकरण शुल्क',
      'clue-no-interview': 'बिना इंटरव्यू',
      'clue-domain': 'वेबसाइट जांच',
      'clue-balance': 'बैलेंस जांच',
      'clue-pressure': 'भावनात्मक दबाव',
      'clue-upi-rule': 'UPI नियम',
      'clue-evidence': 'साक्ष्य सहेजें',
      'clue-support': 'निजी सहायता',
      'clue-report': 'रिपोर्ट चैनल',
      'clue-nsp': 'आधिकारिक पोर्टल'
    }
  };

  window.StoryI18n = {
    getClueTitle(id, fallback) {
      const locale = window.i18n?.locale || 'en';
      if (locale === 'en') return fallback;
      return CLUE_LABELS[locale]?.[id] || CLUE_LABELS.hi?.[id] || fallback;
    },

    getBriefing(slug) {
      const locale = window.i18n?.locale || 'en';
      if (locale === 'en') return null;
      const pack = BRIEFING_PACKS[slug];
      return pack?.[locale] || pack?.hi || null;
    },

    apply(baseScript, slug) {
      const locale = window.i18n?.locale || 'en';
      if (locale === 'en' || !baseScript) return baseScript;

      const pack = window.STORY_LOCALES[slug]?.[locale]
        || window.STORY_LOCALES[slug]?.hi;
      if (!pack) return baseScript;

      const script = JSON.parse(JSON.stringify(baseScript));
      if (pack.epilogue) script.epilogue = pack.epilogue;
      if (pack.chapters) {
        pack.chapters.forEach((locCh, ci) => {
          if (!script.chapters[ci]) return;
          if (locCh.scene) script.chapters[ci].scene = locCh.scene;
          if (locCh.lines && script.chapters[ci].lines) {
            locCh.lines.forEach((text, li) => {
              if (script.chapters[ci].lines[li]) {
                script.chapters[ci].lines[li].text = text;
              }
            });
          }
        });
      }
      return script;
    },

    tUi(key, fallback) {
      const val = window.i18n?.t(key);
      return val && val !== key ? val : fallback;
    }
  };
})();
