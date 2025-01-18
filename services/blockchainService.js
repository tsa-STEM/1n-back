import Web3 from 'web3';

const web3 = new Web3('http://127.0.0.1:7545');

const mockCarbonCredits = {
    balances: new Map(),

    async getBalance(address) {
        if (!this.balances.has(address)) {
            this.balances.set(address, Math.floor(Math.random() * 1000));
        }
        return this.balances.get(address);
    },

    async transfer(from, to, amount) {
        const fromBalance = await this.getBalance(from);
        if (fromBalance < amount) {
            throw new Error('Insufficient credits');
        }

        this.balances.set(from, fromBalance - amount);
        const toBalance = await this.getBalance(to);
        this.balances.set(to, toBalance + amount);

        return {
            transaction: {
                hash: '0x' + Math.random().toString(16).substr(2, 40),
                from,
                to,
                amount
            }
        };
    }
};

export const getCreditsBalance = async (address) => {
    return await mockCarbonCredits.getBalance(address);
};

export const transferCarbonCredits = async (from, to, amount) => {
    return await mockCarbonCredits.transfer(from, to, amount);
};