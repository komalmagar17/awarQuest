const asyncHandler = require('../utils/async-handler');
const { PlayerSkill } = require('../models');

const list = asyncHandler(async (req, res) => {
  const skills = await PlayerSkill.findAll({ where: { userId: req.user.id }, order: [['indicator', 'DESC']] });
  res.json({ data: skills });
});

module.exports = { list };
