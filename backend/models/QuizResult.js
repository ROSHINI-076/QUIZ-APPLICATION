const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
  sessionId: String,
  studentName: String,
  regNo: String,
  department: String,
  answers: [String],
  score: Number,
  totalQuestions: Number,
  percentage: Number,
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('QuizResult', quizResultSchema);
