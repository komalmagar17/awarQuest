const { User } = require('../models');
const { connectDatabase, sequelize } = require('../config/db');
const logger = require('../config/logger');

const identifier = process.argv[2];

if (!identifier) {
  console.error('Usage: node scripts/grant-admin.js <username_or_email>');
  process.exit(1);
}

async function run() {
  await connectDatabase();
  const user = await User.findOne({ 
    where: { 
      [require('sequelize').Op.or]: [{ username: identifier }, { email: identifier }] 
    } 
  });

  if (!user) {
    console.error('User not found');
    process.exit(1);
  }

  user.role = 'admin';
  await user.save();
  console.log(`User ${user.username} is now an admin.`);
  await sequelize.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
