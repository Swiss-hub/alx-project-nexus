import React from "react";
import { saveFavorite, isFavorite } from "../utils/favorites";

interface FavoritesButtonProps {
    movie: any; // 'any' can be replaced with a Movie type later on.
}

const FavoriteButton: React.FC<FavoritesButtonProps> = ({ movie }) => {
    const handleClick = () => {
        if (!isFavorite(movie.id)) {
            saveFavorite(movie);
            alert('${movie.title} saved to favorites!');
        } else {
            alert('${movie.title} is already in favorites');
        }
    };

    return (
        <button
            onClick={handleClick}
            className="ml-2 text-red-400 hover:text-red-500 text-lg"
            title="Save to Favorites"
        >
            ❤️
        </button>
    );
};

export default FavoriteButton;