const mongoose = require('mongoose');
const DB_URI = process.env.MONGO_URI;
const chalk = require('chalk');
if (!DB_URI) {
  throw new Error('MONGO_URI is not defined');
}

console.info('Connecting to MongoDB...');
const connection = mongoose.createConnection(DB_URI);
console.info(chalk.green('Connected to MongoDB.'));

module.exports = connection;