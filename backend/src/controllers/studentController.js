const { pool } = require('../config/database');
const logger = require('../config/logger');

const createStudent = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const studentExists = await pool.query('SELECT * FROM students WHERE email = $1', [email]);
    if (studentExists.rows.length > 0) {
      return res.status(400).json({ error: 'Student already exists' });
    }

    const result = await pool.query(
      'INSERT INTO students (name, email, phone) VALUES ($1, $2, $3) RETURNING *',
      [name, email, phone]
    );

    logger.info(`Student created: ${email}`);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    logger.error('Create student error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getStudents = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM students';
    let params = [];

    if (search) {
      query += ' WHERE name ILIKE $1 OR email ILIKE $1';
      params.push(`%${search}%`);
    }

    query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    logger.error('Get students error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM students WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    logger.error('Get student by ID error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    const result = await pool.query(
      'UPDATE students SET name = $1, email = $2, phone = $3 WHERE id = $4 RETURNING *',
      [name, email, phone, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    logger.info(`Student updated: ${id}`);
    res.json(result.rows[0]);
  } catch (error) {
    logger.error('Update student error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM students WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    logger.info(`Student deleted: ${id}`);
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    logger.error('Delete student error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { createStudent, getStudents, getStudentById, updateStudent, deleteStudent };