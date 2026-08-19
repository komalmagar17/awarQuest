#!/usr/bin/env node
/**
 * Seeds published life-skills missions into the database.
 * Safe to run multiple times — uses upsert on slug.
 */
const { connectDatabase, sequelize } = require('../config/db');
const { Scenario } = require('../models');

const MISSIONS = [
  {
    slug: 'otp-scam-alert',
    title: 'Mission 1: The Exam Eve — OTP Scam',
    summary: 'Board exam tomorrow. A scam call threatens your account — and steals your study time. A time-management story.',
    ageGroup: 'all',
    difficulty: 1,
    skillTags: ['digital_safety'],
    isPublished: true,
    content: {
      topic: 'digital_safety',
      scenario: 'Your phone rings. The caller ID shows "Bank Support". They say suspicious activity was detected and you must share the OTP sent to your phone immediately, or your account will be frozen within 10 minutes.',
      estimatedMinutes: 6,
      presentation: {
        hook: 'Someone is pressuring you for an OTP over the phone.',
        objective: 'Investigate the clues, then choose the safest response.'
      },
      learningObjectives: [
        'Protect study time from scam urgency',
        'Banks never ask for OTPs over phone calls',
        'Plan your evening with time-management puzzles'
      ],
      interactables: [
        { id: 'phone', label: 'Incoming Call', type: 'object' },
        { id: 'sms', label: 'SMS Inbox', type: 'object' },
        { id: 'bank-app', label: 'Official Bank App', type: 'object' }
      ],
      clues: [
        { id: 'clue-urgency', title: 'Pressure Tactic', description: 'The caller creates artificial urgency — "10 minutes or account frozen". Legitimate banks do not operate this way.' },
        { id: 'clue-otp-rule', title: 'OTP Rule', description: 'OTP means One-Time Password. It authorizes transactions. Sharing it gives the scammer access to your money.' },
        { id: 'clue-verify', title: 'Verification Path', description: 'Your bank app shows no alerts. The official helpline number on your debit card differs from the caller ID.' }
      ],
      options: [
        { id: 'share-otp', text: 'Share the OTP quickly before the account is frozen', score: 50, stars: 0, outcome: 'The scammer drains your account. Never share OTPs with anyone.' },
        { id: 'ask-callback', text: 'Ask them to call back tomorrow', score: 200, stars: 1, outcome: 'Delaying without verification still leaves you vulnerable to follow-up scams.' },
        { id: 'hangup-verify', text: 'Hang up and call the official number on your bank card or app', score: 900, stars: 3, outcome: 'Correct! You verified through official channels. The bank confirms no such call was made.' },
        { id: 'share-partial', text: 'Share only the first 3 digits to prove it is your phone', score: 100, stars: 0, outcome: 'Partial sharing still helps scammers. Never share any part of an OTP.' }
      ],
      explanation: 'Legitimate banks never ask for OTPs over phone calls. OTPs authorize transactions — sharing them gives scammers access to your money. Always hang up and verify through your official bank app or the number printed on your card.',
      safeHint: 'Look at the clues: urgency and OTP requests are red flags. Use your official bank app to check for real alerts.',
      verifiedAlerts: [{ type: 'OTP_FRAUD', priority: 'CRITICAL' }],
      resources: [
        { title: 'Cyber Crime Reporting', url: 'https://cybercrime.gov.in/', isVerified: true }
      ]
    }
  },
  {
    slug: 'fake-job-offer',
    title: 'Mission 2: Too Good to Be True Job',
    summary: 'You receive a WhatsApp message offering a work-from-home job with instant payment — but they want a "registration fee" first.',
    ageGroup: 'all',
    difficulty: 2,
    skillTags: ['career_awareness'],
    isPublished: true,
    content: {
      topic: 'career_awareness',
      scenario: 'A recruiter messages you on WhatsApp about a data-entry job paying ₹25,000/month. No interview needed. They ask for ₹2,000 as a "security deposit" to send your offer letter.',
      estimatedMinutes: 7,
      presentation: {
        hook: 'A dream job offer arrives — but there is a catch.',
        objective: 'Gather evidence and pick the wisest career move.'
      },
      learningObjectives: [
        'Legitimate employers do not charge registration fees',
        'Verify companies on official portals',
        'High pay with no interview is a red flag'
      ],
      interactables: [
        { id: 'whatsapp', label: 'WhatsApp Message', type: 'object' },
        { id: 'company-site', label: 'Company Website', type: 'object' }
      ],
      clues: [
        { id: 'clue-fee', title: 'Registration Fee', description: 'Real employers never ask candidates to pay for jobs. Fees before employment are a classic fraud sign.' },
        { id: 'clue-no-interview', title: 'No Interview', description: 'Legitimate companies conduct interviews and background checks. Instant hiring without verification is suspicious.' },
        { id: 'clue-domain', title: 'Website Check', description: 'The company website was registered last week. The address on the site is a residential building.' }
      ],
      options: [
        { id: 'pay-fee', text: 'Pay the ₹2,000 fee to secure the job quickly', score: 50, stars: 0, outcome: 'You lose the money and never receive a job. This was a recruitment scam.' },
        { id: 'share-aadhaar', text: 'Share Aadhaar copy to prove you are serious', score: 100, stars: 0, outcome: 'Your identity documents can be misused for fraud. Never share Aadhaar with unverified recruiters.' },
        { id: 'verify-portal', text: 'Search the company on Startup India / MCA portal and report if unverified', score: 900, stars: 3, outcome: 'Correct! The company is not registered. You avoided the scam and can report it on the National Career Service portal.' },
        { id: 'ignore', text: 'Ignore the message and do nothing', score: 300, stars: 1, outcome: 'You avoided the scam but did not report it. Others may still fall victim.' }
      ],
      explanation: 'Legitimate employers never charge registration or security fees. Verify companies through official government portals like Startup India, MCA, or National Career Service before sharing any personal information.',
      safeHint: 'Check the clues about fees and the suspicious website. Real jobs do not require payment upfront.',
      verifiedAlerts: [{ type: 'JOB_SCAM', priority: 'HIGH' }],
      resources: [
        { title: 'National Career Service', url: 'https://www.ncs.gov.in/', isVerified: true },
        { title: 'Startup India', url: 'https://www.startupindia.gov.in/', isVerified: true }
      ]
    }
  },
  {
    slug: 'upi-fraud-request',
    title: 'Mission 3: The "Wrong Transfer" Trick',
    summary: 'A stranger says they accidentally sent you ₹15,000 via UPI and asks you to send it back — but the SMS looks fake.',
    ageGroup: 'all',
    difficulty: 2,
    skillTags: ['financial_literacy'],
    isPublished: true,
    content: {
      topic: 'financial_literacy',
      scenario: 'You get a message: "I sent ₹15,000 to your UPI by mistake. Please return it to this number: scammer@paytm." A screenshot shows a "successful" transfer, but your bank balance is unchanged.',
      estimatedMinutes: 7,
      presentation: {
        hook: 'Someone claims you received their money by accident.',
        objective: 'Examine the evidence and protect your finances.'
      },
      learningObjectives: [
        'Always verify UPI credits in your actual bank app',
        'Screenshots can be faked',
        'Refund scams exploit guilt and urgency'
      ],
      interactables: [
        { id: 'upi-app', label: 'UPI / Banking App', type: 'object' },
        { id: 'screenshot', label: 'Transfer Screenshot', type: 'object' }
      ],
      clues: [
        { id: 'clue-balance', title: 'Balance Check', description: 'Your actual bank/UPI app shows no incoming ₹15,000. Screenshots are easily edited.' },
        { id: 'clue-pressure', title: 'Emotional Pressure', description: 'The sender uses guilt: "I need it for my mother\'s medicine." Scammers exploit emotions.' },
        { id: 'clue-upi-rule', title: 'UPI Reversal Rule', description: 'Real mistaken transfers are reversed through the bank/UPI app, not by sending money to a new number.' }
      ],
      options: [
        { id: 'send-back', text: 'Send ₹15,000 back immediately — they seem desperate', score: 50, stars: 0, outcome: 'You sent real money for a fake transfer. The screenshot was edited.' },
        { id: 'send-partial', text: 'Send ₹5,000 as a goodwill gesture', score: 150, stars: 0, outcome: 'Any amount sent is lost. The transfer never happened.' },
        { id: 'check-app', text: 'Check your bank app and ask them to raise a dispute through official UPI channels', score: 900, stars: 3, outcome: 'Correct! No money was received. You blocked the scammer and learned to verify in your official app.' },
        { id: 'share-upi-pin', text: 'Share your UPI PIN so they can "reverse" it themselves', score: 0, stars: 0, outcome: 'Never share UPI PINs. This would give full access to your account.' }
      ],
      explanation: 'Always verify UPI credits in your official banking app — not via screenshots. Real mistaken transfers are handled through bank/UPI dispute channels, not by sending money to unknown numbers.',
      safeHint: 'The balance clue is key: if money is not in your app, the screenshot is fake.',
      verifiedAlerts: [{ type: 'UPI_FRAUD', priority: 'HIGH' }],
      resources: [
        { title: 'Udyam / MSME Support', url: 'https://udyamregistration.gov.in/', isVerified: true }
      ]
    }
  },
  {
    slug: 'cyberbullying-response',
    title: 'Mission 4: Stand Up Safely Online',
    summary: 'A classmate is being targeted in a group chat with mean messages and edited photos. You witness it happening live.',
    ageGroup: 'all',
    difficulty: 3,
    skillTags: ['mental_health'],
    isPublished: true,
    content: {
      topic: 'mental_health',
      scenario: 'In your class WhatsApp group, someone posts edited embarrassing photos of a quiet classmate with cruel captions. Others are laughing. The victim has left the group.',
      estimatedMinutes: 8,
      presentation: {
        hook: 'Cyberbullying is happening in your group chat right now.',
        objective: 'Choose a response that helps the victim safely.'
      },
      learningObjectives: [
        'Document evidence before reporting',
        'Support victims privately',
        'Use official reporting channels'
      ],
      interactables: [
        { id: 'group-chat', label: 'Group Chat', type: 'object' },
        { id: 'victim-dm', label: 'Message Victim', type: 'object' }
      ],
      clues: [
        { id: 'clue-evidence', title: 'Save Evidence', description: 'Take screenshots of bullying messages before they are deleted. Evidence helps school authorities and cyber crime reporting.' },
        { id: 'clue-support', title: 'Private Support', description: 'Reach out to the victim privately. Public confrontation can escalate bullying.' },
        { id: 'clue-report', title: 'Report Channels', description: 'Report to a trusted teacher, school counselor, and cybercrime.gov.in for serious cases.' }
      ],
      options: [
        { id: 'join-laugh', text: 'Join in with a laughing emoji to fit in', score: 0, stars: 0, outcome: 'You became part of the bullying. This causes lasting harm to the victim.' },
        { id: 'public-fight', text: 'Publicly insult the bullies in the group chat', score: 200, stars: 1, outcome: 'Escalation can make things worse for everyone. Direct confrontation in the group rarely helps.' },
        { id: 'support-report', text: 'Privately support the victim, save screenshots, and report to a teacher', score: 900, stars: 3, outcome: 'Correct! You supported the victim, preserved evidence, and involved a trusted adult. The school takes action.' },
        { id: 'ignore', text: 'Leave the group and pretend you did not see anything', score: 150, stars: 1, outcome: 'Silence allows bullying to continue. Bystanders have power to help.' }
      ],
      explanation: 'The best response to cyberbullying: privately support the victim, save evidence (screenshots), and report to a trusted adult or cybercrime.gov.in. Never participate or publicly escalate.',
      safeHint: 'Combine the evidence, support, and report clues for the strongest response.',
      verifiedAlerts: [{ type: 'CYBERBULLYING', priority: 'CRITICAL' }],
      resources: [
        { title: 'Cyber Crime Reporting', url: 'https://cybercrime.gov.in/', isVerified: true }
      ]
    }
  },
  {
    slug: 'scholarship-scam',
    title: 'Mission 5: Fake Scholarship Portal',
    summary: 'A website promises a ₹50,000 government scholarship — but asks for your Aadhaar, bank details, and a "processing fee".',
    ageGroup: '18-24',
    difficulty: 3,
    skillTags: ['education_awareness'],
    isPublished: true,
    content: {
      topic: 'education_awareness',
      scenario: 'You find a site "scholarship-gov-india.org" offering PM Scholarship ₹50,000. It looks official but the URL is not .gov.in. It asks for Aadhaar, bank account, and ₹500 processing fee.',
      estimatedMinutes: 8,
      presentation: {
        hook: 'A scholarship could change your future — but is it real?',
        objective: 'Verify the portal and choose the safest action.'
      },
      learningObjectives: [
        'Government schemes use official .gov.in domains',
        'Never pay fees for scholarships',
        'Verify on National Scholarship Portal'
      ],
      interactables: [
        { id: 'fake-site', label: 'Scholarship Website', type: 'object' },
        { id: 'nsp', label: 'National Scholarship Portal', type: 'object' }
      ],
      clues: [
        { id: 'clue-domain', title: 'Domain Check', description: 'Official government sites end in .gov.in or .nic.in. "scholarship-gov-india.org" is not official.' },
        { id: 'clue-fee', title: 'Processing Fee', description: 'Government scholarships never charge processing fees. Any fee request is fraudulent.' },
        { id: 'clue-nsp', title: 'Official Portal', description: 'The real National Scholarship Portal is scholarships.gov.in — listed on IGOD government directory.' }
      ],
      options: [
        { id: 'pay-and-apply', text: 'Pay ₹500 and submit all details to apply quickly', score: 50, stars: 0, outcome: 'Your money and personal data are stolen. The scholarship does not exist.' },
        { id: 'share-aadhaar', text: 'Share Aadhaar and bank details but skip the fee', score: 100, stars: 0, outcome: 'Identity theft risk remains. Fake portals harvest data even without payment.' },
        { id: 'use-nsp', text: 'Go to scholarships.gov.in and apply only through the official portal', score: 900, stars: 3, outcome: 'Correct! You found the legitimate National Scholarship Portal with real government schemes.' },
        { id: 'forward-friends', text: 'Forward the link to friends so they can apply too', score: 50, stars: 0, outcome: 'Spreading scam links puts others at risk. Always verify before sharing.' }
      ],
      explanation: 'Government scholarships are only available through official portals like scholarships.gov.in (.gov.in domain). Never pay processing fees or share Aadhaar on unofficial websites.',
      safeHint: 'Check the domain clue — .gov.in is the mark of official government sites in India.',
      verifiedAlerts: [{ type: 'SCHOLARSHIP_SCAM', priority: 'HIGH' }],
      resources: [
        { title: 'National Scholarship Portal', url: 'https://scholarships.gov.in/', isVerified: true }
      ]
    }
  }
];

async function seed() {
  await connectDatabase();
  let created = 0;
  let updated = 0;

  for (const mission of MISSIONS) {
    const [row, wasCreated] = await Scenario.upsert(mission, { conflictFields: ['slug'] });
    if (wasCreated) created += 1;
    else updated += 1;
    console.log(`${wasCreated ? 'Created' : 'Updated'}: ${mission.title}`);
  }

  const total = await Scenario.count({ where: { isPublished: true } });
  console.log(`\nDone. ${created} created, ${updated} updated. ${total} published missions available.`);
  await sequelize.close();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
