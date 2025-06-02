
const api_key = import.meta.env.VITE_APP_API_KEY
const base_url = import.meta.env.VITE_APP_BASE_URL
const getPopularMovies = async () => {
    const response = await fetch(`${base_url}/movie/popular?api_key=${api_key}`);
    const data = await response.json(); // ✅ Await the parsed JSON
    return data.results;
};


const searchMovie = async (query) => {
    const response = await fetch(
        `${base_url}/search/movie?api_key=${api_key}&query=${encodeURIComponent(query)}`
    )
    const data = await response.json()
    return data.results;
}

export { getPopularMovies, searchMovie }

