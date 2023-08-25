const { Router } = require('express')

const router = Router()

// creat & read

router.post('/v1/transfer', async (req, res) => {
    const { title, author } = req.body

    const transfer = await db.collection('transfer').insertOne({ title, author })
})