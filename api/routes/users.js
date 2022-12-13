const { updateUser, deleteUser, getUser, getAllUsers } = require('../controllers/userController');
const { verifyUser, verifyAdmin } = require('../utils/verifyJwt');

const route = require('express').Router();


//Update User
route.put("/:id",verifyUser, updateUser );

//Delete User
route.delete("/:id",verifyUser, deleteUser );

//Get User
route.get("/:id",verifyUser, getUser );

//Get All User
route.get("/",verifyAdmin, getAllUsers );


module.exports= route;