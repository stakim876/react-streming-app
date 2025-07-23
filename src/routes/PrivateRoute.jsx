import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute() {
  const { currentUser, loading } = useAuth();

  if (loading) return <div style={{ color: 'white' }}>로딩 중...</div>;

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
}
