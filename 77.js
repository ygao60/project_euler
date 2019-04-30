function isPrime(n) {
  var smallerFactor = Math.floor(Math.sqrt(n));
  for (var i = 2; i <= smallerFactor; i += 1) {
    if (n % i == 0) {
      return false;
    }
  }
  return true;
}

//generate a list of primes that is less than or equal to maxNumber
function generatePrimes() {
  var primes = [];

  for (var i = 2; i <= maxNumber; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }
  return primes;
}

//fine the largest prime number that is less than or equal to limit
function largestPrimeNoMoreThanNumber(limit) {
  if (limit < 2) {
    return null;
  }
  for (var i = 0; i < primes.length; i++) {
    if (primes[i] > limit) {
      return primes[i - 1];
    }
  }
  return primes[primes.length - 1];
}

//Calculate number of ways number can be written as the sum of primes using primes than is less or equal to limit
function numberOfWays(number, limit) {
  if (limit > number) {
    return numberOfWays(number, number);
  }
  if (number == 0) {
    return 1;
  }
  if (limit < 2) {
    return 0;
  }
  var currentPrime = largestPrimeNoMoreThanNumber(limit);
  var numOfWays = 0;
  while (number >= 0) {
    numOfWays += numberOfWays(number, currentPrime - 1);
    number -= currentPrime;
  }
  return numOfWays;
}

function primeSummations() {
  for (i = 2; i < maxNumber; i++) {
    if (numberOfWays(i, i) > target) {
      console.log(
        "The first value that can be written as the sum of primes in over " +
          target +
          " different ways is: " +
          i
      );
      break;
    }
  }
  return i;
}

var startExecutionTime = new Date();
const target = 5000;
const maxNumber = 1000;
var primes = generatePrimes();
var firstNum = primeSummations();

var endExecutionTime = new Date();
console.log(
  "The execution time is: " +
    (endExecutionTime - startExecutionTime) +
    " milliseconds."
);

console.log(firstNum == 71);
//test with small input
console.log(numberOfWays(10, 10) == 5);
console.log(numberOfWays(2, 2) == 1);

console.log(largestPrimeNoMoreThanNumber(2) == 2);
console.log(largestPrimeNoMoreThanNumber(10) == 7);
