const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const bannedKeywords = [
  "성인", "에로", "포르노", "야동",
  "porn", "xxx", "erotic", "adult",
  "av", "섹스", "19금", "nude"
];

const bannedGenreIds = [867, 10402, 10749, 10751, 10752]; 

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
