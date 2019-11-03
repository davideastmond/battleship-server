const express = require('express');
const router = express.Router();
const GameModule = require('./game');
const gameEnvironment = require('./env');
const uuid = require('uuid/v4');

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

		res.status(200).json({response: 'ok', email: registrationEmail});
		
		// Register
		req.session.session_id = registrationEmail;
    return;
  } else {
    res.status(400).response({response: 'invalid email '});
  }
});

/**
 * Route to handle user joining already created Battleship game
 */
router.post('/game/:id/join/', (req, res) => {
	if (req.session.session_id) {
		res.status(200).json({response: 'ok not implemented'});
	} else {
		res.status(400).json({response: 'invalid session'});
	}
});

router.get('/games', (req, res) => {
	const testGames = GameModule.CreateTestGames();
	const essentialTestGameInfo = testGames.map((eachGame) => {
		return { id: eachGame.Game_ID, title: `${eachGame.P1}'s game`};
	});
  res.status(200).json({games: JSON.stringify(essentialTestGameInfo) });
});

module.exports = router;