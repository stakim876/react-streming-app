import { useNavigate } from "react-router-dom";
import "./MovieCard.css";

const fallbackImage = "https://via.placeholder.com/300x450.png?text=No+Image";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : fallbackImage;

  return (
    <div
      className="movie-card"
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <img
        src={imageUrl}
        alt={movie.title || movie.name}
        className="movie-poster"
      />
      <div className="overlay">
        <h3>{movie.title || movie.name}</h3>
        {movie.vote_average && (
          <p>⭐ {movie.vote_average.toFixed(1)}</p>
        )}
      </div>
    </div>
  );
}
