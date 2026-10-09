// Structy: shortest path
// Return the length (in edges) of the shortest path between two nodes, or -1.

import { edgeListToAdjList, check } from './helpers.ts';

interface NodeToEnqueue {
  node: string,
  count: number
}

const shortestPathBFS = (edges: string[][], nodeA: string, nodeB: string): any => {
  const graph = edgeListToAdjList(edges);

  const startingNode: NodeToEnqueue = {node: nodeA, count: 0}

  const visitedNodes = new Set<string>([ nodeA ]);
  const queue: NodeToEnqueue[] = [startingNode];

  while (queue.length > 0) {
    const curr: NodeToEnqueue | undefined = queue.shift();

    if (!curr) {
      continue;
    }

    const { node, count }: NodeToEnqueue = curr;

    if (node === nodeB) {
      return count;
    }

    const adjacentNodes: string[] | undefined = graph[node];

    if (!adjacentNodes) {
      continue;
    }

    for (let node of adjacentNodes) {
      const newCount: number = count + 1;

      const newNodeToEnqueue: NodeToEnqueue = {
        node,
        count: newCount
      }

      if (!visitedNodes.has(node)) {
        queue.push(newNodeToEnqueue);
        visitedNodes.add(node);
      }
    }
  }

  return -1;
};

// ---- tests ----

// Structy test_00
//
//   w ─── x
//   │     │
//   v     y
//    ╲   ╱
//      z
//
//   w → z shortest is w → v → z (2 edges), not w → x → y → z (3 edges)
//
const edges: string[][] = [
  ['w', 'x'],
  ['x', 'y'],
  ['z', 'y'],
  ['z', 'v'],
  ['w', 'v'],
];

check('structy test_00', shortestPathBFS(edges, 'w', 'z'), 2);

// Test 2: several routes of different lengths, plus loops
//
//   a ─── b ─── c
//   │     │     │
//   f ─── g     d
//         │     │
//         e ────┘
//
//   a → e routes:  a-b-c-d-e (4)   a-b-g-e (3)   a-f-g-e (3)   → shortest is 3
//   a → d routes:  a-b-c-d (3)     a-b-g-e-d (4) ...           → shortest is 3
//
const edges2: string[][] = [
  ['a', 'b'],
  ['b', 'c'],
  ['c', 'd'],
  ['d', 'e'],
  ['a', 'f'],
  ['f', 'g'],
  ['b', 'g'],
  ['g', 'e'],
];

check('a → e', shortestPathBFS(edges2, 'a', 'e'), 3);
check('a → d', shortestPathBFS(edges2, 'a', 'd'), 3);
check('f → c', shortestPathBFS(edges2, 'f', 'c'), 3);
