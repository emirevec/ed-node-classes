/**
 * @file server.js
 * @description Initializes environment variables, sets up the database connection, and starts the Express server.
 */

/** Import Statements. */
import dotenv from 'dotenv'
import app from './index.js'

/** Import the database and sets up the connection. */
import connection from './database/connection.js'

/** Load environment variables from .env file. */
dotenv.config()

/** The port number on which the server listens. */
const PORT = process.env.PORT || 9000

/**
 * Starts the server and listens on the specified port.
 * Logs a message indicating the server is running and the URL where it's accessible.
 */
app.listen(PORT, () => {
  console.log(`Example app listening on PORT http://localhost:${PORT}`)
})
