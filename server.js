const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const gameEnvironment = require('./env');
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


const mongoClient = require('mongodb').mongoClient;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// Holds reference to the mongodb client
const dbRef = dbconfig.getDB('battleship');

/**
 * Route to handle creation of new Battleship game
 */
app.post('/game/new', (req, res) => {
  // Create's a new game
  // First starter's console log the req.body

  if (req.body.email) {

    const registrationEmail = req.body.email;
    res.status(200).json({response: 'ok', email: registrationEmail});
    return;
  } else {
    res.status(400).response({response: 'invalid email '});
  }
});

/**
 * Route to handle user joining already created Battleship game
 */
app.post('/game/join', (req, res) => {
  res.status(200).json({response: 'ok not implemented'});
});

app.get('/game', (req, res) => {
  res.status(200).json({response: 'ok not implemented'});
});

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