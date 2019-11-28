// Handles socket messaging
const dbFuntions = require('./dbfunctions');
module.exports = {

  /**
   * This function basically handles all of the messaging and responses.
   * @param {object} data The JSON.Parsed data
   * @param {object} socket Reference to the web socket
   * @param {string} gameID Reference to the gameID
   * @param {object} dbRef Reference to the database object
   * @param {function} responseCallback a convenience call back for easy server responses
   */
  processClientMessage: async (data, socket, socket_server, gameID, dbRef, responseCallback) => {
    if (data.type === "game_start_waiting") {
      console.log("Got a game start waiting message from", data.message);
      responseCallback({ type: 'ok-response' }, socket);
    } else if (data.type === "user_join_existing_game") {
      // We get an e-mail and an existing game to join
      // We have to access the DB, update the record and change the state
      // and then send it back via the socket to all clients in the game
      console.log("JOIN USER GAME", gameID);
      const game_data = await dbFuntions.getGameByID(dbRef, gameID);
			
			if (game_data.length <= 0) {
				responseCallback({type: 'server-error', message: 'game not found', id: gameID}, socket);
				return;
			}
      
      game_data[0].P2 = data.message.email;
      game_data[0].started = true;
      game_data[0].available = false;

			try  {
				const returnData = await dbFuntions.replaceGameRecord(dbRef, game_data[0]);
			} catch (error) {
				console.log(error);
			}
      
      responseCallback({ type: 'server-message', message:'game-start', data: game_data[0]}, socket, socket_server, true);
     
    }
  }
};