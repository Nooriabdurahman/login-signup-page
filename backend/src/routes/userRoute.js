const express = require('express');
const {
  getUsers,
  createUser,
  loginUser,
} = require('../controlers/usercontrolls');

const { sendcode , verfycode } = require('../controlers/emailsender')

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.post('/login', loginUser); 
router.post('/send-code', sendcode) 
router.post('/verify-code', verfycode) // ← برای تایید کد

module.exports = router;
