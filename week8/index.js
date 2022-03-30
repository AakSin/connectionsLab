//Initialize the express 'app' object
let express = require("express");
let app = express();
app.use("/", express.static("public"));

//Initialize the actual HTTP server
let http = require("http");
let server = http.createServer(app);

//Initialize socket.io
//Initialize socket.io
let io = require("socket.io");
io = new io.Server(server);

//run the createServer
let port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log("Server listening at port: " + port);
});
//Initialize socket.io

io.sockets.on("connection", function (socket) {
  console.log("We have a new client: " + socket.id);
  socket.on("ship1pos", (data) => {
    socket.broadcast.emit("ship1pos", data);
  });
  socket.on("ship2pos", (data) => {
    socket.broadcast.emit("ship2pos", data);
  });
  socket.on("ship1shoot", (data) => {
    socket.broadcast.emit("ship1shoot", data);
  });
  socket.on("ship2shoot", (data) => {
    socket.broadcast.emit("ship2shoot", data);
  });
});
