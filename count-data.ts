(() => {
  const folder = "./data/";
  const fs = require("fs");
  const resultFileName = "result-data.csv";
  const resultJoinedFileName = "result-data-joined.csv";

  fs.writeFileSync(resultFileName, "");
  fs.writeFileSync(resultJoinedFileName, "");

  fs.readdirSync(folder).map((file: string, index: number) => {
    const data = fs.readFileSync(`${folder}/${file}`, "utf8");
    const lines = data.split("\n");
    const results = [] as string[][];
    const resultsJoined = [] as string[][];
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
        const resultLine = [
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
        ];
        results.push([...resultLine]);
        resultsJoined.length > 0 &&
        resultsJoined[resultsJoined.length - 1][2] === speaker
          ? (resultsJoined[resultsJoined.length - 1][3] = String(
              Number(resultsJoined[resultsJoined.length - 1][3]) +
                Number(resultLine[3])
            ))
          : resultsJoined.push([...resultLine]);
      });
    fs.appendFileSync(resultFileName, results.join("\n") + "\n");
    fs.appendFileSync(resultJoinedFileName, resultsJoined.join("\n") + "\n");
  });
})();
