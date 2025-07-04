import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, showFavoriteButton = true, onRemoveFavorite }) => {
  const poster =
    movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image';

  const handleAddToFavorites = () => {
    const email = localStorage.getItem('loggedInEmail');
    if (!email) {
      alert('Please log in to add favorites');
      return;
    }

    let allFavs = JSON.parse(localStorage.getItem('favorites')) || {};
    const userFavs = allFavs[email] || [];

    const alreadyExists = userFavs.some((fav) => fav.imdbID === movie.imdbID);
    if (alreadyExists) {
      alert('Already in favorites!');
      return;
    }

    const updatedFavs = [...userFavs, movie];
    allFavs[email] = updatedFavs;
    localStorage.setItem('favorites', JSON.stringify(allFavs));
    alert('Added to favorites!');
  };

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.imdbID}`}>
        <img src={poster} alt={movie.Title} />
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
        <p>Type: {movie.Type}</p>
      </Link>

      {onRemoveFavorite ? (
        <button className="fav-button-remove" onClick={() => onRemoveFavorite(movie.imdbID)}>
          🗑 Remove
        </button>
      ) : (
        showFavoriteButton && (
          <button className="fav-button-add" onClick={handleAddToFavorites}>
            ❤️ Add to Favorites
          </button>
        )
      )}
    </div>
  );
};

export default MovieCard;
