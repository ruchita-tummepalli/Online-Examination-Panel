const express = require('express');
const { recordMarks, getMarksByExam, getMarksByStudent, getAllMarks, deleteMarks } = require('../controllers/marksController');
const { authenticateToken } = require('../middleware/auth');
const { validateMarks } = require('../middleware/validation');

const router = express.Router();

router.use(authenticateToken);

router.post('/', validateMarks, recordMarks);
router.get('/', getAllMarks);
router.get('/exam/:examId', getMarksByExam);
router.get('/student/:studentId', getMarksByStudent);
router.delete('/:id', deleteMarks);

module.exports = router;