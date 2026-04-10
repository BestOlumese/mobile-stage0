export const convertLength = (value: number, fromUnit: string, toUnit: string): number => {
  const toMeterMap: Record<string, number> = {
    Meters: 1,
    Kilometers: 1000,
    Centimeters: 0.01,
    Inches: 0.0254,
    Feet: 0.3048,
  };
  if (!toMeterMap[fromUnit] || !toMeterMap[toUnit]) return 0;
  const valueInMeters = value * toMeterMap[fromUnit];
  return valueInMeters / toMeterMap[toUnit];
};

export const convertTemperature = (value: number, fromUnit: string, toUnit: string): number => {
  if (fromUnit === toUnit) return value;
  let celsius = value;

  // First, convert everything to Celsius as a base
  if (fromUnit === 'Fahrenheit') celsius = (value - 32) * (5 / 9);
  else if (fromUnit === 'Kelvin') celsius = value - 273.15;

  // Then, convert from Celsius to the target unit
  if (toUnit === 'Fahrenheit') return (celsius * 9 / 5) + 32;
  if (toUnit === 'Kelvin') return celsius + 273.15;
  
  return celsius;
};

export const convertCurrency = (value: number, fromUnit: string, toUnit: string): number => {
  // Using static benchmark rates for Stage 0. 
  // Base is USD
  const toUsdMap: Record<string, number> = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    NGN: 1500, // Naira
    CAD: 1.35,
  };
  
  if (!toUsdMap[fromUnit] || !toUsdMap[toUnit]) return 0;
  const valueInUsd = value / toUsdMap[fromUnit];
  return valueInUsd * toUsdMap[toUnit];
};