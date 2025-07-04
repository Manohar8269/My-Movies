import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard';

const FavoritePage = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const email = localStorage.getItem('loggedInEmail');

  useEffect(() => {
    if (!email) {
      navigate('/login');
      return;
    }

    const allFavs = JSON.parse(localStorage.getItem('favorites')) || {};
    const userFavs = allFavs[email] || [];
    setFavorites(userFavs);
  }, [email, navigate]);

  const handleRemoveFavorite = (imdbID) => {
    const allFavs = JSON.parse(localStorage.getItem('favorites')) || {};
    const updatedFavs = (allFavs[email] || []).filter((movie) => movie.imdbID !== imdbID);
    allFavs[email] = updatedFavs;
    localStorage.setItem('favorites', JSON.stringify(allFavs));
    setFavorites(updatedFavs);
  };

  return (
    <div>
      <div className="header">
        <h2>❤️ My Favorite Movies</h2>
        <Link to="/" className="favorites-link">🏠 Home</Link>
      </div>

      {favorites.length > 0 ? (
        <div className="movie-grid">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              showFavoriteButton={false}
              onRemoveFavorite={handleRemoveFavorite}
            />
          ))}
        </div>
      ) : (
        <p>No favorites added yet.</p>
      )}
    </div>
  );
};

export default FavoritePage;
