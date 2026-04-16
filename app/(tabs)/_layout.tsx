import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
        tabBarActiveTintColor: '#F8FAFC',
        tabBarInactiveTintColor: '#64748B',
        headerStyle: { backgroundColor: '#0F172A' },
        headerTintColor: '#F8FAFC',
        headerShadowVisible: false,
        tabBarStyle: { backgroundColor: '#1E293B', borderTopWidth: 1, borderColor: '#334155', elevation: 0 },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600', paddingBottom: 4 }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Converter',
          tabBarIcon: ({ color, focused }) => <Ionicons name="swap-horizontal" size={24} color={focused ? '#6366F1' : color} />,
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color, focused }) => <Ionicons name="checkmark-done" size={24} color={focused ? '#F59E0B' : color} />,
        }}
      />
      <Tabs.Screen
        name="bmi"
        options={{
          title: 'BMI',
          tabBarIcon: ({ color, focused }) => <Ionicons name="body" size={24} color={focused ? '#10B981' : color} />,
        }}
      />
      <Tabs.Screen
        name="password"
        options={{
          title: 'Pass Gen',
          tabBarIcon: ({ color, focused }) => <Ionicons name="key" size={24} color={focused ? '#F43F5E' : color} />,
        }}
      />
    </Tabs>
  );
}