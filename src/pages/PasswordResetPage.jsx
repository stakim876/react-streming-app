import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

export default function PasswordResetPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async () => {
    setMessage('');
    setError('');
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('📧 재설정 이메일을 전송했습니다. 이메일을 확인해주세요.');
    } catch (err) {
      setError('❌ 오류: ' + err.message);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0b0c1d',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    }}>
      <div style={{
        backgroundColor: '#1e1e2f',
        padding: '2rem',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
        boxShadow: '0 0 15px rgba(0,0,0,0.5)',
      }}>
        <h2>비밀번호 재설정</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 입력"
          style={{
            padding: '0.75rem',
            width: '100%',
            borderRadius: '8px',
            border: 'none',
            marginTop: '1rem',
            marginBottom: '1rem',
          }}
        />
        <button
          onClick={handleReset}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#00cec9',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          이메일 전송
        </button>
        {message && <p style={{ marginTop: '1rem', color: '#81ecec' }}>{message}</p>}
        {error && <p style={{ marginTop: '1rem', color: '#ff7675' }}>{error}</p>}
      </div>
    </div>
  );
}
