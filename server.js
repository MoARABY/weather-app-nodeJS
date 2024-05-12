const express = require("express");
const axios = require("axios");
require("dotenv").config;
const app = express();
app.get("/", (req, res) => {
  const address = req.query.address;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${address}&units=metric&appid=${API_KEY}`;
  axios
    .get(url)
    .then((response) => {
      const data = response.data;
      const cityName = data.name;
      const Temp = data.main.temp;
      const SunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
      const msg = `city Name : ${cityName} <br> temp : ${Temp} <br> sunset time : ${SunsetTime}`;
      res
        .status(200)
        .send(
          `<html> <body> <div class="container"> <h1>${msg}</h1>   </div> </body> </html>`
        );
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Error Ocurred");
    });
});

//
const API_KEY = process.env.API_KEY;
// start the server
port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server start at port ${port}`);
});
