const folder = "./data/";
const fs = require("fs");

fs.writeFileSync("result.csv", "");

fs.readdirSync(folder).map((file: string, index: number) => {
  const data = fs.readFileSync(`${folder}/${file}`, "utf8");
  const lines = data.split("\n");
  const results = [] as string[][];
  lines
    .filter((line: string) => line !== "")
    .map((line: string, index: number) =>
      results.push([
        file,
        String(index),
        line.split(" ")[0],
        String(
          line
            .split(" ")
            .filter(
              (e: string, i: number) =>
                i > 0 && !["?", "'", '"', "...", "*", "-", "#"].includes(e)
            ).length
        ),
      ])
    );
  fs.appendFileSync("result.csv", results.join("\n"));
});
