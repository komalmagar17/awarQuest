const asyncHandler = require('../utils/async-handler');
const { PlayerProfile } = require('../models');
const AppError = require('../utils/app-error');

const get = asyncHandler(async (req, res) => {
  const profile = await PlayerProfile.findOne({ where: { userId: req.user.id } });
  if (!profile) throw new AppError(404, 'PROFILE_NOT_FOUND', 'Player profile not found.');
  res.json({
    data: {
      userId: req.user.id,
      username: req.user.username,
      fullName: profile.fullName,
      avatarUrl: profile.avatarUrl,
      bio: profile.bio,
      preferences: profile.preferences || {}
    }
  });
});

const update = asyncHandler(async (req, res) => {
  const { fullName, avatarUrl, bio, preferences } = req.body;
  const [profile] = await PlayerProfile.findOrCreate({
    where: { userId: req.user.id },
    defaults: { preferences: {} }
  });

  if (fullName !== undefined) profile.fullName = fullName;
  if (avatarUrl !== undefined) profile.avatarUrl = avatarUrl;
  if (bio !== undefined) profile.bio = bio;
  if (preferences !== undefined) profile.preferences = { ...(profile.preferences || {}), ...preferences };

  await profile.save();
  res.json({ data: profile });
});

module.exports = { get, update };
