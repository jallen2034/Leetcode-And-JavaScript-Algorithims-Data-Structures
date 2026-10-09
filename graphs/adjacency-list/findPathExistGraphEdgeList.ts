// LeetCode 1971: Find if Path Exists in Graph
// n nodes, an undirected edge list, and a source/destination. Is there a path?

import { edgeListToAdjList, check } from './helpers.ts';

function validPath(n: number, edges: number[][], source: number, destination: number): boolean {
  const adjList = edgeListToAdjList(edges);

  const stack: number[] = [ source ];
  const visited = new Set<number>();

  while (stack.length > 0) {
    const curr = stack.pop();

    if (curr === destination) {
      return true;
    }

    if (curr !== undefined) {
      visited.add(curr);

      // The || [] protects against isolated vertices not present in the adjacency list keys
      const adjacentNodesToCurr = adjList[curr] || [];

      for (const node of adjacentNodesToCurr) {
        if (!visited.has(node)) {
          stack.push(node);
        }
      }
    }
  }

  return false;
}

// ---- tests ----

// Example 1: triangle 0-1-2, path 0 → 2 exists
check('example 1', validPath(3, [[0, 1], [1, 2], [2, 0]], 0, 2), true);

// Example 2: two separate components, no path 0 → 5
check('example 2', validPath(6, [[0, 1], [0, 2], [3, 5], [5, 4], [4, 3]], 0, 5), false);
