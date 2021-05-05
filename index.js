const fetch = require("node-fetch");
const cheerio = require("cheerio");
import Discord from 'discord.js';

if (!globalThis.fetch) globalThis.fetch = fetch;

const client = new Discord.WebhookClient(id, token);

let main = async () => {
  fetch("https://droptracker.ca/showstock.php")
    .then((response) => {
      if (response.ok) return response.text();
      throw response;
    })
    .then((text) => {
      var $ = cheerio.load(text);
      $(".table > tbody > tr").each((index,element) => {
        let entry = $(element).text().trim().split("\n").map((original)=>{return original.trim()})
        console.log(entry);
      })
      // console.log($("tr")[0].children[0]);
    })
    .catch((err) => {
      console.log(err);
    });
};

main();
