const bcrypt = require('bcrypt');
const router = require('express').Router();
const users = require('../models/users');

router.post('/register', async (req, res) => {
  let user = req.body;
  const { username, password } = user;
  const length = Object.keys(user).length;

  try {
    if (!length) {
      res.status(400).json({
        message: "No information.",
        success: false
      });
    } else if (!username || !password) {
      res.status(400).json({
        message: "No username or password.",
        success: false
      });
    } else {
      user.password = bcrypt.hashSync(password, 10);
      user = await users.new(user);

      if (user) {
        res.status(201).json({
          message: "User registered successfully.",
          success: true
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "User could not be registered.",
      success: false
    });
  }
});

module.exports = router;