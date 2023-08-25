const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express()
app.use(express.json())

app.use((req, res, next) => {
    console.log('through from middleware');
    next()
})

let db
(async () => {
    try {
        const client = await new MongoClient('mongodb://127.0.0.1:27017').connect()
        db = client.db('revou')
    } catch (error) {
        console.log(error);
    }
})()

// crud

app.post('/v1/users', async (req, res) => {
    console.log(req.body)

    const user = await db.collection('user').insertOne(req.body)

    res.status(200).json({
        message: 'create username success',
        data: user
    })
})

app.get('/v1/users', async (req, res) => {

    const user = await db.collection('user').find({ is_deleted: { $exists: false } }).toArray()

    res.status(200).json({
        message: 'success',
        data: user
    })
})

app.put('/v1/users/:id', async (req, res) => {

    const { id } = req.params
    const { username, email } = req.body

    const user = await db.collection('user').updateOne({ _id: new ObjectId(id) }, { $set: { username, email } })

    res.status(200).json({
        message: 'success',
        data: user
    })
})

app.delete('/v1/users/:id', async (req, res) => {

    const { id } = req.params

    const user = await db.collection('user').deleteOne({ _id: new ObjectId(id) })

    res.status(200).json({
        message: 'success',
        data: user
    })
})

app.delete('/v1/users/:id', async (req, res) => {

    const { id } = req.params

    const user = await db.collection('user').findOneandUpdate({ _id: new ObjectId(id) }, { $set: { is_deleted: true } })

    res.status(200).json({
        message: 'success',
    })
})

app.get('/', async (req, res) => {

    res.send('Week 10')
})



const port = 3000;

app.listen(port, () => {
    console.log("Running on Port: 3000!")
})