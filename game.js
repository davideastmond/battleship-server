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
		this.owner = undefined;
		
		this.available = true;
		this.finished = false;

		this.date_created = Date.now();
		this.date_game_end = null;
  }

  // This is for testing
  assignPlayers(p1, p2) {
    this.P1 = p1;
    this.P2 = p2;
	}
	
	assignOpponent(p2) {
		this.P2 = p2;
	}

  start(callback) {
    // Starts a game, checks that there are two players
		// Perhaps uses a callback
		
		if (!this.p1 || !this.p2) {
			callback({ message: 'invalid game player status '});
			return;
		}
  }

  setOwner(game_owner) {
		this.owner = game_owner;
		this.P1 = game_owner;
	}
	
	setStatus(status) {
		if (typeof status === 'boolean') {
			this.available = status; 
		} else {
			throw "Invalid game status. Please provide a boolean value.";
		}
	}
}

/** Creates a 2D matrix of integers, representing a battleship game board
 * @returns {Array.<number>} Returns a two-dimensional array of integers, 10 by 10
 */
function getGameBoard() {
  const gbArray = [];
  for (let i = 0; i <= 9; i++ ) {
    gbArray.push([0, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0]);
  }
  return gbArray;
}

/** Creates a specified amount of test games, returning an array of Game objects
 * @param {number.<Game>} max number of test games to create
 */
function createTestGames(max = 10) {
  const finalArray = [];
  for (let i = 0; i < max; i++ ) {
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
