const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const USERS_FILE = path.join(__dirname, '../../databases/users.json');

// GET all users
router.get('/', (req, res) => {
  const data = fs.readFileSync(USERS_FILE);
  const users = JSON.parse(data);
  res.json(users);
});

// POST register user
router.post('/register', (req, res) => {
  const { email, password, role } = req.body;
  const data = fs.readFileSync(USERS_FILE);
  const users = JSON.parse(data);

  const newUser = {
    id: Date.now(),
    email,
    password,
    role,
  };

  users.push(newUser);
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  res.status(201).json(newUser);
});

// POST login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const data = fs.readFileSync(USERS_FILE);
  const users = JSON.parse(data);
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.json({ success: true, user });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

module.exports = router;