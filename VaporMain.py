import os
import subprocess
import sys
from random import randint
import random
import validators

def gen_vapor(query):
	
	cmd = "youtube-dl --get-title --skip-download --default-search ytsearch "  + query
	os.system(cmd)

	cmd = "youtube-dl --extract-audio --audio-format wav --audio-quality 0 --default-search ytsearch --output " + "sound/" + query + ".%(ext)s " + query
	os.system(cmd)
	
	cmd = "sox " + "sound/"  + query + ".wav " + "sound/" + query + "slow.wav " + " speed " + str(random.uniform(0.6, 0.8))
	os.system(cmd)

	cmd = "sox " + "sound/" + query + "slow.wav " + "sound/" + query + "reverb.wav " + " reverb " + str(random.uniform(40, 80))
	os.system(cmd)		
				
	#cmd = "python " + "infinite_jukebox.py " + query + "reverb.wav"
	#os.system(cmd)			
		
    #cmd = "del " + query + ".wav"
    #os.system(cmd)	
		
    #cmd = "del " + query + "slow.wav"
    #os.system(cmd)									
	   
def gen_vapor2(query):
       
	cmd = "youtube-dl --get-title --skip-download --default-search ytsearch "  + query
	os.system(cmd)

	cmd = "youtube-dl --extract-audio --audio-format wav --audio-quality 0 --default-search ytsearch --output " + "sound/" + "vaporwave" + ".%(ext)s " + query
	os.system(cmd)
	
	cmd = "sox " + "sound/" + "vaporwave" + ".wav " + "sound/" + "vaporwave" + "slow.wav " + " speed " + str(random.uniform(0.6, 0.8))
	os.system(cmd)

	cmd = "sox " + "sound/" + "vaporwave" + "slow.wav " + "sound/" + "vaporwave" + "reverb.wav " + " reverb " + str(random.uniform(40, 80))
	os.system(cmd)		
		
	#cmd = "python " + "infinite_jukebox.py " + "vaporwave" + "reverb.wav"
	#os.system(cmd)	
	
	#cmd = "del " + "vaporwave" + ".wav"
    #os.system(cmd)	
		
    #cmd = "del " + "vaporwave" + "slow.wav"
    #os.system(cmd)		
		
## Makes this a command line tool: disable when we get the webserver going
sys.argv.pop(0)
name = ""
for s in sys.argv:
	name = name + s
	print(name)
	
if "http" in name:
	gen_vapor2(name)
	
if not "http" in name:
	gen_vapor(name)