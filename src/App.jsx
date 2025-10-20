import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";

import { AuthProvider } from "@/context/AuthContext.jsx";
import { MovieProvider } from "@/context/MovieContext.jsx";
import { FavoritesProvider } from "@/context/FavoritesContext.jsx";

import Header from "@/components/Header.jsx";
import Sidebar from "@/components/Sidebar.jsx";

import HomePage from "@/pages/HomePage.jsx";
import LoginPage from "@/pages/LoginPage.jsx";
import SignUpPage from "@/pages/SignUpPage.jsx";
import ProfilePage from "@/pages/ProfilePage.jsx";
import FavoritesPage from "@/pages/FavoritesPage.jsx";
import SearchPage from "@/pages/SearchPage.jsx";
import MovieDetail from "@/pages/MovieDetail.jsx";
import CategoryPage from "@/pages/CategoryPage.jsx";
import DiscoverPage from "@/pages/DiscoverPage.jsx";
import WhoPage from "@/pages/WhoPage.jsx";

import PrivateRoute from "@/routes/PrivateRoute.jsx";
import AdminRoute from "@/routes/AdminRoute.jsx";

function MainLayout({ sidebarOpen, setSidebarOpen }) {
  return (
    <div className="app-layout">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>MoviePlay | 감성 무비</title>
      </Helmet>

      <AuthProvider>
        <MovieProvider>
          <FavoritesProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />

              <Route
                path="/who"
                element={
                  <PrivateRoute>
                    <WhoPage />
                  </PrivateRoute>
                }
              />
              <Route
                element={
                  <MainLayout
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                  />
                }
              >
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <HomePage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/search"
                  element={
                    <PrivateRoute>
                      <SearchPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/movie/:id"
                  element={
                    <PrivateRoute>
                      <MovieDetail />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/tv/:id"
                  element={
                    <PrivateRoute>
                      <MovieDetail />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/category/:type/:category"
                  element={
                    <PrivateRoute>
                      <CategoryPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/category/genre/:genreId"
                  element={
                    <PrivateRoute>
                      <CategoryPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/discover"
                  element={
                    <PrivateRoute>
                      <DiscoverPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <ProfilePage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/favorites"
                  element={
                    <PrivateRoute>
                      <FavoritesPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <h1>관리자 페이지</h1>
                    </AdminRoute>
                  }
                />
              </Route>

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </FavoritesProvider>
        </MovieProvider>
      </AuthProvider>
    </>
  );
}
