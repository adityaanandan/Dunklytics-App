from nba_api import *
from nba_api.stats.endpoints import commonplayerinfo
from nba_api.stats.endpoints import playercareerstats, playergamelog
import json
import pandas as pd

def get_player_details(id): 
    player_stats = playercareerstats.PlayerCareerStats(player_id=id)
    player_stats = player_stats.get_dict()
    pts_dict = {}
    print(player_stats)
    for val in player_stats['resultSets'][0]['rowSet']:
        pts_dict[val[1]] = round(val[-1] / val[6], 2)
    print(pts_dict)
get_player_details(2544) # 27.0
    



