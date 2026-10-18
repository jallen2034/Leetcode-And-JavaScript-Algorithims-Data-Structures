// Exercise 03 — List keys: why index-as-key corrupts state
//
// THE BUG: each row's key is its array INDEX. The notes <input> is
// uncontrolled — its text lives in the DOM, not in React state. Reproduce:
//   1. Type a note next to "Ada" (e.g. "team lead").
//   2. Click "add person to top". The note is now next to the WRONG person.
//   3. Also try: type notes on two rows, then remove the first row.
//
// WHY: keys are how React matches old children to new children. With index
// keys, "row 0" is still "row 0" after a prepend, so React KEEPS that DOM
// node (and the input's text) and just swaps the name text inside it. The
// DOM state stays put while the data shifts underneath it.
//
// YOUR JOB:
//   1. Reproduce both bugs above. Narrate out loud what React is doing.
//   2. Fix by keying on person.id. Verify notes now travel with their person.
//   3. Break it again on purpose: key={Math.random()}. What happens to the
//      notes on EVERY render, and why is this strictly worse than index?
//      (Every key changes every render -> React unmounts and remounts every
//      row -> all DOM state is destroyed, plus you pay for the remount.)
//
// INTERVIEW TALKING POINTS:
//   - Keys must be STABLE (same item -> same key across renders) and UNIQUE
//     among siblings. They're hints to the reconciler, not props.
//   - Index keys are fine ONLY when the list never reorders/inserts/removes
//     and items have no state. If in doubt, don't.
//   - Same mechanism hides in controlled inputs + component state too, not
//     just uncontrolled DOM state (e.g. a row component with useState).

import { useState } from 'react';

type Person = { id: number; name: string };

const INITIAL: Person[] = [
  { id: 1, name: 'Ada' },
  { id: 2, name: 'Alan' },
  { id: 3, name: 'Grace' },
];

let nextId = 100;

export default function ListKeys() {
  const [people, setPeople] = useState<Person[]>(INITIAL);

  const addToTop = () =>
    setPeople((prev) => [{ id: nextId++, name: `Person ${nextId}` }, ...prev]);

  const remove = (id: number) => setPeople((prev) => prev.filter((p) => p.id !== id));

  const sortByName = () =>
    setPeople((prev) => [...prev].sort((a, b) => a.name.localeCompare(b.name)));

  return (
    <div>
      <h2>03 — List keys</h2>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={addToTop}>add person to top</button>
        <button onClick={sortByName}>sort by name</button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {people.map((person, index) => (
          // TODO: this key is the bug
          <li key={index} style={{ display: 'flex', gap: 8, marginTop: 8, alignItems: 'center' }}>
            <span style={{ width: 120 }}>{person.name}</span>
            <input placeholder={`notes about ${person.name}`} />
            <button onClick={() => remove(person.id)}>remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
