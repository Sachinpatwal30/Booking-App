const route = require('express').Router();
const{ createRoom, updateRoom, deleteRoom, getRoom, getAllRooms, updateRoomAvailability }= require("../controllers/roomController");
const { verifyAdmin } = require('../utils/verifyJwt');


//CREATE
route.post("/:hotelId", verifyAdmin, createRoom);

//UPDATE
route.put("/:id", verifyAdmin, updateRoom);
route.put("/availability/:roomId",updateRoomAvailability);

//DELETE
route.delete("/:hotelId/:id", verifyAdmin, deleteRoom);

//GET
route.get("/:id", getRoom);

//GET ALL
route.get("/", getAllRooms);

module.exports= route;