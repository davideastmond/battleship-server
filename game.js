class Game {
  // Each Game class has two gameboards- player one's and player two's
  constructor() {
    this.P1 = undefined;
    this.P2 = undefined;
    this.P1GB = GameBoard;
    this.P2GB = GameBoard;
    this.Game_ID = 0;
  }

  // Returns a matrix to keep track of the gameboards
  getGameBoard () {
    const gbArray = [];
    for (let i = 0; i <= 9; i++ ) {
      gbArray.push([0, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0]);
    }
    return gbArray;
  }

  // This function assigns players
  assignPlayers(p1, p2) {
    this.P1 = p2;
    this.P2 = p2;
  }

}

export default Game;


