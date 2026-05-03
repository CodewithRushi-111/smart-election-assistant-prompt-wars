import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  party: { type: String, required: true },
  constituency: { type: String, required: true },
  state: { type: String, required: true },
  image: String,
  education: String,
  assets: Number,
  liabilities: Number,
  criminalCases: { type: Number, default: 0 },
  manifestoHighlights: [String],
  historicalPerformance: {
    year: Number,
    votes: Number,
    position: Number
  }
}, { timestamps: true });

const Candidate = mongoose.model('Candidate', candidateSchema);
export default Candidate;
