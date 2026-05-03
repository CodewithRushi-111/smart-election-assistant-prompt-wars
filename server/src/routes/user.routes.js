import express from 'express';
import { getProfile, updateProfile, updateJourneyStage, getBadges } from '../controllers/userController.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect); // All user routes require authentication

router.route('/profile')
  .get(getProfile)
  .put(updateProfile);

router.put('/journey-stage', updateJourneyStage);
router.get('/badges', getBadges);

export default router;
