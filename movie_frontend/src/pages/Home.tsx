import React, { useEffect, useState } from "react";
import { getTrending, getUpcoming } from "../api/movieApi";
import MovieCard from "../components/MovieCard";
import { saveFavorite } from "../utils/favorites";

const Home: React.FC = () => {
    const [trending, setTrending] = useState<any[]>([]);
    const [upcoming, setUpcoming] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [ trend, up] = await Promise.all([getTrending(), getUpcoming()]);
                setTrending(trend.results || []);
                setUpcoming(up.results || []);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) return <p className="text-center mt-10 text-white">Loading...</p>;

    return (
        <div className="px-6 py-4 text-white">
            <h2 className="text-2xl font-bold mb-4">Trending Movies</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {trending.map(movie => (
                    <MovieCard
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                            posterPath={movie.poster_path}
                            onFavorite={() => saveFavorite(movie)}
                        />
                    ))}
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Upcoming Movies</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {upcoming.map(movie => (
                    <MovieCard
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        posterPath={movie.poster_path}
                   />
                ))}
            </div>
        </div>
    );
};

export default Home;