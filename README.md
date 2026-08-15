# Nordic Flag Generator

A browser-based tool for designing your own Nordic-style cross flag — in the spirit of Sweden, Denmark, Norway, Finland, and Iceland. Tweak dimensions, aspect ratio, colours, and cross proportions, watch the flag render live as an SVG, and download it when you're happy with it.

## Features

- **Country templates** — start from Sweden, Denmark, Norway, Finland, or Iceland's proportions and colours.
- **Custom dimensions** — set the flag width (height follows from the aspect ratio).
- **Aspect ratio** — pick one of the five countries' ratios or set a custom ratio.
- **Colours** — choose the background, cross, and inner cross colours.
- **Cross settings** — control the width/height and position (offset from left/top) of the cross.
- **Inner cross** — optionally add a Norway/Iceland-style inner cross, with its own width, height, and colour.
- **Live SVG preview** — the flag updates immediately as you adjust any setting.
- **Download** — export the finished flag as an `.svg` file.

## Getting started

Requires [Node.js](https://nodejs.org/).

```bash
npm install
npm run dev
```

This starts a Vite dev server; open the printed local URL in your browser.

## Other commands

```bash
npm run build     # type-check and build for production (outputs to dist/)
npm run preview   # preview the production build locally
```

## Tech stack

- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- Plain DOM APIs and SVG — no UI framework

## How it works

The flag is defined as a set of proportions (aspect ratio, cross width/height/position as fractions of the flag's dimensions), which are converted into pixel geometry for a given width and then painted onto an SVG. See [CLAUDE.md](CLAUDE.md) for a deeper look at the architecture.
