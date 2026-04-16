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
          placeholderTextColor="#64748B"
          value={weight}
          onChangeText={setWeight}
        />

        <Text style={styles.label}>Height (cm)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="e.g. 175"
          placeholderTextColor="#64748B"
          value={height}
          onChangeText={setHeight}
        />

        <TouchableOpacity style={styles.button} onPress={handleCalculate}>
          <Text style={styles.buttonText}>Calculate BMI</Text>
        </TouchableOpacity>
      </View>

      {result && (
        <View style={[styles.resultCard, { borderColor: result.color, backgroundColor: `${result.color}15` }]}>
          <Text style={[styles.resultValue, { color: '#F8FAFC' }]}>{result.value}</Text>
          <Text style={[styles.resultCategory, { color: result.color }]}>
            {result.category}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#0F172A' },
  title: { fontSize: 28, fontWeight: '700', color: '#F8FAFC', marginBottom: 20 },
  card: { backgroundColor: '#1E293B', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#334155', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 4 },
  label: { fontSize: 13, color: '#94A3B8', marginBottom: 8, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  input: { borderWidth: 1, borderColor: '#334155', padding: 16, borderRadius: 12, fontSize: 18, marginBottom: 20, backgroundColor: '#0B1120', color: '#F8FAFC' },
  button: { backgroundColor: '#10B981', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10, shadowColor: '#10B981', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 3 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
  resultCard: { marginTop: 24, padding: 24, borderRadius: 16, alignItems: 'center', borderWidth: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 12, elevation: 4 },
  resultValue: { fontSize: 48, fontWeight: '800' },
  resultCategory: { fontSize: 20, fontWeight: '700', marginTop: 8, textTransform: 'uppercase', letterSpacing: 1.5 },
});