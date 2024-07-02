from nba_api import *
from nba_api.stats.endpoints import commonplayerinfo
from nba_api.stats.endpoints import playercareerstats, playergamelog
import json
import pandas as pd
import os
current_file = os.path.abspath(os.path.dirname(__file__))
data_path = os.path.join(current_file, 'advanced_data.csv')
data = pd.read_csv(data_path)
name = "LeBron James"
    # Filter data for the given player name
player_data = data[data['Player'] == name]

    # Check if the player appears twice
if len(player_data) > 1:
        # Return the value where team is TOT
    player_data = player_data[player_data['Tm'] == 'TOT']

    # Get the OBPM, WS, PER, and VORP of the player
obpm = player_data['OBPM'].values[0]
ws = player_data['WS'].values[0]
per = player_data['PER'].values[0]
vorp = player_data['VORP'].values[0]

print("OBPM:", obpm)
print("WS:", ws)
print("PER:", per)
print("VORP:", vorp)


