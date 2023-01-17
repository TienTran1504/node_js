const express = require('express')
const router = express.Router()

const { getAllFoods, getFood, updateFood, createFood, deleteFood } = require('../controllers/foods')

router.route('/').post(createFood).get(getAllFoods)
router.route('/:id').get(getFood).delete(deleteFood).patch(updateFood)

module.exports = router