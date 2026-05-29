# Shell Games

A small React mini-game collection. Lives at `ledsec.dev/abidal_games/` (a project page under the portfolio repo's custom domain). Source is in `src/`, built output is in `docs/` (served by GitHub Pages).

## Stack

- React (class components throughout — keep it consistent)
- Vite 5, outputs to `docs/` via `npm run build`
- No TypeScript, no test suite
- Web Audio API for sound synthesis (no audio files)

## Project structure

```
src/
  main.jsx              Entry point
  App.jsx               Home screen shell — routes between games, "Back to portfolio" link
  App.css               All styles for home + all games
  index.css             Body/global styles only
  games/
    shared.js           FRIENDS array, DIFFICULTIES array, shuffle()
    BoopTheAminals.jsx  Game 1
    SteveSays.jsx       Game 2 (displayed as "Copy Cat")
    MemoryMatch.jsx     Game 3
    sound.js            Web Audio tone generator used by SteveSays
  assets/               Animal PNGs (dog, cat, bunny, bird, chinchilla)
docs/                   Built output — committed to repo for GitHub Pages
```

## Games

**Boop the Aminals** — click each animal exactly once, no repeats.

**Copy Cat** (file: `SteveSays.jsx`) — Simon Says variant. Watch the sequence light up, then repeat it back. Each correct round appends one more. Sound via `sound.js` (pentatonic scale per animal, buzzer on wrong tap). Difficulty controls animal count and starting sequence length.

**Memory Match** — classic card-flip pair game. Flip two cards, find matching animals. Wrong pairs flip back after 900ms. Difficulty controls grid size (3/4/5 pairs).

## Adding a new game

1. Create `src/games/YourGame.jsx` — accept an `onBack` prop, render `<div className="App">`
2. Add an entry to the `GAMES` array in `App.jsx` and a route in the `render()` method
3. Add any new CSS to `App.css`
4. Run `npm run build` and commit `docs/` along with source

## Deployment

- GitHub Pages serves the `docs/` folder on `main`
- Lives at `ledsec.dev/abidal_games/` — the apex `ledsec.dev` is owned by the portfolio repo (`jtledbet.github.io`); this repo is a project page that inherits the custom domain
- **Do not add a `docs/CNAME` file here** — it would try to claim the apex and break the portfolio
- `vite.config.js` has `base: '/abidal_games/'` so asset URLs resolve under the subpath; don't change it back to `/`
- To deploy: build, commit `docs/`, push to `main` (via PR)

## Dev

```bash
npm install
npm run dev      # http://localhost:5173/abidal_games/
npm run build    # outputs to docs/
```
