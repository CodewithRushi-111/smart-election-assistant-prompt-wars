import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  questionId: String,
  selected: Number,
  correct: Boolean
});

const quizResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quizType: String,
  score: Number,
  totalQuestions: Number,
  answers: [answerSchema],
  badge: String, // if earned
  completedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const QuizResult = mongoose.model('QuizResult', quizResultSchema);
export default QuizResult;
