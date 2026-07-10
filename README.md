# 🌱 AgriSphere AI — Intelligent Farming Assistant

> **An AI-powered smart agriculture platform that helps farmers detect crop diseases, monitor weather conditions, and receive data-driven farming recommendations for improved productivity and sustainable agriculture.**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=node.js)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge\&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge\&logo=mongodb)
![AI](https://img.shields.io/badge/AI-Powered-success?style=for-the-badge)

---

## 📖 Overview

Agriculture faces challenges such as delayed disease identification, unpredictable weather, and limited access to expert advice. **AgriSphere AI** addresses these issues by combining Artificial Intelligence with modern web technologies to provide farmers with intelligent, accessible, and real-time decision support.

The platform enables users to upload crop images for disease analysis, monitor weather conditions, and receive personalized farming recommendations through a responsive and user-friendly interface.

---

# ✨ Key Features

### 🌿 AI Crop Disease Detection

* Upload crop images for instant disease identification.
* AI-assisted prediction with confidence score.
* Early detection helps reduce crop loss.

### 🌦 Weather Monitoring

* Real-time weather information.
* Temperature
* Humidity
* Wind Speed
* Rainfall Forecast

### 🤖 Smart Farming Recommendations

* Crop care suggestions
* Disease prevention tips
* Irrigation guidance
* Best farming practices

### 👤 Secure Authentication

* User Registration
* Login System
* JWT Authentication
* Protected Routes

### 📱 Responsive UI

* Mobile Friendly
* Tablet Friendly
* Desktop Optimized

### 📊 Dashboard

* Clean Analytics
* Disease History
* User-friendly Navigation

---

# 🏗 System Architecture

```text
                    +----------------+
                    |   React Frontend|
                    +--------+-------+
                             |
                      REST API Calls
                             |
                    +--------v--------+
                    | Express Backend |
                    +--------+--------+
                             |
              +--------------+--------------+
              |                             |
       MongoDB Database              AI Prediction Model
              |                             |
              +--------------+--------------+
                             |
                    Weather API Integration
```

---

# 🛠 Tech Stack

## Frontend

* React.js
* Vite
* HTML5
* CSS3
* JavaScript (ES6+)
* Axios

## Backend

* Node.js
* Express.js
* REST API

## Database

* MongoDB
* Mongoose

## Artificial Intelligence

* Python
* TensorFlow / Scikit-Learn
* Image Classification Model

## APIs

* Weather API
* AI Prediction API

## Tools

* Git
* GitHub
* Postman
* VS Code

---

# 📂 Folder Structure

```text
AgriSphere-AI
│
├── client
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── hooks
│   │   ├── context
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   ├── app.js
│   └── package.json
│
├── screenshots
├── README.md
└── .env
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/yourusername/agrisphere-ai.git
```

```bash
cd agrisphere-ai
```

---

## Install Frontend

```bash
cd client
npm install
```

Run Frontend

```bash
npm run dev
```

---

## Install Backend

```bash
cd server
npm install
```

Run Backend

```bash
npm run dev
```

---

## Environment Variables

Create a `.env` file inside the server directory.

```env
PORT=5000

MONGODB_URI=your_mongodb_uri

JWT_SECRET=your_secret

WEATHER_API_KEY=your_weather_api_key

AI_API_URL=your_prediction_api
```

---

# 💻 Application Workflow

1. User registers and logs in.
2. Uploads a crop image.
3. Backend sends image to AI model.
4. AI predicts crop disease.
5. Prediction is stored in MongoDB.
6. Weather API provides current conditions.
7. Platform generates personalized farming recommendations.
8. Results are displayed on the dashboard.

---

# 📸 Screenshots

| Home           | Dashboard      |
| -------------- | -------------- |
| Add Screenshot | Add Screenshot |

| Disease Detection | Weather        |
| ----------------- | -------------- |
| Add Screenshot    | Add Screenshot |

---

# 📈 Future Scope

* Voice-based Farmer Assistant
* Multi-language Support
* Satellite Image Analysis
* Crop Yield Prediction
* Pest Detection
* Fertilizer Recommendation
* Market Price Prediction
* Government Scheme Integration
* IoT Sensor Integration
* Offline Mode
* AI Chatbot for Farmers

---

# 🔒 Security

* JWT Authentication
* Password Encryption
* Protected Routes
* Secure API Communication
* Input Validation
* Error Handling

---

# ⚡ Performance Highlights

* Fast React + Vite frontend
* RESTful API architecture
* Modular backend design
* Responsive UI
* Clean component-based architecture
* Optimized API calls
* Scalable project structure

---

# 🧪 Testing

* API testing using Postman
* Component testing
* Manual UI testing
* Backend endpoint validation

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to GitHub
5. Create a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Developer

**Vaibhav Solanki**

B.Tech Computer Science Engineering

Passionate about Full-Stack Development, Artificial Intelligence, and Building Scalable Software Solutions.

---

# ⭐ Why This Project?

AgriSphere AI demonstrates:

* Full-Stack Web Development
* REST API Development
* AI Integration
* Authentication & Authorization
* Database Design
* Modern React Architecture
* Clean Code Practices
* Responsive UI Development
* Real-world Problem Solving
* End-to-End Project Deployment

This project reflects industry-standard software engineering practices and showcases the ability to design, build, and deploy an AI-enabled web application suitable for real-world agricultural use.

---

## ⭐ If you found this project useful, consider giving it a star on GitHub!
