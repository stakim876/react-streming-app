import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import "./CategoryCards.css";

export default function CategoryCards() {
  const navigate = useNavigate();
  const listRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const categories = [
    { id: "originals", name: "MoviePlay Originals", image: "/assets/originals.png" },
    { id: "popular-movies", name: "인기 영화", image: "/assets/popular.png", type: "movie", category: "popular" },
    { id: "popular-tv", name: "인기 드라마", image: "/assets/tv.png", type: "tv", category: "popular" },
    { id: "recommend", name: "추천작", image: "/assets/recommend.png", type: "movie", category: "top_rated" },
    { id: "new", name: "최신작", image: "/assets/new.png", type: "movie", category: "upcoming" },
    { id: "action", name: "액션", image: "/assets/action.png", type: "movie", genreId: 28 },
    { id: "comedy", name: "코미디", image: "/assets/comedy.png", type: "movie", genreId: 35 },
    { id: "romance", name: "로맨스", image: "/assets/romance.png", type: "movie", genreId: 10749 },
    { id: "animation", name: "애니메이션", image: "/assets/animation.png", type: "movie", genreId: 16 },
    { id: "documentary", name: "다큐멘터리", image: "/assets/documentary.png", type: "movie", genreId: 99 },
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

  const scroll = (direction) => {
    if (listRef.current) {
      const { scrollLeft, clientWidth } = listRef.current;
      const scrollAmount = clientWidth * 0.8; 

      if (direction === "left") {
        listRef.current.scrollTo({ left: scrollLeft - scrollAmount, behavior: "smooth" });
      } else {
        listRef.current.scrollTo({ left: scrollLeft + scrollAmount, behavior: "smooth" });
      }
    }
  };

  const checkScroll = () => {
    if (!listRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = listRef.current;
    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = listRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll);
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <div className="category-cards-container">
      {showLeft && (
        <button className="scroll-btn scroll-left" onClick={() => scroll("left")}>
          〈
        </button>
      )}
      <div className="category-cards" ref={listRef}>
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="category-card"
            onClick={() => handleClick(cat)}
          >
            <img src={cat.image} alt={cat.name} />
          </div>
        ))}
      </div>
      {showRight && (
        <button className="scroll-btn scroll-right" onClick={() => scroll("right")}>
          〉
        </button>
      )}
    </div>
  );
}
