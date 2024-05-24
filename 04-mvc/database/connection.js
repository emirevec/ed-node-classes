const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const clientOptions = { 
    serverApi: 
        { 
            version: '1', 
            strict: true, 
            deprecationErrors: true 
        } 
    };

//const MONGO_LOCAL = process.env.MONGO_LOCAL;
const MONGO_ATLAS = process.env.MONGO_ATLAS;

const connection = mongoose.connect(MONGO_ATLAS, clientOptions)
    .then(
        () => { 
            console.log(`================\nConexión a la database ${MONGO_ATLAS}\nExitosa.\n================`);
        },
        err => {
            console.log(`==========================================\nError en la conexión a la database ${err}\n==========================================`);
        }
);

module.exports = connection;