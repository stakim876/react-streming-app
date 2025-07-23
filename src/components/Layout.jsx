import Header from './Header';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '90px', backgroundColor: '#000', minHeight: '100vh' }}>
        <Outlet />
      </main>
    </>
  );
}
