const express = require('express');
const router = express.Router();


router.post('/game/new', (req, res) => {
  // Create's a new game
  // First starter's console log the req.body

  if (req.body.email) {
    const registrationEmail = req.body.email;
    const newGame = new GameModule();

    // For this new game, assign player one and add it to the game array
    newGame.assignPlayers(registrationEmail, null);
    gameEnvironment.gamesArray.push(newGame);
    console.log(gameEnvironment.gamesArray);
    // Assign to the game array

    res.status(200).json({response: 'ok', email: registrationEmail});
    return;
  } else {
    res.status(400).response({response: 'invalid email '});
  }
});

/**
 * Route to handle user joining already created Battleship game
 */
router.post('/game/join', (req, res) => {
  res.status(200).json({response: 'ok not implemented'});
});

router.get('/game', (req, res) => {
  res.status(200).json({response: 'ok not implemented'});
});

module.exports = router;