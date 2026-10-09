const depthFirstIterative = (graph: any, startingNode: any) => {
  const stack: any[] = [ startingNode ];

  while (stack.length > 0) {
    const current: any = stack.pop();

    console.log(`Traversing Node: ${current}`);

    const adjacentNodesToCurrent: any = graph[current];

    for (const neighbour of adjacentNodesToCurrent) {
      stack.push(neighbour);
    }
  }
};

const depthFirstRecursive = (graph: any, sourceNode: any) => {
  console.log(`sourceNode: ${sourceNode}`);
  const adjacentNodesToSourceNode: any = graph[sourceNode]

  for (const neighbour of adjacentNodesToSourceNode) {
    depthFirstRecursive(graph, neighbour);
  }
}

const breadthFirstTraversal = (graph: any, startingNode: any) => {
  const queue: any[] = [ startingNode ];

  while (queue.length > 0) {
    const currStartQueue: any = queue.shift();

    console.log(`Traversing Node: ${currStartQueue}`);

    const adjacentNodesToCurrent: any = graph[currStartQueue];

    for (const neighbour of adjacentNodesToCurrent) {
      queue.push(neighbour);
    }
  }
}

const graph: any = {
  a: ['b', 'c'],
  b: ['d'],
  c: ['e'],
  d: ['f'],
  e: [],
  f: []
};

depthFirstIterative(graph, 'a');
depthFirstRecursive(graph, 'a');
breadthFirstTraversal(graph, 'a');