// db.js
const pgp = require('pg-promise')();

const connectionOptions = {
  /* Your database connection details */
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: process.env.NEXT_PUBLIC_API_PASSWORD,
};

let dbInstance;

function getDatabase() {
  if (!dbInstance) {
    dbInstance = pgp(connectionOptions);
  }
  return dbInstance;
}

// Add a function to close the database connection when needed
function closeDatabase() {
  if (dbInstance) {
    dbInstance.$pool.end(); // Close the connection pool
    dbInstance = null; // Reset the database instance
  }
}

module.exports = {
  getDatabase,
  closeDatabase,
};
