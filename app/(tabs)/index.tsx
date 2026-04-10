import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { convertLength, convertTemperature, convertCurrency } from '@/utils/conversionLogic';

// Define our categories and their respective units
const CATEGORIES = {
  Length: ['Meters', 'Kilometers', 'Centimeters', 'Inches', 'Feet'],
  Temperature: ['Celsius', 'Fahrenheit', 'Kelvin'],
  Currency: ['USD', 'EUR', 'GBP', 'NGN', 'CAD'],
};

type CategoryType = keyof typeof CATEGORIES;

export default function ConverterScreen() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('Length');
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState(CATEGORIES['Length'][0]);
  const [toUnit, setToUnit] = useState(CATEGORIES['Length'][4]); // Default to feet for length
  const [result, setResult] = useState<number | null>(null);

  // Automatically reset the dropdowns and result when the category changes
  useEffect(() => {
    setFromUnit(CATEGORIES[activeCategory][0]);
    setToUnit(CATEGORIES[activeCategory][1]);
    setResult(null);
    setInputValue('');
  }, [activeCategory]);

  const handleConvert = () => {
    const numericValue = parseFloat(inputValue);
    if (isNaN(numericValue)) return;

    let convertedValue = 0;

    switch (activeCategory) {
      case 'Length':
        convertedValue = convertLength(numericValue, fromUnit, toUnit);
        break;
      case 'Temperature':
        convertedValue = convertTemperature(numericValue, fromUnit, toUnit);
        break;
      case 'Currency':
        convertedValue = convertCurrency(numericValue, fromUnit, toUnit);
        break;
    }

    setResult(convertedValue);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Multi-Converter</Text>
        
        {/* Category Selector (Pills) */}
        <View style={styles.categoryRow}>
          {(Object.keys(CATEGORIES) as CategoryType[]).map((category) => (
            <TouchableOpacity 
              key={category}
              style={[styles.categoryPill, activeCategory === category && styles.categoryPillActive]}
              onPress={() => setActiveCategory(category)}
            >
              <Text style={[styles.categoryText, activeCategory === category && styles.categoryTextActive]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter value"
            value={inputValue}
            onChangeText={setInputValue}
          />
          
          <View style={styles.pickerRow}>
            <View style={styles.pickerContainer}>
              <Text style={styles.label}>From</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={fromUnit}
                  onValueChange={(itemValue) => setFromUnit(itemValue)}
                >
                  {CATEGORIES[activeCategory].map(unit => (
                    <Picker.Item key={`from-${unit}`} label={unit} value={unit} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.pickerContainer}>
              <Text style={styles.label}>To</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={toUnit}
                  onValueChange={(itemValue) => setToUnit(itemValue)}
                >
                  {CATEGORIES[activeCategory].map(unit => (
                    <Picker.Item key={`to-${unit}`} label={unit} value={unit} />
                  ))}
                </Picker>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleConvert}>
            <Text style={styles.buttonText}>Convert</Text>
          </TouchableOpacity>
        </View>

        {result !== null && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Result:</Text>
            <Text style={styles.resultText}>
              {/* Show 2 decimal places for Currency, 4 for others */}
              {activeCategory === 'Currency' ? result.toFixed(2) : result.toFixed(4)} {toUnit}
            </Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f4f5' },
  title: { fontSize: 28, fontWeight: '700', color: '#18181b', marginBottom: 20 },
  categoryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  categoryPill: { flex: 1, paddingVertical: 10, marginHorizontal: 4, backgroundColor: '#e4e4e7', borderRadius: 20, alignItems: 'center' },
  categoryPillActive: { backgroundColor: '#3b82f6' },
  categoryText: { color: '#52525b', fontWeight: '600', fontSize: 14 },
  categoryTextActive: { color: '#fff' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  input: { borderWidth: 1, borderColor: '#e4e4e7', padding: 16, borderRadius: 12, fontSize: 18, marginBottom: 20, backgroundColor: '#fafafa' },
  pickerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  pickerContainer: { flex: 1, marginHorizontal: 5 },
  label: { fontSize: 14, color: '#71717a', marginBottom: 8, fontWeight: '500' },
  pickerWrapper: { backgroundColor: '#f4f4f5', borderRadius: 12, overflow: 'hidden' },
  button: { backgroundColor: '#3b82f6', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  resultContainer: { marginTop: 24, padding: 24, backgroundColor: '#eff6ff', borderRadius: 16, alignItems: 'center', borderWidth: 1, borderColor: '#bfdbfe', marginBottom: 40 },
  resultLabel: { fontSize: 14, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  resultText: { fontSize: 32, fontWeight: '800', color: '#1d4ed8' },
});