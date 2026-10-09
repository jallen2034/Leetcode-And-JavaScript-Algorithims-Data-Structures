// Shared helpers for adjacency-list graph problems in this folder.
//
//   import { AdjacencyList, edgeListToAdjList, check } from './helpers.ts';
//
// Grid/matrix problems (islands, rotting oranges, snakes & ladders) live in
// ../grids and have their own helpers there.
//
// Run any problem file directly: node <file>.ts

// The usual "graph as a plain object" shape, e.g. { a: ['b'], b: ['a'] }.
// Keys default to strings; use AdjacencyList<number> for numeric graphs.
export type AdjacencyList<T extends string | number = string> = Record<T, T[]>;

// UNDIRECTED edge list → adjacency list: [a, b] adds b to a's neighbours AND a to b's.
// Only nodes that appear in an edge get a key — isolated nodes won't be present.
export const edgeListToAdjList = <T extends string | number>(edges: T[][]): Record<T, T[]> => {
  const adjList = new Map<T, T[]>();

  for (const [a, b] of edges) {
    if (!adjList.has(a)) {
      adjList.set(a, []);
    }

    if (!adjList.has(b)) {
      adjList.set(b, []);
    }

    adjList.get(a)!.push(b);
    adjList.get(b)!.push(a);
  }

  return Object.fromEntries(adjList) as Record<T, T[]>;
};

// LeetCode-style graph node (cloneGraph etc): a value plus neighbour POINTERS.
export class GraphNode {
  val: number;
  neighbors: GraphNode[];

  constructor(val: number = 0, neighbors: GraphNode[] = []) {
    this.val = val;
    this.neighbors = neighbors;
  }
}

// LeetCode's test format → real GraphNode graph.
// adjList[i] lists the neighbours of node i + 1 (nodes are numbered from 1).
export const buildNodeGraph = (adjList: number[][]): GraphNode | null => {
  if (adjList.length === 0 || (adjList.length === 1 && adjList[0].length === 0)) {
    if (adjList.length === 1) return new GraphNode(1, []);
    return null;
  }

  const nodes: GraphNode[] = [];

  for (let i = 1; i <= adjList.length; i++) {
    nodes[i] = new GraphNode(i);
  }

  for (let i = 0; i < adjList.length; i++) {
    for (const neighborVal of adjList[i]) {
      nodes[i + 1].neighbors.push(nodes[neighborVal]);
    }
  }

  return nodes[1];
};

// GraphNode graph → back to LeetCode's adjacency list format (sorted, for comparing).
export const nodeGraphToAdjList = (node: GraphNode | null): number[][] => {
  if (!node) return [];

  const visited = new Map<number, GraphNode>();
  const queue: GraphNode[] = [node];
  visited.set(node.val, node);

  while (queue.length > 0) {
    const curr = queue.shift()!;

    for (const neighbor of curr.neighbors) {
      if (!visited.has(neighbor.val)) {
        visited.set(neighbor.val, neighbor);
        queue.push(neighbor);
      }
    }
  }

  const result: number[][] = [];
  const sortedKeys = Array.from(visited.keys()).sort((a, b) => a - b);

  for (const key of sortedKeys) {
    const n = visited.get(key)!;
    result.push(n.neighbors.map(nb => nb.val).sort((a, b) => a - b));
  }

  return result;
};

export const check = (label: string, actual: unknown, expected: unknown): void => {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${pass ? 'PASS' : 'FAIL'} ${label}: got ${JSON.stringify(actual)}, expected ${JSON.stringify(expected)}`);
};
