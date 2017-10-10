#ydl2.py
from __future__ import unicode_literals
import youtube_dl

def my_hook(d):
    if d['status'] == 'finished':
        print('Done downloading, now converting ...')

ydl_opts = {
    'format': 'wav',       
    'outtmpl': '%(id)s',        
    'noplaylist' : True,        
    'progress_hooks': [my_hook],  
}

with youtube_dl.YoutubeDL(ydl_opts) as ydl:
    ydl.download(['https://www.youtube.com/watch?v=pwp1CH5R-w4'])