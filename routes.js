const express = require('express');
const router = express.Router();
const GameModule = require('./game');
const gameEnvironment = require('./env');
const uuid = require('uuid/v4');

const dbconfig = require('./dbconfig');
let dbRef;

dbconfig.getDB('battleship')
.then((res) => {
 dbRef = res;
 console.log("DBRef obtained");
});
// This loads random Test Games
const testGames = GameModule.CreateTestGames();

router.get('/games', (req, res) => {
  const essentialTestGameInfo = gameEnvironment.gamesArray.map((eachGame) => {
    return { id: eachGame.Game_ID, title: `${eachGame.P1}'s game`};
  });
  res.status(200).json({games: JSON.stringify(essentialTestGameInfo) });
});

router.post('/game/:game_id/join/', (req, res) => {
  if (req.session.session_id) {
    // Basically send a response and then make the client connect to a socket
    res.status(200).json({response: 'ok not implemented'});
  } else {
    res.status(400).json({response: 'invalid session'});
  }
});

router.post('/game/new', (req, res) => {
  // Create's a new game
  // First starter's console log the req.body

  if (req.body.email) {
    const registrationEmail = req.body.email;
    const newGame = new GameModule.Game();

    // For this new game, assign player one and add it to the game array
    newGame.assignPlayers(registrationEmail, null);
    gameEnvironment.gamesArray.push(newGame);
    console.log(gameEnvironment.gamesArray);
    // Assign to the game array

    // With this response, the client should attempt to connect to the wsocket
    // Register
    req.session.session_id = registrationEmail;

    dbRef.collection('games').insertOne(newGame)
    .then((response) => {
      console.log(response.result);
      res.status(200).json({response: 'ok', email: registrationEmail, gameID: newGame.Game_ID });
    });
  } else {
    res.status(400).response({response: 'invalid email '});
  }
  
  //TODO: Persist a game state via MongoDB
});
module.exports = router;