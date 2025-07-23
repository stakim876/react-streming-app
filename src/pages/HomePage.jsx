import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import CategorySection from '../components/CategorySection';
import SearchResults from '../components/SearchResults'; // 검색 결과 전용 컴포넌트

export default function HomePage() {
  const { search } = useLocation();
  const { query } = queryString.parse(search);

  return (
    <div style={{ padding: '80px 20px 0' }}>
      {query ? (
        <SearchResults searchTerm={query} />
      ) : (
        <>
          <CategorySection title="인기작품" fetchType="popular" />
          <CategorySection title="신작영화" fetchType="now_playing" />
          <CategorySection title="추천작" fetchType="top_rated" />
          <CategorySection title="개봉예정" fetchType="upcoming" />
        </>
      )}
    </div>
  );
}
