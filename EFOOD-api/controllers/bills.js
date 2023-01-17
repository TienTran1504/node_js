const Bill = require('../models/Bill')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
//get all jobs of user by userid
const getAllBills = async (req, res) => {
    const bills = await Bill.find({}).sort('createdAt')
    res.status(StatusCodes.OK).json({ bills, count: bills.length });
}

const getBill = async (req, res) => {
    const { params: { id: billId } } = req; // req.user.userId, req.params.id

    const bill = await Bill.findOne({
        _id: billId,
    })
    if (!bill) {
        throw new NotFoundError(`No bill with id ${billId}`)
    }
    res.status(StatusCodes.OK).json({ bill })
}

const createBill = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const bill = await Bill.create(req.body);
    res.status(StatusCodes.CREATED).json({
        bill
    })
}

const updateBill = async (req, res) => {
    const {
        body: { status },
        user: { userId },
        params: { id: billId },
    } = req;

    if (status === '') {
        throw new BadRequestError('status fields cannot be empty');
    }
    const bill = await Bill.findByIdAndUpdate(
        {
            _id: billId,
            status: status,
            createdBy: userId
        },
        req.body,
        { new: true, runValidators: true }
    )

    if (!bill) {
        throw new NotFoundError(`No bill with id ${billId}`)
    }
    res.status(StatusCodes.OK).json({ bill })
}

const deleteBill = async (req, res) => {
    const {
        user: { userId },
        params: { id: billId },
    } = req;

    const bill = await Bill.findByIdAndRemove({
        _id: billId,
        createdBy: userId,
    })

    if (!bill) {
        throw new NotFoundError(`No bill with id ${billId}`)
    }
    res.status(StatusCodes.OK).json({ msg: `Delete bill ID: ${billId} successfully ` })

}
module.exports = {
    getAllBills,
    getBill,
    createBill,
    updateBill,
    deleteBill,
}