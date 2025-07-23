import { useState, useEffect } from 'react';
import { fetchFromTMDB } from '../api/tmdb';

const EMOTION_MAP = {
  sad: { emoji: '😢', keyword: 'drama', label: '슬픔' },
  funny: { emoji: '😂', keyword: 'comedy', label: '유쾌' },
  thrilling: { emoji: '😱', keyword: 'thriller', label: '긴장' },
  romantic: { emoji: '🥰', keyword: 'romance', label: '설렘' },
  calm: { emoji: '🧘', keyword: 'documentary', label: '평화' },
};

const EMOTION_KEYS = Object.keys(EMOTION_MAP);

export default function RandomEmotionPage() {
  const [emotionKey, setEmotionKey] = useState('');
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const pickRandomEmotion = async () => {
      const random = EMOTION_KEYS[Math.floor(Math.random() * EMOTION_KEYS.length)];
      setEmotionKey(random);

      const result = await fetchFromTMDB(`search/movie?query=${EMOTION_MAP[random].keyword}`);
      if (result.length > 0) {
        const randomMovie = result[Math.floor(Math.random() * result.length)];
        setMovie(randomMovie);
      }
    };

    pickRandomEmotion();
  }, []);

  const info = EMOTION_MAP[emotionKey];

  return (
    <div style={{ padding: '2rem', color: '#fff' }}>
      <h2>오늘의 감정 추천 🎲</h2>
      {info && (
        <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
          랜덤 감정: {info.emoji} {info.label}
        </p>
      )}
      {movie && (
        <div
          style={{
            background: '#1e1e1e',
            padding: '1rem',
            borderRadius: '12px',
            maxWidth: '400px',
          }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            style={{ width: '100%', borderRadius: '8px' }}
          />
          <h3 style={{ marginTop: '0.5rem' }}>{movie.title}</h3>
          <p style={{ fontSize: '0.9rem' }}>{movie.overview.slice(0, 120)}...</p>
        </div>
      )}
    </div>
  );
}
