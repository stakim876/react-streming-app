import { useState } from "react";
import MovieCard from "@/components/MovieCard";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko-KR&query=${encodeURIComponent(
      query
    )}&include_adult=false`;
    const res = await fetch(url);
    const data = await res.json();
    setResults((data.results || []).filter((m) => !m.adult));
  };

  return (
    <div className="search-page">
      <form onSubmit={handleSearch} className="search-box">
        <input
          type="text"
          placeholder="영화 제목 검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button>검색</button>
      </form>

      {results.length > 0 && (
        <div className="movie-grid">
          {results.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      )}
    </div>
  );
}
