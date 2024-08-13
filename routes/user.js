const express = require('express');

const {
    registerUser,
    loginUser,
    deleteUser,
    getAllUsers,
    updateUser
} = require('../controllers/user')

const router = express.Router();

router.get('/', getAllUsers);
router.post('/registerUser', registerUser)
router.post('/loginUser', loginUser);
router.delete('/:id', deleteUser);
router.patch('/:id', updateUser);

module.exports = router;