import { getCreditsBalance, transferCarbonCredits } from '../services/blockchainService.js';

export const getBalance = async (req, res) => {
    try {
        const { address } = req.params;
        const balance = await getCreditsBalance(address);
        res.json({ balance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const transferCredits = async (req, res) => {
    try {
        const { from, to, amount } = req.body;
        const result = await transferCarbonCredits(from, to, amount);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};