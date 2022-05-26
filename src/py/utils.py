import sys
import math
import urllib.request


def printWelcome(v):
    print('##----------------------------------------##')
    print('##                                        ##')
    print('##    MapDownloader.py - version {}    ##'.format(v))
    print('##                                        ##')
    print('##----------------------------------------##\n')
    print('This script will scrap tiles for a given map provider')


def ynQuery(q, default='yes'):
    valid = { 'yes': True, 'y': True, 'ye': True, 'no': False, 'n': False }
    if default is None:
        prompt = ' [y/n] '
    elif default == 'yes':
        prompt = ' [Y/n] '
    elif default == "no":
        prompt = ' [y/N] '
    else:
        raise ValueError("Invalid default answer: '%s'" % default)
    # Wait for user response in valid
    while True:
        sys.stdout.write(q + prompt)
        choice = input().lower()
        if default is not None and choice == '':
            return valid[default]
        elif choice in valid:
            return valid[choice]
        else:
            sys.stdout.write("Please respond with 'yes' or 'no' " "(or 'y' or 'n').\n")


def askMapInfo():
    url = input('Please enter the map provider url: ')
    name = input('Please enter the name of this map: ')
    output = input('Please enter the path to save the map to: ')
    return {
        'url': url,
        'name': name,
        'output': output,
        'maxZoom': '0'
    }


def askZoneInfo():
    url = input('Please enter the map provider url: ')
    name = input('Please enter the name of this map: ')
    tlLat = input('Please enter the top left latitude: ')
    tlLng = input('Please enter the top left longitude: ')
    brLat = input('Please enter the bottom right latitude: ')
    brLng = input('Please enter the bottom right longitude: ')
    z1 = input('Please enter the minimum zoom level: ')
    z2 = input('Please enter the maximum zoom level: ')
    output = input('Please enter the local path to save the map to: ')
    return {
        'url': url,
        'name': name,
        'output': output,
        'tlCoords': (float(tlLat), float(tlLng)),
        'brCoords': (float(brLat), float(brLng)),
        'zMin': int(z1),
        'zMax': int(z2)
    }


def latlng2tile(lat, lng, zoom):
  latRad = math.radians(lat)
  n = 2.0 ** zoom
  xtile = int((lng + 180.0) / 360.0 * n)
  ytile = int((1.0 - math.asinh(math.tan(latRad)) / math.pi) / 2.0 * n)
  return (xtile, ytile)


def downloadImage(img):
    try:
        urllib.request.urlretrieve(img['url'], img['path'])
    except urllib.error.HTTPError:
        urllib.request.urlretrieve(img['url'], img['path'])
        print('Image not available', img['url'])
