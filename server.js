const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
console.log("hi");
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
 /* http.get("http://localhost:3000/articles", (response)=>{
    const {statusCode} = response;
    console.log(statusCode);
  }) */
});

app.post("/", function (req, res) {
 console.log(req.body.cityName);
  const query = req.body.cityName;
  const apiKey = " ";
  const units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&units=" +
    units +
    "&appid=" +
    apiKey +
    "";
  https.get(url, function (response) {
    console.log(response);
    response.on("data", function (data) {
      var weatherData = JSON.parse(data);
      var temp = weatherData.main.temp;
      var weatherDescription = weatherData.weather[0].description;
      var iconId = weatherData.weather[0].icon;
      var imgUrl = "http://openweathermap.org/img/wn/" + iconId + "@2x.png";
      res.write("<h1>The temperature in " + query + " is " + temp + "</h1>");
      res.write("<h2>now the weather is " + weatherDescription + "</h2>");
      res.write("<img src=" + imgUrl + ">");
      res.send();
    });
  });
});

/*
 */
app.listen(8000, function () {
  console.log("sever running on http://localhost:8000");
});
