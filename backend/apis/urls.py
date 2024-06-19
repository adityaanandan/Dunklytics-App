from django.urls import path

from . import views 

urlpatterns = [
    path('player', views.get_player_details)
]