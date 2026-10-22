// Infrastructure — a hook that counts how many times a component has rendered.
// Use it to SEE re-renders while working on the exercises.
//
// Note: React 18 StrictMode double-invokes renders in dev, so counts go up by
// 2 per "real" render. The relative numbers are what matter.

import { useRef } from 'react';

export function useRenderCount(): number {
  const count = useRef(0);
  count.current += 1;
  return count.current;
}
