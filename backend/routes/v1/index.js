const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const router = require('express').Router();

const currentVersion = __dirname.split(path.sep).pop();

console.info(`...Mounting ${currentVersion} routes`);

fs.readdir(__dirname, (err, files) => {
  if (err) return console.error('Error reading directory:', err);

  files.forEach(file => {
    if (file !== 'index.js' && file.endsWith('.js') && !file.endsWith('.ignore.js')) {
      const routeName = file.replace('.js', '');
      router.use(`/${routeName}`, require(path.join(__dirname, file)));
    }
  });
});

console.info(chalk.green(`...${currentVersion} routes mounted.`));

module.exports = router;