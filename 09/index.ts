const sample = await Deno.readTextFile("09/sample.txt");
const input = await Deno.readTextFile("09/input.txt");

function getLines(text: string) {
  return text.trim().split("\n");
}

function getLine(text: string) {
  return text.trim().replaceAll(/\s/g, "");
}

// PART ONE ///////////////////////////////////////////////////////////////////

function getBlocks(files: Array<string[]>, freeSpaces: Array<string[]>) {
  return files.map((file, i) => file.concat(freeSpaces[i])).flat()
    .join("");
}

function compacted(blocks: string) {
  return blocks.match(/^\d*\.*$/);
}

// function partOne(rawData: string) {
//   const line = getLine(rawData);

//   const files: Array<string[]> = [];
//   const freeSpaces: Array<string[]> = [];

//   line.split("").forEach((char, i) => {
//     const nb = Number(char);

//     if (i % 2 === 0) {
//       files.push(Array.from({ length: nb }, () => files.length.toString()));
//     } else {
//       if (nb === 0) return;
//       freeSpaces.push(Array.from({ length: nb }, () => "."));
//     }
//   });

//   // let blocks = getBlocks(files, freeSpaces).split("");
//   // let trail = [];

//   // let i = 0;
//   // let count = 0;
//   // while (!compacted(blocks.join(""))) {
//   //   // console.log(blocks.concat(trail).join(""));

//   //   const char = blocks[i];

//   //   if (char === ".") {
//   //     console.log(count++, "/", freeSpaces.flat().length);

//   //     let fileChar = ".";
//   //     while (fileChar === ".") {
//   //       fileChar = blocks.pop()!;
//   //       trail.push(".");
//   //     }

//   //     blocks[i] = fileChar!;
//   //   }

//   //   i++;
//   // }
//   // console.log(blocks.concat(trail).join(""));
//   // console.log(files.pop());
//   let filesCopy = [...files];
//   let freeSpacesCopy = [...freeSpaces];
//   // console.log(files.length, freeSpaces.length);

//   const blocks = [filesCopy.shift()!];

//   let file: string[] | undefined = filesCopy.pop();
//   let freeSpace: string[] | undefined = freeSpacesCopy.shift();

//   let debug = 0;
//   while (
//     (freeSpacesCopy.length > 0 && filesCopy.length > 0) ||
//     (freeSpace?.length && file?.length)
//   ) {
//     // console.log({ blocks, filesCopy, freeSpacesCopy });
//     // console.log(blocks.flat().join(""));

//     let filledSpace: string[] = [];
//     while (file && filledSpace.length < freeSpace.length) {
//       if (file.length > 0) filledSpace = filledSpace.concat(file.pop());
//       else {
//         debug++;
//         file = filesCopy.pop();
//         freeSpacesCopy.pop();
//       }
//       // console.log({ file, filledSpace, freeSpace });
//     }
//     // console.log("===");
//     freeSpace = freeSpacesCopy.shift();
//     blocks.push(filledSpace);
//     blocks.push(filesCopy.shift()!);
//   }
//   // console.log({ filesCopy, file, freeSpacesCopy, freeSpace });
//   console.log(debug);

//   if (filesCopy.length) blocks.push(...filesCopy);
//   if (file) blocks.push(file);

//   const checksum = blocks.flat().reduce(
//     (acc, cur, index) => acc + Number(cur) * index,
//     0,
//   );

//   return checksum;
// }

function getCheckSum(blocks: string[]) {
  return blocks.reduce(
    (acc, cur, index) => acc + (Number(cur) * index),
    0,
  );
}

function partOne(rawData: string) {
  const line = getLine(rawData);
  // console.log(line);

  let index = -1;
  const full = line.split("").map((char, i) => {
    const nb = Number(char);

    if (i % 2 === 0) {
      index++;
      return Array.from({ length: nb }, () => index.toString());
    } else {
      if (nb === 0) return "";
      return Array.from({ length: nb }, () => ".");
    }
  }).filter((c) => c !== "").flat();
  // console.log(full);

  // const fileNumbers = full.join("").replaceAll(/\./g, "").split("");
  const fileNumbers = full.filter((char) => char !== ".");
  // const nbIterations = full.join("").replaceAll(/\d/g, "").length - 2;
  const nbIterations = full.filter((char) => char === ".").length - 2;
  // console.log(fileNumbers, nbIterations);

  const blocks: Array<string[]> = [];

  index = 0;
  let i = 0;
  while (i < nbIterations && fileNumbers.length) {
    const nb = Number(line[i]);

    let a;
    if (i % 2 === 0) { // if file numbers
      a = Array.from({ length: nb }, () => index.toString());
      blocks.push(a);
      fileNumbers.splice(0, nb); // remove added numbers
      index++;
    } else if (nb > 0) { // if white spaces
      if (i === 1) {
        console.log(fileNumbers.slice(-nb));
      }
      a = Array.from({ length: nb }, () => {
        const fileNumber = fileNumbers.pop() as string;
        return fileNumber;
      });
      blocks.push(a);
    }

    i++;
  }

  // console.log(
  //   "remaining file numbers",
  //   fileNumbers,
  // );
  console.log(fileNumbers.length, fileNumbers[fileNumbers.length - 1]);
  if (fileNumbers.length) blocks.push(fileNumbers);

  console.log(
    blocks.flat().length === full.filter((char) => char !== ".").length,
  );
  // console.log(blocks.flat()[blocks.flat().length - 1]);
  // console.log(blocks.flat()/* .join("") */);

  return getCheckSum(blocks.flat());
}

console.log("=== Part One ===");

const sample1Res = partOne(sample);
console.log("Sample", sample1Res === 1928 ? "✔️ " : "❌", sample1Res); // 1928

const input1Res = partOne(input);
console.log(
  "Input ",
  (input1Res >= 15665140394652 || input1Res === 6330359520666) ? "❌" : "🆕",
  input1Res,
); //

// PART TWO ///////////////////////////////////////////////////////////////////

// function partTwo(rawData: string) {
//   const line = getLine(rawData);
// }

// console.log();
// console.log("=== Part Two ===");

// const sample2Res = partTwo(sample);
// console.log("Sample", sample2Res === 0 ? "✔️ " : "❌", sample2Res); //

// const input2Res = partOne(input);
// console.log("Input ", input2Res >= 0 ? "❌" : "🆕", input2Res); //
