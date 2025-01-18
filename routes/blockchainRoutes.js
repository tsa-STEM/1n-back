import express from 'express';
import { getBalance, executeTrade, getTransactions } from '../controllers/blockchainController.js';

const router = express.Router();

router.get('/balance/:address', getBalance);
router.post('/trade', executeTrade);
router.get('/transactions/:address', getTransactions);

export default router;