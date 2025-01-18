import { generateSensorData } from './sensorService.js';

export class SocketService {
    constructor(io) {
        this.io = io;
        this.sensorIntervals = new Map();
    }

    startSensorEmission(socket) {
        const intervalId = setInterval(async () => {
            const data = await generateSensorData();
            socket.emit('sensorData', data);
        }, 5000);

        this.sensorIntervals.set(socket.id, intervalId);
    }

    stopSensorEmission(socketId) {
        const intervalId = this.sensorIntervals.get(socketId);
        if (intervalId) {
            clearInterval(intervalId);
            this.sensorIntervals.delete(socketId);
        }
    }

    initialize() {
        this.io.on('connection', (socket) => {
            console.log('Client connected:', socket.id);

            socket.on('startSensorData', () => {
                this.startSensorEmission(socket);
            });

            socket.on('stopSensorData', () => {
                this.stopSensorEmission(socket.id);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected:', socket.id);
                this.stopSensorEmission(socket.id);
            });
        });
    }
}