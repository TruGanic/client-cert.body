# Certification Body App Client

A React Native mobile application designed for certification agents to conduct inspections, manage reports, and verify compliance. Built with Expo and NativeWind.

## Features

This application empowers certification bodies with digital tools for field operations:

- **Agent Management**
  - **Agent Login**: Secure authentication for authorized personnel.
  - **Agent Registration**: Onboard new certification agents.
  - **Home Screen**: Landing page for navigation.

- **Inspection & Reporting**
  - **Agent Dashboard**: Central hub for managing assigned tasks and viewing status.
  - **Inspection Report**: Create and submit detailed inspection forms directly from the field.

## Technologies Used

- **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
- **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- **Navigation**: [React Navigation](https://reactnavigation.org/)
- **Icons**: [Lucide React Native](https://lucide.dev/guide/packages/lucide-react-native)

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js installed (LTS recommended)
- npm or yarn package manager
- Expo Go app installed on your mobile device (iOS/Android) or an emulator setup.

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd client-cert.body
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   
## Running the App

To start the development server:

```bash
npm start
```
or
```bash
npx expo start
```

- **Scan the QR code** with the Expo Go app (Android) or Camera app (iOS).
- Press `a` to open in Android Emulator.
- Press `i` to open in iOS Simulator.
- Press `w` to open in Web Browser.

## Project Structure

```text
client-cert.body/
├── src/
│   ├── navigation/       # Navigation configuration
│   └── screens/          # Application screens
│       ├── AgentDashboard.js
│       ├── AgentLoginScreen.js
│       ├── AgentRegistrationScreen.js
│       ├── HomeScreen.js
│       └── InspectionReportScreen.js
├── assets/               # Static assets (images, fonts)
├── App.js                # Entry point
├── app.json              # Expo configuration
├── babel.config.js       # Babel configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── package.json          # Dependencies and scripts
```