export default function TMDBImage({ path, alt, size = "w500" }) {
  if (!path) return <div className="placeholder">이미지 없음</div>;
  return (
    <img
      src={`https://image.tmdb.org/t/p/${size}${path}`}
      alt={alt}
      loading="lazy"
    />
  );
}
