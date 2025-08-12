const { pool } = require('../config/database');
const logger = require('../config/logger');

const recordMarks = async (req, res) => {
  try {
    const { exam_id, student_id, marks, total_marks } = req.body;

    const existingMark = await pool.query(
      'SELECT * FROM marks WHERE exam_id = $1 AND student_id = $2',
      [exam_id, student_id]
    );

    if (existingMark.rows.length > 0) {
      const result = await pool.query(
        'UPDATE marks SET marks = $1, total_marks = $2 WHERE exam_id = $3 AND student_id = $4 RETURNING *',
        [marks, total_marks, exam_id, student_id]
      );
      logger.info(`Marks updated for student ${student_id} in exam ${exam_id}`);
      return res.json(result.rows[0]);
    }

    const result = await pool.query(
      'INSERT INTO marks (exam_id, student_id, marks, total_marks) VALUES ($1, $2, $3, $4) RETURNING *',
      [exam_id, student_id, marks, total_marks]
    );

    logger.info(`Marks recorded for student ${student_id} in exam ${exam_id}`);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    logger.error('Record marks error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getMarksByExam = async (req, res) => {
  try {
    const { examId } = req.params;
    const { search = '' } = req.query;

    let query = `
      SELECT m.*, s.name as student_name, s.email as student_email, e.title as exam_title
      FROM marks m
      JOIN students s ON m.student_id = s.id
      JOIN exams e ON m.exam_id = e.id
      WHERE m.exam_id = $1
    `;
    let params = [examId];

    if (search) {
      query += ' AND s.name ILIKE $2';
      params.push(`%${search}%`);
    }

    query += ' ORDER BY s.name';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    logger.error('Get marks by exam error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getMarksByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    const result = await pool.query(`
      SELECT m.*, e.title as exam_title, e.date as exam_date
      FROM marks m
      JOIN exams e ON m.exam_id = e.id
      WHERE m.student_id = $1
      ORDER BY e.date DESC
    `, [studentId]);

    res.json(result.rows);
  } catch (error) {
    logger.error('Get marks by student error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllMarks = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT m.*, s.name as student_name, s.email as student_email, 
             e.title as exam_title, e.date as exam_date
      FROM marks m
      JOIN students s ON m.student_id = s.id
      JOIN exams e ON m.exam_id = e.id
    `;
    let params = [];

    if (search) {
      query += ' WHERE s.name ILIKE $1 OR e.title ILIKE $1';
      params.push(`%${search}%`);
    }

    query += ` ORDER BY m.created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    logger.error('Get all marks error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteMarks = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM marks WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Marks record not found' });
    }

    logger.info(`Marks deleted: ${id}`);
    res.json({ message: 'Marks deleted successfully' });
  } catch (error) {
    logger.error('Delete marks error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { recordMarks, getMarksByExam, getMarksByStudent, getAllMarks, deleteMarks };