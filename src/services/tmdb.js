const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const bannedKeywords = [
  "성인", "에로", "포르노", "야동", "섹스", "19금", "야함", "노출",
  "porn", "porno", "xxx", "sex", "sexual", "erotic", "adult", "hardcore",
  "uncensored", "nude", "nsfw",
  "アダルト", "ポルノ", "セックス", "ヌード", "エロ", "エッチ",
  "色情", "成人", "裸", "性爱", "黄片", "セクシー・オーラル 浮気な唇"
];

const bannedGenreIds = [10749, 867];

function isSafeMovie(m) {
  if (!m) return false;

  if (m.adult) return false;

  if (m.genre_ids && m.genre_ids.some((id) => bannedGenreIds.includes(id))) {
    return false;
  }

  const text = `${m.title || ""} ${m.name || ""} ${m.overview || ""}`.toLowerCase();
  if (bannedKeywords.some((word) => text.includes(word.toLowerCase()))) {
    return false;
  }

  return true;
}

export async function fetchMovies(endpoint) {
  try {
    const url = `${BASE_URL}${endpoint}${
      endpoint.includes("?") ? "&" : "?"
    }api_key=${API_KEY}&language=ko-KR&include_adult=false`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`TMDb API 호출 실패: ${res.status}`);

    const data = await res.json();

    data.results = (data.results || []).filter(isSafeMovie);

    return data;
  } catch (err) {
    console.error("fetchMovies error:", err);
    return { results: [] };
  }
}

export async function fetchMovieDetail(id, type = "movie") {
  const response = await fetch(
    `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=ko-KR&append_to_response=videos`
  );
  if (!response.ok) {
    throw new Error("상세 정보를 불러올 수 없습니다.");
  }
  const data = await response.json();
  if (!isSafeMovie(data)) throw new Error("성인 컨텐츠 차단됨");
  return data;
}
