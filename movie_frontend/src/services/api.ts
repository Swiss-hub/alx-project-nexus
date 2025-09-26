// src/services/api.ts
const BASE_URL = "http://127.0.0.1:8000/api/movies";

export async function fetchTrending() {
  const res = await fetch(`${BASE_URL}/trending/`);
  if (!res.ok) throw new Error("Failed to load trending movies");
  return res.json();
}

export async function fetchRecommendations(movieId: number) {
  const res = await fetch(`${BASE_URL}/recommendations/${movieId}/`);
  if (!res.ok) throw new Error("Failed to load recommendations");
  return res.json();
}
