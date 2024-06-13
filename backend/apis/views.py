from django.shortcuts import render
from .views import *
from .models import *
from .serializer import PlayerSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.

api_view(['GET'])
def get_player(request): 
    pass

api_view(['POST'])
def add_player(request): 
    pass

api_view(['GET'])
def get_all_props(request): 
    pass

api_view(['GET'])
def get_prop(request, id): 
    pass

api_view(['DELETE'])
def clear_props(request): 
    pass
api_view(['POST'])
def init_props(request): 
    pass



    
