import os
import subprocess
import sys
from random import randint
import random
import validators

def gen_vapor(query):
	
	cmd = "youtube-dl --get-title --skip-download --default-search ytsearch "  + query
	os.system(cmd)

	cmd = "youtube-dl --extract-audio --audio-format wav --audio-quality 0 --default-search ytsearch --output " + query + ".%(ext)s " + query
	os.system(cmd)
	
	cmd = "sox " + query + ".wav " + query + "slow.wav " + " speed " + str(random.uniform(0.6, 0.8))
	os.system(cmd)

	cmd = "sox " + query + "slow.wav " + query + "reverb.wav " + " reverb " + str(random.uniform(40, 80))
	os.system(cmd)		
				
	cmd = "python " + "infinite_jukebox.py " + query + "reverb.wav"
	os.system(cmd)			
		
       # cmd = "del " + query + ".wav"
       # os.system(cmd)	
		
       # cmd = "del " + query + "slow.wav"
       # os.system(cmd)									
	   
def gen_vapor2(query):
       
	cmd = "youtube-dl --get-title --skip-download --default-search ytsearch "  + query
	os.system(cmd)

	cmd = "youtube-dl --extract-audio --audio-format wav --audio-quality 0 --default-search ytsearch --output " + "vaporwave" + ".%(ext)s " + query
	os.system(cmd)
	
	cmd = "sox " + "vaporwave" + ".wav " + "vaporwave" + "slow.wav " + " speed " + str(random.uniform(0.6, 0.8))
	os.system(cmd)

	cmd = "sox " + "vaporwave" + "slow.wav " + "vaporwave" + "reverb.wav " + " reverb " + str(random.uniform(40, 80))
	os.system(cmd)		
		
	cmd = "python " + "infinite_jukebox.py " + "vaporwave" + "reverb.wav " + "-save sound/"+"vaporwave"+" -duration 120"
	os.system(cmd)		
		
## Makes this a command line tool: disable when we get the webserver going
sys.argv(0)
name = ""
for s in sys.argv:
	name = name + s

if validators.url(name):
	gen_vapor2(name)
	
if not validators.url(name):
	gen_vapor(name)