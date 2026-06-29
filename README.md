# 📚🎬 Book & Movie Collection Manager

A beautiful, modular, and responsive full-stack application designed to organize, track, and rate your favorite books and movies. Features a security gateway with JWT-based authentication

## ✨ Features

- **🔒 Authentication**: Secure JWT-based login & registration systems so each user maintains their private collection.
- **📚🎬 Dual Tracking**: Manage books and movies simultaneously with custom data fields (Category/Genre, Progress, Status, and a 0-10 Rating).
- **🎨 Cozy Kawaii Pixel Aesthetic**: Custom UI built with warm pastel palettes (accented in `#39C5BB`), pixelated rendering, customized scrollbars, and retro window panels.
- **🔍 Advanced Search & Filters**: Live query matching for title, category, or descriptions, plus type/status dropdowns and sorting mechanics.
- **📊 Real-time Stats Dashboard**: Interactive metrics summarizing total items, average rating, book/movie breakdowns, and completed statuses.
- **❤️ Favorites Section**: Direct view displaying items toggled as favorites.
- **⚡ Toast Notification System**: Animated, non-blocking visual feedback for CRUD operations and session changes.

## 🛠️ Tech Stack

**Frontend:**
- React (v18)
- React Router Dom (v6)
- Axios (HTTP Client with Interceptors)
- Lucide React (Icons)
- Vanilla CSS Custom Variables (HSL Design Tokens, Light/Dark Modes)

**Backend:**
- Node.js & Express
- MongoDB & Mongoose
- JSON Web Token (JWT)
- Bcryptjs (Password Hashing)

## 📁 Project Structure

This project follows a highly modular, clean architectural pattern:

```text
book-movie-collection/
├── colBackend/                 # Backend Node.js API
│   ├── config/                 # Configuration files
│   ├── controllers/            # Controller layer (handles HTTP requests/responses)
│   ├── middlewares/            # Middleware layer (JWT protection)
│   ├── models/                 # Mongoose Schemas (User & Item)
│   ├── routes/                 # Express Routers (auth & items)
│   ├── services/               # Service layer (business & database logic)
│   └── server.js               # Entry point
│
└── colfront/                   # Frontend React Application (Vite)
    ├── src/
    │   ├── components/
    │   │   ├── common/         # Shared items (Navbar, Toast, ProtectedRoute)
    │   │   └── items/          # Feature items (ItemCard, ItemFormModal, Filters)
    │   ├── pages/              # Main screens (Home, Favorites, Login)
    │   ├── services/           # Centralized API logic (api client, auth & items services)
    │   ├── App.jsx             # Route orchestrator
    │   ├── index.css           # Cute pixel design stylesheet
    │   └── main.jsx            # Entry mount
    ├── index.html
    └── vite.config.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js installed locally
- MongoDB database (local or cloud-hosted instance)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Serifeeng/book-movie-collection.git
   cd book-movie-collection/book-movie-collection-main
   ```

2. **Configure Backend**:
   - Navigate to `colBackend`:
     ```bash
     cd colBackend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `colBackend` directory and define:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     ```
   - Start the server in development mode:
     ```bash
     npm run dev
     ```

3. **Configure Frontend**:
   - Open a new terminal and navigate to `colfront`:
     ```bash
     cd ../colfront
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development client:
     ```bash
     npm run dev
     ```
   - Open `http://localhost:3000` in your web browser.
