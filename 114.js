function countNumberOfWays(rowSize) {
  var numOfCombinations = 1;
  if (blockSize > rowSize) {
    return numOfCombinations;
  }
  if (memo[rowSize] != 0) {
    return memo[rowSize];
  }

  for (var startIndex = 0; startIndex <= rowSize - blockSize; startIndex++) {
    for (
      var realBlockSize = blockSize;
      realBlockSize <= rowSize - startIndex;
      realBlockSize++
    ) {
      numOfCombinations += countNumberOfWays(
        rowSize - startIndex - realBlockSize - 1
      );
    }
  }
  memo[rowSize] = numOfCombinations;
  return numOfCombinations;
}

function combinations(rowSize) {
  memo = new Array(rowSize + 1).fill(0);
  return countNumberOfWays(rowSize);
}
var memo = [];
const blockSize = 3;
const rowSize = 50;
console.log(
  "A row measuring " +
    rowSize +
    " in length can be filled in " +
    combinations(rowSize) +
    " ways."
);

//test
console.log(combinations(7) == 17);
console.log(combinations(50) == 16475640049);
