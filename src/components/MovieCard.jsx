import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LikeButton from './LikeButton'; // ✅ 추가

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const [trailerKey, setTrailerKey] = useState(null);
  const [hovered, setHovered] = useState(false);

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image';

  useEffect(() => {
    if (hovered) {
      const fetchTrailer = async () => {
        try {
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=7824c1cb6d4b09e0b18631b6bfa38a45&language=ko`
          );
          const data = await res.json();
          const trailer = data.results.find(
            (video) => video.type === 'Trailer' && video.site === 'YouTube'
          );
          setTrailerKey(trailer?.key || null);
        } catch (err) {
          console.error('예고편 로딩 실패:', err);
        }
      };
      fetchTrailer();
    } else {
      setTrailerKey(null);
    }
  }, [hovered, movie.id]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/movie/${movie.id}`)}
      style={{
        width: '180px',
        flex: '0 0 auto',
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      {/* ✅ 좋아요 버튼 추가 */}
      <LikeButton movie={movie} />

      {hovered && trailerKey ? (
        <iframe
          width="180"
          height="270"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0`}
          title="Trailer"
          allow="autoplay"
          style={{
            borderRadius: '10px',
            border: 'none',
          }}
        />
      ) : (
        <img
          src={imageUrl}
          alt={movie.title}
          style={{
            width: '180px',
            height: '270px',
            objectFit: 'cover',
            borderRadius: '10px',
          }}
        />
      )}
      <div style={{ color: '#fff', fontSize: '14px', marginTop: '5px', textAlign: 'center' }}>
        {movie.title || movie.name}
      </div>
    </div>
  );
}
