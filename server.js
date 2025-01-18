import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { SocketService } from './services/socketService.js';
import MarketService from './services/marketService.js';
import sensorRoutes from './routes/sensorRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import blockchainRoutes from './routes/blockchainRoutes.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

const socketService = new SocketService(io);
const marketService = new MarketService(io);

socketService.initialize();
marketService.initialize();

app.use(cors());
app.use(express.json());

app.use('/api/sensors', sensorRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/blockchain', blockchainRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});