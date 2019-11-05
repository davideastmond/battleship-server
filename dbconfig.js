require('dotenv').config();
const mongoClient = require('mongodb').MongoClient;

module.exports = {
  /**
   * This function connects to the db and returns a db client object
   * @param {string} databaseRef string indicating the database where the collection is held
   */
  getDB: (databaseRef) => {
    // Returns a reference to the database

    mongoClient.connect(process.env.DB_CONNECTSTRING, {useUnifiedTopology: true},  (err, client) => {
      if (err) {
        console.log(err);
        return null;
      } else {
        console.log("Connected to database '", databaseRef,"'");
        return client.db(databaseRef);
      }
    });
  }
};

