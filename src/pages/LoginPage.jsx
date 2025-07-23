import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { applyPersistence } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await applyPersistence(); // 자동 로그인 설정
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('로그인 성공:', user.email);
      navigate('/home');
    } catch (err) {
      console.error('로그인 에러 코드:', err.code);
      console.error('로그인 에러 메시지:', err.message);
      setError(`로그인 실패: ${err.message}`);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#0b0c1d',
    }}>
      <div style={{
        backgroundColor: '#1c1f2b',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.6)',
        width: '100%',
        maxWidth: '400px',
        color: 'white',
      }}>
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>로그인</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '0.75rem', borderRadius: '6px', border: 'none' }}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '0.75rem', borderRadius: '6px', border: 'none' }}
          />
          {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}
          <button
            type="submit"
            style={{
              padding: '0.75rem',
              background: '#00cec9',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            로그인
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '0.75rem' }}>
          <a href="/reset" style={{ fontSize: '0.85rem', color: '#74b9ff', textDecoration: 'underline' }}>
            비밀번호를 잊으셨나요?
          </a>
        </div>

        <div style={{ textAlign: 'center', marginTop: '0.25rem' }}>
          <a href="/signup" style={{ fontSize: '0.85rem', color: '#74b9ff', textDecoration: 'underline' }}>
            아직 회원이 아니신가요? 회원 가입
          </a>
        </div>
      </div>
    </div>
  );
}
