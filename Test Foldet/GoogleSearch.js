const unirest = require("unirest");
const cheerio = require("cheerio");

const getOrganicData = () => {
  return unirest
    .get("https://www.google.com/search?q=${}")
    .headers({
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
    })
    .then((response) => {
      let $ = cheerio.load(response.body);
      console.log(response.status)
      let titles = [];
      let links = [];


      $(".g .yuRUbf h3").each((i, el) => {
        titles[i] = $(el).text();
      });
      $(".yuRUbf a").each((i, el) => {
        links[i] = $(el).attr("href");
      });

      const organicResults = [];

      for (let i = 0; i < titles.length; i++) {
        organicResults[i] = {
          title: titles[i],
          links: links[i],
        };
      }
      console.log(organicResults[0])
    });
};

getOrganicData();