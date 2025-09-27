const BASE_URL = "http://localhost:5000/api/movies";

export async function getTrending() {
    const res = await fetch('${BASE_URL}/trending');
    return res.json();
}

export async function getUpcoming() {
    const res = await fetch('${BASE_URL}/upcoming');
    return res.json();
}

export async function searchMovies(query: string) {
    const res = await fetch('${BASE_URL}/search?query=${encodeURIComponent(query)}');
    return res.json();
}

export async function getMovieDetails(id: string) {
    const res = await fetch('${BASE_URL}/${id}');
    return res.json();
}

export async function getRecommended(id: string) {
    const res = await fetch('${BASE_URL}/${id}/recommendations');
    return res.json();
}