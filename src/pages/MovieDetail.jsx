import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LikeButton from "@/components/LikeButton";
import "./MovieDetail.css";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [recommend, setRecommend] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;

        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=ko-KR&append_to_response=videos,credits,recommendations`
        );
        const data = await res.json();

        const blockKeywords = ["sex", "adult", "porn", "에로", "야동", "섹스", "19금", "av", "노출"];
        const text = `${data.title || ""} ${data.overview || ""}`.toLowerCase();
        if (data.adult || blockKeywords.some((kw) => text.includes(kw))) {
          setMovie(null);
          return;
        }

        setMovie(data);

        const trailerData = data.videos?.results.find(
          (v) =>
            ["Trailer", "Teaser", "Clip"].includes(v.type) &&
            v.site === "YouTube"
        );
        setTrailer(trailerData?.key || null);

        setCast(data.credits?.cast?.slice(0, 10) || []);

        const filteredRecommend = (data.recommendations?.results || []).filter((item) => {
          const t = `${item.title || item.name || ""} ${item.overview || ""}`.toLowerCase();
          return !item.adult && !blockKeywords.some((kw) => t.includes(kw));
        });
        setRecommend(filteredRecommend);

        console.log("videos:", data.videos?.results);
      } catch (err) {
        console.error("영화 상세 불러오기 실패:", err);
      }
    };
    fetchData();
  }, [id]);

  if (!movie) return <p style={{ color: "#fff" }}>로딩 중...</p>;

  return (
    <div className="movie-detail">
      <div className="detail-header">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/300x450.png?text=No+Image"
          }
          alt={movie.title}
          className="detail-poster"
        />
        <div className="detail-info">
          <h1>{movie.title}</h1>
          <LikeButton movie={movie} />
          <p>{movie.overview}</p>
          <p>
            <strong>개봉일:</strong> {movie.release_date}
          </p>
          <p>
            <strong>장르:</strong>{" "}
            {movie.genres?.map((g) => g.name).join(", ")}
          </p>
        </div>
      </div>

      {cast.length > 0 && (
        <div className="detail-cast">
          <h2>출연진</h2>
          <div className="cast-list">
            {cast.map((c) => (
              <div key={c.cast_id || c.credit_id} className="cast-card">
                <img
                  src={
                    c.profile_path
                      ? `https://image.tmdb.org/t/p/w200${c.profile_path}`
                      : "https://via.placeholder.com/100x150.png?text=No+Photo"
                  }
                  alt={c.name}
                />
                <p>{c.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="detail-trailer">
        <h2>예고편</h2>
        <div className="trailer-wrapper">
          {trailer ? (
            <iframe
              src={`https://www.youtube.com/embed/${trailer}?autoplay=1&mute=1&controls=1`}
              title="Trailer"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : (
            <p style={{ color: "#fff" }}>등록된 예고편이 없습니다.</p>
          )}
        </div>
      </div>

      {recommend.length > 0 && (
        <div className="detail-recommend">
          <h2>추천작</h2>
          <div className="recommend-list">
            {recommend.map((r) => (
              <div key={r.id} className="recommend-card">
                <img
                  src={
                    r.poster_path
                      ? `https://image.tmdb.org/t/p/w200${r.poster_path}`
                      : "https://via.placeholder.com/200x300.png?text=No+Image"
                  }
                  alt={r.title}
                />
                <p>{r.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
