# Poster saved as JSON

When a poster is requested on the instance, a JSON file will be created in this directory, so the map can be later reloaded in app. For the Messe Basse Production instance, those files are used when a user request us to make a print and frame it. This upcoming service will be soon announced ; feel free to follow us on [Instagram](https://www.instagram.com/messebasseproduction/) or [Facebook]() ! Enough commercial, here is a the JSON format for a poster :

```json
{
  "style": {
    "orientation": "horizontal|vertical",
    "style": "standard|travel|frame|pure|tone|map|window|air|hipster",
    "darkTheme": false,
    "upText": false,
    "colors": {
      "lbg": "#FFFFFE",
      "ltxt": "#000001",
      "lcom": "#999998",
      "dbg": "#000001",
      "dtxt": "#FFFFFE",
      "dcom": "#999998"
    }
  },
  "text": {
    "title": "Messe Basse",
    "subtitle": "France",
    "comment": "44.797°N / 1.542°E"
  },
  "map": {
    "layer": "Imagery (E)",
    "center": {
      "lat": 44.793530904744074,
      "lng": 1.5380859375000002
    },
    "zoom": 5
  },
  "export": {
    "width": "600|6500",
    "height": "848|9193",
    "filtetype": {
      "extension": "png|jpg|webp|pdf",
      "type": "png|jpeg|webp|pdf"
    }
  }
}
```
