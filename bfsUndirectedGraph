class Graph {
  constructor() {
    this.adjacencyList = {};
    this.visitedNodes = {};
  }

  addNode(node) {
    if (!this.adjacencyList[node]) {
      this.adjacencyList[node] = [];
      this.visitedNodes[node] = false; // initialize to false to indicate it has not been visited
      return true;
    }
    return 'There is already a node with this key in the adjacency list';
  }

  addEdge(v1, v2) {
    if (this.adjacencyList[v1] && (!this.adjacencyList[v1].includes(v2) && !this.adjacencyList[v2].includes(v1))) {
      this.adjacencyList[v1].push(v2);
      this.adjacencyList[v2].push(v1);
    }
  }

  getChildNodesFromParent(parentNode) {
    const childNodes = this.adjacencyList[parentNode];
    const unvisitedChildNodes = [];
    for (const node of childNodes) {
      if (!this.visitedNodes[node]) { // Don't grab the child node if it is already visited
        unvisitedChildNodes.push(node);
      }
    }
    return unvisitedChildNodes.sort(); // Make a copy of the array before sorting it
  }

  bfs(startNode) {
    const orderNodesVisited = [];
    const queueForNodesToVisit = [startNode]; // Step 1: Initialize the queue with the starting node

    while (queueForNodesToVisit.length > 0) {
      // Step 2: Pop the first node off the queue, this is the parent node we are working with
      const parentNode = queueForNodesToVisit.shift();
      if (!this.visitedNodes[parentNode]) {
        orderNodesVisited.push(parentNode);
        const childNodesSorted = this.getChildNodesFromParent(parentNode);
        for (let node of childNodesSorted) { // Step 3: Put these sorted nodes into our queue from smallest to largest
          if (!this.visitedNodes[node]) { // Only push the nodes to visit in the queue if it is unvisted
            queueForNodesToVisit.push(node);
          }
        }
        this.visitedNodes[parentNode] = true; // Step 5: Mark the parent node as visited
      }
    }
    return orderNodesVisited;
  }
}

const undirectedGraph = new Graph();
const nodesToAdd = ['1', '4', '2', '3', '10', '9', '7', '8', '5', '6'];
const edgesToAdd = [
  {firstnode: '1', secondnode: '2'},
  {firstnode: '1', secondnode: '4'},
  {firstnode: '4', secondnode: '3'},
  {firstnode: '2', secondnode: '3'},
  {firstnode: '3', secondnode: '10'},
  {firstnode: '3', secondnode: '9'},
  {firstnode: '2', secondnode: '7'},
  {firstnode: '2', secondnode: '8'},
  {firstnode: '8', secondnode: '5'},
  {firstnode: '8', secondnode: '7'},
  {firstnode: '5', secondnode: '7'},
  {firstnode: '2', secondnode: '5'},
  {firstnode: '5', secondnode: '6'},
];


// add nodees to undirected graph
for (let node of nodesToAdd) {
  undirectedGraph.addNode(node);
}

console.log(undirectedGraph);

// add edges between nodees in undirected graph
for (let edges of edgesToAdd) {
  undirectedGraph.addEdge(edges.firstnode, edges.secondnode);
}

console.log(undirectedGraph);
const visitedNodes = undirectedGraph.bfs("1"); // Array(16) [1,2,4,3,5,7,8,3,10,9,6,7,8,8,10,9]
