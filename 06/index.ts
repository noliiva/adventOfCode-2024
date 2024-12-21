const text = await Deno.readTextFile("06/input.txt");
const lines = text.trim().split("\n");

const DIR = {
  UP: "^",
  RIGHT: ">",
  DOWN: "v",
  LEFT: "<",
};
type Direction = typeof DIR[keyof typeof DIR];
const OBSTACLES = ["#", "O"];

function replaceChar(
  map: string[],
  line: number,
  col: number,
  newChar: string,
) {
  return [...map[line]].toSpliced(col, 1, newChar).join("");
}

function printMap(map: string[]) {
  console.log();
  map.forEach((line) => console.log(line));
}

function getStart(initialDir: Direction) {
  let line = 0;
  let col = 0;

  for (line; line < lines.length; line++) {
    const cols = lines[line];
    if (cols.includes(initialDir)) {
      col = cols.indexOf(initialDir);
      break;
    }
  }

  return [line, col];
}

function getNextPosition(line: number, col: number, dir: Direction) {
  return {
    [DIR.UP]: [line - 1, col],
    [DIR.RIGHT]: [line, col + 1],
    [DIR.DOWN]: [line + 1, col],
    [DIR.LEFT]: [line, col - 1],
  }[dir];
}

function getNextDir(currentDir: Direction) {
  const orderedDirs = Object.values(DIR);
  const currentIndex = orderedDirs.findIndex((dir) => dir === currentDir);
  const nextIndex = currentIndex + 1 > orderedDirs.length - 1
    ? 0
    : currentIndex + 1;
  return orderedDirs[nextIndex];
}

function isGuardLeaving(line: number, col: number, dir: Direction) {
  const [nextLine, nextCol] = getNextPosition(line, col, dir);

  if (
    nextLine < 0 || nextLine >= lines.length || nextCol < 0 ||
    nextCol >= lines[0].length
  ) {
    return true;
  }
  return false;
}

function isObstacle(char: string) {
  return OBSTACLES.includes(char);
}

// PART ONE ///////////////////////////////////////////////////////////////////

function partOne() {
  const copy = [...lines];

  let dir = DIR.UP;
  let [line, col] = getStart(dir);

  while (!isGuardLeaving(line, col, dir)) {
    // printMap(copy);
    const [nextLine, nextCol] = getNextPosition(line, col, dir);
    const nextChar = copy[nextLine][nextCol];

    if (isObstacle(nextChar)) {
      dir = getNextDir(dir);

      copy[line] = replaceChar(copy, line, col, dir);

      continue;
    }

    copy[line] = replaceChar(copy, line, col, "X");
    copy[nextLine] = replaceChar(copy, nextLine, nextCol, dir);

    line = nextLine;
    col = nextCol;
  }

  return copy.join("").replaceAll(/\.|#/g, "").length;
}

console.log("Part One", partOne()); // sample: 41 / input: 4778

// PART TWO ///////////////////////////////////////////////////////////////////

function getNextChar(char: string, dir?: Direction) {
  if (char === "+") return "+";

  if (
    char === "-" && (dir === DIR.UP || dir === DIR.DOWN)
  ) return "+";

  if (
    char === "|" && (dir === DIR.RIGHT || dir === DIR.LEFT)
  ) return "+";

  if (
    dir === DIR.UP || dir === DIR.DOWN
  ) return "|";

  return "-";
}

function isInLoop(encounters: Map<any, number>) {
  // console.log(encounters);
  return [...encounters.values()].some((v) => v > 1);
}

function getAllPos() {
  const allPos: string[] = [];

  let dir = DIR.UP;
  let [line, col] = getStart(dir);

  while (!isGuardLeaving(line, col, dir)) {
    // printMap(copy);
    const [nextLine, nextCol] = getNextPosition(line, col, dir);
    const nextChar = lines[nextLine][nextCol];

    if (isObstacle(nextChar)) {
      dir = getNextDir(dir);
      continue;
    }

    const key = nextLine + "_" + nextCol;
    if (!allPos.includes(key)) allPos.push(key);

    line = nextLine;
    col = nextCol;
  }

  return allPos;
}

function checkLoops(map: typeof lines) {
  const copy = [...map];
  let dir = DIR.UP;
  let [line, col] = getStart(dir);

  const encounters = new Map();

  let nbLoop = 0;
  while (
    !isGuardLeaving(line, col, dir) && !isInLoop(encounters)
  ) {
    nbLoop++;
    // if (debug) printMap(copy);

    const [nextLine, nextCol] = getNextPosition(line, col, dir);
    const nextChar = copy[nextLine][nextCol];

    if (isObstacle(nextChar)) {
      const key = line + "_" + col + "_" + dir;
      encounters.set(
        key,
        (encounters.get(key) ?? 0) + 1,
      );

      dir = getNextDir(dir);
      if (copy[line][col] !== "^") {
        copy[line] = replaceChar(copy, line, col, "+");
      }

      continue;
    }

    if (copy[line][col] !== "^") {
      copy[line] = replaceChar(
        copy,
        line,
        col,
        getNextChar(copy[line][col], dir),
      );
    }

    line = nextLine;
    col = nextCol;
  }

  // if (isInLoop(encounters)) {
  //   printMap(copy);
  // }

  return isInLoop(encounters);
}

function partTwo() {
  const startDate = Date.now();

  const allPos = getAllPos();
  let nbObs = 0;
  allPos.forEach((pos, index) => {
    const [line, col] = pos.split("_").map(Number);

    const copy = [...lines];
    copy[line] = replaceChar(copy, line, col, "O");

    if (checkLoops(copy)) {
      nbObs++;
      console.log(index, "/", allPos.length, "-", nbObs);
    } else console.log(index, "/", allPos.length);
  });

  console.log((Date.now() - startDate) / 1000, "s");

  return nbObs;
}

console.log("Part Two", partTwo()); // sample: 6 / input: 1618
