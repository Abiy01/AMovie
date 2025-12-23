https://a-movie.vercel.app/

# 🎬 AMovie - Movie Discovery App

A modern, responsive movie discovery web application built with React. Browse popular movies, search for your favorites, watch trailers, and save movies to your personal favorites list.

![React](https://img.shields.io/badge/React-18.3.1-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.10-purple)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- 🎥 **Browse Popular Movies** - Discover trending and popular movies
- 🔍 **Live Search** - Real-time movie search with debouncing
- ❤️ **Favorites System** - Save and manage your favorite movies
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🎬 **Movie Details** - View comprehensive movie information including:
  - Movie overview and description
  - Cast and crew information
  - Director and writers
  - Production companies
  - Movie trailers (YouTube integration)
- ♾️ **Infinite Scroll** - Load more movies with "See More" button
- 🎨 **Modern UI** - Beautiful hero section with background image
- 💾 **Local Storage** - Favorites persist across browser sessions

## 🚀 Technologies Used

- **React 18.3.1** - UI library
- **React Router DOM 6.28.0** - Client-side routing
- **Vite 5.4.10** - Build tool and dev server
- **The Movie Database (TMDB) API** - Movie data source
- **CSS3** - Styling and animations

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher recommended)
- **npm** (comes with Node.js) or **yarn**

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Amovie.git
   cd Amovie
   ```

2. **Navigate to the frontend directory**
   ```bash
   cd frontend
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up TMDB API Key**
   - Sign up for a free API key at [The Movie Database](https://www.themoviedb.org/)
   - Get your API key from Account Settings → API
   - Open `frontend/src/services/api.js`
   - Replace the `API_KEY` constant with your API key:
     ```javascript
     const API_KEY = "your-api-key-here";
     ```

## 🏃 Running the Project

1. **Start the development server**
   ```bash
   cd frontend
   npm run dev
   ```

2. **Open your browser**
   - The app will be available at `http://localhost:5173` (or the port shown in terminal)

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
Amovie/
├── frontend/
│   ├── public/
│   │   ├── hero_background.jpeg    # Hero section background
│   │   └── movie_favicon.png       # App favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── MovieCard.jsx       # Movie card component
│   │   │   ├── MovieDetailModal.jsx # Movie detail modal
│   │   │   └── NavBar.jsx          # Navigation bar
│   │   ├── contexts/
│   │   │   └── MovieContext.jsx    # Favorites state management
│   │   ├── css/
│   │   │   ├── App.css
│   │   │   ├── Home.css
│   │   │   ├── Favorites.css
│   │   │   ├── MovieCard.css
│   │   │   ├── MovieDetailModal.css
│   │   │   └── Navbar.css
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Home page with search
│   │   │   └── Favorites.jsx       # Favorites page
│   │   ├── services/
│   │   │   └── api.js              # TMDB API integration
│   │   ├── App.jsx                 # Main app component
│   │   └── main.jsx                # Entry point
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🎯 Key Features Explained

### Live Search
- Search updates as you type (debounced for performance)
- Automatically shows popular movies when search is cleared

### Movie Details Modal
- Click any movie card to view detailed information
- Includes cast photos, director, writers, and trailers
- Favorite button integrated in the modal

### Favorites System
- Add/remove movies from favorites
- Favorites stored in browser's local storage
- Persistent across sessions

### Responsive Design
- Mobile-first approach
- Fixed navbar that stays visible while scrolling
- Adaptive grid layouts for movie cards

## 🌐 API Information

This project uses [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api) to fetch movie data. The API provides:
- Popular movies
- Movie search
- Movie details
- Cast and crew information
- Movie trailers/videos

**Note:** You need to sign up for a free API key to use this application.

## 📸 Screenshots

_Add screenshots of your application here_

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie API
- React team for the amazing framework
- Vite for the fast build tool

---

Made with ❤️ using React

