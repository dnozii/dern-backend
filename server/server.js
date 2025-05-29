// backend/server/server.js

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('../source/routes/userRoutes');
const supportRoutes = require('../source/routes/supportRoutes');
const scheduleRoutes = require('../source/routes/scheduleRoutes');
const sparePartsRoutes = require('../source/routes/sparePartsRoutes');
const jobRoutes = require('../source/routes/jobRoutes');
const analyticsRoutes = require('../source/routes/analyticsRoutes');
const adminRoutes = require('../source/routes/adminRoutes');

app.use('/api/users', userRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/parts', sparePartsRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Dern-Support API is running.');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});