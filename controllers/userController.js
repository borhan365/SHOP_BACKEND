import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/gerarateToken.js';

// @Descripiton : Auth user & get Token
// Route        : GET /api/users
// Accesss      : Public
const authUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body; 

    const user = await User.findOne({ email })

    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
            res.status(401)
            throw new Error("Email or Password Wrong!")
    }
})

// @Descripiton : Registration
// Route        : GET /api/users/
// Accesss      : Public
const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body; 

    const existUser = await User.findOne({ email })

    if(existUser) {
        res.status(400)
        throw new Error("User already exist!");
    } 

    const user = await User.create({
        name,
        email,
        password
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error("Invalid user details")
    }
})


// @Descripiton : Get user profile
// Route        : GET /api/users/profile
// Accesss      : Privet
const getUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)
    if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(401)
        throw new Error("Your id didn't match!")
    }
})

export { authUser, getUserProfile, registerUser };

