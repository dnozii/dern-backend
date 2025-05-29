const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const USERS_FILE = path.join(__dirname, '../../databases/users.json');

// GET all users (admin-only view)
router.get('/users', (req, res) => {
  const users = JSON.parse(fs.readFileSync(USERS_FILE));
  res.json(users);
});

// PUT promote user role
router.put('/promote/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { newRole } = req.body;

  let users = JSON.parse(fs.readFileSync(USERS_FILE));
  users = users.map(user =>
    user.id === userId ? { ...user, role: newRole } : user
  );

  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  res.json({ success: true, message: `User ${userId} promoted to ${newRole}` });
});

// DELETE remove user
router.delete('/delete/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  let users = JSON.parse(fs.readFileSync(USERS_FILE));

  users = users.filter(user => user.id !== userId);
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

  res.json({ success: true, message: `User ${userId} deleted` });
});

module.exports = router;
