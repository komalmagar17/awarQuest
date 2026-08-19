const asyncHandler = require('../utils/async-handler');

const tips = asyncHandler(async (_req, res) => {
  res.json({
    data: [
      { id: 'verify', title: 'Verify Official Sources', body: 'Use .gov.in portals and official app helplines before sharing personal data.' },
      { id: 'otp', title: 'Never Share OTPs', body: 'OTP codes authorize transactions. Banks never ask for them over phone or chat.' },
      { id: 'clues', title: 'Investigate First', body: 'Collect every clue in a mission before choosing your action.' },
      { id: 'report', title: 'Report Scams', body: 'Report cyber fraud at cybercrime.gov.in and tell a trusted adult.' }
    ]
  });
});

module.exports = { tips };
