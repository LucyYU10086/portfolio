# Zhongyuan Yu — portfolio preset

Open `index.html` in a browser to view the site. For local development, from this folder run:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Add a video

In `script.js`, add an object to the `films` list. Supply its title, year, runtime, a local/hosted `.mp4` URL, and a poster image. The video player does not impose a duration cap, so a seven-minute (or longer) export plays in full.

```js
{ title: "Film name", year: "2026", runtime: "07:00", video: "./assets/film-name.mp4", poster: "./assets/film-name.jpg" }
```

Place personal media inside `assets/` when you are ready to replace the demonstration footage and photos. The demo image/video links are temporary online placeholders.

## Add a photo

Add `["image URL", "caption"]` to `photos` in `script.js`. The justified gallery measures every image's natural dimensions, retains its original ratio without stretching, then dynamically sizes each row to fill the available width. Clicking a photo opens its high-resolution source.

## Add work in the browser

Select the lime **Add work +** box in the upper-right corner. Use its Film, Photo, or Resume form to add hosted media URLs and text entries. Film descriptions appear alongside the full player. These entries are stored only in the current browser, so for the permanent shared site, also add the same items to the `defaultFilms`, `defaultPhotos`, or `defaultResume` lists in `script.js`.
