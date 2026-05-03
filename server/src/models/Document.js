import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { 
    type: String, 
    enum: ['aadhaar', 'pan', 'voter_id', 'photo', 'address_proof'],
    required: true
  },
  fileUrl: { type: String, required: true },
  ocrExtractedText: String,
  verificationStatus: {
    type: String,
    enum: ['pending', 'valid', 'invalid', 'needs_review'],
    default: 'pending'
  },
  missingFields: [String],
  uploadedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Document = mongoose.model('Document', documentSchema);
export default Document;
