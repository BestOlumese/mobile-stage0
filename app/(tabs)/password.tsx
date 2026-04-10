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
          <Switch value={useUpper} onValueChange={setUseUpper} trackColor={{ true: '#8b5cf6' }} />
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.label}>Lowercase (a-z)</Text>
          <Switch value={useLower} onValueChange={setUseLower} trackColor={{ true: '#8b5cf6' }} />
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.label}>Numbers (0-9)</Text>
          <Switch value={useNumbers} onValueChange={setUseNumbers} trackColor={{ true: '#8b5cf6' }} />
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.label}>Symbols (!@#)</Text>
          <Switch value={useSymbols} onValueChange={setUseSymbols} trackColor={{ true: '#8b5cf6' }} />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleGenerate}>
          <Text style={styles.buttonText}>Generate Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f4f5' },
  title: { fontSize: 28, fontWeight: '700', color: '#18181b', marginBottom: 20 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  outputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fafafa', borderWidth: 1, borderColor: '#e4e4e7', borderRadius: 12, paddingLeft: 16, marginBottom: 24 },
  passwordOutput: { flex: 1, fontSize: 18, fontFamily: 'monospace', color: '#18181b' },
  copyButton: { backgroundColor: '#3f3f46', paddingHorizontal: 16, paddingVertical: 16, borderTopRightRadius: 12, borderBottomRightRadius: 12 },
  copyButtonActive: { backgroundColor: '#10b981' },
  copyButtonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f4f4f5' },
  label: { fontSize: 16, color: '#3f3f46', fontWeight: '500' },
  lengthInput: { borderWidth: 1, borderColor: '#e4e4e7', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6, fontSize: 16, width: 60, textAlign: 'center', backgroundColor: '#fafafa' },
  button: { backgroundColor: '#8b5cf6', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 24 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});