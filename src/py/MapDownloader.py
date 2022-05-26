#!/usr/bin/env python3

import os
import urllib.request
import math
import time

from concurrent.futures import ThreadPoolExecutor
from src.py.utils import *

# Globals
global mapInfo
global savedPath
global scriptVersion
scriptVersion = '0.0.1'

class MapDownloader:
    def __init__(self):
        global mapInfo
        mapInfo = askMapInfo()
        self._prepareDownload()
        self._displayDownloadInfo()
        start = time.time()
        with ThreadPoolExecutor(max_workers=100) as executor:
            executor.map(self._mapDownloader, list(range(int(mapInfo['maxZoom']))))
        end = time.time()
        print(end - start)


    def _prepareDownload(self):
        global mapInfo
        # Create output directory
        if not os.path.exists(os.path.join(mapInfo['output'], mapInfo['name'])):
            os.makedirs(os.path.join(mapInfo['output'], mapInfo['name']))
        # Determine the max zoom level for proper iteration
        for z in range(30):
            url = mapInfo['url'].replace('{z}', str(z)).replace('{y}', str(0)).replace('{x}', str(0))
            try:
                urllib.request.urlretrieve(url, './test.png')
            except urllib.error.HTTPError:
                os.remove('./test.png')
                mapInfo['maxZoom'] = str(z)
                break

    def _displayDownloadInfo(self):
        global mapInfo
        imgCount = 0
        for z in range(int(mapInfo['maxZoom'])):
            imgCount += pow(4, z)
        print('The map you are about to download has {} levels of zoom'.format(int(mapInfo['maxZoom']) + 1))
        print(f'It will then download {imgCount:,} images')
        print('With an estimated size to {}'.format(self._displayBytes(imgCount * 633))) # OSM average tile size is 633 Bytes

    def _mapDownloader(self, z):
        global mapInfo
        savedPath = os.path.join(mapInfo['output'], mapInfo['name'])
        # Create z sub folder if not existing
        if not os.path.exists(os.path.join(savedPath, str(z))):
            os.makedirs(os.path.join(savedPath, str(z)))
        with ThreadPoolExecutor(max_workers=100) as executor:
            executor.map(self._xProcessor, [z for i in range(pow(2, z))], list(range(pow(2, z))))
        print('All tiles downloaded for Z = {}'.format(z))

    def _xProcessor(self, z, x):
        global mapInfo
        savedPath = os.path.join(mapInfo['output'], mapInfo['name'])
        # Create y sub folder if not existing
        if not os.path.exists(os.path.join(savedPath, str(z) + '/' + str(x))):
            os.makedirs(os.path.join(savedPath, str(z) + '/' + str(x)))
        imgs = []
        for y in range(pow(2, z)):
            # Perform image download
            url = mapInfo['url'].replace('{z}', str(z)).replace('{x}', str(x)).replace('{y}', str(y))
            subPath = '/' + str(z) + '/' + str(x) + '/' + str(y)
            imgs.append({
                'url': url,
                'path': savedPath + subPath + '.png'
            })
        with ThreadPoolExecutor(max_workers=100) as executor:
            executor.map(downloadImage, imgs)


    def _displayBytes(self, size_bytes):
       if size_bytes == 0:
           return "0B"
       size_name = ("B", "KB", "MB", "GB", "TB", "PB")
       i = int(math.floor(math.log(size_bytes, 1024)))
       p = math.pow(1024, i)
       s = round(size_bytes / p, 2)
       return "%s %s" % (s, size_name[i])
