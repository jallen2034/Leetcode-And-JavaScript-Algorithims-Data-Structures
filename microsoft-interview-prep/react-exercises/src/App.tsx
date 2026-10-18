// Exercise switcher — this file is infrastructure, not an exercise.
// The work lives in src/exercises/. Suggested order: 01 → 02 → 03 → 04.

import { useState } from 'react';
import RerenderLab from './exercises/01-rerenders/RerenderLab';
import UserSearch from './exercises/02-effects/UserSearch';
import ListKeys from './exercises/03-lists/ListKeys';
import DebouncedSearch from './exercises/04-debounced-search/DebouncedSearch';

const exercises = {
  '01 Re-renders': <RerenderLab />,
  '02 useEffect + fetch': <UserSearch />,
  '03 List keys': <ListKeys />,
  '04 Debounced search': <DebouncedSearch />,
} as const;

type ExerciseName = keyof typeof exercises;

export default function App() {
  const [active, setActive] = useState<ExerciseName>('01 Re-renders');

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <nav style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {(Object.keys(exercises) as ExerciseName[]).map((name) => (
          <button
            key={name}
            onClick={() => setActive(name)}
            style={{ fontWeight: name === active ? 'bold' : 'normal' }}
          >
            {name}
          </button>
        ))}
      </nav>
      {exercises[active]}
    </div>
  );
}
