# Clicky Friends

A click-memory game built with React.

## How to Play

Five animal friends are displayed in a random order. Click each one **exactly once**. After every click the board reshuffles, so you can't just go left-to-right — you have to remember which friends you've already visited.

- Click a new friend → score goes up, board reshuffles
- Click the same friend twice → **you lose**, board resets
- Click all five without a duplicate → **you win!**

## Animals

Dog, cat, bunny, bird, and chinchilla.

## Running Locally

This repo contains the production build. Serve it with any static file server:

```bash
npx serve .
# or
python3 -m http.server 3000
```

Then open `http://localhost:3000`.
