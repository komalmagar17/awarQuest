/**
 * Interactive scenario chat agent — Gemini (user API key) + scripted NPC fallbacks.
 * Player types freely; NPCs (Scammer, Recruiter, Stranger, Life Guide, etc.) respond in character.
 * Rich pattern matching creates story-like conversations with branching consequences.
 */
window.ChatAgent = {
  STORAGE_KEY: 'gemini_api_key',
  MODEL: 'gemini-1.5-flash',

  getApiKey() {
    return localStorage.getItem(this.STORAGE_KEY) || '';
  },

  setApiKey(key) {
    const trimmed = (key || '').trim();
    if (trimmed) localStorage.setItem(this.STORAGE_KEY, trimmed);
    else localStorage.removeItem(this.STORAGE_KEY);
  },

  hasApiKey() {
    return !!this.getApiKey();
  },

  /** Official help links cited in replies and puzzles */
  HELP_LINKS: {
    cybercrime: { title: 'National Cyber Crime Portal', url: 'https://cybercrime.gov.in/', phone: '1930' },
    nsp: { title: 'National Scholarship Portal', url: 'https://scholarships.gov.in/' },
    ncs: { title: 'National Career Service', url: 'https://www.ncs.gov.in/' },
    myscheme: { title: 'myScheme — Government Schemes', url: 'https://www.myscheme.gov.in/' },
    childline: { title: 'Childline India', url: 'https://www.childlineindia.org.in/', phone: '1098' },
    banking: { title: 'RBI Sachet Portal', url: 'https://sachet.rbi.org.in/' }
  },

  SCENARIOS: {
    /* ───────── 1. THE UPI TRAP (otp-scam-alert) ───────── */
    'otp-scam-alert': {
      defaultSpeaker: 'Rinku',
      system: (ctx) => `You are an NPC in a life-skills game about UPI/customer-care scams in India.
Scene: ${ctx.scene}. Chapter goal: ${ctx.chapterGoal}.
Player name: ${ctx.heroName}. Locale: ${ctx.locale}.
Characters: Rinku (smooth-talking scammer posing as "PhonePe customer care"), Life Guide (calm mentor), Narrator (brief scene notes).
Rules:
- Rinku is pushy, uses fake urgency, flattery, and guilt.
- Life Guide explains scams calmly, teaches verification, NEVER tells player to share OTP.
- Keep replies under 3 sentences. Mention cybercrime.gov.in and helpline 1930 when relevant.
- If player says they would share the OTP, show consequences (money stolen).
- Reply in ${ctx.locale === 'en' ? 'English' : 'Hindi'}.
Return JSON only: {"speaker":"Rinku|Life Guide|Narrator","text":"reply"}`,
      fallbacks: [
        /* Sharing OTP — show consequence */
        { test: /share|send|give|otp is|here is|ye lo|bhej|दो|भेज|ये लो|1\d{5}|yes.*otp|ok.*send/i,
          speaker: 'Narrator',
          text: { en: '💸 You shared the OTP. Within 30 seconds, ₹8,400 was debited from your account. The "customer care" number is disconnected. This is exactly how UPI scams work — OTP authorizes real transactions.',
                  hi: '💸 आपने OTP भेज दिया। 30 सेकंड में आपके खाते से ₹8,400 कट गए। "कस्टमर केयर" नंबर बंद हो गया। OTP असली भुगतान अधिकृत करता है।' } },
        /* Refusing / blocking */
        { test: /block|refuse|no way|nahi|nah|no.*share|never|hang up|cut.*call|phone.*kaat|मना|ब्लॉक|नहीं/i,
          speaker: 'Rinku',
          text: { en: '"Sir please! Your refund will be lost FOREVER! I am a verified agent — check my badge! Many customers are waiting, I cannot hold this for you!"',
                  hi: '"सर प्लीज! आपका रिफंड हमेशा के लिए खो जाएगा! मैं verified एजेंट हूँ — बैज देखो! बहुत ग्राहक इंतज़ार कर रहे हैं!"' } },
        { test: /block|refuse|no way|nahi|nah|no.*share|never|hang up|cut.*call|phone.*kaat|मना|ब्लॉक|नहीं/i,
          speaker: 'Life Guide',
          text: { en: '✓ Great instinct! Block the profile. In real life, also report them on the platform and call 1930 within 24 hours. Reporting within the "golden hour" gives the best chance of freezing the scammer\'s account.',
                  hi: '✓ सही सोच! प्रोफाइल ब्लॉक करो। असली ज़िंदगी में प्लेटफॉर्म पर रिपोर्ट करो और 24 घंटे के अंदर 1930 पर कॉल करो।' } },
        /* Questioning the profile / verifying */
        { test: /fake|check|verify|google|who are|profile|real|official|कौन|जांच|सच्/i,
          speaker: 'Life Guide',
          text: { en: 'Good — you\'re questioning! Check: When was this profile created? How many followers? Does the official app have any alert? Scammer profiles are usually new with very few followers.',
                  hi: 'अच्छा — तुम जांच रहे हो! देखो: प्रोफाइल कब बना? कितने followers? आधिकारिक ऐप में कोई अलर्ट? ठगों की प्रोफाइल नई और कम followers वाली होती है।' } },
        /* Asking for official channels */
        { test: /official|helpline|report|1930|cybercrime|complaint|shikayat|शिकायत|हेल्पलाइन/i,
          speaker: 'Life Guide',
          text: { en: 'Cyber Crime Helpline: 1930 (24×7). Report at cybercrime.gov.in. Within 24 hours of financial fraud, banks have the best chance of freezing the scammer\'s account. Follow @cyberdost for safety tips.',
                  hi: 'साइबर क्राइम हेल्पलाइन: 1930 (24×7)। cybercrime.gov.in पर रिपोर्ट करो। 24 घंटे के अंदर रिपोर्ट करने पर बैंक ठग का खाता फ्रीज कर सकता है।' } },
        /* Fake urgency detection */
        { test: /urgent|fast|hurry|quick|jaldi|turant|5 min|10 min|expire/i,
          speaker: 'Life Guide',
          text: { en: '✓ You spotted it — fake urgency is the #1 scammer weapon. Real banks NEVER say "act in 5 minutes." They give you time to verify through official channels.',
                  hi: '✓ तुमने पकड़ लिया — नकली जल्दबाजी ठगों का #1 हथियार है। असली बैंक कभी "5 मिनट में करो" नहीं कहते।' } },
        /* Asking about OTP purpose */
        { test: /what.*otp|otp.*kya|otp.*means|otp.*purpose|otp.*kaise/i,
          speaker: 'Life Guide',
          text: { en: 'OTP = One-Time Password. It authorizes a REAL money transaction. Anyone with your OTP can move money from your account. Banks themselves NEVER ask for it on calls or DMs.',
                  hi: 'OTP = One-Time Password। यह असली भुगतान अधिकृत करता है। OTP वाले को आपके खाते से पैसा निकाल सकता है। बैंक कभी कॉल/DM पर नहीं माँगता।' } },
        /* Greetings / confusion */
        { test: /hello|hi|hey|who|what|kya|kaun|क्या|कौन|huh/i,
          speaker: 'Rinku',
          text: { en: '"Hello! This is Rinku from PhonePe Customer Care. Your payment of ₹1,299 failed. Share the OTP from your phone and I\'ll process your INSTANT refund!"',
                  hi: '"हैलो! मैं Rinku, PhonePe कस्टमर केयर से। आपका ₹1,299 का पेमेंट फेल हुआ। फोन पर आया OTP बताइए, तुरंत रिफंड होगा!"' } },
        /* Telling a friend / asking for help */
        { test: /friend|parent|mom|dad|mentor|teacher|ask.*help|dost|maa|papa|गुरु|दोस्त/i,
          speaker: 'Life Guide',
          text: { en: '✓ Asking for help is smart! In real life, tell a friend or family member before acting on any suspicious financial message. Two heads catch more red flags.',
                  hi: '✓ मदद माँगना smart है! असली ज़िंदगी में किसी दोस्त या परिवार को बताओ — दो दिमाग ज़्यादा red flags पकड़ते हैं।' } },
        /* Checking the bank app */
        { test: /bank.*app|check.*app|upi.*app|app.*check|open.*app|ऐप|बैंक/i,
          speaker: 'Life Guide',
          text: { en: '✓ Excellent — check your official bank/UPI app directly. If there\'s no alert or failed transaction there, the DM is a complete lie. Official apps are the only source of truth.',
                  hi: '✓ बढ़िया — आधिकारिक बैंक/UPI ऐप सीधे चेक करो। अगर वहाँ कोई अलर्ट नहीं, तो DM पूरी तरह झूठ है।' } }
      ],
      defaultReply: {
        speaker: 'Life Guide',
        text: { en: 'Think before acting under pressure. Open your official UPI app — is there really a failed transaction? If not, this is a scam. Report at cybercrime.gov.in or call 1930.',
                hi: 'दबाव में मत सोचो। आधिकारिक UPI ऐप खोलो — क्या सच में कोई फेल ट्रांजैक्शन है? नहीं तो यह धोखाधड़ी है। cybercrime.gov.in या 1930 पर रिपोर्ट करो।' }
      }
    },

    /* ───────── 2. THE JOB OFFER DM (fake-job-offer) ───────── */
    'fake-job-offer': {
      defaultSpeaker: 'Recruiter',
      system: (ctx) => `You are an NPC in a career-scam education game set in India.
Scene: ${ctx.scene}. Player: ${ctx.heroName}. Locale: ${ctx.locale}.
Characters: Recruiter (fake HR — pushy, uses salary bait + urgency), Life Guide (calm mentor).
Rules:
- Recruiter pushes ₹25k/week salary, ₹999 fee, demands Aadhaar/PAN.
- Life Guide teaches: real employers never charge fees, check ncs.gov.in, assertive questioning.
- If player says they'd pay, show identity theft consequences.
- Keep replies under 3 sentences. Mention ncs.gov.in and cybercrime.gov.in.
Return JSON only: {"speaker":"Recruiter|Life Guide|Narrator","text":"reply"}`,
      fallbacks: [
        /* Paying the fee */
        { test: /pay|999|done|send.*money|bhej|पैसे|भेज|pay.*fee|payment/i,
          speaker: 'Narrator',
          text: { en: '💸 You paid ₹999 and shared your Aadhaar photo. The "recruiter" blocked you within an hour. Your Aadhaar photo is now on the dark web — identity theft risk. This is how recruitment scams work.',
                  hi: '💸 आपने ₹999 दिए और आधार फोटो भेजी। "भर्तीकर्ता" ने एक घंटे में ब्लॉक कर दिया। आपका आधार अब dark web पर है — पहचान चोरी का खतरा।' } },
        /* Asking for company details */
        { test: /company|website|office|email|domain|linkedin|glassdoor|mca|कंपनी|वेबसाइट|ऑफिस/i,
          speaker: 'Recruiter',
          text: { en: '"Why do you need all that? We are a fast-growing startup! Just pay ₹999 and start earning tomorrow. Don\'t overthink — successful people take quick decisions!"',
                  hi: '"इतना क्यों सोचना? हम तेज़ी से बढ़ती startup हैं! बस ₹999 दो और कल से कमाओ। सफल लोग जल्दी फैसले लेते हैं!"' } },
        { test: /company|website|office|email|domain|linkedin|glassdoor|mca|कंपनी|वेबसाइट|ऑफिस/i,
          speaker: 'Life Guide',
          text: { en: '✓ Smart questioning! A legitimate company can always provide: registered office address, official email domain, MCA registration number, LinkedIn employees. If they dodge — it\'s a scam.',
                  hi: '✓ smart सवाल! असली कंपनी हमेशा दे सकती है: registered office, official email domain, MCA number, LinkedIn employees। टालमटोल = धोखा।' } },
        /* Refusing / reporting */
        { test: /no.*thank|refuse|report|fake|scam|block|nahi|नहीं|रिपोर्ट|धोखा/i,
          speaker: 'Life Guide',
          text: { en: '✓ Strong boundary setting! Report the profile on LinkedIn/Instagram. In real life, also file on cybercrime.gov.in under "online job fraud." Tell friends about this pattern so they don\'t fall for it.',
                  hi: '✓ मजबूत boundary! LinkedIn/Instagram पर प्रोफाइल रिपोर्ट करो। cybercrime.gov.in पर "online job fraud" में शिकायत दर्ज करो।' } },
        /* Questioning the salary / too good */
        { test: /25.?000|25k|salary|too.*good|too.*much|weekly|sach.*me|सच|ज़्यादा/i,
          speaker: 'Life Guide',
          text: { en: '✓ You spotted the salary bait. ₹25,000/week for "data entry" is 3-4× market rate. No legitimate employer pays that for simple tasks with zero experience required.',
                  hi: '✓ तुमने salary bait पकड़ लिया। "data entry" के ₹25,000/हफ्ता market rate से 3-4× ज़्यादा है। कोई असली employer ऐसा नहीं देता।' } },
        /* Asking about documents (Aadhaar/PAN) */
        { test: /aadhaar|pan.*card|document|id.*proof|kyc|आधार|पैन|दस्तावेज/i,
          speaker: 'Life Guide',
          text: { en: '🛑 Never share Aadhaar/PAN photos with unverified contacts. Real companies collect documents through official HR portals AFTER interviews — never via DM or WhatsApp.',
                  hi: '🛑 अनजान लोगों को आधार/PAN फोटो कभी मत दो। असली कंपनियाँ interview के बाद official HR portal पर documents लेती हैं — DM/WhatsApp पर नहीं।' } },
        /* Asking about the fee */
        { test: /fee|999|charge|registration|cost|शुल्क|पंजीकरण/i,
          speaker: 'Life Guide',
          text: { en: '🛑 Real employers NEVER charge registration, training, or security deposit fees. This is the biggest red flag. Report at cybercrime.gov.in if someone demands money for a job.',
                  hi: '🛑 असली employer कभी registration/training/security deposit शुल्क नहीं लेते। यह सबसे बड़ा red flag है। cybercrime.gov.in पर रिपोर्ट करो।' } },
        /* Asking for real job sites */
        { test: /real.*job|genuine|where.*find|ncs|sarkari|सरकारी|असली.*नौकरी/i,
          speaker: 'Life Guide',
          text: { en: 'Real job portals: ncs.gov.in (National Career Service), naukri.com, LinkedIn Jobs. Government jobs: ssc.nic.in, upsc.gov.in. Never pay any fee on these platforms.',
                  hi: 'असली job portals: ncs.gov.in (National Career Service), naukri.com, LinkedIn Jobs। सरकारी नौकरियाँ: ssc.nic.in, upsc.gov.in। इन पर कभी शुल्क नहीं।' } },
        /* Greetings */
        { test: /hello|hi|hey|interested|yes|haan|हाँ|जी/i,
          speaker: 'Recruiter',
          text: { en: '"Welcome Neha! Your profile is exactly what we need. ₹25,000/week, work from home, flexible hours. Just pay ₹999 registration and start tomorrow! Shall I send the payment link?"',
                  hi: '"Welcome! आपकी profile बिल्कुल हमारी ज़रूरत है। ₹25,000/हफ्ता, घर से काम, flexible hours। बस ₹999 registration दो और कल से शुरू! Payment link भेजू?"' } }
      ],
      defaultReply: {
        speaker: 'Life Guide',
        text: { en: 'Remember the red flags: upfront fees, no interview, document requests via DM, salary too high for simple work. Verify on ncs.gov.in. Report fakes at cybercrime.gov.in.',
                hi: 'Red flags याद रखो: अग्रिम शुल्क, बिना interview, DM पर दस्तावेज, सरल काम के लिए बहुत ज़्यादा salary। ncs.gov.in पर जाँचो। cybercrime.gov.in पर रिपोर्ट करो।' }
      }
    },

    /* ───────── 3. THE WRONG TRANSFER (upi-fraud-request) ───────── */
    'upi-fraud-request': {
      defaultSpeaker: 'Stranger',
      system: (ctx) => `UPI refund scam game set in India. Scene: ${ctx.scene}. Player: ${ctx.heroName}. Locale: ${ctx.locale}.
Characters: Stranger (desperate scammer using guilt + urgency), Life Guide (calm mentor).
Rules: Stranger uses guilt ("my mother needs medicine"), threats, fake screenshots. Life Guide teaches: check real app, dispute via bank, report at sachet.rbi.org.in.
Return JSON: {"speaker":"Stranger|Life Guide|Narrator","text":"reply"}`,
      fallbacks: [
        { test: /send.*back|refund|return.*money|15.?000|paisa|भेज.*वापस|पैसे/i,
          speaker: 'Narrator',
          text: { en: '💸 You sent ₹15,000 to their UPI ID. No money was ever received by you — the screenshot was fake. You just lost ₹15,000 to a refund scam.',
                  hi: '💸 आपने ₹15,000 उनके UPI पर भेज दिए। आपको कभी पैसा आया ही नहीं — screenshot नकली था। आपने ₹15,000 खो दिए।' } },
        { test: /check.*app|balance|open.*app|verify|upi.*app|ऐप.*चेक|बैलेंस/i,
          speaker: 'Life Guide',
          text: { en: '✓ Exactly right! Your real UPI app shows NO incoming ₹15,000. Balance unchanged = screenshot is fake. Screenshots can be edited in seconds with free apps.',
                  hi: '✓ बिल्कुल सही! असली UPI ऐप में ₹15,000 नहीं आए। बैलेंस नहीं बढ़ा = screenshot नकली। Free apps से seconds में screenshot edit होता है।' } },
        { test: /mother|medicine|help|emergency|desperate|ma|maa|माँ|दवा|मदद/i,
          speaker: 'Life Guide',
          text: { en: 'Guilt trips like "my mother needs medicine" are deliberate manipulation tactics. If someone truly sent money by mistake, the bank handles reversal — not WhatsApp guilt.',
                  hi: '"माँ को दवा चाहिए" जैसी guilt trips जानबूझकर manipulation है। सच में गलती से पैसा आया हो तो बैंक reversal करेगा — WhatsApp guilt नहीं।' } },
        { test: /police|threat|complain|arrest|पुलिस|शिकायत|धमकी/i,
          speaker: 'Life Guide',
          text: { en: 'Threats of police action are empty — scammers can\'t file complaints because they\'re criminals. If someone threatens you, call 1930 yourself and report the harassment.',
                  hi: 'पुलिस की धमकी खोखली है — ठग शिकायत नहीं कर सकते क्योंकि वे अपराधी हैं। धमकी मिले तो खुद 1930 पर कॉल करो।' } },
        { test: /screenshot|photo|image|proof|स्क्रीनशॉट|सबूत|फोटो/i,
          speaker: 'Life Guide',
          text: { en: 'Screenshots are NOT proof. Anyone can edit them with free apps like PicsArt or Canva. The ONLY proof is your actual bank/UPI app balance.',
                  hi: 'Screenshots सबूत नहीं। कोई भी PicsArt/Canva से edit कर सकता है। इकलौता सबूत: आपका असली बैंक/UPI ऐप बैलेंस।' } },
        { test: /dispute|bank.*complaint|rbi|sachet|विवाद|बैंक/i,
          speaker: 'Life Guide',
          text: { en: '✓ Correct process! Real wrong-transfer reversals happen through your bank\'s UPI dispute channel. Report at sachet.rbi.org.in and cybercrime.gov.in.',
                  hi: '✓ सही प्रक्रिया! गलत transfer reversal बैंक के UPI dispute channel से होता है। sachet.rbi.org.in और cybercrime.gov.in पर रिपोर्ट करो।' } },
        { test: /block|ignore|no.*send|nahi|refuse|नहीं|ब्लॉक/i,
          speaker: 'Stranger',
          text: { en: '"You are a thief! I sent you MY money and you won\'t return it? I will file a police FIR against you RIGHT NOW! Last chance — send ₹15,000 or face legal action!"',
                  hi: '"तुम चोर हो! मेरा पैसा तुम्हें भेजा और वापस नहीं कर रहे? मैं अभी FIR करवाऊँगा! आखिरी मौका — ₹15,000 भेजो वरना कानूनी कार्रवाई!"' } },
        { test: /hello|hi|who|kaun|kya|कौन|क्या/i,
          speaker: 'Stranger',
          text: { en: '"Hi! I accidentally transferred ₹15,000 to your UPI ID instead of my friend\'s. Please check — I\'m sending you the screenshot. Please return it ASAP, I\'m desperate!"',
                  hi: '"Hi! गलती से ₹15,000 आपके UPI पर चले गए। Screenshot भेज रहा हूँ। जल्दी वापस करो, मैं desperate हूँ!"' } }
      ],
      defaultReply: {
        speaker: 'Life Guide',
        text: { en: 'Never send money to a "new UPI ID" to reverse a transfer. Check your real app balance, raise a bank dispute, and report at cybercrime.gov.in / 1930.',
                hi: '"नए UPI ID" पर पैसा मत भेजो reversal के लिए। असली ऐप बैलेंस चेक करो, बैंक dispute उठाओ, cybercrime.gov.in / 1930 पर रिपोर्ट करो।' }
      }
    },

    /* ───────── 4. CYBERBULLYING (cyberbullying-response) ───────── */
    'cyberbullying-response': {
      defaultSpeaker: 'Narrator',
      system: (ctx) => `Cyberbullying support game. Scene: ${ctx.scene}. Player: ${ctx.heroName}. Locale: ${ctx.locale}.
Characters: Arjun (the player\'s friend), Life Guide (mentor), Narrator.
Teach: screenshot evidence, private support, report to trusted adult, Childline 1098, cybercrime.gov.in.
Return JSON: {"speaker":"Narrator|Life Guide|Arjun","text":"reply"}`,
      fallbacks: [
        { test: /screenshot|save|evidence|photo|record|स्क्रीनशॉट|सबूत|सहेज/i,
          speaker: 'Life Guide',
          text: { en: '✓ Document first! Screenshot everything before messages get deleted. Save timestamps and sender names. This evidence helps schools and cybercrime.gov.in take action.',
                  hi: '✓ पहले सबूत! messages delete होने से पहले screenshot लो। Timestamps और sender names सहेजो। यह स्कूल और cybercrime.gov.in को कार्रवाई में मदद करता है।' } },
        { test: /help|support|friend|victim|privately|dm|message.*ananya|मदद|सहायता|दोस्त/i,
          speaker: 'Life Guide',
          text: { en: '✓ Private support is powerful. Message: "Hey, I saw what\'s happening. That\'s not okay. I\'m here for you." Offer to go with them to a trusted adult together.',
                  hi: '✓ निजी सहायता शक्तिशाली है। Message करो: "मैंने देखा क्या हो रहा है। यह ठीक नहीं। मैं तुम्हारे साथ हूँ।" एक साथ किसी विश्वसनीय वयस्क के पास जाने की पेशकश करो।' } },
        { test: /fight|expose|argue|confront|group.*chat|झगड़ा|लड़ाई|बोल/i,
          speaker: 'Life Guide',
          text: { en: 'Public confrontation often makes bullying worse and can embarrass the victim more. Private support + telling a trusted adult is more effective and safer.',
                  hi: 'सार्वजनिक झगड़ा अक्सर bullying बढ़ाता है और पीड़ित को और शर्मिंदा करता है। निजी सहायता + विश्वसनीय वयस्क को बताना ज़्यादा असरदार है।' } },
        { test: /teacher|counselor|parent|adult|principal|report|शिक्षक|माता-पिता|रिपोर्ट/i,
          speaker: 'Life Guide',
          text: { en: '✓ Telling a trusted adult is crucial. A teacher, counselor, or parent can intervene effectively. For serious cases involving threats or explicit content, report at cybercrime.gov.in.',
                  hi: '✓ विश्वसनीय वयस्क को बताना ज़रूरी है। शिक्षक, counselor, या माता-पिता प्रभावी ढंग से हस्तक्षेप कर सकते हैं। गंभीर मामलों में cybercrime.gov.in पर रिपोर्ट करो।' } },
        { test: /childline|1098|serious|threat|explicit|गंभीर|धमकी/i,
          speaker: 'Life Guide',
          text: { en: 'For children in distress: Childline India — call 1098 (24×7). For serious cyberbullying with threats/explicit content: cybercrime.gov.in. Both are confidential.',
                  hi: 'परेशान बच्चों के लिए: Childline India — 1098 (24×7) कॉल करो। गंभीर cyberbullying (धमकी/explicit content): cybercrime.gov.in। दोनों confidential हैं।' } },
        { test: /ignore|nothing|not.*my.*problem|चुप|कुछ.*नहीं/i,
          speaker: 'Life Guide',
          text: { en: 'Ignoring bullying lets it continue. Even one person speaking up privately can change everything. You don\'t have to fight publicly — just support the victim and tell an adult.',
                  hi: 'Bullying को ignore करना उसे जारी रहने देता है। एक व्यक्ति का privately बोलना सब बदल सकता है। publicly लड़ना ज़रूरी नहीं — बस पीड़ित का साथ दो और वयस्क को बताओ।' } },
        { test: /hello|hi|hey|what.*do|huh/i,
          speaker: 'Narrator',
          text: { en: 'The group chat is still exploding with embarrassing photos of Ananya. She hasn\'t replied in 20 minutes. What do you do?',
                  hi: 'ग्रुप चैट में अभी भी अनन्या की शर्मनाक फोटो वायरल हो रही हैं। 20 मिनट से उसने जवाब नहीं दिया। तुम क्या करोगे?' } }
      ],
      defaultReply: {
        speaker: 'Life Guide',
        text: { en: 'Remember: (1) Screenshot evidence, (2) Support victim privately, (3) Tell a trusted adult, (4) Report serious cases at cybercrime.gov.in. Small actions make big differences.',
                hi: 'याद रखो: (1) सबूत screenshot करो, (2) पीड़ित को privately सहारा दो, (3) विश्वसनीय वयस्क को बताओ, (4) गंभीर मामले cybercrime.gov.in पर रिपोर्ट करो।' }
      }
    },

    /* ───────── 5. SCHOLARSHIP SCAM (scholarship-scam) ───────── */
    'scholarship-scam': {
      defaultSpeaker: 'Website',
      system: (ctx) => `Fake scholarship portal game. Scene: ${ctx.scene}. Player: ${ctx.heroName}. Locale: ${ctx.locale}.
Characters: Website (aggressive fake portal), Life Guide (mentor), Meera (player character thoughts).
Teach: scholarships.gov.in is the real NSP, government schemes never charge fees, myscheme.gov.in.
Return JSON: {"speaker":"Website|Life Guide|Meena|Narrator","text":"reply"}`,
      fallbacks: [
        { test: /pay|500|fee|processing|card.*detail|शुल्क|पैसे|भुगतान/i,
          speaker: 'Life Guide',
          text: { en: '🛑 STOP! Government scholarships NEVER charge processing fees. The real NSP (scholarships.gov.in) is 100% free. This countdown timer is a manipulation tactic.',
                  hi: '🛑 रुको! सरकारी छात्रवृत्ति कभी शुल्क नहीं लेती। असली NSP (scholarships.gov.in) 100% मुफ्त है। यह countdown timer manipulation है।' } },
        { test: /real.*portal|official|nsp|scholarship.*gov|असली|आधिकारिक/i,
          speaker: 'Life Guide',
          text: { en: 'The real National Scholarship Portal is scholarships.gov.in (.gov.in domain). Find more schemes on myscheme.gov.in. Never trust .org or .com for government services.',
                  hi: 'असली National Scholarship Portal: scholarships.gov.in (.gov.in domain)। ज़्यादा योजनाएँ myscheme.gov.in पर। .org या .com पर भरोसा मत करो।' } },
        { test: /domain|url|\.org|\.com|\.gov|website.*check|डोमेन/i,
          speaker: 'Life Guide',
          text: { en: '✓ Checking the domain is smart! Government sites use .gov.in or .nic.in. "scholarship-gov-india.org" is NOT the same as "scholarships.gov.in" — it\'s designed to trick you.',
                  hi: '✓ domain जाँचना smart है! सरकारी साइटें .gov.in या .nic.in use करती हैं। "scholarship-gov-india.org" ≠ "scholarships.gov.in" — यह धोखा देने के लिए बना है।' } },
        { test: /deadline|time.*left|countdown|urgent|hurry|समय|जल्दी/i,
          speaker: 'Life Guide',
          text: { en: 'Fake countdown timers are pressure tactics. The real NSP deadline is the same for everyone and shown on scholarships.gov.in — no per-user countdown.',
                  hi: 'नकली countdown timers दबाव की चाल हैं। असली NSP deadline सबके लिए एक जैसी है — scholarships.gov.in पर दिखती है।' } },
        { test: /report|fake|complaint|shikayat|रिपोर्ट|शिकायत/i,
          speaker: 'Life Guide',
          text: { en: 'Report fake scholarship portals at cybercrime.gov.in. Also flag them to Google via Safe Browsing report so others don\'t see the ad.',
                  hi: 'नकली scholarship portals cybercrime.gov.in पर रिपोर्ट करो। Google Safe Browsing report भी करो ताकि दूसरों को ad न दिखे।' } },
        { test: /hello|hi|what.*is|kya.*hai|क्या/i,
          speaker: 'Website',
          text: { en: '"Congratulations! You are eligible for ₹50,000 National Scholarship 2026. Pay ₹500 processing fee within 15 minutes to secure your seat! 847 students already applied today."',
                  hi: '"बधाई! आप ₹50,000 National Scholarship 2026 के लिए eligible हैं। 15 मिनट में ₹500 processing fee दो — सीट सुरक्षित करो! आज 847 students ने पहले ही apply किया।"' } }
      ],
      defaultReply: {
        speaker: 'Life Guide',
        text: { en: 'Official NSP: scholarships.gov.in (free, .gov.in only). More schemes: myscheme.gov.in. Government scholarships never charge processing fees. Report fakes at cybercrime.gov.in.',
                hi: 'आधिकारिक NSP: scholarships.gov.in (मुफ्त, .gov.in)। ज़्यादा योजनाएँ: myscheme.gov.in। सरकारी छात्रवृत्ति में शुल्क नहीं। नकली cybercrime.gov.in पर रिपोर्ट करो।' }
      }
    }
  },

  locale() {
    return window.i18n?.locale || 'en';
  },

  pickText(obj) {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    const loc = this.locale();
    return obj[loc] || obj.hi || obj.en || '';
  },

  buildContext(slug, chapter, script, chatHistory) {
    const heroName = script?.hero?.name || 'Player';
    return {
      slug,
      scene: chapter?.scene || '',
      chapterGoal: chapter?.goal || chapter?.scene || '',
      heroName,
      locale: this.locale(),
      mentor: script?.mentor?.name || 'Life Guide',
      history: chatHistory.slice(-8)
    };
  },

  scriptedReply(slug, playerMessage, ctx) {
    const pack = this.SCENARIOS[slug] || this.SCENARIOS['otp-scam-alert'];
    const msg = playerMessage.toLowerCase();

    /* Collect all matching replies (not just the first) for richer responses */
    const matches = [];
    for (const rule of pack.fallbacks || []) {
      if (rule.test.test(msg)) {
        matches.push(rule);
      }
    }

    if (matches.length === 0) {
      const def = pack.defaultReply || {};
      return { speaker: def.speaker || pack.defaultSpeaker || 'Life Guide', text: this.pickText(def.text) };
    }

    /* If one match, return it directly */
    if (matches.length === 1) {
      const m = matches[0];
      return { speaker: m.speaker, text: this.pickText(m.text) };
    }

    /* If multiple matches, combine the scammer/NPC response with the mentor guidance */
    const npcReply = matches.find(m => m.speaker !== 'Life Guide' && m.speaker !== 'Narrator');
    const guideReply = matches.find(m => m.speaker === 'Life Guide');
    const narratorReply = matches.find(m => m.speaker === 'Narrator');

    /* If there's a consequence (narrator) response, prioritize it */
    if (narratorReply) {
      return { speaker: 'Narrator', text: this.pickText(narratorReply.text) };
    }

    /* Combine NPC + mentor for story feel */
    if (npcReply && guideReply) {
      return { speaker: npcReply.speaker, text: this.pickText(npcReply.text) + '\n\n' + this.pickText(guideReply.text) };
    }

    /* Fallback to first match */
    const first = matches[0];
    return { speaker: first.speaker, text: this.pickText(first.text) };
  },

  async geminiReply(apiKey, slug, playerMessage, ctx) {
    const pack = this.SCENARIOS[slug] || this.SCENARIOS['otp-scam-alert'];
    const system = typeof pack.system === 'function' ? pack.system(ctx) : pack.system;
    const historyText = (ctx.history || [])
      .map((h) => `${h.role === 'player' ? ctx.heroName : h.speaker}: ${h.text}`)
      .join('\n');

    const prompt = `${system}\n\nChat so far:\n${historyText}\n${ctx.heroName}: ${playerMessage}\n\nRespond as JSON:`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 256 }
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `Gemini error ${res.status}`);
    }

    const data = await res.json();
    const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      if (parsed.text) return { speaker: parsed.speaker || 'Life Guide', text: parsed.text };
    }
    return { speaker: 'Life Guide', text: raw.slice(0, 280) };
  },

  async reply({ slug, playerMessage, chapter, script, chatHistory }) {
    const ctx = this.buildContext(slug, chapter, script, chatHistory);
    const key = this.getApiKey();

    if (key) {
      try {
        const ai = await this.geminiReply(key, slug, playerMessage, ctx);
        return { ...ai, source: 'gemini' };
      } catch (err) {
        console.warn('Gemini unavailable:', err.message);
      }
    }

    const scripted = this.scriptedReply(slug, playerMessage, ctx);
    return { ...scripted, source: 'script' };
  }
};
