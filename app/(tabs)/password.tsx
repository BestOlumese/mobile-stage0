import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { generatePassword } from '@/utils/passwordLogic';

export default function PasswordScreen() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState('16');
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const len = parseInt(length) || 12;
    const newPass = generatePassword(len, useUpper, useLower, useNumbers, useSymbols);
    setPassword(newPass);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    if (password) {
      await Clipboard.setStringAsync(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Password Gen</Text>

      <View style={styles.card}>
        <View style={styles.outputContainer}>
          <Text style={styles.passwordOutput} numberOfLines={1}>
            {password || 'Tap generate'}
          </Text>
          <TouchableOpacity 
            style={[styles.copyButton, copied && styles.copyButtonActive]} 
            onPress={copyToClipboard}
          >
            <Text style={styles.copyButtonText}>{copied ? 'Copied!' : 'Copy'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.label}>Length</Text>
          <TextInput
            style={styles.lengthInput}
            keyboardType="numeric"
            value={length}
            onChangeText={setLength}
            maxLength={2}
          />
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.label}>Uppercase (A-Z)</Text>
          <Switch value={useUpper} onValueChange={setUseUpper} trackColor={{ true: '#F43F5E', false: '#334155' }} thumbColor="#FFFFFF" />
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.label}>Lowercase (a-z)</Text>
          <Switch value={useLower} onValueChange={setUseLower} trackColor={{ true: '#F43F5E', false: '#334155' }} thumbColor="#FFFFFF" />
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.label}>Numbers (0-9)</Text>
          <Switch value={useNumbers} onValueChange={setUseNumbers} trackColor={{ true: '#F43F5E', false: '#334155' }} thumbColor="#FFFFFF" />
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.label}>Symbols (!@#)</Text>
          <Switch value={useSymbols} onValueChange={setUseSymbols} trackColor={{ true: '#F43F5E', false: '#334155' }} thumbColor="#FFFFFF" />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleGenerate}>
          <Text style={styles.buttonText}>Generate Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#0F172A' },
  title: { fontSize: 28, fontWeight: '700', color: '#F8FAFC', marginBottom: 20 },
  card: { backgroundColor: '#1E293B', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#334155', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 4 },
  outputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0B1120', borderWidth: 1, borderColor: '#334155', borderRadius: 12, paddingLeft: 16, marginBottom: 24, overflow: 'hidden' },
  passwordOutput: { flex: 1, fontSize: 18, fontFamily: 'monospace', color: '#F8FAFC' },
  copyButton: { backgroundColor: '#334155', paddingHorizontal: 16, paddingVertical: 16 },
  copyButtonActive: { backgroundColor: '#10B981' },
  copyButtonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 14 },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#334155' },
  label: { fontSize: 16, color: '#F8FAFC', fontWeight: '500' },
  lengthInput: { borderWidth: 1, borderColor: '#334155', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, fontSize: 16, width: 60, textAlign: 'center', backgroundColor: '#0B1120', color: '#F8FAFC' },
  button: { backgroundColor: '#F43F5E', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 24, shadowColor: '#F43F5E', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 3 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
});