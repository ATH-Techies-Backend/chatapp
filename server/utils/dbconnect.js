const mongoose = require("mongoose");
require("dotenv").config()

let username = process.env.DB_USER
let password = process.env.DB_PASSWORD
let dbCluster = process.env.DB_STRING
let dbName = process.env.DB_NAME
async function dbConn() {
    //const dbURI = `mongodb+srv://${username}:${password}@${dbCluster}/${dbName}`;
    const dbURI = "mongodb://localhost:27017"
    await mongoose.connect(dbURI)
}

module.exports = dbConn;