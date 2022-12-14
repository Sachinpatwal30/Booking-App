const Hotel = require("../models/Hotel");
const Room = require("../models/Room");
const createError = require("../utils/error");

const createHotel = async (req, res, next) => {

    const newHotel = new Hotel(req.body);
    try {

        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);

    } catch (error) {
        return next(error);
    }
}

const updateHotel = async (req, res, next) => {

    const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    try {
        const savedHotel = await updatedHotel.save();
        res.status(200).json(savedHotel);

    } catch (error) {
        return next(error);
    }
}



const deleteHotel = async (req, res, next) => {

    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel Deleted Successfully");

    } catch (error) {
        return next(error);
    }
}


const getHotel = async (req, res, next) => {

    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);

    } catch (error) {
        return next(error);
    }
}

const getAllHotels = async (req, res, next) => {

    const { min, max, ...others } = req.query;

    try {
        const hotels = await Hotel.find({ ...others, cheapestPrice: { $gte: min || 1, $lte: max || 1000 } }).limit(req.query.limit);
        res.status(200).json(hotels);

    } catch (error) {
        next(error);
    }
}


const countByCity = async (req, res, next) => {


    const cities = req.query.cities.split(",");

    try {

        const list = await Promise.all(cities.map((city) => {

            return Hotel.countDocuments({ city: city });

        }))

        res.status(200).json(list);

    } catch (error) {
        next(error);
    }
}

const countByType = async (req, res, next) => {

    try {

        const hotelCount = await Hotel.countDocuments({ type: "hotel" });
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
        const resortCount = await Hotel.countDocuments({ type: "resort" });
        const villaCount = await Hotel.countDocuments({ type: "villa" });
        const cabinCount = await Hotel.countDocuments({ type: "cabin" });
        const data = [
            { type: "Hotel", count: hotelCount },
            { type: "Apartment", count: apartmentCount },
            { type: "Resort", count: resortCount },
            { type: "Villa", count: villaCount },
            { type: "Cabin", count: cabinCount }
        ]
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}


const getHotelRooms = async (req, res, next) => {

    try {
        const hotel = await Hotel.findById(req.params.hotelId)
        const list = await Promise.all(hotel.rooms.map((roomId) => {
            return Room.findById(roomId);
        }))

        res.status(200).json(list);
    } catch (error) {
        next(error);

    }

}

module.exports = { createHotel, updateHotel, deleteHotel, getHotel, getAllHotels, countByCity, countByType, getHotelRooms };