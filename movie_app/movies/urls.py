from django.urls import path
from . import views
from .views import trending_movies

urlpatterns = [
    path("", views.home, name="home"),
    path('trending/', views.trending_movies, name='trending-movies'),
    path("search/", views.search_movies, name="search-movies"),
    path("details/<int:movie_id>/", views.movie_details, name="movie-details"),
    path("upcoming/", views.upcoming_movies, name="upcoming-movies"),
    path('trending/', views.trending_movies, name='trending-movies'),
]
