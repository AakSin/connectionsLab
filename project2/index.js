// Server & Sockets set up

let express = require("express");
const res = require("express/lib/response");
let http = require("http");
let io = require("socket.io");
const port = process.env.PORT || 8800;
let app = express();
let server = http.createServer(app); // wrap the express app with http
io = new io.Server(server); // use socket.io on the http app

//  nedb setup
let Datastore = require("nedb");
app.use("/", express.static("public"));
app.use("/:roomID", express.static("public/artboard"));

//intialise database
let db = new Datastore({
  filename: "rooms.db",
}); //creates a new one if needed
db.loadDatabase(); //loads the db with the data

const maxPlayers = 5;

// sockets --> check for socket connection
io.sockets.on("connection", (socket) => {
  console.log("We have a new client", socket.id);
  
  // naming this something apart from roomId makes it only work
  let roomCode;

  socket.on("room", (roomId) => {
    let newPlayers;
//     check if the roomId exists in the database
    db.findOne({ _id: roomId }, function (err, doc) {
      if (err) {
        io.to(socket.id).emit("invalidRoom");
      } else if (doc == null) {
//         if no document returned then emit invalid room event
        io.to(socket.id).emit("invalidRoom");
      } else {
        roomCode = doc._id;
        socket.join(doc._id);
        newPlayers = doc.players + 1;
        db.update(
          { _id: roomId },
          { $set: { players: newPlayers } },
          { multi: true },
          function (err, numReplaced) {}
        );
//         emit information about the room back to the client
        io.to(socket.id).emit("roomInfo", doc);
//         assign a role to the player depending on how many people are in the room arlready
        if (newPlayers <= maxPlayers) {
          io.to(socket.id).emit("role", "player");
        } else {
          io.to(socket.id).emit("role", "spectator");
        }
      }
    });
  });
  
//   on changeVisuals and changeAudio events, make all the live servers switch + update the room info in the database too
  socket.on("changeVisuals", (visuals) => {
    io.to(roomCode).emit("changeVisuals", visuals);
    db.update(
          { _id: roomCode },
          { $set: { visuals: visuals } },
          { multi: true },
          function (err, numReplaced) {}
        );
  });
  socket.on("changeAudio", (audio) => {
    io.to(roomCode).emit("changeAudio", audio);
    db.update(
          { _id: roomCode },
          { $set: { audio: audio } },
          { multi: true },
          function (err, numReplaced) {}
        );
  });
//    emit keycode to all clients in the room
  socket.on("keyPressed", (keyCode) => {
    io.to(roomCode).emit("keyPressed", keyCode);
  });

  socket.on("createRoom", (data) => {
    let roomInfo = {};
    roomInfo.visuals = data.visuals;
    roomInfo.audio = data.audio;
    roomInfo.players = 0;
    db.insert(roomInfo, function (err, newDoc) {
      // Callback is optional
      io.to(socket.id).emit("redirect", newDoc._id);
    });
  });
  // drop a message on the server when socket disconnects
  socket.on("disconnect", () => {
    let newPlayers;
    db.findOne({ _id: roomCode }, function (err, doc) {
      if (err) {
        console.log(err);
      } else if (doc == null) {
        console.log("pass");
      } else {
        newPlayers = doc.players - 1;
        db.update(
          { _id: roomCode },
          { $set: { players: newPlayers } },
          { multi: true },
          function (err, numReplaced) {}
        );
//         delete room if room size becomes less than 1
        if (newPlayers < 1) {
          db.remove({ _id: roomCode }, {}, function (err, numRemoved) {
            console.log("room removed");
          });
        }
      }
    });

    console.log("socket has been disconnected", socket.id);
  });
});

// server listening on port
server.listen(port, () => {
  console.log("server is up and running");
});

