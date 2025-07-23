// src/api/tmdb.js

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const ADULT_KEYWORDS = [
  '섹스', '성인', '에로', '야한', '음란', '포르노', '노출', '정사', '19금', '19세', '누드', '청불',
  '욕망', '불륜', '자극', '선정', '쾌락', '음탕', '외도', '밀애', '관능', 'av', 'sex', 'adult',
  'porn', 'nude', 'erotic', 'sensual', 'affair', 'nudity', 'provocant', '裸', '情事'
];

function isLikelyAdultContent(movie) {
  const text = `${movie.title || ''} ${movie.name || ''} ${movie.overview || ''}`.toLowerCase();
  return movie.adult === true || ADULT_KEYWORDS.some(keyword => text.includes(keyword));
}

function removeDuplicates(movies) {
  const seen = new Set();
  return movies.filter((movie) => {
    if (seen.has(movie.id)) return false;
    seen.add(movie.id);
    return true;
  });
}

async function fetchFromTMDB(endpoint) {
  try {
    const url = `${BASE_URL}/${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${API_KEY}&language=ko-KR&include_adult=false`;
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`⚠️ TMDB 요청 실패: ${res.status} ${res.statusText}`);
      return [];
    }
    const data = await res.json();
    const filtered = (data.results || []).filter(item => !isLikelyAdultContent(item));
    return removeDuplicates(filtered);
  } catch (error) {
    console.error('❌ TMDB API 오류:', error.message || error);
    return [];
  }
}

export async function fetchPopularMovies() {
  return await fetchFromTMDB('movie/popular');
}

export async function fetchNowPlayingMovies() {
  return await fetchFromTMDB('movie/now_playing');
}

export async function fetchTopRatedTV() {
  return await fetchFromTMDB('tv/top_rated');
}

export async function fetchTrendingAll() {
  return await fetchFromTMDB('trending/all/week');
}

export async function fetchUpcomingMovies() {
  return await fetchFromTMDB('movie/upcoming');
}

export async function fetchTopRatedMovies() {
  return await fetchFromTMDB('movie/top_rated');
}

export async function fetchRecommended() {
  const [popular, tv] = await Promise.all([
    fetchPopularMovies(),
    fetchTopRatedTV()
  ]);
  const combined = [...popular, ...tv];
  const uniqueMap = new Map();
  for (const item of combined) {
    if (!uniqueMap.has(item.id)) {
      uniqueMap.set(item.id, item);
    }
  }
  return Array.from(uniqueMap.values()).slice(0, 15);
}

export async function fetchUserFavorites() {
  return [
    {
      id: 101,
      title: '내가 찜한 콘텐츠 A',
      poster_path: '/abc.jpg',
      adult: false,
    },
    {
      id: 102,
      title: '내가 찜한 콘텐츠 B',
      poster_path: '/def.jpg',
      adult: false,
    },
  ];
}

export async function fetchMovieTrailer(movieId) {
  try {
    const url = `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=ko-KR`;
    const res = await fetch(url);
    const data = await res.json();
    const trailer = data.results.find(
      (video) => video.type === 'Trailer' && video.site === 'YouTube'
    );
    return trailer?.key || null;
  } catch (error) {
    console.error('❌ 예고편 요청 실패:', error.message);
    return null;
  }
}

export {
  fetchFromTMDB
};
