# ECE 3D Lab — Interactive Electronics Mini Project Simulator

> **VTU 2022 Scheme — BEC586: 100 Mini Project Ideas for 5th Semester ECE Students**  
> *A Modern, Responsive, Visual 3D Electronics Prototyping & Viva Preparation Platform*

---

## 1. Project Vision

**ECE 3D Lab** is an interactive 3D electronics simulation and learning platform engineered specifically for Electronics and Communication Engineering (ECE) students. Based on the Visvesvaraya Technological University (VTU) 2022 Scheme syllabus (**BEC586 — Mini Project**), it encompasses the complete catalogue of **all 100 official mini project titles**, organized across 10 curricular domains.

Instead of generic text descriptions or decorative landing pages, **ECE 3D Lab** bridges the gap between circuit theory and laboratory demonstration. It provides students with:
- **Interactive 3D Workbench**: Examine real microcontrollers (Arduino UNO, ESP32, Nano), breadboards, sensors, actuators, and jumper wire connections in 360° 3D space with exploded view and step-by-step assembly modes.
- **Accurate Interactive Circuit Diagrams**: Pin-accurate SVG schematics highlighting power, ground, analog, digital, and I2C buses with clickable continuity tracing.
- **Real-Time Physics Simulations**: Working interactive hardware simulators with sliders, gauges, day/night light transitions, acoustic time-of-flight calculators, and real-time Recharts waveforms.
- **Procurement & Materials (BOM)**: Complete shopping lists with realistic Indian Rupee (₹) pricing, laboratory availability tracking, compatible alternatives, and CSV export.
- **Production-Grade Code**: Commented, verified Arduino C/C++ and Python scripts with library instructions and upload guidelines.
- **23-Section VTU Academic Report Generator & Viva Voce Q&A**: Complete project documentation template adhering to university standards with model oral exam questions and concise technical answers.

---

## 2. Technology Stack

- **Frontend Core**: React 18, TypeScript, Vite
- **Styling & Theme**: Tailwind CSS (Engineering Dark Navy `#060A14`, Electric Cyan `#00F0FF`, Purple `#8B5CF6`)
- **3D Engine**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Charts & Telemetry**: Recharts
- **Icons**: Lucide React
- **Celebrations**: Canvas Confetti
- **Testing**: Vitest
- **Backend API**: Node.js & Express (TypeScript / TSX)
- **Database & State**: SQLite / JSON persistent repository with clean migration path to PostgreSQL

---

## 3. Complete Catalogue of 100 Mini Projects (VTU BEC586)

### Category 1 — Internet of Things (IoT)
1. **IoT Based Smart Home Automation System** *(Flagship Reference)*
2. IoT Based Smart Energy Meter Monitoring System
3. IoT Based Smart Street Light Monitoring System
4. IoT Based Weather Monitoring System
5. IoT Based Smart Agriculture Monitoring System
6. IoT Based Smart Irrigation System
7. IoT Based Water Tank Level Monitoring System
8. IoT Based Air Pollution Monitoring System
9. IoT Based Smart Garbage Monitoring System
10. IoT Based LPG Gas Leakage Detection and Alert System

### Category 2 — Smart Home and Automation
11. Automatic Room Light Controller Using PIR Sensor
12. Smart Door Lock Using RFID
13. Password Based Digital Door Lock System
14. Bluetooth Controlled Home Automation System
15. Voice Controlled Home Appliance System
16. Automatic Fan Speed Controller Based on Temperature
17. Smart Home Security System Using Sensors
18. Automatic Water Pump Controller
19. Smart Visitor Alert System
20. Mobile Controlled Electrical Appliance System

### Category 3 — Arduino Based Projects
21. Arduino Based Digital Temperature Monitoring System
22. Arduino Based Automatic Plant Watering System
23. **Arduino Based Ultrasonic Distance Measurement System** *(Flagship Reference)*
24. Arduino Based Smart Dustbin
25. Arduino Based Fire Detection System
26. Arduino Based Gas Leakage Detection System
27. Arduino Based Digital Tachometer
28. Arduino Based Automatic Parking System
29. Arduino Based Electronic Voting Machine
30. Arduino Based Obstacle Detection System

### Category 4 — ESP32 and Wireless Projects
31. ESP32 Based Wi-Fi Home Automation System
32. ESP32 Based Environmental Monitoring System
33. ESP32 Based Smart Energy Monitoring System
34. ESP32 Based IoT Notice Board
35. ESP32 Based Smart Door Security System
36. ESP32 Based Real-Time Temperature and Humidity Monitor
37. ESP32 Based Water Quality Monitoring System
38. ESP32 Based Smart Attendance System
39. ESP32 Based Remote Appliance Controller
40. ESP32 Based IoT Fire Alert System

