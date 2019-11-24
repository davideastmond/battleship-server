/* 
This module will handle the mongodb access
*/

module.exports = {
  /**
   * This function is going to access the db and return all games that have status available = true and finished = false
   * @returns {Promise} Promise indicating eventual return of data from the MongoDB record
   */
  getAllGames: function(client) {
    console.log("Client db get all");
    return client.collection('games').find({ available: true, finished: false }).toArray();
  },

  /**
   * Accesses the mongodb and retrieves a game by gameID
   * @returns {object} Returns a Game from the database
   */
  getGameByID: (client, id) => {
    return client.collection('games').find({ Game_ID: id}).toArray();
  },

  /**
   * This updates the game record in the database
   */
  replaceGameRecord: (client, gameData) => {
		//console.log("Line 27 GAME DATA", gameData);
		
		return client.collection('games').update({Game_ID: gameData.Game_ID}, 
			{ 
				P1: gameData.P1,
				P2: gameData.P2,
				started: gameData.started,
				P1GB: gameData.P1GB,
				P2GB: gameData.P2GB,
				P1Target: gameData.P1Target,
				P2Target: gameData.P2Target,
				Game_ID: gameData.Game_ID,
				owner: gameData.owner,
				available: gameData.available,
				finished: gameData.finished,
				date_created: gameData.date_created,
				date_game_end: gameData.date_game_end

			});
    //return client.collection('({GAME_ID: gameData.GAME_ID}, gameData);
  }
};