const router = require('express').Router();
const users = require('../models/users');
const { verifyToken } = require('../middleware');

router.get('/', verifyToken, async (req, res) => {
  try {
    const list = await users.listByUsersDepartment(req.user.department);

    if (!list.length) {
      res.status(404).json({
        message: "No users.",
        success: false
      });
    } else {
      res.json({
        success: true,
        users: list
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Users could not be retrieved.",
      success: false
    });
  }
});

module.exports = router;