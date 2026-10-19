// Exercise 05 — Image carousel (a top-3 machine-coding classic; Microsoft has
// asked "image slider" variants repeatedly).
//
// Build a carousel from scratch. Target: core in ~45 min, stretches after.
//
// REQUIREMENTS (the interviewer's checklist):
//   1. Show one image at a time from IMAGES below.
//   2. Prev / Next buttons, and they WRAP (next from the last → first).
//      Write the wrap with modulo, not if-statements — then say out loud why
//      `(i - 1 + n) % n` and not `(i - 1) % n` (JS % keeps the sign!).
//   3. Dot indicators: one per image, current one highlighted, clickable.
//   4. Keyboard support: ← and → arrows navigate while the carousel has focus.
//   5. Accessibility minimums: real <button>s (not divs), alt text per image,
//      aria-label on the buttons, and announce position ("3 of 5") somewhere
//      a screen reader can find it.
//
// STRETCHES (in interview-priority order):
//   6. Autoplay every 3s + pause on hover. This is secretly a useEffect
//      cleanup question — the interval must reset when the index changes and
//      die on unmount. If you reach for setInterval, know why stale closures
//      bite here and how the functional setState form dodges them.
//   7. Preload the NEXT image so navigation never flashes (hidden <img> or
//      new Image().src).
//   8. Slide animation: render a horizontal track of all images, translateX
//      by -index * 100%, transition on transform. Talking point: why
//      transform beats animating `left` (compositor vs layout).
//
// INTERVIEW TALKING POINTS:
//   - State is ONE number (the index). Everything else derives. If you catch
//     yourself useState-ing `currentImage`, stop — derive it.
//   - Controlled vs uncontrolled: could this carousel accept `index` +
//     `onChange` props instead of owning state? When would a consumer want that?
//   - What belongs in useEffect here? (Only the autoplay timer. Clicks are
//     event handlers — no effects needed.)
//
// Images are from picsum.photos (free, no key, stable per-id URLs).

import { useState } from 'react';

type CarouselImage = { id: number; url: string; alt: string };

const IMAGES: CarouselImage[] = [
  { id: 1, url: 'https://picsum.photos/id/1018/640/400', alt: 'Mountain valley at dawn' },
  { id: 2, url: 'https://picsum.photos/id/1015/640/400', alt: 'River winding through cliffs' },
  { id: 3, url: 'https://picsum.photos/id/1019/640/400', alt: 'Waterfall into a canyon' },
  { id: 4, url: 'https://picsum.photos/id/1039/640/400', alt: 'Forest waterfall long exposure' },
  { id: 5, url: 'https://picsum.photos/id/1043/640/400', alt: 'Foggy lakeside pier' },
];

export default function ImageCarousel() {
  const [index, setIndex] = useState(0);

  void setIndex; // placeholder until step 2 — delete when you use it

  // TODO (step 2): goPrev / goNext with wrap-around — modulo, both directions.
  // TODO (step 4): onKeyDown handler for ArrowLeft / ArrowRight.
  // TODO (step 6, stretch): autoplay effect — interval + cleanup + hover pause.

  const current = IMAGES[index];

  return (
    <div>
      <h2>05 — Image carousel</h2>

      {/* TODO (step 5): this wrapper needs to be focusable for keyboard nav —
          tabIndex, a role, and an aria-label. Look up aria-roledescription="carousel". */}
      <div style={{ maxWidth: 640 }}>
        <img src={current.url} alt={current.alt} style={{ width: '100%', display: 'block' }} />

        {/* TODO (step 2): Prev / Next buttons */}
        {/* TODO (step 3): dot indicators — map IMAGES, mind your keys */}
        {/* TODO (step 5): "N of M" position announcement */}
      </div>
    </div>
  );
}