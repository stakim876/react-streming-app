import "./HomePage.css";
import FeaturedHero from "@/components/FeaturedHero";
import CategorySection from "@/components/CategorySection";

export default function HomePage() {
  return (
    <div className="home-page">
      <FeaturedHero />

      <CategorySection title="인기 영화" category="popular" type="movie" />
      <CategorySection title="현재 상영작" category="now_playing" type="movie" />
      <CategorySection title="평점 높은 영화" category="top_rated" type="movie" />
      <CategorySection title="개봉 예정작" category="upcoming" type="movie" />
      <CategorySection title="인기 드라마" category="popular" type="tv" />
      <CategorySection title="방영 중인 드라마" category="on_the_air" type="tv" />
      <CategorySection title="평점 높은 드라마" category="top_rated" type="tv" />
      <CategorySection title="액션" genreId={28} />
      <CategorySection title="모험" genreId={12} />
      <CategorySection title="애니메이션" genreId={16} />
      <CategorySection title="코미디" genreId={35} />
      <CategorySection title="범죄" genreId={80} />
      <CategorySection title="다큐멘터리" genreId={99} />
      <CategorySection title="드라마" genreId={18} />
      <CategorySection title="가족" genreId={10751} />
      <CategorySection title="판타지" genreId={14} />
      <CategorySection title="역사" genreId={36} />
      <CategorySection title="공포" genreId={27} />
      <CategorySection title="음악" genreId={10402} />
      <CategorySection title="미스터리" genreId={9648} />
      <CategorySection title="로맨스" genreId={10749} />
      <CategorySection title="SF" genreId={878} />
      <CategorySection title="TV 영화" genreId={10770} />
      <CategorySection title="스릴러" genreId={53} />
      <CategorySection title="전쟁" genreId={10752} />
      <CategorySection title="서부" genreId={37} />
    </div>
  );
}
