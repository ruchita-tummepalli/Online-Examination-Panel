const express = require('express');
const { createStudent, getStudents, getStudentById, updateStudent, deleteStudent } = require('../controllers/studentController');
const { authenticateToken } = require('../middleware/auth');
const { validateStudent } = require('../middleware/validation');

const router = express.Router();

router.use(authenticateToken);

router.post('/', validateStudent, createStudent);
router.get('/', getStudents);
router.get('/:id', getStudentById);
router.put('/:id', validateStudent, updateStudent);
router.delete('/:id', deleteStudent);

module.exports = router;