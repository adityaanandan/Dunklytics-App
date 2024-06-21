from nba_api import *
from nba_api.stats.endpoints import commonplayerinfo
from nba_api.stats.endpoints import playercareerstats, playergamelog
import json
import pandas as pd

def get_player_details(id): 
    player_stats = playercareerstats.PlayerCareerStats(player_id=id)
    player_stats = player_stats.get_dict()
    pts_dict = {}
    ast_dict = {}
    reb_dict = {}
    stock_dict = {}
    for val in player_stats['resultSets'][0]['rowSet']:
        pts_dict[val[1]] = round(val[-1] / val[6], 2)
        ast_dict[val[1]] = round(val[-6] / val[6], 2)
        reb_dict[val[1]] = round(val[-7] / val[6], 2)
        stock_dict[val[1]] = round((val[-4] + val[-5]) / val[6], 2)

    print(pts_dict)
    print(ast_dict)
    print(reb_dict) 

    return pts_dict, ast_dict, reb_dict, stock_dict
get_player_details(2544) # 27.0
    



