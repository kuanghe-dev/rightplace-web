# RightPlace Web — Claude Notes

> For player-facing docs (rules, card types, how to play, dev setup) see [README.md](README.md).

## Architecture

**`src/cardTypes.js`** — single source of truth for the 7 content types. Each type has `items` (canonical ordered array, max 7), `emoji`, `hint` (ordering hint shown in welcome), and `meta` (rainbow only: `{ label, color }` per item). Adding a new type means adding an entry here and a case in `Card.jsx` if it needs custom rendering.

**`src/game.js`** — pure functions, no React. `createShuffled(canonical)` shuffles a copy of the canonical array until at most 1 card is in the correct position (guarantees the puzzle starts with at most 1 freebie). `score(current, canonical)` counts correct positions. `swap(arr, i, j)` returns a new array.

**`src/App.jsx`** — holds `config` state (`null` = welcome screen, `{ cardCount, cardType }` = in-game). Renders `WelcomeScreen` or `GameBoard` accordingly.

**`src/components/WelcomeScreen.jsx`** — card type picker + card count picker (3–7, default 5). Calls `onStart({ cardCount, cardType })`.

**`src/components/GameBoard.jsx`** — owns all game state. Derives `canonical` via `useMemo` from props. Animation: measures `getBoundingClientRect()` on both cards, sets `--anim-dx` CSS custom property, waits 300ms for CSS animation to finish, then commits the state swap.

**`src/components/Card.jsx`** — `forwardRef` (refs needed for animation measurements). Adds `.card--text-sm` for multi-character text types (26px font), `.card--rainbow` + dot element for the rainbow type. Emoji-based types (`emojis`, `fruits`) are excluded from `.card--text-sm` even though their items have `.length > 1` as surrogate pairs.

**`src/components/WinScreen.jsx`** — modal overlay, fires `canvas-confetti` on mount.

**`src/styles/index.css`** — all styles. Uses CSS custom properties for theming and `--anim-dx` / `--card-*` variables. Single breakpoint at 560px shrinks card dimensions; within that breakpoint, `.game` overrides `--card-width` with a `min()` formula that scales cards down further when many cards would otherwise overflow the viewport (uses `--card-count` set inline by `GameBoard`).

## Key Decisions

- **Card animation**: CSS `@keyframes card-slide` driven by `--anim-dx` rather than JS-controlled transitions, so the browser handles the easing. State updates happen after `setTimeout(300ms)` to match the animation duration.
- **Game state lives in GameBoard, not App**: App only tracks whether you're on the welcome screen. This keeps the welcome/game split clean without lifting game state up unnecessarily.
- **No card type switching mid-game**: config is fixed at game start. Menu button returns to welcome screen, which resets config.
- **Responsive card sizing**: `GameBoard` sets `--card-count` as an inline CSS custom property on the `.game` element. The mobile media query uses `min(64px, calc((100vw - 40px - (count-1) * gap) / count))` so cards always fill the available width without overflowing on narrow screens like iPhone 13.

## Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`) auto-deploys `main` to GitHub Pages. Manual deploy: `npm run deploy` (builds + pushes `dist/` to `gh-pages` branch). Vite base is `/rightplace-web/`.
