const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const SUPPORT_FILE = path.join(__dirname, '../../databases/supportRequests.json');

// GET all support requests
router.get('/', (req, res) => {
  const data = fs.readFileSync(SUPPORT_FILE);
  const requests = JSON.parse(data);
  res.json(requests);
});

// POST new support request
router.post('/', (req, res) => {
  const { device, issue, urgency, userEmail } = req.body;
  const data = fs.readFileSync(SUPPORT_FILE);
  const requests = JSON.parse(data);

  const newRequest = {
    id: Date.now(),
    device,
    issue,
    urgency,
    userEmail,
    status: 'pending',
    submittedAt: new Date().toISOString()
  };

  requests.push(newRequest);
  fs.writeFileSync(SUPPORT_FILE, JSON.stringify(requests, null, 2));
  res.status(201).json(newRequest);
});

module.exports = router;