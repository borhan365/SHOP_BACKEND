import express from 'express';
import { authUser, getUserProfile, registerUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
const Router = express.Router(); 

Router.post("/", registerUser)
Router.post("/login", authUser);
Router.route("/profile").get(protect, getUserProfile)

export default Router; 