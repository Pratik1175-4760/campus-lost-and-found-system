# 🔍 Campus Lost and Found

> An intelligent lost and found management system powered by AI for seamless item recovery on college campuses

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-brightgreen.svg)](https://www.mongodb.com/)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [AI/ML Integration](#aiml-integration)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🎯 Overview

Campus Lost and Found is a modern, AI-powered web application designed to digitize and streamline the traditional manual lost and found system in educational institutions. The system leverages machine learning for automatic image analysis and natural language processing for intuitive search capabilities.

### 🎥 [Live Demo](your-deployment-link-here)

---

## ❓ Problem Statement

### Current Challenges:
- **Time-consuming manual process**: Students must physically visit the lost & found center
- **Inefficient searches**: Manual log books are difficult to search through
- **Wasted effort**: No way to know if an item has been found before making the trip
- **Poor user experience**: Both finders and seekers waste time and energy
- **Limited accessibility**: Center operates only during specific hours

### Our Solution:
A digital platform that allows:
- ✅ Instant uploads of found items with automatic categorization
- ✅ Smart search using natural language queries
- ✅ Real-time status tracking (with finder/submitted/claimed)
- ✅ AI-powered image analysis for automatic tagging
- ✅ 24/7 accessibility from anywhere

---

## ✨ Features

### 🤖 AI-Powered Features
- **Automatic Image Analysis**: Uses TensorFlow.js COCO-SSD model to detect and classify items
- **Smart Tagging**: Automatically extracts item type, dominant colors, and characteristics
- **Natural Language Search**: Search using everyday language like "blue bottle lost yesterday in library"
- **Intelligent Filtering**: AI parses queries to apply relevant filters automatically

### 📱 Core Functionality
- **No Login Required**: Quick reporting without authentication barriers
- **Image Compression**: Automatic client-side compression for faster uploads
- **Multi-filter Search**: Filter by date, item type, location, color, and description
- **Status Tracking**: Real-time status updates (With Finder → Submitted → Claimed → Verified)
- **Contact Privacy**: Contact details revealed only when needed
- **Cross-verification**: Keep resolved entries for a period to prevent duplicate claims

### 🎨 User Experience
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Image Previews**: See images before uploading
- **Loading States**: Clear feedback during uploads and searches
- **Manual Override**: Edit AI-generated tags if needed
- **Intuitive Interface**: Clean, modern UI built with Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)

- **React 18.x** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **TensorFlow.js** - Machine learning in the browser
- **COCO-SSD** - Object detection model
- **Compromise.js** - Natural language processing
- **Axios** - HTTP client
- **React Hook Form** - Form state management
- **browser-image-compression** - Client-side image optimization
- **date-fns** - Date utility library
- **Lucide React** - Icon library

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Multer** - File upload middleware
- **Cloudinary** - Cloud image storage
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing

### Deployment
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

- **Vercel** - Frontend hosting
- **Render** - Backend hosting
- **MongoDB Atlas** - Database hosting

---

## 🏗️ System Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT SIDE                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐      ┌──────────────┐                     │
│  │   Upload     │      │    Search    │                      │
│  │  Component   │      │  Component   │                      │
│  └──────┬───────┘      └──────┬───────┘                     │
│         │                     │                               │
│         ▼                     ▼                               │
│  ┌──────────────┐      ┌──────────────┐                     │
│  │ TensorFlow.js│      │Compromise.js │                      │
│  │Image Analysis│      │  NLP Parser  │                      │
│  └──────┬───────┘      └──────┬───────┘                     │
│         │                     │                               │
│         ▼                     ▼                               │
│  ┌──────────────────────────────────┐                       │
│  │   browser-image-compression      │                        │
│  └──────────────┬───────────────────┘                       │
│                 │                                             │
└─────────────────┼─────────────────────────────────────────┘
                  │
                  ▼
        ┌─────────────────┐
        │   API Gateway    │
        │   (Express.js)   │
        └────────┬─────────┘
                 │
        ┌────────┴─────────┐
        │                  │
        ▼                  ▼
