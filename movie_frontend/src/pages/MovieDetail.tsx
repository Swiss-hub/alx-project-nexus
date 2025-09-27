import React from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getRecommended } from "../api/movieApi";
import MovieCard from "../components/MovieCard";
import { useEffect, useState } from "react";

const MovieDetail: React.FC = () => {
    // Get the movie id from the URL (e.g., /movie/123)
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<any>(null);
    const [recommended, setRecommended] = useState<any[]>([]);

    useEffect(() => {
        async function fetchData() {
            const detail = await getMovieDetails(id!);
            const rec = await getRecommended(id!);
            setMovie(detail);
            setRecommended(rec.results || []);
        }
        fetchData();
    }, [id]);

    return (
        <div className="p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
            <p className="mb-6">{movie.overview}</p>

            <h2 className="text-2xl font-semibold mb-4">Recommended</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {recommended.map(m => (
                    <MovieCard key={m.id} id={m.id} title={m.title} posterPath={m.poster_path} />
                 ))}
            </div>
        </div>
    );
};

export default MovieDetail;