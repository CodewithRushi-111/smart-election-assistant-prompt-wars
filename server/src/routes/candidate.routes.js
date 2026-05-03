import express from 'express';
import { getCandidates, compareManifestos } from '../controllers/candidateController.js';

const router = express.Router();

router.get('/', getCandidates);
router.post('/compare', compareManifestos);

export default router;
