import React from "react";
import { Link } from "react-router-dom";

interface MovieCardProps {
    id: number;
    title: string;
    posterPath: string;
    onFavorite?: () => void;  //optional callback for favorites
}

const MovieCard: React.FC<MovieCardProps> = ({ id, title, posterPath, onFavorite }) => {
    const posterUrl = posterPath
        ? `https://image.tmdb.org/t/p/w500${posterPath}`
        : "/placeholder.jpg"; // fallback image if no poster

    return (
        <div className="bg-gray-800 rounded-lg shadow hover:scale-105 transition transform duration-200">
            <Link to={`/movie/${id}`}>
                <img
                    src={posterUrl}
                    alt={title}
                    className="w-full h-72 object-cover rounded-t-lg"
                />
            </Link>
            <div className="p-3 flex justify-between items-center text-white">
                <h3 className="font-semibold text-sm truncate">{title}</h3>
                {onFavorite && (
                    <button
                        onClick={onFavorite}
                        className="ml-2 text-red-400 hover:text-red-500 text-lg"
                        title="Save to Favorites"
                    >
                        ❤️
                    </button>
                )}
            </div>
        </div>
    );
};

export default MovieCard;