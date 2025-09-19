import { createContext, useContext, useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, setDoc, deleteDoc, doc } from "firebase/firestore";
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!user) return setFavorites([]);

    const fetchFavorites = async () => {
      const snapshot = await getDocs(collection(db, "users", user.uid, "favorites"));
      setFavorites(snapshot.docs.map((doc) => ({ id: parseInt(doc.id), ...doc.data() })));
    };

    fetchFavorites();
  }, [user]);

  const toggleFavorite = async (movie) => {
    if (!user) return alert("로그인이 필요합니다.");

    const ref = doc(db, "users", user.uid, "favorites", movie.id.toString());
    const exists = favorites.find((f) => f.id === movie.id);

    if (exists) {
      await deleteDoc(ref);
      setFavorites(favorites.filter((f) => f.id !== movie.id));
    } else {
      await setDoc(ref, {
        id: movie.id,
        title: movie.title || movie.name,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        overview: movie.overview,
        vote_average: movie.vote_average,
      });
      setFavorites([...favorites, movie]);
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
