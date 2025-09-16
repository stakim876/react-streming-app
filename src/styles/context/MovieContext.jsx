import { createContext, useContext, useState } from "react";

const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <MovieContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </MovieContext.Provider>
  );
}

export function useMovie() {
  return useContext(MovieContext);
}
