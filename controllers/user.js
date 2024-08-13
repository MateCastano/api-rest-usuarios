//Imports
const User = require('../models/user');
const jwt = require('jsonwebtoken');

//Controladores
const registerUser = async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const user = new User({name, email, password});
        if(await User.findOne({email}))
        {   
            return res.status(400).json({message: 'User already registered'});
        }
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (e) {
        console.log(e);
    }
}

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user || !(await user.comparePassword(password))){
            return res.status(400).json({message: 'Invalid credentials'});
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, message: 'User login' });
    } catch (e) {
        console.log(e);
    }   
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json({
            status: 'success',
            data: {
                users
            }
        })
    } catch (e) {
        console.log(e);
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const userDelete = await User.findByIdAndDelete(id);
       
        if(!userDelete) {
            return res.json({
                status: 'failed',
                message: 'No user'
            });
        }

        return res.json({
            status: 'success',
            data: {
                user: userDelete,
                message: 'User deleted'
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
};

const updateUser = async(req, res) => {
    const { id } = req.params;
    const update = req.body;
    try {
        const userUpdate = await User.findByIdAndUpdate(id, update);
        if(!userUpdate){
            return res.json({
                message: 'No user found'
            })
        }
        
        res.json({
            message: 'User updated'
        })

    } catch (e) {
        console.log(e);
    }
}

//Exports

module.exports = {
    registerUser,
    loginUser,
    deleteUser,
    getAllUsers,
    updateUser
}