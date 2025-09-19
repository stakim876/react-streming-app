import { useEffect, useState } from "react";
import { fetchMovies, fetchMovieDetail } from "@/services/tmdb";
import "./FeaturedHero.css";

export default function FeaturedHero() {
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const data = await fetchMovies("/movie/now_playing?language=ko-KR&page=1");

        const filtered = (data.results || []).filter(
          (m) =>
            !m.adult &&
            !/adult|porn|sex|섹스|에로|성인|19금|av/i.test(m.title || m.name || "")
        );

        const random = filtered[Math.floor(Math.random() * filtered.length)];
        if (!random) return;
        setMovie(random);

        const detail = await fetchMovieDetail(random.id, "movie");

        const trailer =
          detail.videos?.results.find(
            (v) =>
              (v.type === "Trailer" || v.type === "Teaser") &&
              v.site === "YouTube" &&
              v.iso_639_1 === "ko"
          ) ||
          detail.videos?.results.find(
            (v) =>
              (v.type === "Trailer" || v.type === "Teaser") &&
              v.site === "YouTube" &&
              v.iso_639_1 === "en"
          ) ||
          detail.videos?.results.find(
            (v) =>
              (v.type === "Trailer" || v.type === "Teaser" || v.type === "Clip") &&
              v.site === "YouTube"
          );

        if (trailer) setTrailerKey(trailer.key);
      } catch (err) {
        console.error("FeaturedHero load error:", err);
      }
    }
    loadFeatured();
  }, []);

  if (!movie || !isVisible) return null;

  return (
    <section className="featured-hero">
      <button className="hero-close-btn" onClick={() => setIsVisible(false)}>
        ✕
      </button>

      {trailerKey ? (
        <div className="hero-video-wrapper">
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}`}
            title="Featured Trailer"
            className="hero-video"
            allow="autoplay; encrypted-media"
          ></iframe>
        </div>
      ) : (
        <img
          src={`https://image.tmdb.org/t/p/original${
            movie.backdrop_path || movie.poster_path
          }`}
          alt={movie.title}
          className="hero-image"
        />
      )}

      <div className="hero-overlay">
        <h1 className="hero-title">{movie.title}</h1>
        <p className="hero-overview">{movie.overview}</p>
        <div className="hero-buttons">
          <button className="play-btn">▶ 재생</button>
          <button className="info-btn">ℹ 상세정보</button>
        </div>
      </div>
    </section>
  );
}
