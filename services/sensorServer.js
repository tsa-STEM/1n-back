import faker from 'faker';

export const generateSensorData = async () => {
    return {
        timestamp: new Date().toISOString(),
        soilMoisture: faker.datatype.float({ min: 20, max: 80, precision: 0.1 }),
        temperature: faker.datatype.float({ min: 15, max: 35, precision: 0.1 }),
        humidity: faker.datatype.float({ min: 30, max: 90, precision: 0.1 }),
        lightIntensity: faker.datatype.float({ min: 0, max: 100, precision: 0.1 }),
        soilPH: faker.datatype.float({ min: 5.5, max: 7.5, precision: 0.1 })
    };
};