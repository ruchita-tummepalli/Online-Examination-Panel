const { pool } = require('../config/database');
const logger = require('../config/logger');

const createExam = async (req, res) => {
  try {
    const { title, description, date, time, duration } = req.body;
    const teacher_id = req.user.id;

    const result = await pool.query(
      'INSERT INTO exams (title, description, date, time, duration, teacher_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, description, date, time, duration, teacher_id]
    );

    logger.info(`Exam created: ${title} by user ${teacher_id}`);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    logger.error('Create exam error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getExams = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT e.*, u.name as teacher_name 
      FROM exams e 
      JOIN users u ON e.teacher_id = u.id
    `;
    let params = [];

    if (search) {
      query += ' WHERE e.title ILIKE $1';
      params.push(`%${search}%`);
    }

    query += ` ORDER BY e.created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    logger.error('Get exams error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getExamById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT e.*, u.name as teacher_name FROM exams e JOIN users u ON e.teacher_id = u.id WHERE e.id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    logger.error('Get exam by ID error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateExam = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, time, duration } = req.body;

    const result = await pool.query(
      'UPDATE exams SET title = $1, description = $2, date = $3, time = $4, duration = $5 WHERE id = $6 AND teacher_id = $7 RETURNING *',
      [title, description, date, time, duration, id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Exam not found or unauthorized' });
    }

    logger.info(`Exam updated: ${id} by user ${req.user.id}`);
    res.json(result.rows[0]);
  } catch (error) {
    logger.error('Update exam error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteExam = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM exams WHERE id = $1 AND teacher_id = $2 RETURNING *',
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Exam not found or unauthorized' });
    }

    logger.info(`Exam deleted: ${id} by user ${req.user.id}`);
    res.json({ message: 'Exam deleted successfully' });
  } catch (error) {
    logger.error('Delete exam error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { createExam, getExams, getExamById, updateExam, deleteExam };