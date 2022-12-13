const { register, login } = require('../controllers/authController');
const route = require('express').Router();


route.post("/register", register );
route.post("/login", login );


module.exports= route;