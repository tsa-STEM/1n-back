class BlockchainService {
    constructor() {
        this.accounts = new Map();
        this.transactions = [];
        this.currentPrice = 28.45;

        this.accounts.set('0x742d35Cc6634C0532925a3b844Bc454e4438f44e', 1000);
    }

    async getBalance(address) {
        return this.accounts.get(address) || 0;
    }

    async executeTrade(type, address, amount, price) {
        const currentBalance = await this.getBalance(address);

        if (type === 'buy') {
            const totalCost = amount * price;
            return {
                hash: '0x' + Math.random().toString(16).substr(2, 40),
                from: 'Market',
                to: address,
                amount,
                price,
                timestamp: new Date().toISOString()
            };
        } else {
            if (currentBalance < amount) {
                throw new Error('Insufficient credits');
            }

            this.accounts.set(address, currentBalance - amount);
            return {
                hash: '0x' + Math.random().toString(16).substr(2, 40),
                from: address,
                to: 'Market',
                amount,
                price,
                timestamp: new Date().toISOString()
            };
        }
    }

    async getTransactions(address) {
        return this.transactions.filter(tx =>
            tx.from === address || tx.to === address
        );
    }
}

export default new BlockchainService();