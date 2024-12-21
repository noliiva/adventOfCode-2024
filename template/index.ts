const sample = await Deno.readTextFile("XX/sample.txt");
const input = await Deno.readTextFile("XX/input.txt");

function getLines(text: string) {
  return text.trim().split("\n");
}

function getLine(text: string) {
  return text.trim().replaceAll(/\s/g, "");
}

// PART ONE ///////////////////////////////////////////////////////////////////

function partOne(rawData: string) {
  const lines = getLines(rawData);
}

console.log("=== Part One ===");
console.log("Sample", partOne(sample), partOne(sample) === 0 ? "🟢" : "🟥"); //
console.log("Input", partOne(input)); //

// PART TWO ///////////////////////////////////////////////////////////////////

function partTwo(rawData: string) {
  const lines = getLines(rawData);
}

console.log();
console.log("=== Part Two ===");
console.log("Sample", partTwo(sample), partTwo(sample) === 0 ? "🟢" : "🟥"); //
console.log("Input", partTwo(input)); //