┌───────────────┐   ┌──────────────┐
│   Cloudinary  │   │   MongoDB    │
│ Image Storage │   │   Database   │
└───────────────┘   └──────────────┘
```

---

## 🧠 AI/ML Integration

### 1. Image Analysis with TensorFlow.js

**Model**: COCO-SSD (Common Objects in Context - Single Shot Detector)

**Capabilities**:
- Detects 80+ common object types
- Provides confidence scores for predictions
- Runs entirely in the browser (no backend load)

**Implementation**:
```javascript
// Load model
const model = await cocoSsd.load();

// Analyze image
const predictions = await model.detect(imageElement);

// Extract results
const itemType = predictions[0]?.class;  // e.g., "bottle"
const confidence = predictions[0]?.score; // e.g., 0.94
```

**Auto-generated fields**:
- Item type (bottle, phone, laptop, bag, etc.)
- Detection confidence
- Timestamp

### 2. Natural Language Processing with Compromise.js

**Capabilities**:
- Extracts entities from natural language
- Parses dates, colors, nouns, locations
- Lightweight, runs client-side

**Example Query Parsing**:
```javascript
Input: "I lost my blue water bottle yesterday in the library"

Output:
{
  color: "blue",
  itemType: "bottle",
  location: "library",
  date: "2026-01-30" // yesterday's date
}
```

**Supported Patterns**:
- Colors: red, blue, green, black, white, etc.
- Time: yesterday, today, last week, Monday, etc.
- Locations: library, gym, canteen, hostel, etc.
- Item types: All common objects

---

## 💻 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (free tier)
- Cloudinary account (free tier)
- Git

### Clone Repository
```bash
git clone https://github.com/yourusername/campus-lost-and-found.git
cd campus-lost-and-found
```

### Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```env
MONGODB_URI=your_mongodb_atlas_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000
NODE_ENV=development
```

Start backend server:
```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
```

Create `.env` file in frontend directory:
```env
VITE_API_URL=http://localhost:5000
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset
```

Start frontend development server:
```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🔐 Environment Variables

### Backend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/lostfound` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `your-cloud-name` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `123456789012345` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `abcdefghijklmnopqrstuvwxyz` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` or `production` |

### Frontend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000` or `https://your-api.com` |
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `your-cloud-name` |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Upload preset name | `unsigned_preset_name` |

---

## 📖 Usage

### For Finders (Uploading Found Items)

1. **Navigate to Upload Page**
2. **Upload Image**: Click to select or drag & drop
3. **AI Analysis**: System automatically detects item type and characteristics
4. **Review & Edit**: Verify AI-generated tags, edit if needed
5. **Add Details**: 
   - Location where item was found
   - Additional description
   - Your contact information
   - Current status (with you or submitted to center)
6. **Submit**: Item is instantly searchable by others

### For Seekers (Searching for Lost Items)

1. **Navigate to Search Page**
2. **Use Natural Language**: Type what you lost
   - Example: "blue bottle lost yesterday"
   - Example: "black phone in library on Monday"
3. **Or Use Filters**:
   - Date range
   - Item type
   - Location
   - Color
4. **Browse Results**: View matching items with images
5. **Contact Finder**: Get contact info to claim your item
6. **Verify Ownership**: Confirm item details before claiming

---

## 📡 API Documentation

### Base URL
```
Development: http://localhost:5000/api
Production: https://your-api-url.com/api
```

### Endpoints

#### Items

**POST /items**
```javascript
// Create new found item
Body: FormData {
  image: File,
  itemType: String,
  color: String,
  location: String,
  description: String,
  contactName: String,
  contactPhone: String,
  status: String // 'with_finder' | 'submitted'
}

Response: {
  success: true,
  data: {
    _id: "...",
    imageUrl: "https://...",
    itemType: "bottle",
    // ... other fields
  }
}
```

**GET /items**
```javascript
// Get all items with optional filters
Query params:
  ?itemType=bottle
  &color=blue
  &location=library
  &startDate=2026-01-01
  &endDate=2026-01-31
  &status=with_finder

Response: {
  success: true,
  count: 10,
  data: [...]
}
```

**GET /items/:id**
```javascript
// Get single item by ID
Response: {
  success: true,
  data: {...}
}
```

**PUT /items/:id**
```javascript
// Update item status
Body: {
  status: 'claimed',
  claimedBy: 'John Doe',
  claimedContact: '1234567890'
}

Response: {
  success: true,
  data: {...}
}
```

