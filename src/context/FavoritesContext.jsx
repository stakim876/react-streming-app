import { createContext, useContext, useEffect, useState } from "react";
import { db } from "@/services/firebase";
import { collection, getDocs, setDoc, deleteDoc, doc } from "firebase/firestore";

import { useAuth } from "../context/AuthContext";

const FavoritesContext = createContext();

function normalizeMovie(movie) {
  return {
    id: movie.id,
    tmdbId: movie.id.toString(),
    title: movie.title ?? movie.name ?? "",
    poster_path: movie.poster_path ?? null,
    backdrop_path: movie.backdrop_path ?? null,
    overview: movie.overview ?? "",
    vote_average: movie.vote_average ?? 0,
  };
}

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!user) return setFavorites([]);

    const fetchFavorites = async () => {
      const snapshot = await getDocs(
        collection(db, "users", user.uid, "favorites")
      );
      setFavorites(
        snapshot.docs.map((doc) => ({
          id: parseInt(doc.id),
          ...doc.data(),
        }))
      );
    };

    fetchFavorites();
  }, [user]);

  const toggleFavorite = async (movie) => {
    if (!user) return alert("로그인이 필요합니다.");

    const normalized = normalizeMovie(movie);
    const ref = doc(
      db,
      "users",
      user.uid,
      "favorites",
      normalized.id.toString()
    );

    const exists = favorites.find((f) => f.id === normalized.id);

    if (exists) {
      await deleteDoc(ref);
      setFavorites(favorites.filter((f) => f.id !== normalized.id));
    } else {
      await setDoc(ref, normalized);
      setFavorites([...favorites, normalized]);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
