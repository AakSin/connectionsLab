import fetch from "node-fetch";
import "dotenv/config";
import { URLSearchParams, fileURLToPath } from "url";
import express from "express";
import path from "path";
import fs from "fs";

// wherever the file is hosted, find the path from the url. meta contains a lot of data about the current page, including the url.
const __filename = fileURLToPath(import.meta.url);

// get the directory name from the file name
const __dirname = path.dirname(__filename);

// initializing express
const app = express();
const port = process.env.PORT || 8888;

// configuring usage of static files with express
app.use(express.static(__dirname));
app.use(express.static("public"));

// setting up environment variables
let client_id = process.env.CLIENT_ID;
let client_secret = process.env.CLIENT_SECRET;
let redirect_uri = process.env.REDIRECT_URI;

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

// Creating and initializing URLSearchParams object
const params = new URLSearchParams();

// Appending value in the object
params.append("response_type", "code");
params.append("client_id", client_id);
params.append("scope", "user-top-read");
params.append("state", state);
params.append("redirect_uri", redirect_uri);
params.append("show_dialog", "true");

// Getting string representation by using toString() api
const value = params.toString();

//  on click the login buttons, redirect user to spotify for authorization
app.get("/login", (req, res) => {
  user = req.query.user;
  console.log(user);
  res.redirect("https://accounts.spotify.com/authorize?" + value);
});

// handle callback that we get from authorization path
app.get("/callback", (req, res) => {
  // get code and state from url query
  const code = req.query.code || null;
  const reqState = req.query.state || null;
  // reqState starts with plus symbol, state starts with blank space. Hence, the slicing.
  if (reqState.slice(1) != state.slice(1)) {
    res.send("State Mismatch");
  } else {
    // convert this string to base64 using btoa (requirment of spotify api)
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
      // use the token from the previous call in this API call
      fetch(
        "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.access_token}`,
          },
        }
      )
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
  console.log(`Commonify app listening on port ${port}`);
});
