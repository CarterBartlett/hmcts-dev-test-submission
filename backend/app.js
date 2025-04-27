const env = (process.env.NODE_ENV || 'development').toLowerCase();
if (env !== 'production') require('dotenv').config();

const chalk = require('chalk');

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

console.info(chalk.green(`Application initialized. Listening on port ${process.env.PORT || 3000}.`));

module.exports = app;