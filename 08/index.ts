const sample = await Deno.readTextFile("08/sample.txt");
const input = await Deno.readTextFile("08/input.txt");

function getLines(text: string) {
  return text.trim().split("\n");
}

type Coord = [number, number];
function printAntinodes(lines: string[], antinodes: string[]) {
  const copy = [...lines];

  antinodes.forEach((coord) => {
    const [line, col] = coord.split(",").map(Number);
    const char = lines[line][col];
    // console.log(coord, char);
    if (char === ".") {
      // console.log(line, copy[line]);
      copy[line] = [...copy[line]].toSpliced(col, 1, "#").join("");
      // console.log(line, copy[line]);
    }
  });

  copy.forEach((line) => console.log(line));
}

// PART ONE ///////////////////////////////////////////////////////////////////

function partOne(rawData: string) {
  const lines = getLines(rawData);
  const nbLines = lines.length;
  const nbCols = lines[0].length;

  const frequencies = [
    ...new Set(lines.join("").replaceAll(".", "").split("")),
  ];

  const antennas: Record<string, [number, number][]> = {};
  const antinodes = new Set();
  frequencies.forEach((freq) => {
    antennas[freq] = [];

    for (let line = 0; line < nbLines; line++) {
      for (let col = 0; col < nbCols; col++) {
        const char = lines[line][col];
        if (char === freq) antennas[freq].push([line, col]);
      }
    }

    antennas[freq].forEach((a, i) => {
      const otherAntennas = antennas[freq].toSpliced(i, 1);
      // console.log(freq, a, otherAntennas);

      otherAntennas.forEach((b) => {
        // calc vector
        const [lineA, colA] = a;
        const [lineB, colB] = b;

        const y = lineB - lineA;
        const x = colB - colA;

        // console.log("===");
        // console.log(freq, a, b);
        // console.log([lineA - y, colA - x]);
        // console.log([lineB + y, colB + x]);

        // get antinodes that aren't out of bounds
        ([
          [lineA - y, colA - x],
          [lineB + y, colB + x],
        ] as const).filter(([line, col]) =>
          line >= 0 && line < nbLines && col >= 0 && col < nbCols
        ).forEach(([line, col]) => antinodes.add(line + "," + col));

        // console.log(antinodes);
      });
    });
  });

  // console.log(frequencies);
  // console.log(antennas);
  // console.log(antinodes);
  // printAntinodes(lines, [...antinodes]);

  return antinodes.size;
}

console.log("=== Part One ===");
console.log("Sample", partOne(sample)); // 14
console.log("Input", partOne(input)); //

// PART TWO ///////////////////////////////////////////////////////////////////

function partTwo(rawData: string) {
  const lines = getLines(rawData);
  const nbLines = lines.length;
  const nbCols = lines[0].length;

  const frequencies = [
    ...new Set(lines.join("").replaceAll(".", "").split("")),
  ];

  const antennas: Record<string, [number, number][]> = {};
  const antinodes = new Set();
  frequencies.forEach((freq) => {
    antennas[freq] = [];

    for (let line = 0; line < nbLines; line++) {
      for (let col = 0; col < nbCols; col++) {
        const char = lines[line][col];
        if (char === freq) antennas[freq].push([line, col]);
      }
    }

    antennas[freq].forEach((a, i) => {
      const otherAntennas = antennas[freq].toSpliced(i, 1);
      // console.log(freq, a, otherAntennas);

      otherAntennas.forEach((b) => {
        // calc vector
        const [lineA, colA] = a;
        const [lineB, colB] = b;

        const y = lineB - lineA;
        const x = colB - colA;

        // Inline antennas become antinodes
        antinodes.add(a[0] + "," + a[1]);
        antinodes.add(b[0] + "," + b[1]);

        // Get antinodes derived from point A
        let coord = [...a];
        let inbounds = true;
        while (inbounds) {
          const line = coord[0] - y;
          const col = coord[1] - x;
          inbounds = line >= 0 && line < nbLines && col >= 0 && col < nbCols;

          if (inbounds) {
            antinodes.add(line + "," + col);
            coord = [line, col];
          }
        }

        // Get antinodes derived from point B
        coord = [...b];
        inbounds = true;
        while (inbounds) {
          const line = coord[0] + y;
          const col = coord[1] + x;
          inbounds = line >= 0 && line < nbLines && col >= 0 && col < nbCols;

          if (inbounds) {
            coord = [line, col];
            antinodes.add(line + "," + col);
          }
        }
      });
    });
  });

  // console.log(antinodes);
  // printAntinodes(lines, [...antinodes]);

  return antinodes.size;
}

console.log();
console.log("=== Part Two ===");
console.log("Sample", partTwo(sample)); // 34
console.log("Input", partTwo(input)); //
