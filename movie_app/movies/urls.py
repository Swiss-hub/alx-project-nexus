from django.urls import path
from . import views
from .views import trending_movies
from .views import redis_test_view

urlpatterns = [
    path("", views.home, name="home"),
    path("trending/", views.trending_movies, name="trending-movies"),
    path("search/", views.search_movies, name="search-movies"),
    path("details/<int:movie_id>/", views.movie_details, name="movie-details"),
    path("upcoming/", views.upcoming_movies, name="upcoming-movies"),
    path("redis-test/", redis_test_view, name="redis_test"),
    path("recommendations/<int:movie_id>/", views.recommended_movies, name="recommended-movies"),
]
