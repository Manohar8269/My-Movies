import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './Components/SearchBar';
import MovieCard from './Components/MovieCard';
import Filter from './Components/Filter';
import TypeFilter from './Components/TypeFilter';
import MovieDetail from './Components/MovieDetail';
import FavoritePage from './Components/FavoritePage';
import LoginPage from './Components/LoginPage';
import SignupPage from './Components/SignupPage';
import './App.css';

const API_KEY = '4c41ff54';

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [year, setYear] = useState('');
  const [type, setType] = useState('');

  const searchMovies = async (searchText, selectedYear = '', selectedType = '') => {
    if (!searchText) return;

    try {
      const response = await axios.get('https://www.omdbapi.com/', {
        params: {
          apikey: API_KEY,
          s: searchText,
          y: selectedYear,
          type: selectedType,
        },
      });

      if (response.data.Search) {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query) {
        searchMovies(query, year, type);
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [query, year, type]);

  return (
    <>
      <SearchBar onSearch={setQuery} />
      <div className="filters">
        <Filter selectedYear={year} onYearChange={setYear} />
        <TypeFilter selectedType={type} onTypeChange={setType} />
      </div>
      <div className="movie-grid">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('loggedInUser'));

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('loggedInEmail');
    setIsLoggedIn(false); 
  };

  return (
    <Router>
      <div className="App">
        {isLoggedIn && (
          <div className="header">
            <h1>🎬 My Movies</h1>
            <div className="user-info">
              <span>👤 {localStorage.getItem('loggedInUser')}</span>
              <Link to="/" className="home-button">🏠 Home</Link>
              <Link to="/favorites" className="favorites-link">❤️ Favorites</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        )}

        <Routes>
          <Route path="/login" element={
            isLoggedIn
              ? <Navigate to="/" />
              : <LoginPage onLogin={() => setIsLoggedIn(true)} />
          } />

          <Route path="/signup" element={
            isLoggedIn
              ? <Navigate to="/" />
              : <SignupPage />
          } />

          {isLoggedIn ? (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="/movie/:imdbID" element={<MovieDetail />} />
              <Route path="/favorites" element={<FavoritePage />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
