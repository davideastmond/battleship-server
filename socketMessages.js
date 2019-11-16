// Handles socket messaging

module.exports = {

  /**
   * @param {object} data The JSON.Parsed data
   * @param {object} socket Reference to the socket
   * @param {string} gameID Reference to the gameID
   */
  processClientMessage: (data, socket, gameID, dbRef) => {
    if (data.type === "game_start_waiting") {
      console.log("Got a game start waiting message from", data.message);
    } else if (data.type === "user_join_existing_game") {
      // We get an e-mail and an existing game to join
      // We have to access the DB, update the record and change the state
      // and then send it back via the socket to all clients in the game
    }
  }
};