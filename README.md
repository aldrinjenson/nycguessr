# NYCGuessr

Guess the NYC intersection from a **live traffic camera**.

**Play:** https://nycguessr.vercel.app

A GeoGuessr-style game built on top of the NYC Department of Transportation's
public traffic camera feeds. You get a live image from one of 960+ DOT cameras
across the five boroughs; you drop a pin on the map where you think it is;
closer pins score more points. Five rounds, 20 seconds each.

## How it works

- **Live feeds.** Each round shows a randomly picked camera from `webcams.nyctmc.org`,
  refreshing every 2 seconds. You see traffic, pedestrians, weather — all in
  real time — so every round is unreproducible.
- **Scoring.** Distance between your pin and the true camera is computed
  with the haversine formula. Score decays exponentially from 5,000 (bull's-eye)
  to 0 (far miss).
- **Borough filter.** Play all five boroughs or lock the game to Manhattan /
  Brooklyn / Queens / Bronx / Staten Island.
- **Share card.** A PNG of your score is generated on the fly via `<canvas>`
  and can be shared through the native Web Share API, downloaded, or copied
  to the clipboard as an image.

## Tech

- Single `index.html`, vanilla JS, no build step.
- [Leaflet](https://leafletjs.com/) for the map.
- Dark CartoCDN tiles, with a CSS contrast boost so street labels pop.
- Web Audio API for sound effects (no assets bundled; tones generated at runtime).
- `cameras.js` is the one-time scraped list of NYC DOT cameras
  (`{name, lat, lng, area, imageUrl}` per camera), ~160 KB.
- Deployed as a static site on [Vercel](https://vercel.com).

## Running locally

Just open `index.html` in a browser. No server required — the camera list loads
from the local `cameras.js` and the images come straight from NYC DOT.

```sh
git clone https://github.com/aldrinjenson/nycguessr.git
cd nycguessr
open index.html
```

Some clipboard features (writing a PNG to the clipboard) only work on `https://`
origins, so for full-fidelity local testing use a local server:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Data source

Camera images come from the **NYC DOT Traffic Management Center**:

```
https://webcams.nyctmc.org/api/cameras/{uuid}/image
```

The same backend powers NYC DOT's public traffic camera viewer at
<https://webcams.nyctmc.org>. The JSON index of cameras lives at
`https://webcams.nyctmc.org/api/cameras` (CORS-restricted, so scraped once
and bundled as `cameras.js`).

Formal data-access agreements for NYC DOT feeds go through
`tmcdot@dot.nyc.gov`.

## Credits

- Inspired by [Traffic Cam Photobooth](https://trafficcamphotobooth.com) by
  [Morry Kolman](https://wttdotm.com), which first popularized the idea of
  treating NYC's public camera feeds as a creative surface.
- Map tiles © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors
  and [CARTO](https://carto.com/attributions).
- Camera imagery © NYC Department of Transportation.

## License

MIT.
