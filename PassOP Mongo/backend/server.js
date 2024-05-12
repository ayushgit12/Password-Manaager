const express = require('express')
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv')
const bodyparser = require('body-parser')
dotenv.config()

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'passop'
const app = express()
const port = 3000
app.use(bodyparser.json())

client.connect();
const db = client.db(dbName);
const cors = require('cors')

app.use(cors())

// Get all the passwords
app.get('/', async (req, res) => {
     const collection = db.collection('passwords');
     const findResult = await collection.find({}).toArray();
     res.json(findResult)
})

// Save a new password
app.post('/', async (req, res) => {
     const password = req.body;
     const db = client.db(dbName);
     const collection = db.collection('passwords');
     const findResult = await collection.insertOne(password);
     res.send({success: true, result: findResult})

})

// Delete a password
app.delete('/', async (req, res) => {
     const password = req.body;
     const db = client.db(dbName);
     const collection = db.collection('passwords');
     const findResult = await collection.deleteOne(password);
     res.send({success: true, result: findResult})
})



app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})