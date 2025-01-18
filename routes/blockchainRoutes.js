import express from 'express';
import { getBalance, transferCredits } from '../controllers/blockchainController.js';

const router = express.Router();

router.get('/balance/:address', getBalance);
router.post('/transfer', transferCredits);

export default router;