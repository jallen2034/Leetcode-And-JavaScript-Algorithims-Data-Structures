// HackerRank: BFS Shortest Reach
// Every edge costs 6. Return each node's distance from s (in order), -1 if unreachable.
// (The adjacency-list builder here is part of the solution: HackerRank hands you
// n + edges, and every node 1..n needs a key even when isolated.)

import { check } from './helpers.ts';

const buildAdjListFromEdgeList = (edges: number[][], n: number) => {
  const adjList = new Map();

  for (let i = 1; i < n + 1; i++) {
    adjList.set(i, [])
  }

  for (let edge of edges) {
    const [ first, second ] = edge;

    const arrAt1stKey = adjList.get(first);
    const arrAt2ndKey = adjList.get(second);

    if (!arrAt1stKey.includes(first)) {
      adjList.get(first).push(second);
    }

    if (!arrAt2ndKey.includes(second)) {
      adjList.get(second).push(first);
    }
  }

  return adjList;
}

function bfs(n: number, m: number, edges: number[][], s: number): number[] {
  const adjList: Map<any, any> = buildAdjListFromEdgeList(edges, n);
  const visitedNodes = new Map<number, number>();

  const startingTravelDistance: number = 0;
  visitedNodes.set(s, startingTravelDistance)

  const queue: number[] = [ s ]

  while (queue.length > 0) {
    const dequedNode: number | undefined = queue.shift();

    if (dequedNode !== undefined) {
      const neighbours: any = adjList.get(dequedNode);
      const distanceTraveledAtCurrNode: number | undefined = visitedNodes.get(dequedNode);

      for (const neighbour of neighbours) {
        if (!visitedNodes.has(neighbour) && distanceTraveledAtCurrNode !== undefined) {
          const newDistance: number = distanceTraveledAtCurrNode + 6;

          visitedNodes.set(neighbour, newDistance);
          queue.push(neighbour);
        }
      }
    }
  }

  const finalArr: any[] = [];

  for (let i = 1; i < n + 1; i++) {
    if (i === s) {
      continue;
    }

    if (visitedNodes.has(i)) {
      finalArr.push(visitedNodes.get(i));
    } else {
      finalArr.push(-1);
    }
  }

  return finalArr;
}

// ---- tests ----

// Larger graph: 8 nodes, 7 edges, start at 1
//
//   1 ─ 2 ─ 7
//   │   │
//   3 ─ 4 ─ 5 ─ 6        8

// Final adjacency list:
//   1: [2, 3]
//   2: [1, 4, 7]
//   3: [1, 4]
//   4: [2, 3, 5]
//   5: [4, 6]
//   6: [5]
//   7: [2]
//   8: []
//
// Distances from 1 (each edge = 6):
//   2: 6   3: 6   4: 12   5: 18   6: 24   7: 12   8: -1
//
const edges1: number[][] = [
  [1, 2],
  [1, 3],
  [2, 4],
  [3, 4],
  [4, 5],
  [5, 6],
  [2, 7],
];
check('larger graph', bfs(8, 7, edges1, 1), [6, 6, 12, 18, 24, 12, -1]);
