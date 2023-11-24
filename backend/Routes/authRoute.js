const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

//* Sign Up:
router.post('/api/Register', authController.SignUp);
//* Login:
router.post('/api/signin', authController.SignIn);

module.exports = router;
