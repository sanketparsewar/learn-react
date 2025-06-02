import React from "react";
import { useMovieContext } from "../context/MovieContext";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorite, removeFromFavorite } = useMovieContext();

  const favorite = isFavorite(movie.id);
  

  const onFavoriteClick = (e) => {
    e.preventDefault();
    if (favorite) removeFromFavorite(movie.id);
    else addToFavorite(movie);
  };

  return (
    <div className="border border-gray-300 rounded-lg  text-center w-52 relative shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <div className="overflow-hidden rounded-lg">
        <img
          src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-72 object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>

      <button
        onClick={onFavoriteClick}
        className="cursor-pointer absolute top-2 right-2 text-red-500 text-xl drop-shadow-md"
      >
        {favorite ? <span>❤️</span> : <span>🤍</span>}
      </button>

      <h3 className="m-3 text-lg text-gray-800 font-semibold truncate">
        {movie.title}
      </h3>
    </div>
  );
}

export default MovieCard;
