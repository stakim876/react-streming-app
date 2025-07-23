import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

export default function SearchResults({ searchTerm }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchSearch = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=<<YOUR_API_KEY>>&query=${encodeURIComponent(
          searchTerm
        )}&language=ko`
      );
      const data = await res.json();
      const filtered = data.results.filter((m) => !m.adult);
      setResults(filtered);
    };

    fetchSearch();
  }, [searchTerm]);

  return (
    <div>
      <h2 style={{ color: '#6bfaff', fontSize: '20px', marginBottom: '10px' }}>
        "{searchTerm}" 검색 결과
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
