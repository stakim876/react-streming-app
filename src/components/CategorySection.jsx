import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

export default function CategorySection({ title, fetchType }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${fetchType}?api_key=7824c1cb6d4b09e0b18631b6bfa38a45&language=ko`
        );
        const data = await res.json();
        const filtered = data.results.filter((m) => !m.adult); // 성인 콘텐츠 제거
        setMovies(filtered);
      } catch (err) {
        console.error('🎬 영화 목록 불러오기 실패:', err);
      }
    };

    fetchMovies();
  }, [fetchType]);

  return (
    <section style={{ padding: '20px 0' }}>
      <h2 style={{ color: '#6bfaff', fontSize: '20px', marginBottom: '10px' }}>{title}</h2>
      <div style={{ display: 'flex', overflowX: 'auto', gap: '10px' }}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
