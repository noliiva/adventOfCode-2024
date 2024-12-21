const text = await Deno.readTextFile("05/input.txt");
const [orderingRules, updates] = text.trim().split("\n\n");
const parsedRules = orderingRules.split("\n").map((line) =>
  line.split("|").map(Number)
);
const parsedUpdates = updates.split("\n").map((line) =>
  line.split(",").map(
    Number,
  )
);

// PART ONE ///////////////////////////////////////////////////////////////////

function partOne() {
  const rightUpdates = parsedUpdates.filter((update) => {
    // console.log("===", update, "===");
    for (let i = 1; i < update.length; i++) {
      const page = update[i];
      const page2s = new Set(
        parsedRules.filter(([page1]) => page1 === page).map((
          [, page2],
        ) => page2),
      );

      const previousPages = new Set(update.slice(0, i));
      // console.log(page, [...page2s], [...previousPages], [
      //   ...previousPages.intersection(page2s),
      // ]);
      if (previousPages.intersection(page2s).size > 0) return false;
    }

    return true;
  });

  const sum = rightUpdates.reduce(
    (acc, pages) => acc + pages[Math.floor(pages.length / 2)],
    0,
  );

  return sum;
}

console.log("Part One", partOne()); // sample:  / input:

// PART TWO ///////////////////////////////////////////////////////////////////

function partTwo() {
  let sum = 0;

  parsedUpdates.forEach((update) => {
    // console.log(update);

    let wasWrong = false;
    let fixedUpdate: number[] = [];
    for (let i = 0; i < update.length; i++) {
      const page = update[i];
      const page2s = new Set(
        parsedRules.filter(([page1]) => page1 === page).map((
          [, page2],
        ) => page2),
      );

      const previousPages = fixedUpdate.slice(0, i);
      const error = [...new Set(previousPages).intersection(page2s)][0];
      if (error) {
        wasWrong = true;
        const errorIndex = previousPages.findIndex((p) => p === error);
        fixedUpdate = previousPages.toSpliced(errorIndex, 1, page, error);
        continue;
      }

      fixedUpdate.push(page);
    }

    // console.log(fixedUpdate, "\n");
    if (wasWrong) sum += fixedUpdate[Math.floor(update.length / 2)];
  });

  return sum;
}

console.log("Part Two", partTwo()); // sample:  / input:
