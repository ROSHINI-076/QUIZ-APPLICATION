const express = require('express');
const router = express.Router();
const QuizSession = require('../models/QuizSession');

// GET all quiz sessions
router.get('/', async (req, res) => {
  const sessions = await QuizSession.find();
  res.json(sessions);
});

// POST new session
router.post('/', async (req, res) => {
  const { name, createdBy } = req.body;
  const sessionId = 'DEMO' + Math.floor(Math.random() * 10000);
  const newSession = new QuizSession({
    sessionId,
    name,
    createdBy,
    isActive: false,
    questions: []
  });
  await newSession.save();
  res.json(newSession);
});

// GET specific session
router.get('/:id', async (req, res) => {
  const session = await QuizSession.findOne({ sessionId: req.params.id });
  if (!session) return res.status(404).json({ error: 'Not found' });
  res.json(session);
});

// PUT start session
router.put('/:id/start', async (req, res) => {
  await QuizSession.updateOne({ sessionId: req.params.id }, { isActive: true });
  res.json({ message: 'Quiz started' });
});

// PUT end session
router.put('/:id/end', async (req, res) => {
  await QuizSession.updateOne({ sessionId: req.params.id }, { isActive: false });
  res.json({ message: 'Quiz ended' });
});

// POST add question
router.post('/:id/questions', async (req, res) => {
  const session = await QuizSession.findOne({ sessionId: req.params.id });
  if (!session) return res.status(404).json({ error: 'Session not found' });

  session.questions.push(req.body);
  await session.save();
  res.json({ message: 'Question added' });
});

module.exports = router;
