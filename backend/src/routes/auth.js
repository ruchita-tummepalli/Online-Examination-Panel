const express = require('express');
const { register, login } = require('../controllers/authController');
const { validateUser } = require('../middleware/validation');

const router = express.Router();

router.post('/register', validateUser, register);
router.post('/login', login);

module.exports = router;