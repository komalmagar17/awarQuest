const asyncHandler = require('../utils/async-handler');
const { PlayerProgress, Scenario } = require('../models');

const summary = asyncHandler(async (req, res) => {
  const progress = await PlayerProgress.findAll({ where: { userId: req.user.id } });
  const completed = progress.filter((p) => p.status === 'completed');
  const totalStars = completed.reduce((sum, p) => sum + (p.bestStars || 0), 0);
  const totalScore = completed.reduce((sum, p) => sum + Number(p.lastEvidence?.score || 0), 0);
  const publishedCount = await Scenario.count({ where: { isPublished: true } });

  res.json({
    data: {
      missionsCompleted: completed.length,
      missionsTotal: publishedCount,
      totalStars,
      totalScore,
      perfectRuns: completed.filter((p) => p.bestStars >= 3).length,
      winReady: completed.length >= publishedCount && publishedCount > 0 && completed.every((p) => p.bestStars >= 3)
    }
  });
});

module.exports = { summary };
