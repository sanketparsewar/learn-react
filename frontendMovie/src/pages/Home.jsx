import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getPopularMovies, searchMovie } from "../services/api";

function Home() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchedQuery, setSearchedQuery] = useState("");

  useEffect(() => {
    if (searchedQuery)
      searchMovie(searchedQuery)
        .then((res) => {
          setMovies(res);
        })
        .catch((error) => setError(error))
        .finally(() => {
          setLoading(false);
        });
    else
      getPopularMovies()
        .then((res) => {
          setMovies(res);
        })
        .catch((error) => setError(error))
        .finally(() => {
          setLoading(false);
        });
  }, [searchedQuery]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-center text-3xl font-extrabold text-gray-900">
        Movie List
      </h1>
      <form className="flex justify-center mb-6">
        <input
          placeholder="Search for a movie..."
          className="border border-gray-300 rounded-md px-4 py-2 w-80 "
          type="text"
          value={searchedQuery}
          onChange={(e) => setSearchedQuery(e.target.value)}
        />
      </form>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">Error: {error.message}</div>
      ) : (
        <div className="flex gap-6 justify-center flex-wrap">
          {movies && movies.length > 0 ? (
            movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)
          ) : (
            <div className="text-center text-gray-500">No movies found.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
