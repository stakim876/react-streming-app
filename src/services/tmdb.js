const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const bannedKeywords = [
  "성인", "에로", "포르노", "야동", "섹스", "19금", "야함", "노출", "불륜", "유혹",
  "음란", "동침", "은밀한", "위험한 사촌", "두 집 살림", "음욕", "욕망", "불법촬영",
  "porn", "porno", "xxx", "sex", "sexual", "erotic", "adult", "hardcore",
  "uncensored", "nude", "nsfw", "sensual", "temptation",
  "AV女優", "ラブホテル", "ムラムラ", "アダルト", "ポルノ", "セックス", "ヌード", "エロ", "エッチ",
  "人妻", "変態", "お色気", "裸婦", "欲望", "背徳", "近親", "義母", "叔母", "未亡人", "妄想", "不倫",
  "ざんげ", "ザンゲ", "色ざんげ", "いろざんげ", "いろ", "色",
  "色情", "成人", "裸", "性爱", "黄片", "三级片"
];

const bannedGenreIds = [867];

function isSafeMovie(m) {
  if (!m) return false;

  if (m.adult) return false;

  if (["ja", "zh"].includes(m.original_language)) return false;

  if (m.genre_ids && m.genre_ids.some((id) => bannedGenreIds.includes(id))) {
    return false;
  }

  const text = `
    ${m.title || ""}
    ${m.name || ""}
    ${m.original_title || ""}
    ${m.original_name || ""}
    ${m.overview || ""}
  `.toLowerCase();

  if (/^[\u3040-\u30FF\u4E00-\u9FFF\s]+$/.test(m.title || "")) return false;

  if (bannedKeywords.some((word) => text.includes(word.toLowerCase()))) return false;

  return true;
}

export async function fetchMovies(endpoint) {
  try {
    const cleanEndpoint = endpoint.replace(/(\?|&)include_adult=true/g, "");

    const url = `${BASE_URL}${cleanEndpoint}${
      cleanEndpoint.includes("?") ? "&" : "?"
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
  try {
    const response = await fetch(
      `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=ko-KR&append_to_response=videos`
    );

    if (!response.ok) {
      throw new Error("상세 정보를 불러올 수 없습니다.");
    }

    const data = await response.json();

    if (!isSafeMovie(data)) throw new Error("성인 콘텐츠 차단됨");

    return data;
  } catch (err) {
    console.error("fetchMovieDetail error:", err);
    throw err;
  }
}

export async function fetchSearchResults(query, type = "movie") {
  try {
    const cleanQuery = encodeURIComponent(query.trim());
    if (!cleanQuery) return { results: [] };

    const url = `${BASE_URL}/search/${type}?api_key=${API_KEY}&language=ko-KR&query=${cleanQuery}&include_adult=false`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`TMDb 검색 실패: ${res.status}`);

    const data = await res.json();

    data.results = (data.results || []).filter(isSafeMovie);

    return data;
  } catch (err) {
    console.error("fetchSearchResults error:", err);
    return { results: [] };
  }
}
