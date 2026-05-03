import mongoose from 'mongoose';

const reminderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  electionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Election' },
  type: {
    type: String,
    enum: ['registration_deadline', 'polling_day', 'result_day', 'custom'],
    required: true
  },
  message: { type: String, required: true },
  scheduledAt: { type: Date, required: true },
  channels: [{
    type: String,
    enum: ['whatsapp', 'sms', 'email', 'push']
  }],
  status: {
    type: String,
    enum: ['pending', 'sent', 'failed'],
    default: 'pending'
  },
  sentAt: Date
}, { timestamps: true });

const Reminder = mongoose.model('Reminder', reminderSchema);
export default Reminder;
