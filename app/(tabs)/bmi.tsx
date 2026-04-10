import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import { calculateBMI } from '@/utils/bmiLogic';

export default function BMIScreen() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<{ value: string; category: string; color: string } | null>(null);

  const handleCalculate = () => {
    Keyboard.dismiss();
    const w = parseFloat(weight);
    const h = parseFloat(height);
    
    if (!isNaN(w) && !isNaN(h)) {
      const calcResult = calculateBMI(w, h);
      setResult(calcResult);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BMI Calculator</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Weight (kg)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="e.g. 70"
          value={weight}
          onChangeText={setWeight}
        />

        <Text style={styles.label}>Height (cm)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="e.g. 175"
          value={height}
          onChangeText={setHeight}
        />

        <TouchableOpacity style={styles.button} onPress={handleCalculate}>
          <Text style={styles.buttonText}>Calculate BMI</Text>
        </TouchableOpacity>
      </View>

      {result && (
        <View style={[styles.resultCard, { borderColor: result.color }]}>
          <Text style={styles.resultValue}>{result.value}</Text>
          <Text style={[styles.resultCategory, { color: result.color }]}>
            {result.category}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f4f5' },
  title: { fontSize: 28, fontWeight: '700', color: '#18181b', marginBottom: 20 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  label: { fontSize: 14, color: '#71717a', marginBottom: 8, fontWeight: '500' },
  input: { borderWidth: 1, borderColor: '#e4e4e7', padding: 16, borderRadius: 12, fontSize: 18, marginBottom: 20, backgroundColor: '#fafafa' },
  button: { backgroundColor: '#10b981', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  resultCard: { marginTop: 24, padding: 24, backgroundColor: '#fff', borderRadius: 16, alignItems: 'center', borderWidth: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 4 },
  resultValue: { fontSize: 48, fontWeight: '800', color: '#18181b' },
  resultCategory: { fontSize: 20, fontWeight: '700', marginTop: 8, textTransform: 'uppercase', letterSpacing: 1 },
});