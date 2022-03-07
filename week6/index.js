import express from "express";
import fs from "fs";

const app = express();
const port = process.env.PORT || 3000;

let artists;

// read json data and then use parse to convert it into JS object
let rawdata = fs.readFileSync("artists.json");
artists = JSON.parse(rawdata);

// render files using ejs
app.set("view engine", "ejs");

// serve public folder
app.use(express.static("views/public"));

// main route, gives back all artists if no query specified
app.get("/", (req, res) => {
  let genreArtists = {};
  if (req.query.genre) {
    let genres = req.query.genre;
    // convert comma seperated genres into a list
    genres = genres.split(",");
    for (let artist in artists) {
      for (let i = 0; i < genres.length; i++) {
        if (artists[artist]["genre"].includes(genres[i])) {
          genreArtists[artist] = artists[artist];
        }
      }
    }
  } else {
    genreArtists = artists;
  }
  res.render("main", { genreArtists });
});

app.get("/:artist", (req, res) => {
  let artist = artists[req.params.artist];
  if (artist) {
    res.render("artist", { artist, name: req.params.artist });
  } else {
    res.send("No such artist found");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
