import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";

dotenv.config();
const app = express();

app.use(cors()); //allow front-end access

const API = 

// route for movies
app.get("/api/movies", async (req, res) => {
  try {
    const year = req.query.year || "2025";
    console.log(req.query)
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${process.env.API_KEY}&year=${year}`;
    const response = await axios.get(url)
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

// route for  movie by id
app.get("/api/movie/:id", async (req, res) => {
  try {
    const movidID = req.params.id || 1061474;
    console.log(req.query)
    const url = `https://api.themoviedb.org/3/movie/${movidID}?language=en-US&api_key=${process.env.API_KEY}`;
    const response = await axios.get(url)
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

// route for trailer video by id
app.get("/api/movie/trailer/:id", async (req, res) => {
  try {
    const movidID = req.params.id || 1061474;
    console.log(req.query)
    const url = `https://api.themoviedb.org/3/movie/${movidID}/videos?language=en-US&api_key=${process.env.API_KEY}`;
    const response = await axios.get(url)
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});


app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
