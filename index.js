const express = require("express");
const app = express();
const port = 5500;
const bodyParser = require("body-parser");
const scrapers = require("../scrapers");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // disabled for security on local
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.listen(port, () =>
  console.log(`JobScrape listening at http://localhost:${port}`)
);

app.post("/something", async (req, res) => {
  console.log(req.body);
  const jobData = await scrapers.scrapeChannel(req.body.customURL);
  res.send({ jobData });
});
