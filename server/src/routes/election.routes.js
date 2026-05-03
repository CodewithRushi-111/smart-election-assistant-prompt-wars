import express from 'express';
import { getElections, getElectionById, getElectionTimeline, getLiveUpdates } from '../controllers/electionController.js';

const router = express.Router();

router.get('/', getElections);
router.get('/live-updates', getLiveUpdates);
router.get('/:id', getElectionById);
router.get('/:id/timeline', getElectionTimeline);

export default router;
