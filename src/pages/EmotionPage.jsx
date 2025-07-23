// ✅ src/pages/EmotionPage.jsx
import { useState, useEffect } from 'react';
import EmotionPicker from '../components/EmotionPicker';
import { fetchFromTMDB } from '../api/tmdb';

export default function EmotionPage() {
  const [emotion, setEmotion] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchEmotionMovies = async () => {
      if (!emotion) return;

      let keyword = '';
      switch (emotion) {
        case 'sad': keyword = 'drama'; break;
        case 'funny': keyword = 'comedy'; break;
        case 'thrilling': keyword = 'thriller'; break;
        case 'romantic': keyword = 'romance'; break;
        case 'calm': keyword = 'documentary'; break;
        default: return;
      }

      const results = await fetchFromTMDB(`search/movie?query=${keyword}`);
      setMovies(results.slice(0, 20));
    };

    fetchEmotionMovies();
  }, [emotion]);

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
        감정으로 콘텐츠 찾기
      </h1>
      <EmotionPicker onSelect={setEmotion} />
      {emotion && (
        <div>
          <h2 style={{ marginBottom: '1rem' }}>
            "{emotion}" 감정에 맞는 추천작
          </h2>
          <div style={{ display: 'flex', overflowX: 'auto', gap: '1rem' }}>
            {movies.map((movie) => (
              <div key={movie.id} style={{ width: '150px' }}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  style={{ width: '100%', borderRadius: '8px' }}
                />
                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  {movie.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
