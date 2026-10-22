// Exercise 01 — Why React re-renders (memo, useMemo, useCallback)
//
// THE BUG: every keystroke in the "your name" input re-renders <SlowList>,
// which re-runs an artificially expensive render. Type in the input and feel
// the lag; watch the render counters.
//
// YOUR JOB (in roughly this order — observe the counter after each step):
//   1. Wrap SlowList in React.memo. Type in the input — did the lag go away?
//      It won't yet. Why not? (Hint: look at the props Parent passes on every
//      render. memo compares props with Object.is — are they the same object?)
//   2. Fix the `theme` prop with useMemo.
//   3. Fix the `onSelect` prop with useCallback.
//   4. Now memo can actually bail out. Verify: typing no longer bumps
//      SlowList's render counter, but clicking "shuffle items" still does.
//
// INTERVIEW TALKING POINTS (be ready to say these out loud):
//   - A component re-renders when its STATE changes or its PARENT re-renders.
//     Props "changing" is not the trigger — parent rendering is.
//   - memo() makes props the trigger: skip rendering if all props are
//     Object.is-equal. Inline objects/arrays/functions defeat it.
//   - Kent C. Dodds: fix the slow render BEFORE the re-render — here the
//     honest fix might be making SlowList fast, not memoising around it.
//   - Alternative structural fix (no memo at all): move the input + its state
//     DOWN into its own component so typing never renders the parent.

import { useState } from 'react';
import { useRenderCount } from '../../lib/useRenderCount';

const ITEM_NAMES = ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta'];

type Theme = { color: string; background: string };

function SlowList({
  items,
  theme,
  onSelect,
}: {
  items: string[];
  theme: Theme;
  onSelect: (item: string) => void;
}) {
  const renders = useRenderCount();

  // Deliberately expensive render (~burns CPU). Do not "fix" this loop in
  // steps 1-4 — the exercise is stopping it from running unnecessarily.
  // (Step 5, if you want: discuss whether fixing THIS is the better answer.)
  const start = performance.now();
  while (performance.now() - start < 100) {
    // burn ~100ms
  }

  return (
    <div style={{ border: '1px solid grey', padding: 12, marginTop: 12 }}>
      <strong>SlowList</strong> — renders: {renders} (each one burns ~100ms)
      <ul>
        {items.map((item) => (
          <li key={item} style={theme}>
            {item} <button onClick={() => onSelect(item)}>select</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function RerenderLab() {
  const renders = useRenderCount();
  const [name, setName] = useState('');
  const [items, setItems] = useState(ITEM_NAMES);
  const [selected, setSelected] = useState<string | null>(null);

  // These two props are recreated on EVERY Parent render — part of the bug.
  const theme: Theme = { color: 'inherit', background: 'transparent' };
  const onSelect = (item: string) => setSelected(item);

  const shuffle = () => setItems((prev) => [...prev].sort(() => Math.random() - 0.5));

  return (
    <div>
      <h2>01 — Re-render lab</h2>
      <p>Parent renders: {renders}</p>
      <label>
        your name:{' '}
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="type here — feel the lag" />
      </label>
      <div style={{ marginTop: 8 }}>
        <button onClick={shuffle}>shuffle items (SHOULD re-render SlowList)</button>
        {selected && <span> selected: {selected}</span>}
      </div>
      <SlowList items={items} theme={theme} onSelect={onSelect} />
    </div>
  );
}
