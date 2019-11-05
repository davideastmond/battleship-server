// Handles socket messaging

module.exports = {

	/**
	 * @param {object} data The JSON.Parsed data
	 * @param {object} socket Reference to the socket
	 * @param {string} gameID Reference to the gameID
	 */
	processClientMessage: (data, socket, gameID) => {
		if (data.type === "game_start_waiting") {
			console.log("Got a game start waiting message from", data.message);
		}
	}
};