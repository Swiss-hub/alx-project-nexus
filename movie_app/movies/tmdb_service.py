import os
import requests
from django.conf import settings

TMDB_BASE_URL = "https://api.themoviedb.org/3"
TMDB_API_KEY = os.getenv("TMDB_API_KEY", settings.TMDB_API_KEY)

def get_trending_movies():
  """Fetch tending movies from TMDB."""
  url = f"{TMDB_BASE_URL}/trending/movie/week"
  params = {"api_key": TMDB_API_KEY}
  try:
    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json()
  except requests.exceptions.RequestException as e:
    return {"error": str(e)}
  
  
def get_recommended_movies(movie_id):
  """Fetch recommended movies based on a movie ID."""
  url = f"{TMDB_BASE_URL}/movie/{movie_id}/recommendations"
  params = {"api_key": TMDB_API_KEY}
  try:
    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json()
  except requests.exceptions.RequestException as e:
    return {"error": str(e)}
  
# print("TMDB_API_KEY:", TMDB_API_KEY)  # debug
# print("TMDB_BASE_URL:", TMDB_BASE_URL)  # debug
