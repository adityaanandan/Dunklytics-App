from django.shortcuts import render
from nba_api import *
from nba_api.stats.endpoints import commonplayerinfo
from rest_framework.decorators import api_view
from rest_framework.response import Response
from nba_api.stats.endpoints import playercareerstats, playergamelog
from .nba_files import player as player
import pandas as pd

import matplotlib.pyplot as plt
import matplotlib as mpl
import io
import urllib, base64
import os

from google.cloud import storage

import json

@api_view(['GET', 'POST'])
def get_player_details(request):    
    name = "LeBron James"
    name_to_id = "2544"
    if request.method == 'POST': 
        body_unicode = request.body.decode('utf-8', errors='ignore')
        body = json.loads(body_unicode)
        name = body['name']
        name, name_to_id = player.NbaScraper.get_player_id(name)

    current_file = os.path.abspath(os.path.dirname(__file__))
    data_path = os.path.join(current_file, 'advanced_data.csv')
    data = pd.read_csv(data_path)
        # Filter data for the given player name
    player_data = data[data['Player'] == name]

        # Check if the player appears twice
    if len(player_data) > 1:
            # Return the value where team is TOT
        player_data = player_data[player_data['Tm'] == 'TOT']

        # Get the OBPM, WS, PER, and VORP of the player
    try: 
        obpm = player_data['OBPM'].values[0]
        ws = player_data['WS'].values[0]
        per = player_data['PER'].values[0]
        vorp = player_data['VORP'].values[0]
    except IndexError as e: 
        obpm = 0
        ws = 0
        per = 0
        vorp = 0

    advanced_average = (obpm + ws + per + vorp) / 4

    grade = "Role Player"

    if advanced_average < 3.2: 
        grade = "Role Player"
    elif advanced_average >= 3.2 and advanced_average < 4.5: 
        grade = "Starter"
    elif advanced_average >= 4.5 and advanced_average < 6.5: 
        grade = "All-Star"
    else: 
        grade = "Superstar"

    # Load advanced_data.csv
    


    # Continue with the rest of the code
    
    
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

    team_dict = {"Golden State Warriors": "GSW", "Los Angeles Lakers" : "LAL", "LA Clippers" : "LAC", "Phoenix Suns" : "PHX", "Sacramento Kings" : "SAC", "Chicago Bulls" : "CHI", "Cleveland Cavaliers" : "CLE", "Detroit Pistons" : "DET", "Indiana Pacers" : "IND", "Milwaukee Bucks" : "MIL", "Dallas Mavericks" : "DAL", "Houston Rockets" : "HOU", "Memphis Grizzlies" : "MEM", "New Orleans Pelicans" : "NOP", "San Antonio Spurs" : "SAS", "Atlanta Hawks" : "ATL", "Charlotte Hornets" : "CHA", "Miami Heat" : "MIA", "Orlando Magic" : "ORL", "Washington Wizards" : "WAS", "Denver Nuggets" : "DEN", "Minnesota Timberwolves" : "MIN", "Oklahoma City Thunder" : "OKC", "Portland Trail Blazers" : "POR", "Utah Jazz" : "UTA", "Boston Celtics" : "BOS", "Brooklyn Nets" : "BKN", "New York Knicks" : "NYK", "Philadelphia 76ers" : "PHI", "Toronto Raptors" : "TOR", "Houston Rockets" : "HOU"}
    team_id = team_dict[team]
    



    # pts = json.dumps(pts, indent=4)
    # asts = json.dumps(asts, indent=4)
    # rebs = json.dumps(rebs, indent=4)
    # Get the latest FG% from the career_stats_json
    
   

        # init GCS client and upload buffer contents
    client = storage.Client()
    bucket = client.get_bucket('dunklytics-shotcharts')

    blob = bucket.blob(f'{name_to_id}.png')  # This defines the path where the file will be stored in the bucket
    if blob.exists():
        print(f'File {id}.png already exists in the bucket. Skipping upload.')
    else:
            # File does not exist, proceed with upload
        buf = io.BytesIO()
        charty = player.NbaScraper.get_shot_charts(name, team_id)
        charty.savefig(buf, format='png')
        buf.seek(0)
        image_as_a_string = base64.b64encode(buf.read())
        your_file_contents = blob.upload_from_string(image_as_a_string, content_type='image/png')
        print(f'File {id}.png uploaded successfully.')

    
    blob_mm = bucket.blob(f'{name_to_id}_mm.png')  # This defines the path where the file will be stored in the bucket
    if blob_mm.exists():
        print(f'File {id}_mm.png already exists in the bucket. Skipping upload.')
    else: 

        buf = io.BytesIO()
        charty = player.NbaScraper.get_makes_misses(name, team_id)
        charty.savefig(buf, format='png')
        buf.seek(0)
        image_as_a_string = base64.b64encode(buf.read())
        your_file_contents = blob_mm.upload_from_string(image_as_a_string, content_type='image/png')
        print(f'File {id}.png uploaded successfully.')
    
    
    return Response({'name': name, 'grade': grade, 'id': name_to_id, 'pos':pos, 'team': team, 'fg': fg, 'three': three, 'ft': ft, 'pts': pts, 'asts': asts, 'rebs': rebs, 'stocks': stocks, 'vorp': vorp, 'ws': ws, 'obpm': obpm, 'per': per})










    