### Category 5 — Sensor Based Projects
41. Smart Blind Stick Using Ultrasonic Sensor
42. Automatic Hand Sanitizer Dispenser
43. Rain Detection and Automatic Window Closing System
44. Soil Moisture Monitoring System
45. Smart Parking Slot Detection System
46. **Automatic Street Light Using LDR Sensor** *(Flagship Reference)*
47. Human Motion Detection Security Alarm
48. Water Leakage Detection System
49. Temperature Based Fire Warning System
50. Smart Liquid Level Indicator

### Category 6 — Communication System Projects
51. Bluetooth Based Wireless Notice Board
52. Bluetooth Controlled Robotic Vehicle
53. GSM Based Home Security Alert System
54. GSM Based Fire Alert System
55. GSM Based Vehicle Accident Alert System
56. Wireless Data Transmission Using RF Module
57. RF Based Home Appliance Control System
58. Wi-Fi Based Remote Monitoring System
59. Wireless Sensor Data Communication System
60. Li-Fi Based Text Communication System

### Category 7 — Security and Safety Projects
61. RFID Based Access Control System
62. Fingerprint Based Door Lock System
63. Smart Helmet for Accident Detection
64. Vehicle Accident Detection and Alert System
65. Driver Drowsiness Detection System
66. Fire and Smoke Detection Alert System
67. Women Safety Alert System Using GPS and GSM
68. Child Safety Tracking System
69. Anti-Theft Vehicle Security System
70. Smart Bank Locker Security System

### Category 8 — Healthcare and Biomedical Projects
71. IoT Based Patient Health Monitoring System
72. Heart Rate Monitoring System
73. Body Temperature Monitoring System
74. Pulse Rate Monitoring and Alert System
75. Smart Medicine Reminder System
76. Fall Detection System for Elderly People
77. Smart Wheelchair Control System
78. Contactless Body Temperature Measurement System
79. Patient Emergency Alert System
80. IoT Based Remote Health Monitoring System

### Category 9 — Signal and Image Processing
81. Digital Noise Reduction from Audio Signals
82. Speech Signal Analysis Using Python
83. Audio Signal Frequency Spectrum Analyzer
84. ECG Signal Processing and Heart Rate Detection
85. Digital Image Noise Removal System
86. Image Edge Detection Using Digital Image Processing
87. Face Detection Using OpenCV
88. Vehicle Number Plate Detection System
89. Motion Detection Using Image Processing
90. Traffic Density Detection Using Image Processing

### Category 10 — Artificial Intelligence and Machine Learning
91. Machine Learning Based Signal Classification System
92. AI Based Human Face Recognition System
93. Machine Learning Based Energy Consumption Prediction
94. AI Based Fire and Smoke Detection System
95. Machine Learning Based Fault Detection in Electronic Systems
96. AI Based Smart Traffic Monitoring System
97. AI Based Voice Command Recognition System
98. Machine Learning Based Wireless Signal Strength Prediction
99. AI Based Electronic Component Classification System
100. Machine Learning Based Human Activity Recognition

---

## 4. Deep Dive: Three Flagship Reference Projects

### 1. Arduino Based Ultrasonic Distance Measurement System (Project #23)
- **Controller**: Arduino UNO R3 (ATmega328P @ 16 MHz)
- **Key Sensor**: HC-SR04 Ultrasonic Transceiver (40 kHz burst, 2 cm - 400 cm range)
- **Display**: 16x2 Character LCD with PCF8574 I2C serial backpack (SDA A4, SCL A5)
- **Feedback Subsystem**: Active Piezo Buzzer (<10 cm alarm), Red/Green status LEDs
- **Physics Formula**:
  $$\text{Speed of Sound: } v = 331.4 + 0.606 \times T \, \text{[m/s]}$$
  $$\text{Distance: } d = \frac{\text{Echo Time } (\mu s) \times 0.0343}{2} \, \text{[cm]}$$
- **Interactive Simulator**: Adjust obstacle distance (2 cm to 400 cm) and ambient temperature to observe live acoustic velocity shifts, alphanumeric I2C LCD rendering, and acoustic alarm triggering.

