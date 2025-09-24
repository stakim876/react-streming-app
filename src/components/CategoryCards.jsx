import { useNavigate } from "react-router-dom";
import "./CategoryCards.css";

export default function CategoryCards() {
  const navigate = useNavigate();

  const categories = [
    { id: "originals", name: "MoviePlay Originals", image: "/assets/originals.png" },
    { id: "popular-movies", name: "인기 영화", image: "/assets/popular.png", type: "movie", category: "popular" },
    { id: "popular-tv", name: "인기 드라마", image: "/assets/tv.png", type: "tv", category: "popular" },
    { id: "recommend", name: "추천작", image: "/assets/recommend.png", type: "movie", category: "top_rated" },
    { id: "new", name: "최신작", image: "/assets/new.png", type: "movie", category: "upcoming" },
    { id: "action", name: "액션", image: "/assets/action.png", type: "movie", genreId: 28 },
    { id: "comedy", name: "코미디", image: "/assets/comedy.png", type: "movie", genreId: 35 },
    { id: "animation", name: "애니메이션", image: "/assets/animation.png", type: "movie", genreId: 16 },
  ];

  const handleClick = (cat) => {
    if (cat.genreId) {
      navigate(`/category/genre/${cat.genreId}`);
    } else if (cat.category) {
      navigate(`/category/${cat.type}/${cat.category}`);
    } else {
      navigate(`/category/${cat.id}`);
    }
  };

  return (
    <div className="category-cards-container">
      <div className="category-cards">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="category-card"
            onClick={() => handleClick(cat)}
          >
            <img src={cat.image} alt={cat.name} />

            {cat.id === "animation" && (
              <div className="card-center-overlay">
                <span>{cat.name}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
