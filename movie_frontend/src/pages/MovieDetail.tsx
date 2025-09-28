
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getRecommended } from "../api/movieApi";
import MovieCard from "../components/MovieCard";
import { Card, Badge, Spinner } from "flowbite-react";

const MovieDetail: React.FC = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [recommended, setRecommended] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;
    getMovieDetails(id).then(setMovie);
    getRecommended(id).then(setRecommended);
  }, [id]);

  if (!movie) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <Spinner color="failure" size="xl" />
    </div>
  );

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.jpg";

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <Card className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-gray-900/80">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-64 h-96 object-cover rounded-lg shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <Badge color="failure" className="mb-2">Rating: {movie.vote_average}</Badge>
          <p className="mb-4 text-gray-200">{movie.overview}</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {movie.genres && movie.genres.map((g: any) => (
              <Badge key={g.id} color="info">{g.name}</Badge>
            ))}
          </div>
          <div className="text-sm text-gray-400">Release Date: {movie.release_date}</div>
        </div>
      </Card>

      <h2 className="text-2xl font-bold mt-8 mb-4">Recommended</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recommended.map((r) => (
          <MovieCard
            key={r.id}
            id={r.id}
            title={r.title}
            posterPath={r.poster_path}
            rating={r.vote_average}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieDetail;