const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const JOBS_FILE = path.join(__dirname, '../../databases/jobs.json');

// GET all jobs
router.get('/', (req, res) => {
  const data = fs.readFileSync(JOBS_FILE);
  const jobs = JSON.parse(data);
  res.json(jobs);
});

// POST new job
router.post('/', (req, res) => {
  const { technician, task, time, date, status } = req.body;
  const data = fs.readFileSync(JOBS_FILE);
  const jobs = JSON.parse(data);

  const newJob = {
    id: Date.now(),
    technician,
    task,
    time,
    date,
    status: status || 'assigned',
    createdAt: new Date().toISOString()
  };

  jobs.push(newJob);
  fs.writeFileSync(JOBS_FILE, JSON.stringify(jobs, null, 2));
  res.status(201).json(newJob);
});

// PUT update job
router.put('/:id', (req, res) => {
  const jobId = parseInt(req.params.id);
  const updated = req.body;
  const data = fs.readFileSync(JOBS_FILE);
  let jobs = JSON.parse(data);

  jobs = jobs.map(job => job.id === jobId ? { ...job, ...updated } : job);
  fs.writeFileSync(JOBS_FILE, JSON.stringify(jobs, null, 2));
  res.json({ success: true });
});

module.exports = router;
