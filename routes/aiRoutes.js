import express from 'express';
import { getPlantingPlan } from '../controllers/aiController.js';

const router = express.Router();

router.post('/getPlan', getPlantingPlan);

export default router;