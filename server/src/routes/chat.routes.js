import express from 'express';
import multer from 'multer';
import { handleMessage, getHistory, clearHistory } from '../controllers/chatController.js';
import { analyzeManifesto } from '../controllers/visionController.js';

const router = express.Router();

// Multer setup for in-memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

router.post('/message', handleMessage);
router.post('/analyze-manifesto', upload.single('image'), analyzeManifesto);
router.get('/history/:sessionId', getHistory);
router.delete('/history/:sessionId', clearHistory);

export default router;
