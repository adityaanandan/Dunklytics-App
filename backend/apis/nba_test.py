from nba_api import *
from nba_api.stats.endpoints import commonplayerinfo
from nba_api.stats.endpoints import playercareerstats, playergamelog
import json
import pandas as pd

def get_player_details(id): 
    career_info = commonplayerinfo.CommonPlayerInfo(player_id=id)

    career_info = career_info.get_dict()
    print(career_info)




get_player_details(2544) # 27.0
    



