const text = (await Deno.readTextFile("04/input.txt")).trim();

// PART ONE ///////////////////////////////////////////////////////////////////

function partOne() {
  let sum = 0;

  const lines = text.split("\n");
  const nbLines = lines.length;
  const nbCols = lines[0].length;

  lines.forEach((line) => {
    sum += [...line.matchAll(/XMAS/g)].length;
    sum += [...line.matchAll(/SAMX/g)].length;
  });

  const cols = Array.from(
    { length: nbCols },
    (_, i) => lines.reduce((acc, line) => acc = acc + line[i], ""),
  );
  cols.forEach((col) => {
    sum += [...col.matchAll(/XMAS/g)].length;
    sum += [...col.matchAll(/SAMX/g)].length;
  });

  for (let line = 0; line < nbLines; line++) {
    for (let col = 0; col < nbCols; col++) {
      if (lines[line][col] !== "X") continue;

      if (
        lines?.[line - 3]?.[col - 3] === "S" &&
        lines?.[line - 2]?.[col - 2] === "A" &&
        lines?.[line - 1]?.[col - 1] === "M"
      ) sum++;

      if (
        lines?.[line - 3]?.[col + 3] === "S" &&
        lines?.[line - 2]?.[col + 2] === "A" &&
        lines?.[line - 1]?.[col + 1] === "M"
      ) sum++;

      if (
        lines?.[line + 3]?.[col + 3] === "S" &&
        lines?.[line + 2]?.[col + 2] === "A" &&
        lines?.[line + 1]?.[col + 1] === "M"
      ) sum++;

      if (
        lines?.[line + 3]?.[col - 3] === "S" &&
        lines?.[line + 2]?.[col - 2] === "A" &&
        lines?.[line + 1]?.[col - 1] === "M"
      ) sum++;
    }
  }

  return sum;
}

console.log("Part One", partOne()); // sample: 18 / input: 2514

// PART TWO ///////////////////////////////////////////////////////////////////

function partTwo() {
  let sum = 0;

  const lines = text.split("\n");
  const nbLines = lines.length;
  const nbCols = lines[0].length;

  for (let line = 0; line < nbLines; line++) {
    for (let col = 0; col < nbCols; col++) {
      if (lines[line][col] !== "A") continue;

      if (
        ((
          lines?.[line - 1]?.[col - 1] === "M" &&
          lines?.[line + 1]?.[col + 1] === "S"
        ) || (
          lines?.[line - 1]?.[col - 1] === "S" &&
          lines?.[line + 1]?.[col + 1] === "M"
        )) &&
        ((
          lines?.[line - 1]?.[col + 1] === "M" &&
          lines?.[line + 1]?.[col - 1] === "S"
        ) || (
          lines?.[line - 1]?.[col + 1] === "S" &&
          lines?.[line + 1]?.[col - 1] === "M"
        ))
      ) sum++;
    }
  }

  return sum;
}

console.log("Part Two", partTwo()); // sample: 9 / input: 1888
