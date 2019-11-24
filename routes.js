const express = require('express');
const router = express.Router();
const GameModule = require('./game');
const gameEnvironment = require('./env');
const uuid = require('uuid/v4');
const dbFunctions = require('./dbfunctions');

const dbconfig = require('./dbconfig');
let dbRef;

dbconfig.getDB('battleship').then((res) => {
  dbRef = res;
  console.log("Connected to games database.");
})
.catch( function(error) {
  console.log("Error connecting to database");
  process.exit(-1);
});
// This loads random Test Games
const testGames = GameModule.CreateTestGames();

router.get('/games', (req, res) => {
  // Retrieve all available games (that is, games that are available to be joined)

  dbFunctions.getAllGames(dbRef).then((games) => {
    const essentialTestGameInfo = games.map((eachGame) => {
      return { id: eachGame.Game_ID, title: `${eachGame.P1}'s game`};
    });
    res.status(200).json({ games: JSON.stringify(essentialTestGameInfo) });
  })
  .catch((err) => {
    res.status(500).json({message: "database error "});
  });
});

router.post('/game/:game_id/join/', (req, res) => {
  // Basically send a response and then make the client connect to a socket
  // We should check if the game exists and is not started
    
  if (req.body.email && req.params.game_id) {
    console.log("Join Game: ", req.params.game_id, req.body.email);
		
    // Join game. This will send a response with the game ID. This will then cause the client to form a websocket connection
    res.status(200).json({ response: req.params.game_id, email: req.body.email });
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
    newGame.setOwner(registrationEmail);
    
    gameEnvironment.gamesArray.push(newGame);
    console.log(gameEnvironment.gamesArray);
    // Assign to the game array

    // With this response, the client should attempt to connect to the wsocket
    // Register
    req.session.session_id = registrationEmail;

    dbRef.collection('games').insertOne(newGame)
    .then((response) => {
      res.status(200).json({response: 'ok', email: registrationEmail, gameID: newGame.Game_ID });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({response: 'database error'});
    });
  } else {
    res.status(400).response({response: 'invalid email '});
  }
  
  //TODO: Persist a game state via MongoDB
});
module.exports = router;