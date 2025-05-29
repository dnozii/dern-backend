const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const SUPPORT_FILE = path.join(__dirname, '../../databases/supportRequests.json');
const JOBS_FILE = path.join(__dirname, '../../databases/jobs.json');
const ANALYTICS_FILE = path.join(__dirname, '../../databases/analytics.json');

// GET basic analytics
router.get('/', (req, res) => {
  const support = JSON.parse(fs.readFileSync(SUPPORT_FILE));
  const jobs = JSON.parse(fs.readFileSync(JOBS_FILE));
  const analyticsData = JSON.parse(fs.readFileSync(ANALYTICS_FILE));

  const stats = {
    totalSupportRequests: support.length,
    totalJobs: jobs.length,
    mostCommonIssue: analyticsData?.mostCommonIssue || 'Unknown',
    averageResponseHours: analyticsData?.averageResponseHours || 0,
  };

  res.json(stats);
});

module.exports = router;
    