const { Router } = require('express')

const router = Router()

router.use((req, res, next) => {
    console.log('through from middleware');
    next()
})


// crud

router.post('/v1/users', async (req, res) => {
    console.log(req.body)

    const user = await db.collection('user').insertOne(req.body)

    res.status(200).json({
        message: 'create username success',
        data: user
    })
})

router.get('/v1/users', async (req, res) => {

    const user = await db.collection('user').find({ is_deleted: { $exists: false } }).toArray()

    res.status(200).json({
        message: 'success',
        data: user
    })
})

router.put('/v1/users/:id', async (req, res) => {

    const { id } = req.params
    const { username, email } = req.body

    const user = await db.collection('user').updateOne({ _id: new ObjectId(id) }, { $set: { username, email } })

    res.status(200).json({
        message: 'success',
        data: user
    })
})

router.delete('/v1/users/:id', async (req, res) => {

    const { id } = req.params

    const user = await db.collection('user').deleteOne({ _id: new ObjectId(id) })

    res.status(200).json({
        message: 'success',
        data: user
    })
})

router.delete('/v1/users/:id', async (req, res) => {

    const { id } = req.params

    const user = await db.collection('user').findOneandUpdate({ _id: new ObjectId(id) }, { $set: { is_deleted: true } })

    res.status(200).json({
        message: 'success',
    })
})


module.exports = router