function getInput() {
  // read text from URL location
  var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  var request = new XMLHttpRequest();
  request.open(
    "GET",
    "https://projecteuler.net/project/resources/p083_matrix.txt",
    true
  );
  request.send(null);
  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      var matrix = [];
      var rows = request.responseText.trim().split(/[\r\n]+/);

      for (var i = 0; i < rows.length; i++) {
        matrix.push(rows[i].split(",").map(Number));
      }
      var shortestPath = dijkstra(matrix);
      console.log("The minimal path sum is: " + shortestPath);
      console.log(shortestPath == 425185);
    }
  };
}

function dijkstra(matrix) {
  function updateNeighbor(i, j, smallestDistance) {
    if (
      i < 0 ||
      j < 0 ||
      i > numberOfRows - 1 ||
      j > numberOfCols - 1 ||
      visited[i][j]
    ) {
      return;
    }
    if (smallestDistance + matrix[i][j] < distances[i][j]) {
      distances[i][j] = smallestDistance + matrix[i][j];
      enQueue(i, j);
    }
  }

  //If a node's distance gets updated, then insert that node into queue using linear search staring from the smallest end.
  function enQueue(i, j) {
    var newNodeDistance = distances[i][j];
    for (var k = 0; k < queue.length; k++) {
      var x = queue[k][0];
      var y = queue[k][1];
      if (newNodeDistance < distances[x][y]) {
        queue.splice(k, 0, [i, j]);
        return;
      }
    }
    queue.push([i, j]);
  }

  var numberOfRows = matrix.length;
  var numberOfCols = matrix[0].length;
  var queue = [[0, 0]]; //stores the node to be visited, ordered by distance from small to large

  var distances = [...Array(numberOfCols)].map(e =>
    Array(numberOfRows).fill(Number.MAX_SAFE_INTEGER)
  ); //stores the min distance from each node to the source
  distances[0][0] = matrix[0][0];

  var visited = [...Array(numberOfCols)].map(e =>
    Array(numberOfRows).fill(false)
  ); //stores whether each node is visited or not
  while (queue.length > 0) {
    var nodeWithSmallestDistance = queue.shift();
    var i = nodeWithSmallestDistance[0];
    var j = nodeWithSmallestDistance[1];
    if (i == numberOfRows - 1 && j == numberOfCols - 1) {
      return distances[i][j];
    }
    if (visited[i][j]) {
      continue;
    }
    visited[i][j] = true;
    var smallestDistance = distances[i][j];
    updateNeighbor(i - 1, j, smallestDistance);
    updateNeighbor(i + 1, j, smallestDistance);
    updateNeighbor(i, j - 1, smallestDistance);
    updateNeighbor(i, j + 1, smallestDistance);
  }
  return distances[numberOfRows - 1][numberOfCols - 1];
}

getInput();

//test with small matrix
smallMatrix = [
  [131, 673, 234, 103, 18],
  [201, 96, 342, 965, 150],
  [630, 803, 746, 422, 111],
  [537, 699, 497, 121, 956],
  [805, 732, 524, 37, 331]
];
console.log(dijkstra(smallMatrix) == 2297);
