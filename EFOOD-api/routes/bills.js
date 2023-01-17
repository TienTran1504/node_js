const express = require('express')
const router = express.Router()

const { getAllBills, getBill, updateBill, createBill, deleteBill } = require('../controllers/bills')

router.route('/').post(createBill).get(getAllBills)
router.route('/:id').get(getBill).delete(deleteBill).patch(updateBill)

module.exports = router