import express from 'express';
import { register, login, getMe } from '../controllers/authController.js';

const router = express.Router();

import { protect } from '../middleware/auth.middleware.js';

router.post('/register', register);
router.post('/login', login);
router.post('/verify-otp', login); // placeholder

router.get('/me', protect, getMe); 

export default router;
