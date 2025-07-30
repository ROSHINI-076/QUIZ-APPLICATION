const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  options: {
    a: String,
    b: String,
    c: String,
    d: String,
  },
  correct: String
});

const quizSessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  name: String,
  questions: [questionSchema],
  isActive: Boolean,
  createdAt: { type: Date, default: Date.now },
  createdBy: String
});

module.exports = mongoose.model('QuizSession', quizSessionSchema);
