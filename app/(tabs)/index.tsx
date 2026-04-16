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
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} 
      keyboardVerticalOffset={90}
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
            placeholderTextColor="#64748B"
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
                  style={styles.picker}
                  dropdownIconColor="#F8FAFC"
                >
                  {CATEGORIES[activeCategory].map(unit => (
                    <Picker.Item key={`from-${unit}`} label={unit} value={unit} color={Platform.OS === 'ios' ? '#F8FAFC' : undefined} />
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
                  style={styles.picker}
                  dropdownIconColor="#F8FAFC"
                >
                  {CATEGORIES[activeCategory].map(unit => (
                    <Picker.Item key={`to-${unit}`} label={unit} value={unit} color={Platform.OS === 'ios' ? '#F8FAFC' : undefined} />
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
  container: { flex: 1, padding: 20, backgroundColor: '#0F172A' },
  title: { fontSize: 28, fontWeight: '700', color: '#F8FAFC', marginBottom: 20 },
  categoryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  categoryPill: { flex: 1, paddingVertical: 10, marginHorizontal: 4, backgroundColor: '#1E293B', borderRadius: 20, alignItems: 'center', borderWidth: 1, borderColor: '#334155' },
  categoryPillActive: { backgroundColor: '#6366F1', borderColor: '#818CF8' },
  categoryText: { color: '#94A3B8', fontWeight: '600', fontSize: 13 },
  categoryTextActive: { color: '#FFFFFF' },
  card: { backgroundColor: '#1E293B', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#334155', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 4 },
  input: { borderWidth: 1, borderColor: '#334155', padding: 16, borderRadius: 12, fontSize: 18, marginBottom: 20, backgroundColor: '#0B1120', color: '#F8FAFC' },
  pickerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  pickerContainer: { flex: 1, marginHorizontal: 5 },
  label: { fontSize: 13, color: '#94A3B8', marginBottom: 8, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  pickerWrapper: { backgroundColor: '#0B1120', borderRadius: 12, borderWidth: 1, borderColor: '#334155', overflow: 'hidden' },
  picker: { color: '#F8FAFC' },
  button: { backgroundColor: '#6366F1', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10, shadowColor: '#6366F1', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 3 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
  resultContainer: { marginTop: 24, padding: 24, backgroundColor: 'rgba(99, 102, 241, 0.1)', borderRadius: 16, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.3)', marginBottom: 40 },
  resultLabel: { fontSize: 13, color: '#818CF8', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8, fontWeight: '600' },
  resultText: { fontSize: 32, fontWeight: '800', color: '#F8FAFC' },
});