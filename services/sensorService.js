import faker from 'faker';

let lastReadings = {
    soilMoisture: 45,
    temperature: 25,
    humidity: 60,
    lightIntensity: 50,
    soilPH: 6.5
};

const generateRealisticChange = (current, min, max, maxChange = 0.1) => {
    const change = (Math.random() - 0.5) * 2 * maxChange;
    let newValue = current + change;
    if (newValue < min) newValue = min + Math.random() * maxChange;
    if (newValue > max) newValue = max - Math.random() * maxChange;
    return parseFloat(newValue.toFixed(1));
};

export const generateSensorData = async () => {
    lastReadings = {
        soilMoisture: generateRealisticChange(lastReadings.soilMoisture, 30, 70, 0.2),
        temperature: generateRealisticChange(lastReadings.temperature, 18, 32, 0.1),
        humidity: generateRealisticChange(lastReadings.humidity, 40, 80, 0.2),
        lightIntensity: generateRealisticChange(lastReadings.lightIntensity, 20, 80, 0.3),
        soilPH: generateRealisticChange(lastReadings.soilPH, 6.0, 7.0, 0.02)
    };

    return {
        timestamp: new Date().toISOString(),
        ...lastReadings
    };
};
