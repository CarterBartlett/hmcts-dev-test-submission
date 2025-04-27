const env = (process.env.NODE_ENV || 'development').toLowerCase();
if (env !== 'production') require('dotenv').config();
const chalk = require('chalk');

verifyEnvironmentVariables(process.env);

console.log(chalk.blue('Initializing application...'));
console.info('Current environment:', env==='production' ? chalk.red(env) : env);

const fs = require('fs');
if (env !== 'production') {
  fs.existsSync('.env') && console.info(chalk.green('Environment variables loaded from .env file'));
  fs.existsSync('.env.', env) && console.info(chalk.green(`Environment variables loaded from .env.${env} file`));
}

var express = require('express');
var app = express();

require('./configureMiddleware')(app); // Configures any middleware as defined in configureMiddleware.js
require('./routes')(app); // Import routes

console.info(chalk.green(`Application initialized. Listening on port ${process.env.PORT || 5000}.`));

module.exports = app;

// Function to verify required environment variables
function verifyEnvironmentVariables(env) {
  var abort = false;
  const requiredEnvVars = ['MONGO_URI', 'SESSION_SECRET'];
  const missingEnvVars = requiredEnvVars.filter(varName => !env[varName]);

  if (env.NODE_ENV === 'production') {
    // Require 16 characters for SESSION_SECRET in production to follow OWASP security guidelines
    if(env.SESSION_SECRET.length<16) {
      console.error(chalk.red('SESSION_SECRET must be at least 16 characters long in production mode.'));
      abort = true;
    }
  }

  if (missingEnvVars.length > 0) {
    console.error(chalk.red('Missing environment variables:'), missingEnvVars.join(', '));
    abort = true;
  }

  if (abort) process.exit(1);
}