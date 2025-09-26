import React, { useEffect, useState } from "react";
import { fetchTrending } from "../services/api";
import MovieCard from "../components/MovieCard";
import { saveFavorite } from "../utils/favorites";

const Home: React.FC = () => {
    const [movies, setMovies] = useState<any[]>([]);

    useEffect(() => {
        fetchTrending().then(setMovies).catch(console.error);
    }, []);

    return (
        <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    posterPath={movie.poster_path}
                    onFavorite={() => saveFavorite(movie)}
                />
            ))}
        </div>
    );
};

export default Home;