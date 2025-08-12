const db = require('../config/database');

class Student {
  static async create(studentData) {
    const { name, email, roll_number, class_name } = studentData;
    const query = 'INSERT INTO students (name, email, roll_number, class_name) VALUES ($1, $2, $3, $4) RETURNING *';
    const result = await db.query(query, [name, email, roll_number, class_name]);
    return result.rows[0];
  }

  static async findAll() {
    const query = 'SELECT * FROM students ORDER BY name';
    const result = await db.query(query);
    return result.rows;
  }

  static async findById(id) {
    const query = 'SELECT * FROM students WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  static async update(id, studentData) {
    const { name, email, roll_number, class_name } = studentData;
    const query = 'UPDATE students SET name = $1, email = $2, roll_number = $3, class_name = $4 WHERE id = $5 RETURNING *';
    const result = await db.query(query, [name, email, roll_number, class_name, id]);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM students WHERE id = $1';
    await db.query(query, [id]);
  }
}

module.exports = Student;