import { useEffect, useRef, useState } from "react";
import { fetchMovies } from "@/services/tmdb";
import MovieCard from "@/components/MovieCard";
import "@/styles/CategoryGrid.css";

export default function CategoryGrid({ title, category, type, genreId }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const rowRef = useRef(null);

  useEffect(() => {
    async function loadMovies() {
      try {
        let url = "";

        if (category && type) {
          url = `/${type}/${category}?language=ko-KR&page=1&include_adult=false`;
        } else if (genreId) {
          url = `/discover/movie?with_genres=${genreId}&language=ko-KR&page=1&include_adult=false`;
        }

        if (!url) return;

        setLoading(true);
        const res = await fetchMovies(url);

        const filtered = (res.results || []).filter(
          (m) =>
            !m.adult &&
            m.poster_path &&
            !/adult|porn|sex|섹스|에로|성인|야동|av|야사|爆乳|エロ|レイプ/i.test(
              `${m.title || ""} ${m.original_title || ""} ${m.overview || ""}`
            )
        );

        setMovies(filtered.slice(0, 20));
      } catch (err) {
        console.error("CategoryGrid fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadMovies();
  }, [category, type, genreId]);

  return (
    <div className="category-grid">
      {title && <h2 className="category-title">{title}</h2>}

      {loading ? (
        <p className="loading-text">불러오는 중...</p>
      ) : movies.length > 0 ? (
        <div className="scroll-wrapper">
          <div className="movie-row" ref={rowRef}>
            {movies.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        </div>
      ) : (
        <p className="no-results">영화가 없습니다.</p>
      )}
    </div>
  );
}
