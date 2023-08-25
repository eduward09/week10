const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express()
let db
(async () => {
    try {
        const client = await new MongoClient('mongodb://127.0.0.1:27017').connect()
        db = client.db('revou')
    } catch (error) {
        console.log(error);
    }
})()

app.use(express.json())

app.get('/', async (req, res) => {

    res.send('Week 10')
})


const port = 3000;

app.listen(port, () => {
    console.log("Running on Port: 3000!")
})