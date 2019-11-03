const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Game environment variables 
const gameEnvironment = require('./env');
const GameModule = require('./game').Game;

const cors = require('cors');
const socketServer = require('ws').Server;
require('dotenv').config();

const SOCKET_PORT = process.env.SOCKET_PORT;
const EXPRESS_PORT = process.env.EXPRESS_PORT;


const mainSocketServer = express();
const wss = new socketServer({ server: mainSocketServer, port: SOCKET_PORT}, ()=> {
  console.log(`socket sever staring on port ${SOCKET_PORT}`);
});

const dbconfig = require('./dbconfig');

//
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const cookieKeys = [process.env.COOKIE_KEYS];
// Middle-ware
app.use(cookieParser());
app.use(cookieSession({
  name: process.env.COOKIE_SESSION,
  keys: cookieKeys,
  maxAge: 600000 // 5 minutes
}));

//

const mongoClient = require('mongodb').mongoClient;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(require('./routes'));
// Holds reference to the mongodb client
const dbRef = dbconfig.getDB('battleship');

app.listen(parseInt(EXPRESS_PORT), ()=> {
  console.log(`listening on port ${EXPRESS_PORT}`);
});

wss.on('connection', (ws, req) => {
  console.log("Connection established");
  ws.on('message', (msg) => {
    const datamsg = handleMessage(msg)
    console.log(`Message recieved ${datamsg}`);

    // Send a response
    sendServerResponse({message: 'ok-response'}, ws);
  });

  ws.on('close', ()=> {
    console.log("Connection to client closed.");
  });
});

function handleMessage(incommingMessage) {
  const translatedMessage = JSON.parse(incommingMessage);
  return translatedMessage;
}

function sendServerResponse(respMessage, socket) {
  const translatedMessage = JSON.stringify(respMessage);
  socket.send(translatedMessage);
}