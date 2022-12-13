const User = require("../models/User");
const createError = require("../utils/error");


const updateUser = async (req, res, next) => {


    const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    try {
        const savedUser = await updatedUser.save();
        res.status(200).json(savedUser);

    } catch (error) {
        return next(error);
    }
}


const deleteUser = async (req, res, next) => {

    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User Deleted Successfully");

    } catch (error) {
        return next(error);
    }
}

const getUser = async (req, res, next) => {

  
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);

    } catch (error) {
        return next(error);
    }
}

const getAllUsers = async (req, res, next) => {

    try {
        const users = await User.find();
        res.status(200).json(users);

    } catch (error) {
        next(error);
    }
}

module.exports = {  updateUser, deleteUser, getUser, getAllUsers };