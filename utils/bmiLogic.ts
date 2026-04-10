export const calculateBMI = (weightKg: number, heightCm: number) => {
  if (weightKg <= 0 || heightCm <= 0) return null;

  const heightMeters = heightCm / 100;
  const bmi = weightKg / (heightMeters * heightMeters);
  
  let category = '';
  let color = '';

  if (bmi < 18.5) {
    category = 'Underweight';
    color = '#eab308'; // yellow
  } else if (bmi >= 18.5 && bmi < 24.9) {
    category = 'Normal Weight';
    color = '#22c55e'; // green
  } else if (bmi >= 25 && bmi < 29.9) {
    category = 'Overweight';
    color = '#f97316'; // orange
  } else {
    category = 'Obese';
    color = '#ef4444'; // red
  }

  return {
    value: bmi.toFixed(1),
    category,
    color
  };
};