from django.shortcuts import render
from nba_api import *
from nba_api.stats.endpoints import commonplayerinfo
from rest_framework.decorators import api_view
from rest_framework.response import Response
from nba_api.stats.endpoints import playercareerstats, playergamelog
from .nba_files import player as player
import pandas as pd

import json




# Create your views here.



@api_view(['GET', 'POST'])
def get_player_details(request):

    
    name = "LeBron James"
    name_to_id = "2544"
    if request.method == 'POST': 
        body_unicode = request.body.decode('utf-8')
        print(body_unicode)
        body = json.loads(body_unicode)
        name = body['name']
        name_to_id = player.NbaScraper.get_player_id(name)
    
    
    career_stats = playercareerstats.PlayerCareerStats(player_id=name_to_id)
    career_info = commonplayerinfo.CommonPlayerInfo(player_id=name_to_id)
    career_info = career_info.get_dict()
    # Convert career_stats to a JSON object
    career_stats = career_stats.get_dict()

    
    name = career_info['resultSets'][0]['rowSet'][0][3]
    team = career_info['resultSets'][0]['rowSet'][0][22] + " " +  career_info['resultSets'][0]['rowSet'][0][19]
    pos = career_info['resultSets'][0]['rowSet'][0][15]

    fg = career_stats['resultSets'][0]['rowSet'][-1][11]
    three = career_stats['resultSets'][0]['rowSet'][-1][14]
    ft = career_stats['resultSets'][0]['rowSet'][-1][17]
    pts, asts, rebs, stocks = player.NbaScraper.get_player_base_stats(name_to_id)



    # pts = json.dumps(pts, indent=4)
    # asts = json.dumps(asts, indent=4)
    # rebs = json.dumps(rebs, indent=4)
    # Get the latest FG% from the career_stats_json
    
    
    return Response({'name': name, 'pos':pos, 'team': team, 'fg': fg, 'three': three, 'ft': ft, 'pts': pts, 'asts': asts, 'rebs': rebs, 'stocks': stocks})

api_view(['GET', 'POST'])
def shot_charts(request): 
    # get player name 
    # get player id from name 
    # check if shot chart is already in vm bucket 
    # if is, simply return the url 
    # else, generate the shot chart
    # send to vm bucket 
    # return url of the shot chart to the frontend 
    pass 


def grader(request): 
    pass 



    
def create_shotchart(request): 
    pass





    
