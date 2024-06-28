import pandas as pd

from difflib import SequenceMatcher


import matplotlib.pyplot as plt
import matplotlib as mpl
import io
import urllib, base64
import os


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
        career = playercareerstats.PlayerCareerStats(player_id=player_id)
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
      return id 
    
    @staticmethod
    def get_player_base_stats(id): 
        from nba_api.stats.endpoints import playercareerstats
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


        return pts_dict, ast_dict, reb_dict, stock_dict
    

        

    @staticmethod
    def get_shot_chart(name, team):
        real_name = NbaScraper.autocorrect(name)
        id = NbaScraper.get_json_from_name(real_name)['id']
        career = NbaScraper.get_player_career(id)
        teams = [team]
        team_ids = list(set(career[career.TEAM_ABBREVIATION.isin(teams)].TEAM_ID.values))
        seasons = ["2022-23"]
        shot_data = NbaScraper.get_shot_data(id, team_ids, seasons)
        shot_data.tail()

        chart1 = ShotCharts.volume_chart(shot_data, real_name, seasons)
        return chart1 
    
    


       