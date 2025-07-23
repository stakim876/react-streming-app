// ✅ src/components/EmotionRecord.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const EMOJIS = ['😍', '😢', '😱', '🥰', '😶'];

export default function EmotionRecord({ movieId, movieTitle }) {
  const { user } = useAuth();
  const [emoji, setEmoji] = useState('');
  const [text, setText] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    if (!user || !emoji || !text) return;

    await setDoc(doc(db, 'diary', `${user.uid}_${movieId}`), {
      uid: user.uid,
      movieId,
      movieTitle,
      emoji,
      text,
      createdAt: new Date().toISOString(),
    });

    setSaved(true);
  };

  return (
    <div style={{ marginTop: '2rem', color: 'white' }}>
      <h3>이 영화는 어땠나요?</h3>
      <div style={{ display: 'flex', gap: '1rem', margin: '0.5rem 0' }}>
        {EMOJIS.map((e) => (
          <button
            key={e}
            onClick={() => setEmoji(e)}
            style={{
              fontSize: '1.5rem',
              border: emoji === e ? '2px solid #fff' : '1px solid gray',
              background: 'transparent',
              borderRadius: '999px',
              cursor: 'pointer',
            }}
          >
            {e}
          </button>
        ))}
      </div>
      <textarea
        placeholder="한 줄 감상평을 남겨보세요"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: '100%', height: '80px', marginBottom: '0.5rem', padding: '0.5rem' }}
      />
      <button
        onClick={handleSave}
        style={{
          padding: '0.5rem 1rem',
          background: '#00b894',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        저장하기
      </button>
      {saved && <p style={{ color: '#00b894', marginTop: '0.5rem' }}>기록이 저장되었어요!</p>}
    </div>
  );
}
