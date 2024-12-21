const text = await Deno.readTextFile("02/input.txt");
const reports = text.trim().split("\n");

function isSafe(levels: number[]) {
  let wasIncreasing;
  for (let i = 0; i < levels.length - 1; i++) {
    const j = i + 1;
    const diff = levels[i] - levels[j];
    const isIncreasing = diff > 0;

    if (i === 0) wasIncreasing = isIncreasing;

    if (
      Math.abs(diff) < 1 ||
      Math.abs(diff) > 3 ||
      wasIncreasing !== isIncreasing
    ) {
      return false;
    }
  }

  return true;
}

// PART ONE ///////////////////////////////////////////////////////////////////

let nbSafeReports = 0;

reports.forEach((report) => {
  const levels = report.split(" ").map(Number);
  if (isSafe(levels)) nbSafeReports++;
});

console.log("Part One", nbSafeReports); // 269

// PART TWO ///////////////////////////////////////////////////////////////////

nbSafeReports = reports.map((report) => {
  const levels = report.split(" ").map(Number);
  // console.log("====", report, "====");

  if (isSafe(levels)) {
    // console.log("Safe");
    return true;
  }

  for (let i = 0; i < levels.length; i++) {
    // console.log(
    //   levels.toSpliced(i, 1, "_"),
    //   isSafe(
    //       levels.toSpliced(i, 1, "_"),
    //     )
    //     ? "Safe"
    //     : "Unsafe",
    // );
    if (isSafe(levels.toSpliced(i, 1))) {
      return true;
    }
  }

  // console.log(isSafe ? "Safe" : "Unsafe");
  return false;
}).filter((e) => !!e).length;

console.log("Part Two", nbSafeReports); // 337
