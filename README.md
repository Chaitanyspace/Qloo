# 🚀 LaunchLens - Smart Business Location Analytics

> **Discover where your business idea is in demand and culturally aligned — powered by Qloo + OpenAI**

LaunchLens helps entrepreneurs and business owners identify the best cities to launch or expand their business by analyzing cultural trends, demand patterns, and local business ecosystems.

[LaunchLens Demo](https://launchlens-nine.vercel.app)

## ✨ Features

### 🎯 **Smart Location Analysis**
- **Country & State Reports**: Analyze opportunities across entire countries or focus on specific states
- **Cultural Intelligence**: Leverage Qloo's cultural data to find markets aligned with your business
- **Demand Scoring**: AI-powered scoring system for audience match and general demand

### 🌟 **Business Intelligence**
- **Local Ecosystem Mapping**: Find relevant influencers, suppliers, and real estate agents
- **Popular Places Discovery**: Identify high-traffic locations for brand visibility
- **GPT-Powered Insights**: Get personalized business pitches and market strategies

### 📊 **Analytics & Reporting**
- **Interactive Dashboard**: Browse through top cities with detailed breakdowns
- **Report History**: Save and revisit previous analyses
- **PDF Export**: Download summary or detailed reports for offline use

### 🔐 **User Management**
- **Secure Authentication**: JWT-based user registration and login
- **Personal History**: Track all your business analyses over time
- **Session Management**: Secure token-based authentication

## 🏗️ Architecture

```
LaunchLens/
├── main-app/
│   ├── Backend/           # FastAPI server
│   │   ├── run.py        # Main application
│   │   └── requirements.txt
│   └── modern-ui/        # React frontend
│       ├── src/
│       │   ├── components/
│       │   ├── config/   # API configuration
│       │   └── lib/
│       └── package.json
└── authwith/             # Alternative auth implementation
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm
- **Python** 3.8+
- **MySQL** 8.0+
- **API Keys**: Qloo API, OpenAI API

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/launchlens.git
cd launchlens
```

### 2. Backend Setup
```bash
cd main-app/Backend

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run the server
python run.py
```

### 3. Frontend Setup
```bash
cd main-app/modern-ui

# Install dependencies
npm install

# Start development server
npm run dev
```

### 4. Environment Configuration

Create `.env` file in `main-app/Backend/`:
```env
# Database
MYSQL_HOST=yout_host
MYSQL_DB=your_db
MYSQL_USER=your_user
MYSQL_PASSWORD=your_password
MYSQL_PORT=your_port

# Security
SECRET_KEY=your-secret-key-here

# External APIs
QLOO_API_KEY=your-qloo-api-key
OPENAI_API_KEY=your-openai-api-key
```

## 🛠️ Tech Stack

### Frontend
- **⚛️ React 18** - Modern UI framework
- **⚡ Vite** - Lightning-fast build tool
- **🎨 Tailwind CSS** - Utility-first styling
- **🎯 Lucide React** - Beautiful icons
- **📱 React Router** - Client-side routing

### Backend
- **🚀 FastAPI** - High-performance Python API
- **🗄️ MySQL** - Relational database
- **🔐 JWT** - Secure authentication
- **🤖 OpenAI API** - AI-powered insights
- **🎭 Qloo API** - Cultural intelligence data

### Infrastructure
- **🔧 MySQL Connector** - Database integration
- **🔒 Passlib** - Password hashing
- **📡 CORS** - Cross-origin resource sharing

## 📖 API Documentation

### Authentication Endpoints
- `POST /register` - Create new user account
- `POST /login` - Authenticate user
- `GET /me` - Get current user info

### Business Analysis
- `POST /analyze` - Analyze business idea for location
- `GET /countries` - Get available countries
- `GET /states/{country_id}` - Get states for country

### Report Management
- `GET /history` - Get user's report history  
- `GET /history/select/{history_id}` - Get specific report data

## 🎯 Usage Examples

### Analyze a Yoga Studio in California
```javascript
const response = await fetch('/analyze', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-jwt-token',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    idea: 'Yoga Studio',
    report_type: 'state',
    country: 'United States',
    state: 'California'
  })
});
```

### Get Report History
```javascript
const history = await fetch('/history', {
  headers: { 'Authorization': 'Bearer your-jwt-token' }
});
```

## 🔧 Development

### Project Structure
```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── Login.jsx     # Authentication
│   ├── Register.jsx  # User registration
│   └── Sidebar.jsx   # Report history
├── config/
│   └── api.js        # Centralized API configuration
└── lib/
    └── utils.js      # Utility functions
```

### Key Components
- **App.jsx** - Main application logic and routing
- **SearchableSelect** - Custom dropdown with search
- **Sidebar** - Report history management
- **MainAppUI** - Core analysis dashboard

## 🚀 Deployment

### Backend Deployment
1. Set up MySQL database
2. Configure environment variables
3. Install dependencies: `pip install -r requirements.txt`
4. Run: `python run.py`

### Frontend Deployment
1. Build production bundle: `npm run build`
2. Deploy `dist/` folder to your hosting service
3. Configure API base URL in `src/config/api.js`

### Recommended Hosting
- **Backend**: Railway, Render, or Heroku
- **Frontend**: Vercel, Netlify, or GitHub Pages
- **Database**: PlanetScale, Railway MySQL, or AWS RDS

## 🎉 Acknowledgments

- **Qloo** for cultural intelligence data
- **OpenAI** for AI-powered insights
- **FastAPI** team for the amazing framework
- **React** team for the UI framework

---

**Made with ❤️ by the LaunchLens Team**

*"Launch smarter, not harder"*
