import React from "react";
import { useParams } from "react-router-dom";

const MovieDetail: React.FC = () => {
    // Get the movie id from the URL (e.g., /movie/123)
    const { id } = useParams<{ id: string }>();

    return (
        <div className="p-6 text-white">
            <h1 className="text-2xl font-bold mb-4">Movie Detail</h1>
            <p>Movie ID: {id}</p>
            <p className="mt-2">This is a placeholder. Later, you can fetch full details from the API
            using the movie ID above.
            </p>
        </div>
    );
};

export default MovieDetail;