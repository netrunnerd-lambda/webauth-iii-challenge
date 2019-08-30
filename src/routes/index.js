const router = require('express').Router();

const authRoutes = require('./auth');
const userRoutes = require('./users');

router.get('/', (req, res) => res.json({
  date: Date.now(),
  message: 'Unauthorized use of this service will result in immediate termination.',
  success: true
}));

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;