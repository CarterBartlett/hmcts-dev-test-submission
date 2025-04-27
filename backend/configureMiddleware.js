const chalk = require('chalk');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const passport = require('passport');

module.exports = async app => {
  console.info('Configuring middleware...');
  console.info('Mounting Morgan middleware...');
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  console.info('Mounting CookieParser middleware...')
  app.use(cookieParser());
  console.info('Mounting Express Session middleware...');
  app.use(session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions'
    }),
    saveUninitialized: true,
    cookie: {
        secure: true,
        httpOnly: true,
        maxAge: process.env.SESSION_MAX_AGE || 30 * 24 * 60 * 60 * 1000, // Defaults to 1 day if not set
        sameSite: 'none'
    },
    resave: false,
    proxy: true
}));

  console.info('Setting up Passport service...');
  app.use(passport.initialize());
  app.use(passport.session())
  require('./services/passport');
  console.info(chalk.green('All middleware configured.'));
}