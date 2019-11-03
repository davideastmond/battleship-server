const uuid = require('uuid/v4');
class Game {

  // Each Game class has two gameboards- player one's and player two's
  constructor() {
    // These are the basic properties of our game

    // These hold reference to the player (name or e-mail addresss)
    this.P1 = undefined;
    this.P2 = undefined;

    this.started = false;

    // These holds reference to the players' ship placements
    this.P1GB = getGameBoard();
		this.P2GB = getGameBoard();
    
    // These hold reference to the (y, x) where player launches attack
		this.P1Target = getGameBoard();
    this.P2Target = getGameBoard();
    
    // Holds reference to the game id likely auto-generated using UUIIDv4 or something
    this.Game_ID = uuid();
  }

  // This function assigns players
  assignPlayers(p1, p2) {
    this.P1 = p1;
    this.P2 = p2;
  }

  start(callback) {
    // Starts a game, checks that there are two players
    // Perhaps uses a callback
  }
}


function getGameBoard() {
  const gbArray = [];
  for (let i = 0; i <= 9; i++ ) {
    gbArray.push([0, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0]);
  }
  return gbArray;
}

function createTestGames() {
  const finalArray = [];
  for (let i = 0; i < 10; i++ ) {
    const testGame = new Game();
    testGame.assignPlayers(uuid(), uuid());
    finalArray.push(testGame);
  }

  return finalArray;
}

module.exports = {
  Game: Game,
  CreateTestGames: createTestGames
};