**DELETE /items/:id**
```javascript
// Delete item (admin only or auto-archive)
Response: {
  success: true,
  message: 'Item deleted'
}
```

#### Search

**POST /search/natural**
```javascript
// Natural language search
Body: {
  query: "blue bottle lost yesterday in library"
}

Response: {
  success: true,
  parsedFilters: {
    color: "blue",
    itemType: "bottle",
    location: "library",
    date: "2026-01-30"
  },
  results: [...]
}
```

---

## 📸 Screenshots

### Homepage
![Homepage](screenshots/homepage.png)
*Clean, intuitive interface for quick access*

### Upload Page
![Upload](screenshots/upload.png)
*AI-powered image analysis with automatic tagging*

### Search Interface
![Search](screenshots/search.png)
*Natural language search with smart filtering*

### Item Details
![Details](screenshots/details.png)
*Detailed view with status tracking*

### Mobile View
![Mobile](screenshots/mobile.png)
*Fully responsive design*

---

## 🚀 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Import repository in Vercel
3. Configure build settings:
```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
```
4. Add environment variables
5. Deploy

### Backend (Render)

1. Create new Web Service
2. Connect GitHub repository
3. Configure:
```
   Build Command: npm install
   Start Command: npm start
```
4. Add environment variables
5. Deploy

### Database (MongoDB Atlas)

1. Create free cluster
2. Whitelist IP addresses (0.0.0.0/0 for development)
3. Create database user
4. Get connection string
5. Add to environment variables

---

## 🔮 Future Enhancements

### Planned Features
- [ ] **Image Similarity Search**: Find visually similar items using vector embeddings
- [ ] **Email/SMS Notifications**: Alert when matching items are found
- [ ] **User Accounts**: Track your uploads and claims
- [ ] **Analytics Dashboard**: Visualize trends (most lost items, hotspots)
- [ ] **Multi-language Support**: Hindi, regional languages
- [ ] **QR Code Generation**: For physical tags
- [ ] **Admin Panel**: Moderate listings, manage database
- [ ] **Mobile App**: React Native version
- [ ] **Chat System**: In-app messaging between finder and seeker
- [ ] **Rating System**: Rate experiences for trust building

### Technical Improvements
- [ ] Image similarity using CLIP embeddings
- [ ] Redis caching for faster searches
- [ ] WebSocket for real-time updates
- [ ] Progressive Web App (PWA)
- [ ] Advanced analytics with ML predictions
- [ ] Multi-campus support
- [ ] Integration with college ID systems

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation if needed
- Test your changes thoroughly

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```
MIT License

Copyright (c) 2026 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 👤 Contact

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com
- Portfolio: [yourportfolio.com](https://yourportfolio.com)

**Project Link**: [https://github.com/yourusername/campus-lost-and-found](https://github.com/yourusername/campus-lost-and-found)

**Live Demo**: [https://your-project.vercel.app](https://your-project.vercel.app)

---

## 🙏 Acknowledgments

- [TensorFlow.js](https://www.tensorflow.org/js) for machine learning capabilities
- [Compromise.js](https://github.com/spencermountain/compromise) for NLP functionality
- [Cloudinary](https://cloudinary.com/) for image hosting
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for database hosting
- [Vercel](https://vercel.com/) and [Render](https://render.com/) for deployment
- [React](https://react.dev/) and [Tailwind CSS](https://tailwindcss.com/) communities

---

## 📊 Project Stats

![GitHub Stars](https://img.shields.io/github/stars/yourusername/campus-lost-and-found?style=social)
![GitHub Forks](https://img.shields.io/github/forks/yourusername/campus-lost-and-found?style=social)
![GitHub Issues](https://img.shields.io/github/issues/yourusername/campus-lost-and-found)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr/yourusername/campus-lost-and-found)

---

<div align="center">

**Made with ❤️ for making campus life easier**

⭐ Star this repo if you find it helpful!

</div>
```

---

## **📝 Additional Files to Include**

### **1. LICENSE file**
```
MIT License

Copyright (c) 2026 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### **2. .gitignore**
```
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Production
/build
/dist

# Misc
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Cache
.cache/