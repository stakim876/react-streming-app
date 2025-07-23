// ✅ src/components/EmotionPicker.jsx
const EMOTIONS = [
  { label: '😢 슬픔', value: 'sad' },
  { label: '😂 유쾌', value: 'funny' },
  { label: '😱 긴장', value: 'thrilling' },
  { label: '🥰 설렘', value: 'romantic' },
  { label: '🧘 평화', value: 'calm' },
];

export default function EmotionPicker({ onSelect }) {
  return (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
      {EMOTIONS.map((emotion) => (
        <button
          key={emotion.value}
          onClick={() => onSelect(emotion.value)}
          style={{
            fontSize: '1.2rem',
            padding: '0.5rem 1rem',
            borderRadius: '999px',
            border: '1px solid #999',
            background: 'transparent',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          {emotion.label}
        </button>
      ))}
    </div>
  );
}
