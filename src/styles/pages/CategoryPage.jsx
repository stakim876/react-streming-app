import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovies } from "../services/tmdb";
import MovieCard from "@/components/MovieCard";
import "./CategoryPage.css";

export default function CategoryPage() {
  const { type, category, genreId } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      try {
        let url = "";

        if (type && category) {
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

        setMovies(filtered);
      } catch (err) {
        console.error("CategoryPage fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadMovies();
  }, [type, category, genreId]);

  const pageTitle =
    type && category
      ? `${type === "movie" ? "영화" : "드라마"} - ${category}`
      : "장르";

  return (
    <div className="category-page">
      {loading ? (
        <p className="loading-text">불러오는 중...</p>
      ) : movies.length > 0 ? (
        <>
          <h2 className="page-title">{pageTitle}</h2>
          <div className="grid-list">
            {movies.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        </>
      ) : (
        <p className="no-results">콘텐츠가 없습니다.</p>
      )}
    </div>
  );
}
