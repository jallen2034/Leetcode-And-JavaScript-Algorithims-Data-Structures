// LeetCode 323: Number of Connected Components in an Undirected Graph
// n nodes labelled 0 to n - 1. Return how many separate groups (components) there are.
// (The edge-list → adjacency-list conversion here is part of the solution:
// LeetCode hands you n + edges, and isolated nodes still need a key.)

import { check } from './helpers.ts';

const convertEdgeListToAdjList = (n: number, edges: number[][]) => {
  const adjList = new Map<number, number[]>();

  for (let i = 0; i < n; i++) {
    adjList.set(i, []);
  }

  for (let [node1, node2] of edges) {
    adjList.get(node1)!.push(node2);
    adjList.get(node2)!.push(node1);
  }

  return adjList;
}

const exploreNodesDfs = (key: number, adjList: Map<number, number[]>, visited: Set<number>) => {
  visited.add(key);
  const adjacentNodes: any = adjList.get(key);

  for (let node of adjacentNodes) {
    if (!visited.has(node)) {
      exploreNodesDfs(node, adjList, visited);
    }
  }
}

function countComponents(n: number, edges: number[][]): number {
  const adjList: Map<number, number[]> = convertEdgeListToAdjList(n, edges);
  const visited = new Set<number>;
  let componentCount = 0;

  for (const [ key, val ] of adjList) {
    if (!visited.has(key)) {
      exploreNodesDfs(key, adjList, visited);
      componentCount += 1;
    }
  }

  return componentCount;
}

// ---- tests ----

// Example 1 → 2 components
//
//   0 ─ 1        3
//       │        │
//       2        4
//
check('example 1', countComponents(5, [[0, 1], [1, 2], [3, 4]]), 2);
//
// // Example 2 → 1 component (one long line)
// //
// //   0 ─ 1 ─ 2 ─ 3 ─ 4
// //
check('example 2', countComponents(5, [[0, 1], [1, 2], [2, 3], [3, 4]]), 1);
//
// // Isolated nodes → 3 components
// //
// //   0 ─ 1        2        3
// //
check('isolated nodes', countComponents(4, [[0, 1]]), 3);
