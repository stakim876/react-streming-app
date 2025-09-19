import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import "./Header.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/home?query=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleAuth = async () => {
    if (user) {
      try {
        await logout();
        navigate("/login");
      } catch (err) {
        console.error("로그아웃 실패:", err);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-content">
        <div className="logo" onClick={() => navigate("/home")}>
          MoviePlay
        </div>

        <nav className="nav-links">
          <div
            className="dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <span className="dropdown-toggle">카테고리 ▾</span>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/category/movie/popular">인기 영화</Link>
                <Link to="/category/movie/now_playing">현재 상영작</Link>
                <Link to="/category/movie/top_rated">평점 높은 영화</Link>
                <Link to="/category/movie/upcoming">개봉 예정작</Link>
                <Link to="/category/tv/popular">인기 드라마</Link>
                <Link to="/category/tv/on_the_air">방영 중 드라마</Link>
                <Link to="/category/tv/top_rated">평점 높은 드라마</Link>
              </div>
            )}
          </div>
        </nav>

        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="검색"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">검색</button>
        </form>

        <button className="auth-btn" onClick={handleAuth}>
          {user ? "로그아웃" : "로그인"}
        </button>
      </div>
    </header>
  );
}
