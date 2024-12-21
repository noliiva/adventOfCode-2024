const text = await Deno.readTextFile("01/input.txt");
const lines = text.trim().split("\n");

// PART ONE ///////////////////////////////////////////////////////////////////

const leftList: Array<number> = [];
const rightList: Array<number> = [];

lines.forEach((line) => {
  const [a, b] = line.split(/\s+/).map(Number);
  leftList.push(a);
  rightList.push(b);
});

leftList.sort((a, b) => a - b);
rightList.sort((a, b) => a - b);

const totalDistance = leftList.map((_, index) =>
  Math.abs(leftList[index] - rightList[index])
).reduce((acc, cur) => acc + cur, 0);

console.log("Part One", totalDistance);

// PART TWO ///////////////////////////////////////////////////////////////////

const similarityScore = leftList.map((a) =>
  rightList.filter((b) => b === a).length * a
)
  .reduce((acc, cur) => acc + cur, 0);

console.log("Part Two", similarityScore);
