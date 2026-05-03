import mongoose from 'mongoose';

const phaseSchema = new mongoose.Schema({
  phaseNumber: Number,
  pollingDate: Date,
  states: [String]
});

const electionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['lok_sabha', 'vidhan_sabha', 'local'],
    required: true
  },
  state: String,
  constituencies: [String],
  phases: [phaseSchema],
  registrationDeadline: Date,
  resultDate: Date,
  notificationSentDates: [Date],
  isActive: { type: Boolean, default: false },
  officialSource: String // ECI URL
}, { timestamps: true });

const Election = mongoose.model('Election', electionSchema);
export default Election;
