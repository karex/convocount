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
        const text = row["NORSK 2"]
          .replaceAll(/[^\w\s]+/g, "")
          .split(/\r?\n/)
          .filter((i: string) => i.trim() !== "");
        text.map((line: string, index: number) => {
          results.push([
            row.ID,
            text.length,
            index + 1,
            line.trim().split(/\s+/).length,
          ]);
        });
      }
    })
    .on("end", () => {
      fs.writeFileSync(resultFileName, results.join("\n") + "\n");
    });
})();
