const API_KEY = import.meta.env.VITE_TMDB_API_KEY || "demo_key";
const BASE_URL = "https://api.themoviedb.org/3";

const adultKeywords = [
  "adult", "xxx", "porn", "sex", "nude", "erotic",
  "18+", "19+", "섹스", "에로", "성인", "야동", "야한"
];

function filterAdultContent(results = []) {
  return results.filter((m) => {
    if (m.adult) return false; 

    const title = (m.title || m.name || "").toLowerCase();
    const overview = (m.overview || "").toLowerCase();

    if (adultKeywords.some((kw) => title.includes(kw) || overview.includes(kw))) {
      return false;
    }

    return true;
  });
}

export async function fetchMovies(endpoint) {
  if (!import.meta.env.VITE_TMDB_API_KEY || import.meta.env.VITE_TMDB_API_KEY === "demo_key") {
    return { results: getDummyMovies() };
  }

  const url = `${BASE_URL}${endpoint}${endpoint.includes("?") ? "&" : "?"}api_key=${API_KEY}&language=ko-KR&include_adult=false`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("TMDB fetch failed");

  const data = await res.json();
  data.results = filterAdultContent(data.results);
  return data;
}

export async function fetchMoviesByGenre(genreId) {
  if (!import.meta.env.VITE_TMDB_API_KEY || import.meta.env.VITE_TMDB_API_KEY === "demo_key") {
    return { results: getDummyMovies() };
  }

  const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=ko-KR&with_genres=${genreId}&include_adult=false`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("TMDB fetch by genre failed");

  const data = await res.json();
  data.results = filterAdultContent(data.results);
  return data;
}

export async function fetchMovieDetail(id) {
  if (!import.meta.env.VITE_TMDB_API_KEY || import.meta.env.VITE_TMDB_API_KEY === "demo_key") {
    const dummyMovies = getDummyMovies();
    const movie = dummyMovies.find((m) => m.id === id) || dummyMovies[0];
    return {
      ...movie,
      videos: {
        results: [
          { key: "dQw4w9WgXcQ", site: "YouTube", type: "Trailer" }
        ],
      },
    };
  }

  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ko-KR&append_to_response=videos&include_adult=false`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("TMDB fetch detail failed");

  const data = await res.json();

  const title = (data.title || data.name || "").toLowerCase();
  const overview = (data.overview || "").toLowerCase();
  if (data.adult || adultKeywords.some((kw) => title.includes(kw) || overview.includes(kw))) {
    throw new Error("Blocked adult content");
  }

  return data;
}

function getDummyMovies() {
  return [
    {
      id: 1,
      title: "어벤져스: 엔드게임",
      poster_path: "/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
      backdrop_path: "/7RyHsO4yDXtBv1zUE3HxwU4aP1S.jpg",
      overview: "타노스에 의해 절반으로 줄어든 지구의 인구를 되돌리기 위한 어벤져스의 마지막 전투.",
      vote_average: 8.4,
      release_date: "2019-04-24",
      genre_names: ["액션", "모험", "SF"],
      trailerKey: "TcMBFSGVi1c",
    },
  ];
}
