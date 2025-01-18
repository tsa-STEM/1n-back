import { generateSensorData } from '../services/sensorService.js';

export const getSensorData = async (req, res) => {
    try {
        const data = await generateSensorData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};