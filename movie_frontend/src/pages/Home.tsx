
import React, { useEffect, useState } from "react";
import { getTrending, getUpcoming } from "../api/movieApi";
import MovieCard from "../components/MovieCard";
import { saveFavorite } from "../utils/favorites";
import { searchMovies } from "../api/movieApi";
import { Carousel, Spinner } from "flowbite-react";


const Home: React.FC = () => {
    const [trending, setTrending] = useState<any[]>([]);
    const [upcoming, setUpcoming] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        try {
            const data = await searchMovies(query);
            setResults(data.results || []); // adapt to backend’s JSON structure
        } catch (err) {
            console.error(err);
        }
    };

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


    if (loading) return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <Spinner color="failure" size="xl" />
        </div>
    );


    return (
        <div className="px-0 md:px-6 py-4 text-white">
            {/* Hero Section */}
            <div className="relative h-64 md:h-96 w-full mb-8 flex items-center justify-center bg-gradient-to-r from-black/80 to-primary/80">
                <img
                    src="https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=1200&q=80"
                    alt="Movie Banner"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-2 drop-shadow-lg">Welcome to MovieApp</h1>
                    <p className="text-lg md:text-xl mb-4 drop-shadow">Discover trending and upcoming movies, save your favorites, and more!</p>
                </div>
            </div>

            {/* Featured Carousel */}
            <div className="max-w-4xl mx-auto mb-10">
                <Carousel slideInterval={4000} className="rounded-lg shadow-lg">
                    <img src="https://images.unsplash.com/photo-1467987506553-8f3916508521?auto=format&fit=crop&w=800&q=80" alt="Featured 1" className="object-cover w-full h-64 md:h-80" />
                    <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80" alt="Featured 2" className="object-cover w-full h-64 md:h-80" />
                    <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80" alt="Featured 3" className="object-cover w-full h-64 md:h-80" />
                    <img src="https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=800&q=80" alt="Featured 4" className="object-cover w-full h-64 md:h-80" />
                    <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80" alt="Featured 5" className="object-cover w-full h-64 md:h-80" />
                    <img src="https://images.unsplash.com/photo-1468071174046-657d9d351a40?auto=format&fit=crop&w=800&q=80" alt="Featured 6" className="object-cover w-full h-64 md:h-80" />
                </Carousel>
            </div>

            <h2 className="text-2xl font-bold mb-4 px-4 md:px-0">Trending Movies</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2 md:px-0">
                {trending.map(movie => (
                    <MovieCard
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        posterPath={movie.poster_path}
                        rating={movie.vote_average}
                        onFavorite={() => saveFavorite(movie)}
                    />
                ))}
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4 px-4 md:px-0">Upcoming Movies</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2 md:px-0">
                {upcoming.map(movie => (
                    <MovieCard
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        posterPath={movie.poster_path}
                        rating={movie.vote_average}
                   />
                ))}
            </div>
        </div>
    );
};

export default Home;