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
  }
};