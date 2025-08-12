const db = require('../config/database');

class Exam {
  static async create(examData) {
    const { title, subject, date, duration, total_marks, teacher_id } = examData;
    const query = 'INSERT INTO exams (title, subject, date, duration, total_marks, teacher_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const result = await db.query(query, [title, subject, date, duration, total_marks, teacher_id]);
    return result.rows[0];
  }

  static async findAll() {
    const query = 'SELECT * FROM exams ORDER BY date DESC';
    const result = await db.query(query);
    return result.rows;
  }

  static async findById(id) {
    const query = 'SELECT * FROM exams WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  static async update(id, examData) {
    const { title, subject, date, duration, total_marks } = examData;
    const query = 'UPDATE exams SET title = $1, subject = $2, date = $3, duration = $4, total_marks = $5 WHERE id = $6 RETURNING *';
    const result = await db.query(query, [title, subject, date, duration, total_marks, id]);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM exams WHERE id = $1';
    await db.query(query, [id]);
  }
}

module.exports = Exam;