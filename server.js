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

const dbconfig = require('./dbconfig');
let dbRef;

const clients = [];

dbconfig.getDB('battleship').then((res) => {
  dbRef = res;
  console.log("Connected to games database. Server.js");
})
.catch( function(error) {
  console.log("Error connecting to database");
  process.exit(-1);
});

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


wss.on('connection', (ws, req, client) => {
  console.log("Web Socket Connection established", wss.clients.size);

  ws.on('message', (msg) => {
    const datamsg = translateMessage(msg);
    socketHandler.processClientMessage(datamsg, ws, wss, datamsg.message.gameID, dbRef, sendServerResponse);
  });

  ws.on('close', ()=> {
    console.log("Connection to client closed.");
  });
});

/**
 * 
 * @param {object} incommingMessage 
 * @returns {object} Parsed response
 */
function translateMessage(incommingMessage) {
  return JSON.parse(incommingMessage);
}

function sendServerResponse(respMessage, socket, socket_server, flags=false) {

  if (flags) {
    console.log("Flagged response");
    
  }

  if (socket_server) {
    socket_server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(respMessage));
      }
    });
  }
}