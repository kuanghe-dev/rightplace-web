# RightPlace Web

A browser-based card-swapping puzzle game. See [rightplace.md](rightplace.md) for the original CLI game spec.

## Concept

The player sees N cards (default 5) showing letters A–E in a shuffled order. The goal is to sort them back into alphabetical order by swapping two cards at a time. The game shows how many cards are currently in the correct position after each swap. The game ends when all cards are in the correct position.

## Rules

- The game never starts with all cards already in the correct position.
- Each turn: the player selects exactly two cards, then clicks Swap.
- After swapping, the correct-position count updates.
- Win condition: all N cards are in their correct positions.
- On win: confetti is shown, along with the total number of swaps taken.
- After winning, a "Play Again" button restarts with a new shuffle (same card count).

## UI / Interaction

- **Cards**: Playing-card style, large, letter centered.
- **Position numbers**: Shown above the cards (1, 2, 3, … N), small and subtle.
- **Selection**: Click a card to select it (bold teal border + lifts up ~10px). Click again to deselect.
- **Swap button**: Disabled until exactly 2 cards are selected. Clicking it performs the swap, animates the cards sliding to their new positions (~300ms), then clears the selection.
- **Swap counter**: Always visible, shows total swaps made so far.
- **Correct count**: Displayed below the cards, centered. Format: "Correct: N of 5".
- **Win screen**: Modal overlay on top of the board (cards remain visible underneath). Shows confetti + swap count + "Play Again" button.
- **Play Again**: Restarts with a new shuffle, same card count. No settings menu.

## Design

**Design 2 — Dark / Modern**

| Element | Value |
|---|---|
| Page background | `#0F172A` (dark navy) |
| Card background | `#1E293B` |
| Card border (default) | `#334155` |
| Card text | `#F8FAFC` |
| Selected border | `#2DD4BF` (teal), 3px, + teal glow |
| Selected lift | `translateY(-10px)` |
| Swap button | teal (`#2DD4BF`), dark text |
| Swap button (disabled) | `#1E293B` bg, `#334155` border |
| Score / labels | `#94A3B8` |

## Animations

- **Card swap**: Pixel offsets measured via `getBoundingClientRect()` on card refs, then applied as `--anim-dx` CSS custom property driving a `@keyframes card-slide` animation (~300ms). State updates after the animation completes.
- **Card selection**: Immediate lift + border color change on click.
- **Win**: `canvas-confetti` burst.
- **Sound**: None.

## Responsive / Mobile

- Basic responsive support in v1.
- Single CSS breakpoint: shrink card size on narrow viewports.
- Tap-to-select works on touch devices (no swipe gestures needed).

## Planned future features (not in v1)

- Configurable card count (not just 5).
- Configurable card content: letters, emojis, national flags.

## Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Plain CSS with custom properties
- **Confetti**: `canvas-confetti`
- **Deployment**: GitHub Pages — repo name `rightplace-web`, Vite `base: '/rightplace-web/'`

## Development

```bash
npm run dev      # start dev server at http://localhost:5173/rightplace-web/
npm run build    # production build → dist/
npm run deploy   # build + push dist/ to gh-pages branch
```

## Project Structure

```
rightplace-web/
├── .github/workflows/deploy.yml  ← auto-deploys to GitHub Pages on push to main
├── index.html
├── vite.config.js                ← base: '/rightplace-web/' for GitHub Pages
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── game.js                   ← pure game logic (shuffle, score, swap)
│   ├── components/
│   │   ├── Card.jsx              ← forwardRef; accepts animDx for slide animation
│   │   ├── GameBoard.jsx         ← all game state + animation orchestration
│   │   └── WinScreen.jsx         ← modal overlay + canvas-confetti
│   └── styles/
│       └── index.css             ← all styles; CSS custom properties for theming
└── package.json
```
