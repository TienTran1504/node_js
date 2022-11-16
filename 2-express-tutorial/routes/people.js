const express = require('express');
const router = express.Router()

const { getPeople,
    createPerson,
    createPersonPostman,
    updatePerson,
    deletePerson
} = require('../controllers/people')

//method 1
// // Read Data
// router.get('/', getPeople)
// // Insert Data
// router.post('/', createPerson)
// router.post('/postman', createPersonPostman)
// // Update data
// router.put('/:id', updatePerson)
// //Delete data
// router.delete('/:id', deletePerson)

//method 2
router.route('/').get(getPeople).post(createPerson);
router.route('/postman').post(createPersonPostman);
router.route('/:id').put(updatePerson).delete(deletePerson);

module.exports = router;