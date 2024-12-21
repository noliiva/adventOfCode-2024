const text = await Deno.readTextFile("07/input.txt");
const equations = text.trim().split("\n");

function add(a: number, b: number) {
  return a + b;
}

function multiply(a: number, b: number) {
  return a * b;
}

function concat(a: number, b: number) {
  return Number(`${a}${b}`);
}

// PART ONE ///////////////////////////////////////////////////////////////////

function partOne() {
  let sum = 0;
  const OPERATORS = [add, multiply];

  equations.forEach((equation) => {
    const [rawTarget, rawNumbers] = equation.split(": ");
    const target = Number(rawTarget);
    const numbers = rawNumbers.split(" ").map(Number);

    let results = [numbers[0]];
    for (let i = 1; i < numbers.length; i++) {
      results = results
        .map((n) => OPERATORS.map((op) => op(n, numbers[i])))
        .flat()
        .filter((res) => res <= target);

      if (results.length === 0) break;
    }

    if (results.includes(target)) sum += target;
  });

  return sum;
}

console.log("Part One", partOne()); // sample: 3749 / input:

// PART TWO ///////////////////////////////////////////////////////////////////

function partTwo() {
  let sum = 0;
  const OPERATORS = [add, multiply, concat];

  equations.forEach((equation) => {
    const [rawTarget, rawNumbers] = equation.split(": ");
    const target = Number(rawTarget);
    const numbers = rawNumbers.split(" ").map(Number);

    let results = [numbers[0]];
    for (let i = 1; i < numbers.length; i++) {
      results = results
        .map((n) => OPERATORS.map((op) => op(n, numbers[i])))
        .flat()
        .filter((res) => res <= target);

      if (results.length === 0) break;
    }

    if (results.includes(target)) sum += target;
  });

  return sum;
}

console.log("Part Two", partTwo()); // sample: 11387 / input:
