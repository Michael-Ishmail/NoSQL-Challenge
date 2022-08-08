const router = require('express').Router()

const apiRouts = require('./api')

router.use('/api', apiRouts)

router.use((req, res) => {
    res.status(404)
})

module.exports = router