var express = require('express');
var router = express.Router();
const passport = require('passport');

const User = require('../../models/user.js');

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.send(req.user);
});

router.post('/logout', (req,res)=>{
  try {
    req.logout(()=>res.send(true));
  } catch(err) {
    res.status(500).send(err);
  }
});

router.post('/register', async(req,res) => {
  try {
    const {username, password} = req.body;
    const user = new User({
        username,
        password
    });
    try {
      await user.validate();
      await user.save();
      res.send(user);
    } catch(err) {
      console.error(err);
      res.status(500).send(err);
    }
} catch (err) {
    console.error(err);
    res.status(500).send(err);
}
});

router.get('/user', (req,res) => res.send(req.user ?? false));

module.exports = router;