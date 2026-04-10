import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
        tabBarActiveTintColor: '#3b82f6',
        headerStyle: { backgroundColor: '#fff' },
        headerShadowVisible: false,
        tabBarStyle: { borderTopWidth: 1, borderColor: '#e4e4e7', elevation: 0 }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Converter',
          tabBarIcon: ({ color }) => <Ionicons name="swap-horizontal" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="bmi"
        options={{
          title: 'BMI Calc',
          tabBarIcon: ({ color }) => <Ionicons name="body" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="password"
        options={{
          title: 'Pass Gen',
          tabBarIcon: ({ color }) => <Ionicons name="key" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}