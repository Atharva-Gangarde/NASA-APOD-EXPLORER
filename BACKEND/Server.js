require("dotenv").config({ path: "./.env" });
const express = require("express");
const axios = require("axios");
const NodeCache = require("node-cache");
const cors = require("cors");
const ejs=require("ejs");
const path=require("path");

const app = express();

app.set("view engine","ejs");
app.use(cors());
app.use(express.json());


const cache = new NodeCache({ stdTTL: 3600 });

const PORT = process.env.PORT || 3000;
const NASA_KEY = process.env.NASA_KEY;
const BASE_URL = "https://api.nasa.gov/planetary/apod";

app.get("/",(req,resp)=>{
  resp.render("index.ejs");
})

async function getCachedData(cacheKey, url) {
  if (cache.has(cacheKey)) {
    console.log("Fetching from cache:", cacheKey);
    return cache.get(cacheKey);
  }

  console.log("Fetching from NASA API:", cacheKey);

  const response = await axios.get(url);
  const data = response.data;

  cache.set(cacheKey, data);
  return data;
}



app.get("/api/today", async (req, res) => {
  try {
    const url = `${BASE_URL}?api_key=${NASA_KEY}`;
    const data = await getCachedData("today", url);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch today's APOD" });
  }
});



app.get("/api/date", async (req, res) => {
  const date = req.query.d;

  if (!date) {
    return res.status(400).json({ error: "Provide date as ?d=YYYY-MM-DD" });
  }

  try {
    const url = `${BASE_URL}?api_key=${NASA_KEY}&date=${date}`;
    const data = await getCachedData(`date-${date}`, url);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch APOD for date" });
  }
});



app.get("/api/recent", async (req, res) => {
  try {
    const today = new Date();
    const start = new Date();
    start.setDate(today.getDate() - 10);

    const url = `${BASE_URL}?api_key=${NASA_KEY}&start_date=${start
      .toISOString()
      .split("T")[0]}&end_date=${today.toISOString().split("T")[0]}`;

    const data = await getCachedData("recent", url);
    res.json(data.reverse()); 
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch recent APODs" });
  }
});



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log("NASA KEY =", process.env.NASA_KEY);

});