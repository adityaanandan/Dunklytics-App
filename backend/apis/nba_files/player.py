import pandas as pd

from difflib import SequenceMatcher


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
        

def main(): 
    player = "LeBron James"
    player_id = NbaScraper.get_player_id(player)
    print(player_id)

if __name__ == "__main__":
    main()
    