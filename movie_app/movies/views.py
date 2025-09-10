from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .tmdb_service import get_trending_movies
from django.conf import settings
from rest_framework import status
import os
import requests
from django.http import HttpResponse
from django.http import JsonResponse
from django.core.cache import cache
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


TMDB_API_KEY = os.getenv("TMDB_API_KEY", "your_api_key_here")  # replace if not using env vars
TMDB_BASE_URL = "https://api.themoviedb.org/3"


# Create your views here.

def home(request):
    return HttpResponse("Welcome to the Movies App!")

def redis_test_view(request):
    # Try to get value from cache
    value = cache.get("test_key")

    if not value:
        # If not in cache, set it
        value = "Hello from Redis via Django view!"
        cache.set("test_key", value, timeout=60)  # store for 1 minute

    return JsonResponse({"redis_value": value})


# @swagger_auto_schema(
#     method='get',
#     manual_parameters=[
#         openapi.Parameter(
#             'q',
#             openapi.IN_QUERY,
#             description="Search query for movies (e.g., 'inception')",
#             type=openapi.TYPE_STRING,
#             required=True
#         )
#     ],
#     responses={200: "Movies found", 400: "Missing query"}
# )

search_param = openapi.Parameter(
    'q',
    in_=openapi.IN_QUERY,
    description="Search query for movie title",
    type=openapi.TYPE_STRING,
    required=True,
)

@swagger_auto_schema(
    method='get',
    manual_parameters=[search_param],
    responses={200: "List of matching movies"}
)


@api_view(['GET'])
def search_movies(request):
    """
    Search for movies by query string
    Example: /api/movies/search/?q=batman
    """
    # api_key = getattr(settings, 'TMDB_API_KEY', None)
    api_key = request.query_params.get("api_key") or getattr(settings, 'TMDB_API_KEY', None)
    # query = request.GET.get("q")
    query = request.query_params.get("q")   # ✅ DRF best practice
    if not api_key or not query:
        return Response(
            {"error": "Missing TMDB_API_KEY or search query 'q'"},
            status=status.HTTP_400_BAD_REQUEST
        )

    url = f"https://api.themoviedb.org/3/search/movie?api_key={api_key}&query={query}"
    response = requests.get(url)

    return Response(response.json())
    # try:
    #     tmdb_response = requests.get(url)
    #     data = tmdb_response.json()

    #     # Check if TMDB returned an error
    #     if tmdb_response.status_code != 200:
    #         return Response(data, status=tmdb_response.status_code)

    #     return Response(data, status=status.HTTP_200_OK)

    # except requests.RequestException as e:
    #     return Response(
    #         {"error": str(e)},
    #         status=status.HTTP_502_BAD_GATEWAY
    #     )



@api_view(['GET'])
def trending_movies(request):
    """
    Fetch trending movies from The Movie Database API
    """
    # api_key = request.GET.get("api_key") or getattr(settings, 'TMDB_API_KEY', None)
    
    # Use query param if provided, otherwise fallback to settings
    # api_key = request.query_params.get("api_key") or getattr(settings, 'TMDB_API_KEY', None)
    api_key = getattr(settings, 'TMDB_API_KEY', None)

    if not api_key:
        return Response(
            {"error": "TMDB_API_KEY is not set in settings.py"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    
    cache_key = "trending_movies"
    data = cache.get(cache_key)

    if not data:
        url = f"https://api.themoviedb.org/3/trending/movie/week?api_key={api_key}"
        try:
            tmdb_response = requests.get(url, timeout=10)

            if tmdb_response.status_code != 200:
                # Try to decode error JSON, fallback to plain text
                try:
                    error_data = tmdb_response.json()
                except ValueError:
                    error_data = {"error": tmdb_response.text}
                return Response(error_data, status=tmdb_response.status_code)

            data = tmdb_response.json()
            cache.set(cache_key, data, timeout=60*5)  # ✅ store for 5 minutes

        except requests.RequestException as e:
            return Response(
                {"error": f"TMDB request failed: {str(e)}"},
                status=status.HTTP_502_BAD_GATEWAY
            )
        except Exception as e:
            return Response(
                {"error": f"Unexpected error: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    return Response(data, status=status.HTTP_200_OK)
    

    
@api_view(['GET'])
def movie_details(request, movie_id):
    """
    Fetch details of a specific movie by TMDB ID
    Example: /api/movies/details/603/ (The Matrix)
    """
    api_key = getattr(settings, 'TMDB_API_KEY', None)
    if not api_key:
        return Response(
            {"error": "TMDB_API_KEY is not set in settings.py"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={api_key}"
    try:
        tmdb_response = requests.get(url)
        data = tmdb_response.json()

        # Check if TMDB returned an error
        if tmdb_response.status_code != 200:
            return Response(data, status=tmdb_response.status_code)

        return Response(data, status=status.HTTP_200_OK)

    except requests.RequestException as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_502_BAD_GATEWAY
        )
    
@api_view(['GET'])
def upcoming_movies(request):
    """
    Fetch upcoming movies from The Movie Database API
    Example: /api/movies/upcoming/
    """
    api_key = getattr(settings, 'TMDB_API_KEY', None)
    if not api_key:
        return Response(
            {"error": "TMDB_API_KEY is not set in settings.py"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

    url = f"https://api.themoviedb.org/3/movie/upcoming?api_key={api_key}"
    try:
        tmdb_response = requests.get(url)
        data = tmdb_response.json()

        # Check if TMDB returned an error
        if tmdb_response.status_code != 200:
            return Response(data, status=tmdb_response.status_code)

        return Response(data, status=status.HTTP_200_OK)

    except requests.RequestException as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_502_BAD_GATEWAY
        )

# Get recommended movies with Redis cache 
@api_view(['GET'])
def recommended_movies(request, movie_id):
    """
    Fetch movie recommendations from TMDB based on a given movie_id.
    """
    url = f"{TMDB_BASE_URL}/movie/{movie_id}/recommendations"
    params = {"api_key": settings.TMDB_API_KEY}

    try:
        response = requests.get(url, params=params)
        if response.status_code != 200:
            return Response(
                {"error": "Failed to fetch recommendations from TMDB"},
                status=status.HTTP_502_BAD_GATEWAY,
            )

        data = response.json()

        # Extract only useful fields (optional, keeps response clean)
        recommendations = [
            {
                "id": movie["id"],
                "title": movie.get("title"),
                "overview": movie.get("overview"),
                "poster_path": movie.get("poster_path"),
                "release_date": movie.get("release_date"),
                "vote_average": movie.get("vote_average"),
            }
            for movie in data.get("results", [])
        ]

        return Response({"recommendations": recommendations}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response(
            {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )