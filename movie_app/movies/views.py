from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .tmdb_service import get_trending_movies
from django.conf import settings
from rest_framework import status
import os
import requests
from django.http import HttpResponse

# Create your views here.

def home(request):
    return HttpResponse("Welcome to the Movies App!")

@api_view(['GET'])
def trending_movies(request):
    """
    Fetch trending movies from The Movie Database API
    """
    api_key = request.GET.get("api_key") or getattr(settings, 'TMDB_API_KEY', None)
    if not api_key:
        return Response(
            {"error": "TMDB_API_KEY is not set in settings.py"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

    url = f"https://api.themoviedb.org/3/trending/movie/week?api_key={api_key}"
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
    pass
    
@api_view(['GET'])
def search_movies(request):
    """
    Search for movies by query string
    Example: /api/movies/search/?q=batman
    """
    api_key = getattr(settings, 'TMDB_API_KEY', None)
    query = request.GET.get("q")
    if not api_key or not query:
        return Response(
            {"error": "Missing TMDB_API_KEY or search query 'q'"},
            status=status.HTTP_400_BAD_REQUEST
        )

    url = f"https://api.themoviedb.org/3/search/movie?api_key={api_key}&query={query}"
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