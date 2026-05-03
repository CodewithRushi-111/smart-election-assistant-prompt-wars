import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema({
  id: String,
  name: String,
  earnedAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, sparse: true },
  age: { type: Number },
  dob: { type: Date },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  state: String,
  district: String,
  constituency: String,
  pincode: String,
  voterIdNumber: { type: String }, // hashed
  aadhaarLast4: { type: String }, // hashed
  isRegistered: { type: Boolean, default: false },
  isFirstTimeVoter: { type: Boolean, default: false },
  preferredLanguage: { 
    type: String, 
    enum: ['en', 'hi', 'ta', 'te', 'bn'],
    default: 'en'
  },
  journeyStage: {
    type: String,
    enum: ['unaware', 'checking_eligibility', 'registering', 'registered', 'voting_day', 'voted'],
    default: 'unaware'
  },
  notificationPreferences: {
    whatsapp: { type: Boolean, default: false },
    sms: { type: Boolean, default: false },
    email: { type: Boolean, default: false },
    push: { type: Boolean, default: false }
  },
  boothId: { type: String },
  badges: [badgeSchema]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
