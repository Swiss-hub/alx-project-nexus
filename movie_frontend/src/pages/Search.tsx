import React, { useState } from "react";
import { searchMovies } from "../api/movieApi";
import MovieCard from "../components/MovieCard";
import { Spinner } from "flowbite-react";

const Search = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const data = await searchMovies(query);
        setResults(data.results || []);
        setLoading(false);
    };

    return (
        <div className="min-h-[60vh] p-4 md:p-8 bg-gradient-to-br from-black via-gray-900 to-primary/20 text-white">
            <h2 className="text-2xl font-bold mb-6 text-center">Search Movies</h2>
            <form onSubmit={handleSearch} className="mb-6 flex flex-col sm:flex-row items-center justify-center gap-2">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="px-4 py-2 text-black rounded w-full max-w-xs"
                    placeholder="Search for movies..."
                />
                <button className="px-4 py-2 bg-red-500 rounded w-full sm:w-auto mt-2 sm:mt-0">Search</button>
            </form>
            {loading ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
                    <Spinner color="failure" size="xl" />
                </div>
            ) : results.length === 0 && query ? (
                <div className="flex flex-col items-center justify-center py-16">
                    <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" alt="No results" className="w-40 h-40 object-cover rounded-full mb-6 opacity-70" />
                    <p className="text-lg">No results found for "{query}"</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {results.map((movie) => (
                        <MovieCard 
                            key={movie.id} 
                            id={movie.id}
                            title={movie.title}
                            posterPath={movie.poster_path}
                            rating={movie.vote_average}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Search;