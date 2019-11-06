require('dotenv').config();
const mongoClient = require('mongodb').MongoClient;

module.exports = {
  /**
   * This function connects to the db and returns a db client object
   * @param {string} databaseRef string indicating the database where the collection is held
   */
  getDB: (element) => {

    return new Promise((resolve, reject) => {
      mongoClient.connect(process.env.DB_CONNECTSTRING, {useUnifiedTopology: true})
      .then((ref) => {
        const dbRef = ref.db(element);
        resolve(dbRef);
      })
      .catch((error) => {
        reject(error);
      });
    });
    // Returns a reference to the database
    
  }
};

