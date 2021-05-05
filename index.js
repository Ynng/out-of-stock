const fetch = require("node-fetch");
const cheerio = require("cheerio");

if (!globalThis.fetch) globalThis.fetch = fetch;

let main = async () => {
  fetch("https://droptracker.ca/showstock.php")
    .then((response) => {
      if (response.ok) return response.text();
      throw response;
    })
    .then((text) => {
      var $ = cheerio.load(text);
      $(".table > tbody > tr > td:nth-child(1)").each((index,element) => {
        console.log(`${index}: ${$(element).text().trim()}`)
      })
      // console.log($("tr")[0].children[0]);
    })
    .catch((err) => {
      console.log(err);
    });
};

main();
