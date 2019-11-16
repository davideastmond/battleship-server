require('dotenv').config();
const mongoClient = require('mongodb').MongoClient;

module.exports = {
  /**
   * This function connects to the db and returns a db client object
   * @param {string} databaseRef string indicating the database where the collection is held
   */
  getDB: async (element) => {
    try { 
      const ref = await  mongoClient.connect(process.env.DB_CONNECTSTRING, {useUnifiedTopology: true});
      const dbRef = ref.db(element);
      return Promise.resolve(dbRef);
    } catch(error) {
      Promise.reject(error);
    }
  }
};

