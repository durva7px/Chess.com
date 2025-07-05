const express = require('express');
const socket = require('socket.io'); // socket helps real-time interaction amongst multiple users
const http = require('http');
const { Chess } = require('chess.js');
const path = require("path"); // express.static -> for path.join
const { setUncaughtExceptionCaptureCallback } = require('process');

const app = express();

// socket.io documentation requires initialization
const server = http.createServer(app); // linking http server -> server made by express
const io = socket(server); // bind socket.io to HTTP server

const chess = new Chess(); // chess.js has all chess rules -> this has been brought into 'chess' now
let players = {};
let currentPlayer = "W";

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public"))); 
// we can use our media. assets. etc through this, eg. 'index' from directory 'public'
app.get('/', (req, res) => {
    res.render("index", { title: "Chess Game" });
});

// io can do everything socket can, whenever someone connects, -> log this
io.on("connection", (uniqueSocket) => {
    console.log("User Connected ✅");

    if(!players.white){ // if white player doesn't exist yet
        players.white = uniqueSocket.id; // create a white player with id of player just joined
        uniqueSocket.emit("playerRole", "w");
    }

    else if(!players.black){
        players.black = uniqueSocket.id;
        uniqueSocket.emit("playerRole", "b");
    }

    else{
        uniqueSocket.emit("SpectatorRole");
    }

    /* 
        Initially 
        Player = {} is blank
        Someone connects, check for player.white field exists? 
        -> NO => create players.white = assign uniqueSocket.id
        Similarly for black and spectator

    */

    socket.on("disconnect", function () {
        if(uniqueSocket.id === players.white) {
            delete players.white;
        } else if (uniqueSocket.id)
    });

});

/* 
Socket io needs to be setup on both frontend and backend ✅
Here, it's only in backend; Hence we need to setup for index.ejs as well
*/

app.get('/arena', (req, res) => {
    res.send('Welcome to Chess Arena!');
});


// listening confirmation
server.listen(3000, function () {
    console.log("Listening on port : 3000 🔌");
})