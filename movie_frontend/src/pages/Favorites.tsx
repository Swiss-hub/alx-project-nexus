import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getFavorites } from "../utils/favorites";

const Favorites: React.FC = () => {
    const [favorites, setFavorites] = useState<any[]>([]);

    useEffect(() => {
        setFavorites(getFavorites());
    }, []);

    return (
        <div className="min-h-[60vh] p-4 md:p-8 bg-gradient-to-br from-black via-gray-900 to-primary/20">
            <h2 className="text-2xl font-bold mb-6 text-white text-center">Your Favorite Movies</h2>
            {favorites.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                    <img src="https://images.unsplash.com/photo-1468071174046-657d9d351a40?auto=format&fit=crop&w=400&q=80" alt="No favorites" className="w-40 h-40 object-cover rounded-full mb-6 opacity-70" />
                    <p className="text-white text-lg">No favorites yet. Start adding some!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {favorites.map((movie) => (
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

export default Favorites;

