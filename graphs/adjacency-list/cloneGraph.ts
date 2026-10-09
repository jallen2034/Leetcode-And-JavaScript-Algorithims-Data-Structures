// LeetCode 133: Clone Graph
// Return a DEEP COPY of a connected undirected graph: every node and every edge
// recreated with new GraphNode objects.

import { GraphNode, buildNodeGraph, nodeGraphToAdjList, check } from './helpers.ts';

function cloneGraph(node: GraphNode | null): any {
  if (!node) {
    return null;
  }

  const stackForDFS: GraphNode[] = [node];
  const copiedStartingNode = new GraphNode(node.val);
  const trackerMap = new Map<GraphNode, GraphNode>();

  trackerMap.set(node, copiedStartingNode);

  while (stackForDFS.length > 0) {
    const currOriginalNode: GraphNode | undefined  = stackForDFS.pop();

    if (!currOriginalNode) {
      return null;
    }

    const clonedOriginalNode: GraphNode | undefined = trackerMap.get(currOriginalNode);

    if (clonedOriginalNode) {
      for (let adjacentOriginalNode of currOriginalNode.neighbors) {
        if (!trackerMap.has(adjacentOriginalNode)) {

          const copiedAdjNode = new GraphNode(adjacentOriginalNode.val);

          copiedAdjNode.neighbors.push(clonedOriginalNode);
          clonedOriginalNode.neighbors.push(copiedAdjNode);

          stackForDFS.push(adjacentOriginalNode);
          trackerMap.set(adjacentOriginalNode, copiedAdjNode);
        } else {
          const exisingNeighbourClone: GraphNode | undefined = trackerMap.get(adjacentOriginalNode);

          if (exisingNeighbourClone && !clonedOriginalNode.neighbors.includes(exisingNeighbourClone)) {
            exisingNeighbourClone.neighbors.push(clonedOriginalNode);
            clonedOriginalNode.neighbors.push(exisingNeighbourClone);
          }
        }
      }
    }
  }

  return trackerMap.get(node);
}

// ---- tests ----

// Test 1 Visual: A 4-node diamond/square cycle
//
//     (1) ------- (2)
//      |           |
//      |           |
//     (4) ------- (3)
//
// Node 1 connects to 2 and 4.
// Node 2 connects to 1 and 3.
// Node 3 connects to 2 and 4.
// Node 4 connects to 1 and 3.
//                          // 1    // 2   // 3    // 4
const input1 = [[2, 4], [1, 3], [2, 4], [1, 3]];
const cloned1 = cloneGraph(buildNodeGraph(input1));

check('example 1 (diamond)', nodeGraphToAdjList(cloned1), input1);
