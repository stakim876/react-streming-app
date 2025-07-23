import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [keyword, setKeyword] = useState('');

  const handleSearch = () => {
    if (keyword.trim()) {
      navigate(`/home?query=${encodeURIComponent(keyword.trim())}`);
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '70px',
        backgroundColor: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        zIndex: 999,
        boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
      }}
    >
      <h1
        style={{ color: '#00cec9', cursor: 'pointer', fontSize: '24px', fontWeight: 'bold' }}
        onClick={() => navigate('/home')}
      >
        MoviePlay
      </h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input
          type="text"
          placeholder="영화 검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          style={{
            padding: '6px 10px',
            borderRadius: '4px',
            border: 'none',
            width: '180px',
          }}
        />
        <FiSearch
          size={20}
          onClick={handleSearch}
          style={{ color: 'white', cursor: 'pointer' }}
        />
        <button
          onClick={logout}
          style={{
            backgroundColor: 'red',
            color: 'white',
            padding: '6px 10px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          로그아웃
        </button>
      </div>
    </header>
  );
}
