const BASE_URL = "http://127.0.0.1:8000/api/movies";

export async function getTrending() {
    const res = await fetch('${BASE_URL}/trending');
    if (!res.ok) throw new Error("Trending Movies request failed");
    return res.json();
}

export async function getUpcoming() {
    const res = await fetch("http://127.0.0.1:8000/api/movies/upcoming/");
    if (!res.ok) throw new Error("Upcoming request failed");
    return res.json();
}

export async function searchMovies(query: string) {
    const res = await fetch('${BASE_URL}/search?query=${encodeURIComponent(query)}');
    if (!res.ok) throw new Error("Search request failed");
    return res.json();
}

export async function getMovieDetails(id: string) {
    const res = await fetch('${BASE_URL}/${id}');
    if (!res.ok) throw new Error("Movie details request failed");
    return res.json();
}

export async function getRecommended(movieId: string) {
    const res = await fetch(`${BASE_URL}/recommendations/${movieId}/`);
    if (!res.ok) throw new Error("Recommendations request failed");
    return res.json();
}