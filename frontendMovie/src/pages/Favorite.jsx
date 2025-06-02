import React, { useState } from "react";
import MovieCard from "../components/MovieCard";
import { useMovieContext } from "../context/MovieContext";

function Favorite() {
  const { favorites } = useMovieContext();

return (
    <>
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-6">Your Favorite Movies</h1>
            <div className="flex gap-6 justify-center flex-wrap">
                {favorites && favorites.length > 0 ? (
                    favorites.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))
                ) : (
                    <div className="text-center text-gray-500 text-lg">
                        No movies found. Start adding some favorites!
                    </div>
                )}
            </div>
        </div>
    </>
);
}

export default Favorite;
