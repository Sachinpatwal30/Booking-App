const User = require("../models/User");
const CryptoJS = require("crypto-js");
const { create } = require("../models/Hotel");
const createError = require("../utils/error");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {

    try {

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
        });

        const savedUser = await newUser.save();
        const { password, ...others } = savedUser._doc;
        res.status(200).json(others);

    } catch (error) {

        return next(error);

    }
}


const login = async (req, res, next) => {

    try {

        const user = await User.findOne({ email: req.body.email });

        if (!user) return next(createError(404, "User not found"));


        if (req.body.password === CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8)) {
        
            const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, { expiresIn: "1h" });
            const { password, isAdmin, ...others } = user._doc;
            res.cookie("access_token", accessToken, { httpOnly: true }).status(200).json(others);

        } else

            return next(createError(401, "Incorrect Password"));


    } catch (error) {
        return next(error);

    }

}


module.exports = { register, login };