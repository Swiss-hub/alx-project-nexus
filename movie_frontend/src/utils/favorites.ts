// src/utils/favorites.ts
export function saveFavorite(movie: any) {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  localStorage.setItem("favorites", JSON.stringify([...favorites, movie]));
}

export function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
}

export function isFavorite(movieId: number) {
  const stored = localStorage.getItem("favorites");
  const favorites = stored ? JSON.parse(stored) : [];
  return favorites.some((movie: any) => movie.id === movieId);
}


// 🔑 How It Works
// localStorage.getItem("favorites")
// Reads the current array. If nothing exists, returns null (so we default to []).

// JSON.parse / JSON.stringify
// Convert between string and JavaScript object/array.

// some()
// Checks if the movie is already saved.

// localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
// Saves the updated array back to the browser.