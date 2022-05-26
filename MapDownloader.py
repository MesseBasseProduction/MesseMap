#!/usr/bin/env python3

import os
import urllib.request
import math
import time

from concurrent.futures import ThreadPoolExecutor
# Project imports
from src.py.ZoneDownloader import ZoneDownloader
from src.py.MapDownloader import MapDownloader
from src.py.utils import *

# Globals
global mapInfo
global savedPath
global scriptVersion
scriptVersion = '0.1.0'

def main():
    global mapInfo
    printWelcome(scriptVersion)
    zoneDl = ynQuery('Do you want to download a specific zone ?')
    # User wants full map download, warn about time and disk space
    if zoneDl == False:
        fullDl = ynQuery('Downloading the full map will take a long while, and will crush your disk space.\nAre you sure you want to continue ?', 'no')
        if fullDl == False:
            exit(-1)
        else:
            md = MapDownloader()
    # User wants a specific map region
    else:
        zd = ZoneDownloader()


# Script entry point
if __name__ == '__main__':
    main()
