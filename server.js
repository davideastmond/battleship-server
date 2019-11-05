const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const moment = require('moment');

const cors = require('cors');
const socketServer = require('ws').Server;
require('dotenv').config();

const SOCKET_PORT = process.env.SOCKET_PORT;
const EXPRESS_PORT = process.env.EXPRESS_PORT;

const mainSocketServer = express();

const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const cookieKeys = [process.env.COOKIE_KEYS];

const socketHandler = require('./socketMessages');

// Middle-ware
app.use(cookieParser());
app.use(cookieSession({
  name: process.env.COOKIE_SESSION,
  keys: cookieKeys,
  maxAge: 600000 // 5 minutes
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use(require('./routes'));

// Start express and socket servers
app.listen(parseInt(EXPRESS_PORT), ()=> {
  const timeStamp = moment().format('YYYY-MMM-DD hh:mm:ss');
  console.log(`${timeStamp} listening on port ${EXPRESS_PORT}`);
});

const wss = new socketServer({ server: mainSocketServer, port: SOCKET_PORT}, ()=> {
  console.log(`socket sever staring on port ${SOCKET_PORT}`);
});

wss.on('connection', (ws, req) => {
  console.log("Connection established");
  ws.on('message', (msg) => {
    const datamsg = translateMessage(msg);
    socketHandler.processClientMessage(datamsg, ws, null);
    // Send a response
    sendServerResponse({message: 'ok-response'}, ws);
  });

  ws.on('close', ()=> {
    console.log("Connection to client closed.");
  });
});

function translateMessage(incommingMessage) {
  const translatedMessage = JSON.parse(incommingMessage);
  return translatedMessage;
}

function sendServerResponse(respMessage, socket) {
  const translatedMessage = JSON.stringify(respMessage);
  socket.send(translatedMessage);
}