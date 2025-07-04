import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_KEY = '4c41ff54';

const MovieDetail = () => {
  const { imdbID } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`);
      setMovie(res.data);
    };

    fetchMovie();
  }, [imdbID]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-detail" style={styles.container}>
      <button onClick={() => navigate(-1)} style={styles.backButton}>⬅ Back</button>

      <h2>{movie.Title}</h2>
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}
        alt={movie.Title}
        style={styles.poster}
      />
      <p><strong>Year:</strong> {movie.Year}</p>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Director:</strong> {movie.Director}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
      <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '1rem',
    backgroundColor: '#1f1f1f',
    color: 'white',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(255,255,255,0.1)',
    textAlign: 'center',
  },
  poster: {
    width: '100%',
    maxWidth: '300px',
    borderRadius: '10px',
    margin: '1rem 0',
  },
  backButton: {
    backgroundColor: '#444',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '1rem',
  }
};

export default MovieDetail;
