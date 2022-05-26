from concurrent.futures import ThreadPoolExecutor
from src.py.utils import *
import os


class ZoneDownloader:
    def __init__(self):
        # TODO print space and zone downloader mode info
        self.zoneInfo = askZoneInfo()
        # Iterate z levels to download tiles
        with ThreadPoolExecutor(max_workers=100) as executor:
            executor.map(self._mapDownloader, list(range(self.zoneInfo['zMin'], self.zoneInfo['zMax'] + 1)))


    def _mapDownloader(self, z):
        savedPath = os.path.join(self.zoneInfo['output'], self.zoneInfo['name'])
        # Create z sub folder if not existing
        if not os.path.exists(os.path.join(savedPath, str(z))):
            os.makedirs(os.path.join(savedPath, str(z)))
        # Convert lat lng to tile number depending on Z
        min = latlng2tile(self.zoneInfo['tlCoords'][0], self.zoneInfo['tlCoords'][1], z)
        max = latlng2tile(self.zoneInfo['brCoords'][0], self.zoneInfo['brCoords'][1], z)
        # Iterate x tiles depending on current zoom
        with ThreadPoolExecutor(max_workers=100) as executor:
            executor.map(self._xProcessor, [z for i in range(pow(2, z))], list(range(min[0], max[0] + 1)))


    def _xProcessor(self, z, x):
        savedPath = os.path.join(self.zoneInfo['output'], self.zoneInfo['name'])
        # Create x sub folder if not existing
        if not os.path.exists(os.path.join(savedPath, str(z) + '/' + str(x))):
            os.makedirs(os.path.join(savedPath, str(z) + '/' + str(x)))
        # Convert lat lng to tile number depending on Z
        min = latlng2tile(self.zoneInfo['tlCoords'][0], self.zoneInfo['tlCoords'][1], z)
        max = latlng2tile(self.zoneInfo['brCoords'][0], self.zoneInfo['brCoords'][1], z)
        imgs = []
        # Iterate y tiles for z and x
        for y in range(max[1], min[1] + 1):
            # Perform image download
            url = self.zoneInfo['url'].replace('{z}', str(z)).replace('{x}', str(x)).replace('{y}', str(y))
            subPath = '/' + str(z) + '/' + str(x) + '/' + str(y)
            imgs.append({
                'url': url,
                'path': savedPath + subPath + '.png'
            })
        with ThreadPoolExecutor(max_workers=100) as executor:
            executor.map(downloadImage, imgs)
