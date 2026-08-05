# 🚗 SafeDrive

A mobile application built with **React Native (Expo)** that analyzes a user's driving behavior using the device's motion sensors and generates a **Driving Safety Score**.

The application demonstrates how smartphone sensors can be used to detect real-world driving events such as harsh braking, sharp acceleration, sharp turns, aggressive steering, excessive device movement, and possible phone handling while driving.

---

## 📱 Screens

### Home

- Start a new driving session
- View previous driving sessions
- Access user profile

### Drive

- Live driving timer
- Real-time safety score
- Live event detection
- Device motion monitoring

### Summary

- Final driving score
- Safety rating
- Drive duration
- Event breakdown

### History

- List of previous driving sessions
- Previous scores
- Previous durations
- Previous ratings

---

# ✨ Features

- Start / End Drive
- Real-time sensor data collection
- Device Motion integration
- Accelerometer data
- Gyroscope data
- Real-time event detection
- Driving score calculation
- Session summary
- Driving history
- Clean and minimal UI

---

# 📊 Events Detected

The application detects the following driving events.

| Event                     | Penalty |
| ------------------------- | ------- |
| Harsh Braking             | -5      |
| Harsh Acceleration        | -5      |
| Sharp Turn                | -3      |
| Aggressive Steering       | -4      |
| Excessive Device Movement | -3      |
| Phone Handling            | -10     |

---

# 🧠 Event Detection Logic

The application continuously receives motion data from the device.

```
Device Motion
        ↓
Raw Sensor Data
        ↓
Event Detection
        ↓
Driving Event
        ↓
Driving Score
```

Each sensor reading is evaluated against predefined thresholds.

Example:

- Large negative acceleration → Harsh Brake
- Large positive acceleration → Harsh Acceleration
- High angular velocity → Sharp Turn
- Sudden device movement → Phone Handling

---

# ⭐ Driving Score

Every driving session starts with a score of:

```
100
```

Whenever an unsafe event is detected, points are deducted.

Example

```
Start

100

↓

Harsh Brake

95

↓

Sharp Turn

92

↓

Phone Handling

82
```

The final score is converted into a safety rating.

| Score    | Rating    |
| -------- | --------- |
| 90 - 100 | Excellent |
| 75 - 89  | Good      |
| 60 - 74  | Average   |
| 40 - 59  | Poor      |
| Below 40 | Unsafe    |

---

# 🛠 Tech Stack

- React Native
- Expo
- Expo Router
- Expo Sensors
- TypeScript

---

# 📂 Project Structure

```
app/
│
├── _layout.tsx
├── index.tsx          // Home Screen
├── drive.tsx          // Driving Session
├── summary.tsx        // Drive Summary
├── history.tsx        // Previous Sessions
└── profile.tsx

hooks/
│
└── useDeviceMotion.ts

utils/
│
└── calculateEvent.ts
```

---

# ⚙️ Architecture

```
User

↓

Home Screen

↓

Start Drive

↓

Device Motion Hook

↓

Sensor Data

↓

Event Detection

↓

Score Calculation

↓

Summary Screen

↓

History
```

---

# 📡 Sensor Integration

The application uses **Expo DeviceMotion** which internally provides:

- Accelerometer
- Gyroscope
- Device Motion

The sensor subscription lifecycle is:

```
Start Drive

↓

Check Sensor Availability

↓

Set Update Interval

↓

Subscribe

↓

Receive Motion Data

↓

Detect Events

↓

End Drive

↓

Cleanup Subscription
```

---

# 🧮 Event Detection Flow

```
Device Motion

↓

Motion Data

↓

calculateEvent()

↓

Driving Event

↓

Update Score

↓

Update UI
```

---

# 📈 Future Improvements

- GPS Route Tracking
- Route Replay
- Event Timeline
- AI Driving Feedback
- Heatmaps
- Better Motion Filtering
- Historical Analytics
- Cloud Backup
- Authentication
- Backend Integration

---

# 🚀 Getting Started

Clone the repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
npm install
```

Start Expo

```bash
npx expo start
```

Run on Android

```bash
npx expo run:android
```

or scan the QR code using **Expo Go**.
