# 🛠️ Smart Utility Toolkit

A sleek, multi-functional utility app built with React Native and Expo Router. This project serves as a foundational demonstration of clean mobile architecture, state management, offline persistence, and modern UI/UX design.

## 🚀 Features

This app bundles four essential everyday tools into a single, seamless experience wrapped in a highly-polished premium dark mode:

1. **Multi-Converter**
   - Seamlessly converts **Length** (Meters, Feet, etc.), **Temperature** (Celsius, Fahrenheit, Kelvin), and **Currency** (USD, EUR, GBP, etc.).
   - Features dynamic UI updates and a sleek category selector.
2. **Task / Checklist Manager**
   - Create, edit, delete, and mark tasks as completed.
   - Fully supports **Offline Persistence** using `@react-native-async-storage/async-storage`.
   - Clean inline editing and dynamic checkbox toggling.
3. **BMI Calculator**
   - Calculates Body Mass Index based on user weight and height.
   - Provides visual feedback with dynamic color-coded categories (Underweight, Normal, Overweight, Obese).
4. **Password Generator**
   - Generates highly secure, customizable passwords.
   - Granular controls for length, uppercase, lowercase, numbers, and symbols.
   - Integrated with the native clipboard for 1-tap copying.

## 🏗️ Architecture & Tech Stack

- **Framework:** React Native & Expo
- **Navigation:** Expo Router (File-based routing with Bottom Tabs)
- **Language:** TypeScript
- **State Management:** React Hooks (`useState`, `useEffect`)
- **Offline Storage:** `@react-native-async-storage/async-storage`
- **Dependencies:** 
  - `@react-native-picker/picker` (Native dropdowns)
  - `expo-clipboard` (Native clipboard access)
  - `@react-native-async-storage/async-storage` (Task storage)

## 🎨 Design System

The app has recently undergone a major UI revamp adopting a **Premium Dark Theme**.
- **Base Background:** Deep Slate (`#0F172A`)
- **Card Background:** Slate (`#1E293B`)
- **Accents:** Neon Indigo (Converter), Emerald (BMI), Rose (Pass Gen), and Amber (Tasks).
- Dynamic shadowing, minimalist borders, and high contrast text ensure readability and an eye-catching unique aesthetic.

## 📁 Project Structure

The codebase strictly separates UI components from business logic to ensure scalability and testability.

```text
smart-utility-toolkit/
├── app/                  
│   ├── (tabs)/           # Bottom tab navigation screens
│   │   ├── _layout.tsx   # Tab configuration & styling
│   │   ├── index.tsx     # Multi-Converter UI
│   │   ├── tasks.tsx     # Offline Task Manager UI
│   │   ├── bmi.tsx       # BMI Calculator UI
│   │   └── password.tsx  # Password Generator UI
│   └── _layout.tsx       # Root stack layout
│   └── +not-found.tsx    # Not Found page
├── utils/                # Decoupled business logic
│   ├── bmiLogic.ts       
│   ├── conversionLogic.ts
│   └── passwordLogic.ts
├── app.json              # Expo configuration
└── package.json
```

## 🛠️ How to Run

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the Expo Development Server:**
   ```bash
   npx expo start
   ```

3. **Open the app:**
   - Scan the QR code with the **Expo Go** app on your physical device.
   - Or press `a` to open in Android Emulator / `i` in iOS Simulator.