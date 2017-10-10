#setup.py
from distutils.core import setup
import py2exe

setup(
    console=['VaporMain.py'],
	options = {
	    'py2exe':{
	        'packages': ['random']
		}
	}
)