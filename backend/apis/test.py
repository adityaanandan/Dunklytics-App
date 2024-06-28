import os
import io
import PIL.Image as Image
from nba_files import player as player
from array import array

buf = io.BytesIO()
charty = player.NbaScraper.get_shot_chart('Stephen Curry', 'GSW')
charty.savefig(buf, format='png')
buf.seek(0)
im = Image.open(buf)
im.show()
