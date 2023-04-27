/* This function calculates the distance between two points in a two-dimensional 
 * coordinate system using the Pythagorean theorem. */
const dist = function(p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

// Brute force approach. O(n2). This function finds the pair of points that are closest to each other in a set of points.
const findClosestPair = function(points) {
  let distance = Infinity;  // Initialize the distance variable to infinity.
  let xm, ym; // Initialize variables to keep track of the two closest points.

  // Initialize xm and ym to the first two points in the array representing our cartesian coordinate system.
  xm = points[0];
  ym = points[1];

  // Loop through the points array to compare each point with every other point to find the two closest points.
  for (let i = 0; i < points.length - 1; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const d = dist(points[i], points[j]); // Calculate the distance between the current pair of points.
      if (d < distance) { // If this distance is less than the current smallest distance, update the smallest distance and the closest points.
        distance = d;
        xm = points[i];
        ym = points[j]
      }
    }
  }

  // Return an object containing the two closest points we found.
  return { xm, ym };
}

// This set represents the points on a cartesian coordinate system.
const pointSet = new Set([
  { x: 1, y: 2 },
  { x: 3, y: 4 },
  { x: 5, y: 1 },
  // add more points as needed
]);

const pointArray = Array.from(pointSet); // Convert the set of points to an array.
const closestDistance = findClosestPair(pointArray); // Find the pair of points closest to each other.
