# 🛠️ Smart Utility Toolkit

A sleek, multi-functional utility app built with React Native and Expo Router. This project serves as a foundational demonstration of clean mobile architecture, state management, and modern UI/UX design.

## 🚀 Features

This app bundles three essential everyday tools into a single, seamless experience:

1. **Multi-Converter**
   - Seamlessly converts **Length** (Meters, Feet, etc.), **Temperature** (Celsius, Fahrenheit, Kelvin), and **Currency** (USD, EUR, GBP, etc.).
   - Features dynamic UI updates and a sleek category selector.
2. **BMI Calculator**
   - Calculates Body Mass Index based on user weight and height.
   - Provides visual feedback with dynamic color-coded categories (Underweight, Normal, Overweight, Obese).
3. **Password Generator**
   - Generates highly secure, customizable passwords.
   - Granular controls for length, uppercase, lowercase, numbers, and symbols.
   - Integrated with the native clipboard for 1-tap copying.

## 🏗️ Architecture & Tech Stack

- **Framework:** React Native & Expo
- **Navigation:** Expo Router (File-based routing with Bottom Tabs)
- **Language:** TypeScript
- **Dependencies:** - `@react-native-picker/picker` (Native dropdowns)
  - `expo-clipboard` (Native clipboard access)

## 📁 Project Structure

The codebase strictly separates UI components from business logic to ensure scalability and testability.

```text
smart-utility-toolkit/
├── app/                  
│   ├── (tabs)/           # Bottom tab navigation screens
│   │   ├── _layout.tsx   # Tab configuration
│   │   ├── converter.tsx # Multi-Converter UI
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