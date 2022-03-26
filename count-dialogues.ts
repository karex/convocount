(() => {
  const sourceFileName = "./data2/dialogues.csv";
  const fs = require("fs");
  const csv = require("csv-parser");
  const resultFileName = "result-dialogues.csv";
  const results = [] as (string | number)[][];

  fs.writeFileSync(resultFileName, "x");

  fs.createReadStream(sourceFileName)
    .pipe(csv())
    .on("data", (row: any) => {
      if (row.text) {
        const text = row.text
          .replace(/^”/, "")
          .replaceAll("”“", "”\n\r“")
          .split(/\r?\n\r?/)
          .filter((l: string) => l !== "");
        text.map((line: string, index: number) => {
          results.push([
            row.ID,
            text.length,
            index + 1,
            line.split(/ |—/).filter((w) => w !== "").length,
          ]);
        });
      }
    })
    .on("end", () => {
      fs.writeFileSync(resultFileName, results.join("\n") + "\n");
    });
})();
