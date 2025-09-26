import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getFavorites } from "../utils/favorites";

const Favorites: React.FC = () => {
    const [favorites, setFavorites] = useState<any[]>([]);

    useEffect(() => {
        setFavorites(getFavorites());
    }, []);

    return (
        <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {favorites.length === 0 ? (
                <p className="text-white col-span-full text-center">No favorites yet.</p>
            ) : (
                favorites.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        posterPath={movie.poster_path}
                    />
                ))
            )}
        </div>
    );
};

export default Favorites;

