/**
 * @file connection.js
 * @description Configuration for connecting to a MongoDB database using Mongoose.
 */

/** Import library statments. */
import dotenv from 'dotenv'
import mongoose from 'mongoose'

/** Load environment variables from .env file. */
dotenv.config()

/** Options for the MongoDB client, including server API version and error handling. */
const clientOptions = { 
    serverApi: 
    { 
        version: '1', 
        strict: true, 
        deprecationErrors: true 
    } 
}
const MONGO_ATLAS = process.env.MONGO_ATLAS
//const MONGO_LOCAL = process.env.MONGO_LOCAL;

/** Establishes the connection to the MongoDB database and handles success and error messages.
 * */
const connection = mongoose.connect(MONGO_ATLAS, clientOptions)
    .then(
        () => { 
            console.log(`================\nConexión a la database ${MONGO_ATLAS}\nExitosa.\n================`);
        },
        err => {
            console.log(`==========================================\nError en la conexión a la database ${err}\n==========================================`);
        }
)

export default connection