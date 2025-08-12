const db = require('../config/database');

class Marks {
  static async create(marksData) {
    const { exam_id, student_id, marks_obtained } = marksData;
    const query = 'INSERT INTO marks (exam_id, student_id, marks_obtained) VALUES ($1, $2, $3) RETURNING *';
    const result = await db.query(query, [exam_id, student_id, marks_obtained]);
    return result.rows[0];
  }

  static async findAll() {
    const query = `
      SELECT m.*, e.title as exam_title, s.name as student_name 
      FROM marks m 
      JOIN exams e ON m.exam_id = e.id 
      JOIN students s ON m.student_id = s.id
    `;
    const result = await db.query(query);
    return result.rows;
  }

  static async findByExam(examId) {
    const query = `
      SELECT m.*, s.name as student_name, s.roll_number 
      FROM marks m 
      JOIN students s ON m.student_id = s.id 
      WHERE m.exam_id = $1
    `;
    const result = await db.query(query, [examId]);
    return result.rows;
  }

  static async delete(id) {
    const query = 'DELETE FROM marks WHERE id = $1';
    await db.query(query, [id]);
  }
}

module.exports = Marks;