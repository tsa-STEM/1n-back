import blockchainService from '../services/blockchainService.js';

export const getBalance = async (req, res) => {
    try {
        const { address } = req.params;
        const balance = await blockchainService.getBalance(address);
        res.json({ balance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const executeTrade = async (req, res) => {
    try {
        const { type, address, amount, price } = req.body;
        const result = await blockchainService.executeTrade(type, address, parseInt(amount), parseFloat(price));
        res.json({ transaction: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getTransactions = async (req, res) => {
    try {
        const { address } = req.params;
        const transactions = await blockchainService.getTransactions(address);
        res.json({ transactions });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};