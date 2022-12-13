const Hotel = require('../models/Hotel');
const route = require('express').Router();
const { createHotel, updateHotel, deleteHotel, getAllHotels, getHotel, countByCity, countByType } = require("../controllers/hotelController");
const { verifyAdmin } = require('../utils/verifyJwt');

//CREATE
route.post("/", verifyAdmin, createHotel);

//UPDATE
route.put("/:id", verifyAdmin, updateHotel);

//DELETE
route.delete("/:id", verifyAdmin, deleteHotel);

//GET
route.get("/find/:id", getHotel);

//GET ALL
route.get("/", getAllHotels);

//Count by City Name
route.get("/countByCity",countByCity);

//Count by Type
route.get("/countByType",countByType);

module.exports = route;