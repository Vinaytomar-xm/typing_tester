# ⌨ TypeForge — Typing Speed Test

A fast, accurate, and beautifully designed typing speed test you can run entirely in the browser — no installation, no server, no dependencies.

---

## Features

- **Real WPM tracking** — Words Per Minute calculated as `(correct chars / 5) / minutes`, the industry-standard formula
- **Live accuracy** — updates as you type, based on correct characters vs total typed
- **Two test modes** — *Words* (random from a 300+ word bank) and *Quotes* (curated sentences)
- **Four durations** — 15s, 30s, 60s, 120s
- **Word-by-word input** — press `Space` to submit a word; backspace to re-edit within or go back a word
- **Auto-scrolling text** — the word display smoothly scrolls so your current position is always visible
- **Animated caret** — a gold cursor tracks your exact position in the text
- **WPM over time chart** — a smooth curve in the results screen shows your speed history during the test
- **Personal best** — saved in `localStorage` per mode + duration combination, shown after every test
- **Keyboard shortcuts** — `Tab` to restart the same test, `Escape` for a new test
- **Fully accessible** — ARIA labels, keyboard navigation, `prefers-reduced-motion` support

---

## Getting Started

Just open `index.html` in any modern browser:

```
# Option 1 — double-click index.html

# Option 2 — local dev server (recommended for best font loading)
npx serve .
# or
python -m http.server 8080
```

No build step. No npm install. Everything is vanilla HTML, CSS, and JavaScript.

---

## File Structure

```
typeforge/
├── index.html    ← Page structure & layout
├── styles.css    ← All styles (dark theme, animations, responsive)
├── script.js     ← Full test logic, word bank, caret, chart
└── README.md     ← This file
```

---

## How It Works

### Typing flow

1. Words are rendered as `<span class="word">` elements, each containing one `<span class="char">` per character
2. A hidden `<input>` captures keystrokes — `input` events compare each character in real time
3. Pressing `Space` submits the current word: correct/incorrect chars are tallied, the word is marked, and the next word becomes active
4. The words container uses CSS `transform: translateY()` to smoothly scroll the display upward as you progress

### WPM formula

```
WPM = (correct characters typed / 5) / elapsed minutes
```

The divisor of 5 is the standard "average word length" used by all major typing tests. CPM (characters per minute) is `correct characters / elapsed minutes`.

### Accuracy formula

```
Accuracy = (correct characters / total characters typed) × 100
```

Backspaced characters are not penalised — only your final submitted state per character counts toward accuracy.

### Personal best

Results are stored in `localStorage` with the key pattern:

```
tf_best_{duration}_{mode}    e.g.  tf_best_60_words
```

---

## Customisation

### Add more sample texts (Quotes mode)

In `script.js`, find the `QUOTES` array and add your own strings:

```js
const QUOTES = [
  "Your custom sentence here...",
  // ...
];
```

### Change the test duration options

In `index.html`, add a new pill button:

```html
<button class="pill" data-dur="180">3m</button>
```

The JS picks up `data-dur` automatically.

### Theming

All colours are CSS custom properties in `:root` inside `styles.css`:

```css
:root {
  --accent:   #c9a227;   /* gold caret & highlights */
  --correct:  #4ade80;   /* green for correct chars */
  --incorrect:#f87171;   /* red for errors */
  --bg:       #070b0f;   /* page background */
  --surface:  #0c1219;   /* card backgrounds */
}
```

---

## Browser Support

| Browser | Supported |
|---------|-----------|
| Chrome 90+ | ✅ |
| Firefox 88+ | ✅ |
| Safari 14+ | ✅ |
| Edge 90+ | ✅ |

Requires: CSS custom properties, `localStorage`, Canvas 2D API, ES2020+.

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Restart same test |
| `Escape` | Start a new test |
| `Space` | Submit current word |
| `Backspace` | Delete within word / return to previous word |

---

## License

MIT — free to use, modify, and distribute.