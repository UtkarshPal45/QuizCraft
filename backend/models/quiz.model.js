import mongoose, {Schema} from "mongoose"

const quizSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  categories: [{ type: String, required: true }],
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  questions: [{
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctOption: { type: Number, required: true }
  }],
  timeLimit: { type: Number, required: true }, // in minutes
  createdAt: { type: Date, default: Date.now },
  plays: { type: Number, default: 0 }
});

export default mongoose.model('Quiz', quizSchema);