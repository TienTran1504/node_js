// const express = require('express')
// const router = express.Router()

// const { login, register } = require('../controllers/auth')

// router.post('/register', register)
// router.post('/login', login)

// module.exports = router

const express = require('express')
const router = express.Router()

const { getAllUsers, getUser, login, register, deleteUser, updateUser } = require('../controllers/auth')

router.post('/register', register)
router.post('/login', login)
router.route('/').get(getAllUsers)
router.route('/:id').get(getUser).delete(deleteUser).patch(updateUser)

module.exports = router