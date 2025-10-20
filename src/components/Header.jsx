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
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate(`/search?query=${encodeURIComponent(trimmed)}`);
    setQuery("");
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
          <Link to="/home" className="nav-item">
            홈
          </Link>

          <div
            className="dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <span className="dropdown-toggle">카테고리 ▾</span>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <span className="dropdown-section">🎬 영화</span>
                <Link to="/category/movie/popular">인기 영화</Link>
                <Link to="/category/movie/now_playing">현재 상영작</Link>
                <Link to="/category/movie/top_rated">평점 높은 영화</Link>
                <Link to="/category/movie/upcoming">개봉 예정작</Link>

                <hr />

                <span className="dropdown-section">📺 드라마</span>
                <Link to="/category/tv/popular">인기 드라마</Link>
                <Link to="/category/tv/on_the_air">방영 중 드라마</Link>
                <Link to="/category/tv/top_rated">평점 높은 드라마</Link>

                <hr />

                <span className="dropdown-section">🎭 장르별</span>
                <Link to="/category/genre/28">액션</Link>
                <Link to="/category/genre/12">모험</Link>
                <Link to="/category/genre/16">애니메이션</Link>
                <Link to="/category/genre/35">코미디</Link>
                <Link to="/category/genre/80">범죄</Link>
                <Link to="/category/genre/99">다큐멘터리</Link>
                <Link to="/category/genre/18">드라마</Link>
                <Link to="/category/genre/10751">가족</Link>
                <Link to="/category/genre/14">판타지</Link>
                <Link to="/category/genre/36">역사</Link>
                <Link to="/category/genre/27">공포</Link>
                <Link to="/category/genre/10402">음악</Link>
                <Link to="/category/genre/9648">미스터리</Link>
                <Link to="/category/genre/10749">로맨스</Link>
                <Link to="/category/genre/878">SF</Link>
                <Link to="/category/genre/10770">TV 영화</Link>
                <Link to="/category/genre/53">스릴러</Link>
                <Link to="/category/genre/10752">전쟁</Link>
                <Link to="/category/genre/37">서부</Link>
              </div>
            )}
          </div>

          {user && (
            <Link to="/favorites" className="nav-item">
              내 찜 목록
            </Link>
          )}

          {user && (
            <Link to="/profile" className="nav-item">
              프로필
            </Link>
          )}

          {user?.role === "admin" && (
            <Link to="/admin" className="nav-item">
              관리자
            </Link>
          )}
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
