// src/components/Banner.jsx
import { useEffect, useState } from 'react';
import { fetchPopularMovies, fetchMovieTrailer } from '../api/tmdb';

export default function Banner() {
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const load = async () => {
      const movies = await fetchPopularMovies();
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      setMovie(randomMovie);

      const key = await fetchMovieTrailer(randomMovie.id);
      setTrailerKey(key);
    };
    load();
  }, []);

  if (!movie || !trailerKey) return null;

  return (
    <div className="banner">
      <iframe
        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}`}
        title="Movie Trailer"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
      <div className="banner-overlay">
        <h2>{movie.title || movie.name}</h2>
        <p>{movie.overview?.slice(0, 100)}...</p>
      </div>
    </div>
  );
}
