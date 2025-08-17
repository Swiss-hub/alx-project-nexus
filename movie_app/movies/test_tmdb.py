import requests

# Your TMDB API key
API_KEY = "12c6e7ac6cd74221cbc372b9f50b9600"

# Endpoint for trending movies
url = f"https://api.themoviedb.org/3/trending/movie/day?api_key={API_KEY}"

response = requests.get(url)

print("Status Code:", response.status_code)
print("Response JSON:", response.json())
