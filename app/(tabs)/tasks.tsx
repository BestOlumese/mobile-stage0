import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

const STORAGE_KEY = '@tasks_data';

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const loadTasks = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) {
        setTasks(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error('Failed to load tasks', e);
    }
  };

  const saveTasks = async (currentTasks: Task[]) => {
    try {
      const jsonValue = JSON.stringify(currentTasks);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
      console.error('Failed to save tasks', e);
    }
  };

  const handleAddOrUpdate = () => {
    if (!inputValue.trim()) return;

    if (editingId) {
      setTasks(tasks.map(t => t.id === editingId ? { ...t, text: inputValue.trim() } : t));
      setEditingId(null);
    } else {
      const newTask: Task = {
        id: Date.now().toString() + Math.random().toString(),
        text: inputValue.trim(),
        completed: false,
      };
      setTasks([...tasks, newTask]);
    }
    
    setInputValue('');
    Keyboard.dismiss();
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const editTask = (task: Task) => {
    setEditingId(task.id);
    setInputValue(task.text);
  };

  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity style={styles.taskContent} onPress={() => toggleTask(item.id)}>
        <Ionicons 
          name={item.completed ? "checkmark-circle" : "ellipse-outline"} 
          size={24} 
          color={item.completed ? "#10B981" : "#64748B"} 
        />
        <Text style={[styles.taskText, item.completed && styles.taskTextCompleted]}>
          {item.text}
        </Text>
      </TouchableOpacity>
      
      <View style={styles.taskActions}>
        {!item.completed && (
          <TouchableOpacity onPress={() => editTask(item)} style={styles.iconButton}>
            <Ionicons name="pencil" size={20} color="#F59E0B" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.iconButton}>
          <Ionicons name="trash" size={20} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} 
      keyboardVerticalOffset={90}
      style={styles.container}
    >
      <Text style={styles.title}>Task Manager</Text>
      
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="clipboard-outline" size={64} color="#334155" />
            <Text style={styles.emptyText}>No tasks yet. Add some below!</Text>
          </View>
        }
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={editingId ? "Update task..." : "What needs to be done?"}
          placeholderTextColor="#64748B"
          value={inputValue}
          onChangeText={setInputValue}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddOrUpdate}>
          <Ionicons name={editingId ? "checkmark" : "add"} size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A', padding: 20 },
  title: { fontSize: 28, fontWeight: '700', color: '#F8FAFC', marginBottom: 20 },
  listContainer: { paddingBottom: 100 },
  taskItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E293B', padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#334155', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 2 },
  taskContent: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingRight: 10 },
  taskText: { fontSize: 16, color: '#F8FAFC', marginLeft: 12, flex: 1 },
  taskTextCompleted: { color: '#64748B', textDecorationLine: 'line-through' },
  taskActions: { flexDirection: 'row', alignItems: 'center' },
  iconButton: { padding: 8, marginLeft: 4 },
  emptyContainer: { alignItems: 'center', marginTop: 60 },
  emptyText: { color: '#94A3B8', fontSize: 16, marginTop: 16 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 'auto', paddingVertical: 12, backgroundColor: '#0F172A' },
  input: { flex: 1, backgroundColor: '#1E293B', borderWidth: 1, borderColor: '#334155', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16, color: '#F8FAFC', paddingRight: 60 },
  addButton: { position: 'absolute', right: 6, top: 18, backgroundColor: '#F59E0B', width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', shadowColor: '#F59E0B', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 3 },
});
