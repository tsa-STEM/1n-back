const treeTypes = {
    tropical: ['Mango', 'Coconut', 'Teak', 'Bamboo'],
    temperate: ['Oak', 'Maple', 'Pine', 'Cherry'],
    arid: ['Acacia', 'Date Palm', 'Mesquite', 'Desert Willow']
};

const crops = {
    tropical: ['Coffee', 'Cacao', 'Banana', 'Cassava'],
    temperate: ['Wheat', 'Corn', 'Soybean', 'Potato'],
    arid: ['Sorghum', 'Millet', 'Chickpea', 'Cotton']
};

export const generatePlantingPlan = async (landSize, region, soilType) => {
    const climateZone = region.toLowerCase().includes('tropical') ? 'tropical' :
        region.toLowerCase().includes('arid') ? 'arid' : 'temperate';

    const recommendedTrees = treeTypes[climateZone];
    const recommendedCrops = crops[climateZone];

    const treeDensity = Math.floor(landSize * 100); 
    const cropArea = landSize * 0.7; 

    return {
        recommendedTrees,
        recommendedCrops,
        plantingPlan: {
            trees: {
                quantity: treeDensity,
                spacing: '10m x 10m',
                species: recommendedTrees.map(tree => ({
                    name: tree,
                    quantity: Math.floor(treeDensity / recommendedTrees.length)
                }))
            },
            crops: {
                area: `${cropArea} hectares`,
                recommended: recommendedCrops,
                rotation: recommendedCrops.map(crop => ({
                    name: crop,
                    season: ['Spring', 'Summer', 'Fall', 'Winter'][Math.floor(Math.random() * 4)]
                }))
            }
        },
        sustainabilityScore: Math.floor(Math.random() * 30 + 70), // 70-100 score
        estimatedCarbonSequestration: Math.floor(landSize * 5.5 * 1000) // kg CO2/year
    };
};
