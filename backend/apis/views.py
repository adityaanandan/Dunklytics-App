from django.shortcuts import render
from .views import *
from .models import *
from nba_api import *
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.

api_view(['GET'])
def get_player_details(request, id): 
      pass

api_view(['GET'])
def get_player_ppg(request, id): 
      pass 
api_view(['GET'])
def get_player_apg(request, id):
      pass 
api_view(['GET'])
def get_player_rbg(request, id):
      pass 
api_view(['GET'])
def get_player_stocks(request, id): 
      pass
api_view(['GET'])
def generate_player_shot_chart(request, id): 
      pass
api_view(['GET'])
def generate_player_progression(request, id): 
      pass 


    



    
