const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient
const ObjectId = mongodb.ObjectId

let database

async function getdatabase(){
    const client = await mongoClient.connect("mongodb://localhost:27017")
    const database= client.db('dashboard')
    if(!database){
        console.log("database not connected")
    }
    return database
}
module.exports = {getdatabase, ObjectId}