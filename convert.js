import csv from "csvtojson";
import fs from "fs";

csv()
  .fromFile("./500audit_logs.csv")
  .then((jsonObj) => {
    fs.writeFileSync("data.json", JSON.stringify(jsonObj, null, 2));
    console.log("CSV converted to JSON!");
  });
