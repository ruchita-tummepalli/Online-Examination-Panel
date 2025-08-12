const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { initDB } = require('./config/database');
const logger = require('./config/logger');

const authRoutes = require('./routes/auth');
const examRoutes = require('./routes/exams');
const studentRoutes = require('./routes/students');
const marksRoutes = require('./routes/marks');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/marks', marksRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Initialize database (non-blocking)
initDB().catch(err => {
  logger.error('Database connection failed:', err.message);
  console.log('Database connection failed, server will run without DB');
});

module.exports = app;