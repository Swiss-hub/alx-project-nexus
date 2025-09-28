
import React from "react";
import { Link } from "react-router-dom";
import { Card, Badge, Button } from "flowbite-react";

interface MovieCardProps {
    id: number;
    title: string;
    posterPath: string;
    rating: number | string;
    onFavorite?: () => void;
}


const fallbackImg = "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80";

const MovieCard: React.FC<MovieCardProps> = ({ id, title, posterPath, rating, onFavorite }) => {
    const posterUrl = posterPath
        ? `https://image.tmdb.org/t/p/w500${posterPath}`
        : fallbackImg;

    return (
        <Card className="h-full flex flex-col justify-between shadow-lg hover:scale-105 hover:shadow-primary/40 transition-transform duration-200 bg-gray-900/80 border border-gray-800">
            <Link to={`/movie/${id}`} className="block relative group">
                <img
                    src={posterUrl}
                    alt={title}
                    className="w-full movie-card-img object-cover rounded-t-lg group-hover:opacity-80 transition fade-in"
                    onError={e => (e.currentTarget.src = fallbackImg)}
                />
                <span className="absolute top-2 right-2 z-10">
                    <Badge color="failure">{rating}</Badge>
                </span>
            </Link>
            <div className="flex flex-col flex-1 justify-between mt-2">
                <h3 className="font-semibold text-base truncate mb-1">{title}</h3>
                {/* Optionally, add genre badges here if available */}
            </div>
            {onFavorite && (
                <Button color="failure" size="xs" onClick={onFavorite} className="mt-2">
                    ❤️ Favorite
                </Button>
            )}
        </Card>
    );
};

export default MovieCard;