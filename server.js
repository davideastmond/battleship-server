const express = require('express');
const app = express();
const PORT = 3535;
const bodyParser = require('body-parser');
const gameEnvironment = require('./env');
const cors = require('cors');
require('dotenv').config();
const mongoClient = require('mongodb').mongoClient;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// Holds reference to the mongodb client
let dbRef;
/**
 * Route to handle creation of new Battleship game
 */
app.post('/game/new', (req, res) => {
  // Create's a new game
  // First starter's console log the req.body

  if (req.body.email) {

    const registrationEmail = req.body.email;
    res.status(200).json({response: 'ok'});
    return;
  } else {
    res.status(400).response({response: 'invalid email '});
  }
});

/**
 * Route to handle user joining already created Battleship game
 */
app.post('/game/join', (req, res) => {

});

app.get('/game', (req, res) => {

});

app.listen(PORT, ()=> {
	console.log(`listening on port ${PORT}`);
});

