#  PortfolioPal
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## AI-Powered Portfolio Builder for Developers & Creators

PortfolioPal is a full-stack AI-powered application that helps developers create professional portfolios with the assistance of intelligent AI agents.

It simplifies the process of writing project descriptions, improving portfolio content, and organizing developer profiles into a professional digital presence.

---

##  Features

###  AI-Powered Content Generation
- Generate professional portfolio content using AI
- Improve project descriptions automatically
- Get AI-powered writing suggestions
- Create structured portfolio sections

###  Multi-Agent AI System

PortfolioPal uses multiple AI agents:

-  **Writer Agent:**
  - Generates portfolio content
  - Creates professional descriptions

-  **Reviewer Agent:**
  - Reviews generated content
  - Suggests improvements

-  **Planner Agent:**
  - Organizes portfolio structure
  - Plans content flow

###  Authentication
- Secure user authentication
- User-specific portfolio management
- Protected application routes

###  Modern Dashboard
- Responsive UI
- Clean developer-focused interface
- Reusable React components

###  Full Stack Architecture
- Separate frontend and backend
- REST API communication
- Scalable project structure

---

#  Tech Stack

## Frontend
- React.js
- Next.js
- JavaScript / JSX
- Tailwind CSS

## Backend
- Node.js
- Express.js
- REST API

## AI
- Gemini-2.5-flash API
- AI Agents
- Prompt Engineering

## Database & Services
- Supabase
- Environment Variables

---

# 📂 Project Structure
```
PortfolioPal/

├── backend/
│ └── src/
│ └── ai/
│ ├── agents/
│ │ ├── plannerAgent.js
│ │ ├── reviewerAgent.js
│ │ └── writerAgent.js
│ │
│ ├── prompts/
│ ├── providers/
│ └── services/
│
├── frontend/
│ ├── components/
│ ├── dashboard/
│ └── pages/
│
└── README.md
```

---

#  Installation & Setup

## Clone Repository

```
git clone https://github.com/CodeWithRetesh/PortfolioPal.git
```

## Go to project directory:
```
cd PortfolioPal
```

# Backend Setup
## Navigate to backend:
```
cd backend
```
## Install dependencies:
```n
pm install
```
## Create .env file:

```
PORT=5000

NODE_ENV=development

SUPABASE_URL=your_supabase_url

SUPABASE_ANON_KEY=your_supabase_key

OPENROUTER_API_KEY=your_api_key
```
## Start backend:
```
npm run dev
```

# Frontend Setup

## Open another terminal:
```
cd frontend
```

## Install dependencies:
```
npm install
```

## Run frontend:
```
npm run dev
```

#  Workflow:

```
User
 |
 |
Frontend Dashboard
 |
 |
Backend API
 |
 |
AI Agent System
 |
 |
Generated Portfolio Content
```

#  Future Improvements :
```
Portfolio templates
PDF export
GitHub profile integration
Portfolio deployment support
More advanced AI agents
```

# Developed by:
```
Retesh Halder
Full Stack Developer || AI-ML Enthusiast
```
