const Food = require('../models/Food')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
//get all jobs of user by userid
const getAllFoods = async (req, res) => {
    const foods = await Food.find({}).sort('createdAt')
    res.status(StatusCodes.OK).json({ foods, count: foods.length });
}

const getFood = async (req, res) => {
    const { params: { id: foodId } } = req; // req.user.userId, req.params.id

    const food = await Food.findOne({
        _id: foodId,
    })
    if (!food) {
        throw new NotFoundError(`No food with id ${foodId}`)
    }
    res.status(StatusCodes.OK).json({ food })
}

const createFood = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const food = await Food.create(req.body);
    res.status(StatusCodes.CREATED).json({
        food
    })
}

const updateFood = async (req, res) => {
    const {
        body: { name, price },
        user: { userId },
        params: { id: foodId },
    } = req;

    if (name === '' || price === '') {
        throw new BadRequestError('Name or price fields cannot be empty');
    }
    const food = await Food.findByIdAndUpdate(
        {
            _id: foodId,
            price: price,
            createdBy: userId
        },
        req.body,
        { new: true, runValidators: true }
    )

    if (!food) {
        throw new NotFoundError(`No food with id ${foodId}`)
    }
    res.status(StatusCodes.OK).json({ food })
}

const deleteFood = async (req, res) => {
    const {
        user: { userId },
        params: { id: foodId },
    } = req;

    const food = await Food.findByIdAndRemove({
        _id: foodId,
        createdBy: userId,
    })

    if (!food) {
        throw new NotFoundError(`No food with id ${foodId}`)
    }
    res.status(StatusCodes.OK).json({ msg: `Delete food ID: ${foodId} successfully ` })

}
module.exports = {
    getAllFoods,
    getFood,
    createFood,
    updateFood,
    deleteFood,
}