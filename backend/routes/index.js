const chalk = require('chalk');

// Expose routes to application
module.exports = app => {
  console.info('Mounting routes...');
  app.use('/v1', require('./v1'));
  console.info(chalk.green('All routes mounted.'));
}