const express = require('express');
const { protect } = require('../middlewares/auth');
const {
  signUp,
  signIn,
  signOut,
  getMe,
  updateDetails,
  updatePassword,
} = require('../controllers/auth');

const router = express.Router();

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.post('/sign-out', signOut);

router.use(protect);
router.get('/me', getMe);
router.put('/update-details', updateDetails);
router.put('/update-password', updatePassword);

module.exports = router;
