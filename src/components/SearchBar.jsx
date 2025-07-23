import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#222', padding: '0.3rem 0.6rem', borderRadius: '24px', border: '1px solid #2fe3c9' }}>
      <input
        type="text"
        placeholder="영화 검색"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ background: 'transparent', border: 'none', outline: 'none', color: '#ffffff', fontSize: '0.9rem', width: '140px' }}
      />
      <button type="submit" style={{ backgroundColor: '#2fe3c9', border: 'none', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        <FaSearch size={14} color="#111" />
      </button>
    </form>
  );
}
