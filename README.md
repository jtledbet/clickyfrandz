# Shell Games

A small collection of React mini-games starring the same five animal friends (dog, cat, bunny, bird, chinchilla). Live at [ledsec.dev/abidal_games/](https://ledsec.dev/abidal_games/).

## The games

- **Boop the Aminals** — click each animal exactly once, no repeats. The board reshuffles after every click, so you have to remember who you've already booped.
- **Copy Cat** (Simon Says) — watch the sequence light up, then tap it back. Each correct round adds one more. Pentatonic tones per animal + a buzzer on wrong taps via the Web Audio API; mute toggle in the difficulty bar.
- **Memory Match** — classic card-flip pair game. Flip two cards, find matching animals. Difficulty controls grid size.

## Project structure

```
src/          ← edit this
  App.jsx       home screen + game routing
  App.css       styles for home + all games
  index.css     base/body styles
  main.jsx      entry point (don't touch)
  games/
    BoopTheAminals.jsx
    SteveSays.jsx       (displayed as "Copy Cat")
    MemoryMatch.jsx
    shared.js           FRIENDS array, shuffle helper
    sound.js            Web Audio tone generator
  assets/       animal PNGs

docs/         ← don't edit by hand. Built by `npm run build`.
              GitHub Pages serves the live site from here.
```

## Development

```bash
npm install        # first time only
npm run dev        # local preview at http://localhost:5173/abidal_games/
npm run build      # compiles src/ → docs/ (run before committing)
```

Vite reads `src/`, bundles everything, and writes browser-ready output to `docs/`. Config is in `vite.config.js` — `base: '/abidal_games/'` so asset URLs resolve under the project subpath.

## Deployment

Live at `ledsec.dev/abidal_games/`, served by GitHub Pages from the `docs/` folder on `main`. The site is a project page under the portfolio repo's custom domain — there's no CNAME in this repo (the portfolio repo owns `ledsec.dev`).

To deploy a change:
1. Edit files in `src/`
2. Run `npm run build`
3. Commit both source and the updated `docs/`
4. Open a PR against `main`; once merged, Pages redeploys in ~1 minute
