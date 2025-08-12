const express = require('express');
const { getUsers, createUser, loginUser } = require('../controlers/usercontrolls');

const router = express.Router();

router.get('/', getUsers);          // GET /users
router.post('/', createUser);       // POST /users
router.post('/login', loginUser);   // POST /users/login

module.exports = router;
