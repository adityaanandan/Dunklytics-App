from nba_api import *
from nba_api.stats.endpoints import commonplayerinfo
from nba_api.stats.endpoints import playercareerstats, playergamelog
import json
import pandas as pd
import os
from .nba_files import player as player

player.NbaScraper.get_player_progression("LeBron James")


