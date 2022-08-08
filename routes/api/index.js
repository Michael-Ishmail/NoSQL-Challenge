const router = require('express').Router()

const userRoute = require('./user-route')
const postRoute = require('./post-route')

router.use('/users', userRoute)
router.use('/posts', postRoute)

module.exports = router