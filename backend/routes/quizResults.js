const express = require('express');
const router = express.Router();
const QuizResult = require('../models/QuizResult');

// POST submit result
router.post('/', async (req, res) => {
  const result = new QuizResult(req.body);
  await result.save();
  res.json({ message: 'Result saved' });
});

// GET results for a session
router.get('/:sessionId', async (req, res) => {
  const results = await QuizResult.find({ sessionId: req.params.sessionId });
  res.json(results);
});

module.exports = router;
