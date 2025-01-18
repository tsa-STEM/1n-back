import express from 'express';
import { getSensorData } from '../controllers/sensorController.js';

const router = express.Router();

router.get('/data', getSensorData);

export default router;