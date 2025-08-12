const express = require('express');
const { createExam, getExams, getExamById, updateExam, deleteExam } = require('../controllers/examController');
const { authenticateToken } = require('../middleware/auth');
const { validateExam } = require('../middleware/validation');

const router = express.Router();

router.use(authenticateToken);

router.post('/', validateExam, createExam);
router.get('/', getExams);
router.get('/:id', getExamById);
router.put('/:id', validateExam, updateExam);
router.delete('/:id', deleteExam);

module.exports = router;