class MarketService {
    constructor(io) {
        this.io = io;
        this.currentPrice = 28.45;
        this.lastUpdate = Date.now();
        this.mockUsers = [
            { name: 'Farm A', address: '0x1234...' },
            { name: 'Farm B', address: '0x2345...' },
            { name: 'Corp X', address: '0x3456...' },
            { name: 'Corp Y', address: '0x4567...' },
            { name: 'Green Fund', address: '0x5678...' }
        ];
        this.priceHistory = [];
        this.orders = {
            buy: [],
            sell: []
        };
    }

    generateRealisticPrice() {
        if (Math.random() > 0.3) { 
            return this.currentPrice; 
        }

        const maxChange = 0.02; 
        const change = (Math.random() * maxChange) * (Math.random() > 0.5 ? 1 : -1);

        this.currentPrice += change;
        this.currentPrice = Math.max(28.30, Math.min(28.60, this.currentPrice));
        this.lastUpdate = Date.now();

        return parseFloat(this.currentPrice.toFixed(2));
    }

    generateMockTransaction() {
        let buyer, seller;
        do {
            buyer = this.mockUsers[Math.floor(Math.random() * this.mockUsers.length)];
            seller = this.mockUsers[Math.floor(Math.random() * this.mockUsers.length)];
        } while (buyer === seller);

        const isCorporate = (user) => user.name.includes('Corp') || user.name.includes('Fund');
        const baseAmount = isCorporate(buyer) ? 150 : 50;
        const amount = Math.floor(baseAmount + Math.random() * baseAmount);

        const price = parseFloat((this.currentPrice + (Math.random() - 0.5) * 0.05).toFixed(2));

        return {
            hash: '0x' + Math.random().toString(16).substring(2, 10),
            from: seller.name,
            to: buyer.name,
            amount,
            price: parseFloat(price.toFixed(2)),
            timestamp: new Date()
        };
    }

    generateOrders() {
        const currentPrice = this.currentPrice;
        const buyOrders = Array(5).fill(0).map((_, i) => ({
            price: parseFloat((currentPrice - 0.05 * (i + 1)).toFixed(2)),
            amount: Math.floor(Math.random() * 200) + 50,
        })).map(order => ({
            ...order,
            total: parseFloat((order.price * order.amount).toFixed(2))
        }));

        const sellOrders = Array(5).fill(0).map((_, i) => ({
            price: parseFloat((currentPrice + 0.05 * (i + 1)).toFixed(2)),
            amount: Math.floor(Math.random() * 200) + 50,
        })).map(order => ({
            ...order,
            total: parseFloat((order.price * order.amount).toFixed(2))
        }));

        this.orders = { buy: buyOrders, sell: sellOrders };
        return this.orders;
    }

    initialize() {
        setInterval(() => {
            const newPrice = this.generateRealisticPrice();
            const newTransaction = this.generateMockTransaction();
            const orders = this.generateOrders();

            this.priceHistory.push({
                time: new Date().toISOString(),
                price: newPrice
            });

            if (this.priceHistory.length > 100) {
                this.priceHistory.shift();
            }

            this.io.emit('marketUpdate', {
                price: newPrice,
                priceChange: parseFloat(((newPrice - this.currentPrice) / this.currentPrice * 100).toFixed(2)),
                transaction: newTransaction,
                orders,
                history: this.priceHistory
            });
        }, 10000);
    }
}

export default MarketService;