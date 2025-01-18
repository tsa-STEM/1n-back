import { generatePlantingPlan } from '../services/aiService.js';

export const getPlantingPlan = async (req, res) => {
    try {
        const { landSize, region, soilType } = req.body;
        const plan = await generatePlantingPlan(landSize, region, soilType);
        res.json(plan);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};