const text = await Deno.readTextFile("03/input.txt");
const corruptedMemory = text.trim().replace(/\s/g, "");

// PART ONE ///////////////////////////////////////////////////////////////////

function partOne() {
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

  return [...corruptedMemory.matchAll(regex)].reduce(
    (acc, [_, a, b]) => {
      // console.log(a, "*", b);
      return acc + Number(a) * Number(b);
    },
    0,
  );
}

console.log("Part One", partOne()); // sample: 161 / input: 184511516

// PART TWO ///////////////////////////////////////////////////////////////////

function partTwo() {
  let sum = 0;

  const enabledPartsRegex = /(?:^|do\(\)).*?(?:don't\(\)|$)/g;
  const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;

  [...corruptedMemory.matchAll(enabledPartsRegex)].forEach(
    ([commandBlock]) => {
      sum += [...commandBlock.matchAll(mulRegex)].reduce(
        (acc, [_, a, b]) => {
          // console.log(a, "*", b);
          return acc + Number(a) * Number(b);
        },
        0,
      );
    },
    0,
  );

  return sum;
}

// For loop with enabled bool
function partTwoBis() {
  let sum = 0;

  const regex = /do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\)/g;

  const matches = corruptedMemory.match(regex);
  if (!matches) return 0;

  let enabled = true;
  for (let i = 0; i < matches.length; i++) {
    const op = matches[i];

    if (op === "do()") {
      enabled = true;
    } else if (op === "don't()") {
      enabled = false;
    } else if (enabled) {
      sum += [...op.matchAll(regex)].reduce(
        (acc, [_, a, b]) => acc + Number(a) * Number(b),
        0,
      );
    }
  }

  return sum;
}

// Remove all disabled parts before getting all mul
function partTwoAlt() {
  const parsedMemory = corruptedMemory.replaceAll(/don't\(\).*?do\(\)/g, "");
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

  return [...parsedMemory.matchAll(regex)].reduce(
    (acc, [_, a, b]) => {
      // console.log(a, "*", b);
      return acc + Number(a) * Number(b);
    },
    0,
  );
}

console.log("Part Two", partTwo()); // sample: 48 / input: 90044227
