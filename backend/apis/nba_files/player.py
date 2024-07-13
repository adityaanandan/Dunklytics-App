import pandas as pd

from difflib import SequenceMatcher


import matplotlib.pyplot as plt
import matplotlib as mpl
import io
import urllib, base64
import os


my_proxy = os.getenv("PROXY_URL")

class ShotCharts:
        def __init__(self) -> None:
                pass
        
        def create_court(ax: mpl.axes, color="white") -> mpl.axes:
                

                # Short corner 3PT lines
                ax.plot([-220, -220], [0, 140], linewidth=2, color=color)
                ax.plot([220, 220], [0, 140], linewidth=2, color=color)
                
                # 3PT Arc
                ax.add_artist(mpl.patches.Arc((0, 140), 440, 315, theta1=0, theta2=180, facecolor='none', edgecolor=color, lw=2))
                
                # Lane and Key
                ax.plot([-80, -80], [0, 190], linewidth=2, color=color)
                ax.plot([80, 80], [0, 190], linewidth=2, color=color)
                ax.plot([-60, -60], [0, 190], linewidth=2, color=color)
                ax.plot([60, 60], [0, 190], linewidth=2, color=color)
                ax.plot([-80, 80], [190, 190], linewidth=2, color=color)
                ax.add_artist(mpl.patches.Circle((0, 190), 60, facecolor='none', edgecolor=color, lw=2))
                
                # Rim
                ax.add_artist(mpl.patches.Circle((0, 60), 15, facecolor='none', edgecolor=color, lw=2))
                
                # Backboard
                ax.plot([-30, 30], [40, 40], linewidth=2, color=color)
                
                # Remove ticks
                ax.set_xticks([])
                ax.set_yticks([])
                
                # Set axis limits
                ax.set_xlim(-250, 250)
                ax.set_ylim(0, 470)
                
                
                return ax
        
        @staticmethod
        def volume_chart(df: pd.DataFrame, name: str, season=None, 
                        RA=True,
                        extent=(-250, 250, 422.5, -47.5),
                        gridsize=25, cmap="plasma"):
                fig = plt.figure(figsize=(3.6, 3.6), facecolor='black', edgecolor='black', dpi=100)
                ax = fig.add_axes([0, 0, 1, 1], facecolor='black')

                # Plot hexbin of shots
                if RA == True:
                        x = df.LOC_X
                        y = df.LOC_Y + 60
                        # Annotate player name and season
                        plt.text(-250, 440, f"{name}", fontsize=21, color='white',
                                fontname='Franklin Gothic Medium')
                        plt.text(-250, 410, "Shot Volume", fontsize=12, color='white',
                                fontname='Franklin Gothic Book')
                        season = f"{season[0][:4]}-{season[-1][-2:]}"
                        plt.text(-250, -20, season, fontsize=8, color='white')

                else:
                        cond = ~((-45 < df.LOC_X) & (df.LOC_X < 45) & (-40 < df.LOC_Y) & (df.LOC_Y < 45))
                        x = df.LOC_X[cond]
                        y = df.LOC_Y[cond] + 60
                        # Annotate player name and season
                        plt.text(-250, 440, f"{name}", fontsize=21, color='white',
                                fontname='Franklin Gothic Medium')
                        plt.text(-250, 410, "Shot Volume", fontsize=12, color='white',
                                fontname='Franklin Gothic Book')
                        plt.text(-250, 385, "(w/o restricted area)", fontsize=10, color='red')
                        season = f"{season[0][:4]}-{season[-1][-2:]}"
                        plt.text(-250, -20, season, fontsize=8, color='white')

                        
                hexbin = ax.hexbin(x, y, cmap=cmap,
                                        bins="log", gridsize=25, mincnt=2, extent=(-250, 250, 0, 470))

                # Draw court
                ax = ShotCharts.create_court(ax, 'white')

              
                return fig
        
        @staticmethod
        def makes_misses_chart(df: pd.DataFrame, name: str, season=None):
                # Create figure and axes
                fig = plt.figure(figsize=(3.6, 3.6), facecolor='black', edgecolor='black', dpi=100)
                ax = fig.add_axes([0, 0, 1, 1], facecolor='black')

                plt.text(-250, 450, f"{name}", fontsize=21, color='white',
                        fontname='Franklin Gothic Medium')
                plt.text(-250, 425, "Misses", fontsize=12, color='red',
                        fontname='Franklin Gothic Book')
                plt.text(-170, 425, "&", fontsize=12, color='white',
                        fontname='Franklin Gothic Book')
                plt.text(-150, 425, "Buckets", fontsize=12, color='green',
                        fontname='Franklin Gothic Book')
                season = f"{season[0][:4]}-{season[-1][-2:]}"
                plt.text(-250, -20, season, fontsize=8, color='white')


                ax = ShotCharts.create_court(ax, 'white')
                sc = ax.scatter(df.LOC_X, df.LOC_Y + 60, c=df.SHOT_MADE_FLAG, cmap='RdYlGn', s=12)
                
                

                return fig


