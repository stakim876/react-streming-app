import CategorySection from "@/components/CategorySection";

export default function DiscoverPage() {
  return (
    <div className="discover-page">
      <h1 className="page-title">장르별 발견하기</h1>

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
