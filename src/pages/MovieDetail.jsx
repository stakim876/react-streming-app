import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import EmotionRecord from '../components/EmotionRecord';

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchDetail() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=ko-KR`
      );
      const data = await res.json();
      setMovie(data);
    }
    fetchDetail();
  }, [id]);

 
  if (!movie) return <div style={{ color: '#fff' }}>로딩 중...</div>;

  return (
    <div style={{ color: '#fff', padding: '2rem' }}>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        style={{ maxWidth: '300px' }}
      />
      <p>{movie.overview}</p>

      
      {/* ✅ 감정 기록 컴포넌트 추가 */}
      <EmotionRecord movieId={movie.id} movieTitle={movie.title} />
    </div>
  );
}
