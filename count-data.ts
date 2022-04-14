(() => {
  const folder = "./data/";
  const fs = require("fs");
  const resultFileName = "result-data.csv";

  fs.writeFileSync(resultFileName, "");

  fs.readdirSync(folder).map((file: string, index: number) => {
    const data = fs.readFileSync(`${folder}/${file}`, "utf8");
    const lines = data.split("\n");
    const results = [] as string[][];
    lines
      .filter((line: string) => line !== "")
      .map((line: string, index: number) => {
        const first = line.split(" ")[0];
        const speaker = !isNaN(Number(first))
          ? first
          : /^[A-ZØÅÆ]+$/.test(first)
          ? first
          : "N/A";
        const text = speaker === "N/A" ? line : line.substring(first.length);
        results.push([
          file,
          String(index + 1),
          speaker,
          String(
            text
              .replace(/[^\p{L}\s]+/gu, "")
              .trim()
              .split(/\s+/)
              .filter((i: string) => i).length
          ),
        ]);
      });
    fs.appendFileSync(resultFileName, results.join("\n") + "\n");
  });
})();