### 2. Automatic Street Light Using LDR Sensor (Project #46)
- **Controller**: Arduino UNO R3
- **Key Sensor**: 5mm Cadmium Sulfide (CdS) Photoresistor in a 10 kΩ pull-down voltage divider
- **Switching Actuator**: 5V Optocoupled Electromechanical Relay (Active LOW) driving a 12V high-power street lamp
- **Circuit Theory & Formula**:
  $$V_{\text{out}} = 5\text{V} \times \frac{10000}{R_{\text{LDR}} + 10000}$$
  $$\text{Software Hysteresis: } \text{ON at } \text{ADC} \le 320, \, \text{OFF at } \text{ADC} \ge 480$$
- **Interactive Simulator**: Continuous sunlight slider (0 to 1000 Lux), day/twilight/night transitions, relay armature click animation, and anti-chatter hysteresis visualization.

### 3. IoT Based Smart Home Automation System (Project #1)
- **Controller**: ESP32 NodeMCU (Xtensa dual-core 32-bit @ 240 MHz)
- **Sensors**: Single-wire DHT11 (temperature and humidity) + MQ-2 Flammable Gas & Smoke Sensor (with 2:1 safety voltage divider to protect 3.3V ADC1)
- **Actuators**: 4-Channel Optocoupled 5V Relay Board (Living Room Light, Ceiling Fan, Night Lamp, Power Socket)
- **Firmware**: FreeRTOS AsyncWebServer hosting embedded HTML5 dashboard directly from flash memory
- **Safety Interlock**: Automatic power cutoff that de-energizes all relays immediately when gas concentration exceeds 1800 PPM
- **Interactive Simulator**: 4 appliance toggles, live power consumption (Watts), simulated MQTT JSON telemetry logs, and gas emergency cutoff.

---

## 5. 10-Tab Individual Project Workspace

Every project in the application features its own dedicated 10-tab workspace:

1. **Overview**: Executive summary, curricular objectives, difficulty, budget, and safety guidelines.
2. **Interactive 3D Model**: 360° OrbitControls workbench, exploded view, assembly mode, and component inspector.
3. **Circuit Diagram**: SVG schematic with wire continuity highlighting, zoom/pan controls, print mode, and pin connection tables.
4. **Components & BOM**: Complete shopping list in Indian Rupees (₹), quantity selectors, lab availability checkboxes, compatible alternatives, and CSV export.
5. **Pin Connections**: Pinout table specifying Component, Module Pin, Controller Pin, Signal Type, Voltage Level, and Notes.
6. **How It Works**: Deep technical explanation, step-by-step electronic workflow, and circuit formulas.
7. **Code & Software**: Verified source code (C++/Python) with library installation commands, copy button, and `.ino`/`.py` file download.
8. **Simulation & Testing**: Interactive real-time test bench with sliders, live LCD/gauges, and Recharts telemetry graphs.
9. **Troubleshooting**: Diagnostic matrix listing symptoms, root causes, and verified lab fixes.
10. **Report & Viva**: Comprehensive 23-section VTU academic report generator with model Viva Voce questions and answers.

---

## 6. How to Run Locally in VS Code (Windows)

### Prerequisites
- **Node.js** (v18, v20, or higher — tested on Node v26)
- **Git** / **VS Code**

### Installation Steps

1. Open a terminal in the project directory in VS Code:
```powershell
cd "c:\Users\Vinay S Adiwal\OneDrive\Music\Playlists"
```

2. Install all dependencies (Client + Server + Root):
```powershell
npm install
```

3. Run the complete application in development mode:
```powershell
npm run dev
```

This starts:
- **Client (Vite + React)** at `http://localhost:5173`
- **Backend API (Express + TSX)** at `http://localhost:5000`

Open your browser and navigate to:
```
http://localhost:5173
```

### Running Tests
To run the automated Vitest test suite verifying all 100 projects and component data:
```powershell
npm run test
```

### Building for Production
To generate optimized production bundles:
```powershell
npm run build
```

---

## 7. Laboratory Safety & Best Practices

- **Low-Voltage Default**: All student circuits are designed for safe 5V / 3.3V DC operation.
- **Mains Warning**: **NEVER wire 230V AC mains directly on a solderless breadboard!** Solderless breadboards are rated strictly for low voltage DC (<30V). For laboratory demonstrations, use safe 12V DC lamps or LED test rigs.
- **Logic Level Isolation**: The ESP32 is **NOT 5V tolerant**. Always verify voltage dividers or level shifters when connecting 5V sensors to ESP32 GPIOs.
- **Relay Coil Isolation**: Use optocoupled relay boards with flyback diodes to prevent inductive kickback from resetting or damaging microcontrollers.
