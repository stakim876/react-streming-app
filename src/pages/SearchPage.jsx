// src/pages/SearchPage.jsx
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import MovieCard from '../components/MovieCard';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function SearchPage() {
  const location = useLocation();
  const { query } = queryString.parse(location.search);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko-KR&query=${encodeURIComponent(query)}&include_adult=false`
        );
        const data = await res.json();
        const filtered = data.results.filter(
          (movie) =>
            !movie.adult && movie.poster_path
        );
        setResults(filtered);
      } catch (err) {
        console.error('검색 에러:', err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div style={{ paddingTop: '100px', color: 'white' }}>
      <h2>🔍 "{query}" 검색 결과 ({results.length}건)</h2>
      {loading ? (
        <p>불러오는 중...</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '1rem',
            marginTop: '1rem',
          }}
        >
          {results.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
