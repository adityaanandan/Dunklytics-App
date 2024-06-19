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

    fg = career_stats['resultSets'][0]['rowSet'][-1][11]
    three = career_stats['resultSets'][0]['rowSet'][-1][14]
    ft = career_stats['resultSets'][0]['rowSet'][-1][17]
    # Get the latest FG% from the career_stats_json
    return Response({'name': name, 'team': team, 'fg': fg, 'three': three, 'ft': ft})


def get_stats(request):
    all_seasons_logs_df = pd.DataFrame()

    # List of seasons to loop through (update this list as needed)
    seasons = ['2019-20', '2020-21', '2021-22', '2022-23', '2023-24']

    # Fetch game logs for each season and add a 'SEASON' column
    for season in seasons:
        player_logs = playergamelog.PlayerGameLog(player_id='202681', season=season)
        season_logs_df = player_logs.get_data_frames()[0]
        season_logs_df['SEASON'] = season  
        all_seasons_logs_df = pd.concat([all_seasons_logs_df, season_logs_df], ignore_index=True)
    
    all_seasons_logs_df['GAME_DATE'] = pd.to_datetime(all_seasons_logs_df['GAME_DATE'])
    # Create Month_Year to faciliate Month/Date Analysis
    all_seasons_logs_df['MONTH_YEAR'] = all_seasons_logs_df['GAME_DATE'].dt.to_period('M')

    yearly_stats = all_seasons_logs_df.groupby('YEAR').agg({
    'FGM': 'sum', 
    'FGA': 'sum', 
    'FG3M': 'sum', 
    'FG3A': 'sum', 
    'FTM': 'sum', 
    'FTA': 'sum', 
}).reset_index()

    # This takes the field goals made and attempted to calculate field goal percent
    yearly_stats['FG_PCT'] = yearly_stats['FGM'] / yearly_stats['FGA']
    yearly_stats['FG3_PCT'] = yearly_stats['FG3M'] / yearly_stats['FG3A']
    yearly_stats['FT_PCT'] = yearly_stats['FTM'] / yearly_stats['FTA']

    yearly_stats['GAMES'] = yearly_stats.groupby('YEAR')['Game_ID'].count().values


    
def create_shotchart(request): 
    pass





    
