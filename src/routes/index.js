const router = require('express').Router();

router.get('/', (req, res) => res.json({
  date: Date.now(),
  message: 'Unauthorized use of this service will result in immediate termination.',
  success: true
}));

module.exports = router;