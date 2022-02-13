import fetch from "node-fetch";
import "dotenv/config";
import { URLSearchParams, fileURLToPath } from "url";
import express from "express";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 8888;
app.use(express.static(__dirname));
app.use(express.static("public"));

let client_id = process.env.CLIENT_ID;
let client_secret = process.env.CLIENT_SECRET;
let redirect_uri = "https://connectify-connlab.herokuapp.com/callback";
let user;

// program to generate random strings for Spotify API state

// declare all characters
const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateRandomString(length) {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
// generate random 16 character state to prevent intereception
const state = generateRandomString(16);
// Creating and initializing
// URLSearchParams object
const params = new URLSearchParams();

// Appending value in the object
params.append("response_type", "code");
params.append("client_id", client_id);
params.append("scope", "user-top-read");
params.append("state", state);
params.append("redirect_uri", redirect_uri);
params.append("show_dialog", "true");

// Getting string representation
// by using toString() api
const value = params.toString();

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "/index.html"));
//   res.sendFile(path.join(__dirname, "/content.js"));
// });

app.get("/login", (req, res) => {
  user = req.query.user;
  console.log(user);
  res.redirect("https://accounts.spotify.com/authorize?" + value);
});

app.get("/callback", (req, res) => {
  const code = req.query.code || null;
  const reqState = req.query.state || null;
  if (reqState.slice(1) != state.slice(1)) {
    res.send("State Mismatch");
  } else {
    console.log(btoa(client_id + ":" + client_secret));
    async function getToken() {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          Authorization: `Basic ${btoa(client_id + ":" + client_secret)}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}`,
      });
      return response.json();
    }
    getToken().then((data) => {
      fetch("https://api.spotify.com/v1/me/top/artists?time_range=short_term", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.access_token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (user == "1") {
            fs.writeFileSync("user1.json", JSON.stringify(data));
          } else {
            fs.writeFileSync("user2.json", JSON.stringify(data));
          }
          res.redirect("/");
        });
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
