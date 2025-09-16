import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchMovies } from "@/services/tmdb";
import MovieCard from "@/components/MovieCard";
import "@/styles/CategorySection.css";

export default function CategorySection({ title, category, type, genreId }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      try {
        let url = "";

        if (category && type) {
          url = `/${type}/${category}`;
        } else if (genreId) {
          url = `/discover/movie?with_genres=${genreId}`;
        }

        if (!url) return;

        setLoading(true);
        const res = await fetchMovies(url);

        const filtered = (res.results || []).filter(
          (m) =>
            !m.adult &&
            !/adult|porn|sex|섹스|에로|성인|19금|av/i.test(m.title || m.name || "")
        );

        setMovies(filtered.slice(0, 12));
      } catch (err) {
        console.error("CategorySection fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadMovies();
  }, [category, type, genreId]);

  const viewAllLink =
    category && type
      ? `/category/${type}/${category}`
      : genreId
      ? `/category/genre/${genreId}`
      : "#";

  return (
    <div className="category-section">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        <Link to={viewAllLink} className="view-all">
          모두 보기 &gt;
        </Link>
      </div>

      {loading ? (
        <p className="loading-text">불러오는 중...</p>
      ) : movies.length > 0 ? (
        <div className="movie-list">
          {movies.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      ) : (
        <p className="no-results">영화가 없습니다.</p>
      )}
    </div>
  );
}
