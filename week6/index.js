import express from "express";
import fs from "fs";
const app = express();
const port = 3000;
let artists;

let rawdata = fs.readFileSync("artists.json");
artists = JSON.parse(rawdata);

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/:artist", (req, res) => {
  let artist = artists[req.params.artist];
  if (artist) {
    res.render("artist", { artist, name: req.params.artist });
  } else {
    res.send("No such artist found");
  }
});

app.get("/artists", (req, res) => {
  if (req.query.genre) {
    let genres = req.query.genre;
    let genreArtists = {};
    genres = genres.split(",");
    for (let artist in artists) {
      for (let i = 0; i < genres.length; i++) {
        if (artists[artist]["genre"].includes(genres[i])) {
          genreArtists[artist] = artists[artist];
        }
      }
    }
    res.json(genreArtists);
  } else {
    res.json(artists);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
