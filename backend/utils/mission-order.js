const MISSION_SLUG_ORDER = [
  'otp-scam-alert',
  'fake-job-offer',
  'upi-fraud-request',
  'cyberbullying-response',
  'scholarship-scam'
];

function sortMissions(missions) {
  return [...missions].sort((a, b) => {
    const ai = MISSION_SLUG_ORDER.indexOf(a.slug);
    const bi = MISSION_SLUG_ORDER.indexOf(b.slug);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });
}

module.exports = { MISSION_SLUG_ORDER, sortMissions };
