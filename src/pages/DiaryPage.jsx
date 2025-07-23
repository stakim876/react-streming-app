import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';

export default function DiaryPage() {
  const { user } = useAuth();
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const loadDiary = async () => {
      if (!user) return;

      const q = query(collection(db, 'diary'), where('uid', '==', user.uid));
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map(doc => doc.data());
      // 최신순 정렬
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setEntries(data);
    };

    loadDiary();
  }, [user]);

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>🎞 감정 다이어리</h1>
      {entries.length === 0 ? (
        <p>기록된 감정이 아직 없습니다.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {entries.map((entry) => (
            <div key={entry.movieId} style={{ background: '#1e1e1e', padding: '1rem', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${entry.poster_path || ''}`}
                  alt={entry.movieTitle}
                  style={{ width: '80px', borderRadius: '4px' }}
                  onError={(e) => (e.target.style.display = 'none')}
                />
                <div>
                  <h3 style={{ margin: 0 }}>{entry.movieTitle}</h3>
                  <p style={{ margin: '0.25rem 0' }}>{entry.emoji} {entry.text}</p>
                  <small style={{ color: '#aaa' }}>{new Date(entry.createdAt).toLocaleString()}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
