import "./HomePage.css";
import FeaturedHero from "@/components/FeaturedHero";
import CategoryGrid from "@/components/CategoryGrid";
import CategoryCards from "@/components/CategoryCards";
import "./LoginPage.css"; 

export default function HomePage() {
  return (
    <div className="home-page">
      <FeaturedHero />

      <CategoryCards />

      <CategoryGrid title="인기 영화" category="popular" type="movie" />
      <CategoryGrid title="현재 상영작" category="now_playing" type="movie" />
      <CategoryGrid title="평점 높은 영화" category="top_rated" type="movie" />
      <CategoryGrid title="개봉 예정작" category="upcoming" type="movie" />

      <CategoryGrid title="인기 드라마" category="popular" type="tv" />
      <CategoryGrid title="방영 중인 드라마" category="on_the_air" type="tv" />
      <CategoryGrid title="평점 높은 드라마" category="top_rated" type="tv" />

      <CategoryGrid title="액션" genreId={28} />
      <CategoryGrid title="모험" genreId={12} />
      <CategoryGrid title="애니메이션" genreId={16} />
      <CategoryGrid title="코미디" genreId={35} />
      <CategoryGrid title="범죄" genreId={80} />
      <CategoryGrid title="다큐멘터리" genreId={99} />
      <CategoryGrid title="드라마" genreId={18} />
      <CategoryGrid title="가족" genreId={10751} />
      <CategoryGrid title="판타지" genreId={14} />
      <CategoryGrid title="역사" genreId={36} />
      <CategoryGrid title="공포" genreId={27} />
      <CategoryGrid title="음악" genreId={10402} />
      <CategoryGrid title="미스터리" genreId={9648} />
      <CategoryGrid title="로맨스" genreId={10749} />
      <CategoryGrid title="SF" genreId={878} />
      <CategoryGrid title="TV 영화" genreId={10770} />
      <CategoryGrid title="스릴러" genreId={53} />
      <CategoryGrid title="전쟁" genreId={10752} />
      <CategoryGrid title="서부" genreId={37} />
    </div>
  );
}
