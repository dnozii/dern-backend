const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const SCHEDULE_FILE = path.join(__dirname, '../../databases/scheduleQuotes.json');

// GET all scheduled quotes
router.get('/', (req, res) => {
  const data = fs.readFileSync(SCHEDULE_FILE);
  const schedules = JSON.parse(data);
  res.json(schedules);
});

// POST new schedule quote
router.post('/', (req, res) => {
  const { preferredDate, preferredTime, notes, userEmail } = req.body;
  const data = fs.readFileSync(SCHEDULE_FILE);
  const schedules = JSON.parse(data);

  const newSchedule = {
    id: Date.now(),
    preferredDate,
    preferredTime,
    notes,
    userEmail,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  schedules.push(newSchedule);
  fs.writeFileSync(SCHEDULE_FILE, JSON.stringify(schedules, null, 2));
  res.status(201).json(newSchedule);
});

module.exports = router;