class NbaScraper:
    """ Class to scrape data from the NBA official website.
    """
    @staticmethod
    def get_json_from_name(name: str, is_player=True) -> int:
        """ Get the json of a player or team from his name
        """
        from nba_api.stats.static import players, teams
        if is_player:
            nba_players = players.get_players()
            return [player for player in nba_players 
                    if player['full_name'] == name][0]
        else:
            nba_teams = teams.get_teams()
            return [team for team in nba_teams 
                    if team['full_name'] == name][0]
    
    @staticmethod
    def get_player_career(player_id: int) -> list:
        """ Get the career of a player from his id
        """
        from nba_api.stats.endpoints import playercareerstats
        career = playercareerstats.PlayerCareerStats(player_id=player_id, proxy=my_proxy)
        return career.get_data_frames()[0]
    
    
    
    @staticmethod
    def get_shot_data(id: int, team_ids: list, seasons: list) -> list:
        """ Get the shot data of a player from his id and seasons
        """
        from nba_api.stats.endpoints import shotchartdetail
        df = pd.DataFrame()
        for season in seasons:
            for team in team_ids:
                shot_data = shotchartdetail.ShotChartDetail(
                    team_id=team,
                    player_id=id,
                    context_measure_simple='FGA',
                    season_nullable=season
                )
                df = pd.concat([df, shot_data.get_data_frames()[0]])
        
        return df
    
    @staticmethod
    def get_all_ids(only_active=True) -> list:
        """ Get all the ids of the players
        """
        from nba_api.stats.static import players
        nba_players = players.get_players()
        if only_active:
            return [player['id'] for player in nba_players 
                    if player['is_active']]
        return [player['id'] for player in nba_players]
    
    @staticmethod
    def get_player_headshot(id: int) -> str:
            """ Get the headshot of a player from his id
            """
            from nba_api.stats.static import players
            import requests
            import shutil
            
            url = f'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/{id}.png'
            output_path = f'../data/nba/transient/headshots/{id}.png'
            r = requests.get(url, stream=True)
            if r.status_code == 200:
                with open(output_path, 'wb') as f:
                    r.raw.decode_content = True
                    shutil.copyfileobj(r.raw, f)
    
    @staticmethod                                    
    def get_all_nba_headshots(only_active=False) -> None:
        """ Get the headshots of all the players
        """
        ids = NbaScraper.get_all_ids(only_active=only_active)
        for id in ids:
            NbaScraper.get_player_headshot(id)

    @staticmethod
    def autocorrect(name): 
      from nba_api.stats.static import players
      nba_players = players.get_players()
      for player in nba_players: 
           
            if (SequenceMatcher(None, player['full_name'], name).ratio() > 0.85):
                  return player['full_name']
    
    @staticmethod 
    def get_player_id(name):
      from nba_api.stats.static import players
      real_name = NbaScraper.autocorrect(name)
      id = NbaScraper.get_json_from_name(real_name)['id']
      return real_name, id 
    
    def predict_player_progression(name):
         pass    
    @staticmethod
    def get_player_base_stats(id): 
        from nba_api.stats.endpoints import playercareerstats
        player_stats = playercareerstats.PlayerCareerStats(player_id=id, proxy=my_proxy)
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


        return pts_dict, ast_dict, reb_dict, stock_dict
    

        

    @staticmethod
    def get_shot_charts(name, team):
        real_name = NbaScraper.autocorrect(name)
        id = NbaScraper.get_json_from_name(real_name)['id']
        career = NbaScraper.get_player_career(id)
        teams = [team]
        team_ids = list(set(career[career.TEAM_ABBREVIATION.isin(teams)].TEAM_ID.values))
        seasons = ["2023-24"]
        shot_data = NbaScraper.get_shot_data(id, team_ids, seasons)
        shot_data.tail()

        chart = ShotCharts.volume_chart(shot_data, real_name, seasons)
        
        
        return chart
    
    @staticmethod
    def get_makes_misses(name, team):
        real_name = NbaScraper.autocorrect(name)
        id = NbaScraper.get_json_from_name(real_name)['id']
        career = NbaScraper.get_player_career(id)
        teams = [team]
        team_ids = list(set(career[career.TEAM_ABBREVIATION.isin(teams)].TEAM_ID.values))
        seasons = ["2023-24"]
        shot_data = NbaScraper.get_shot_data(id, team_ids, seasons)
        shot_data.tail()

        chart = ShotCharts.makes_misses_chart(shot_data, real_name, seasons)
        
        
        return chart
    
    @staticmethod
    def get_player_progression(name):
        import json
        f = open('data/ranks_2021.json', encoding="utf8") 
        data_2021 = json.load(f)
        f2 = open('data/ranks_2022.json', encoding="utf8")
        data_2022 = json.load(f2)
        f3 = open('data/ranks_2023.json', encoding="utf8")
        data_2023 = json.load(f3)

        if name not in data_2023:
                dicty = {"2021-22": 0, "2022-23": 0, "2023-24": 0, "2024-25": 0, "2025-26": 0, "2026-27": 0} 
                return dicty       



        f_raw = open('data/raw_stats2023.json', encoding="utf8")
        data_raw = json.load(f_raw)
        age_tax = 0
        decrease_tax = 0
        increase_tax = 0

        grade = 0.0
        grade2 = 0.0
        grade3 = 0.0

        if name in data_2021:
                sample_line = data_2021[name]
                grade = sample_line['grade']

        if name in data_2022: 
                sample_line2 = data_2022[name]
                grade2 = sample_line2['grade']

        if name in data_2023: 
                sample_line3 = data_2023[name]
                grade3 = sample_line3['grade']

        # predict player progression

        raw_player_data = data_raw[name]
        age = int(raw_player_data['Age'])

        if age >= 34 : 
                age_tax = 2.0
        if (grade - grade3 > 3): 
                decrease_tax = 3.0
        if (grade3 - grade > 5): 
                increase_tax = 0.0
        if (grade3 - grade) <1 and (grade3 - grade) > 0:
                increase_tax =1.0 
        
        if (grade3 - grade > 3.0): 
                increase_tax = 2.0

        grade4 = grade3 - age_tax + increase_tax - decrease_tax
        grade5 = grade4 - age_tax + increase_tax - decrease_tax
        grade6 = grade5 - age_tax + increase_tax - decrease_tax
        dicty = {"2021-22": grade, "2022-23": grade2, "2023-24": grade3, "2024-25": grade4, "2025-26": grade5, "2026-27": grade6}
        return dicty
    


if __name__ == "main": 
        print(NbaScraper.get_player_progression("LeBron James"))
        #print(NbaScraper.get_shot_charts("LeBron James", "LAL"))
        #print(NbaScraper.get_makes_misses("LeBron James", "LAL"))
        #print(NbaScraper.get_player_id("LeBron James"))
        #print(NbaScraper.get_player_base_stats(2544))
        #print(NbaScraper.get_all_n
        
        
        
        


       