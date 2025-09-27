import { useState } from "react";
import { searchMovies } from "../api/movieApi";
import MovieCard from "../components/MovieCard";

export default function Search() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = await searchMovies(query);
        setResults(data.results || []);
    };

    return (
        <div className="p-6 text-white">
            <form onSubmit={handleSearch} className="mb-6">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="px-4 py-2 text-black rounded"
                    placeholder="Search for movies..."
                />
                <button className="ml-2 px-4 py-2 bg-red-500 rounded">Search</button>
            </form>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {results.map((movie) => (
                    <MovieCard 
                    key={movie.id} 
                    id={movie.id}
                    title={movie.title} // <-- Add this line
                    posterPath={movie.poster_path} />
                ))}
            </div>
        </div>
    );
}