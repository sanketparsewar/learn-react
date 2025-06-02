import { createContext, useContext, useEffect, useState } from "react";

// Create a new context for movies
const MovieContext = createContext();

// Custom hook to easily access the movie context
export const useMovieContext = () => useContext(MovieContext);

// Component to provide movie context to its children
export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const storedFav = localStorage.getItem("favorites"); // 🔁 Note: key is 'favorite' here
    return storedFav ? JSON.parse(storedFav) : [];
  });

  // Save favorite movies to localStorage whenever the state changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites)); // 🔁 Note: key is 'favorite' here — mismatch!
  }, [favorites]);

  // Add a movie to favorites
  const addToFavorite = (movie) => {
    setFavorites((prev) => [movie, ...prev]);
  };

  // Remove a movie from favorites by ID
  const removeFromFavorite = (movieId) => {
    setFavorites((prev) => prev.filter((item) => item.id !== movieId));
  };

  // Check if a movie is in favorites
  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  // Provide state and actions to children
  return (
    <MovieContext.Provider
      value={{ favorites, addToFavorite, removeFromFavorite, isFavorite }}
    >
      {children}
    </MovieContext.Provider>
  );
};
