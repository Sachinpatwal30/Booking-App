const Hotel = require('../models/Hotel');
const Room = require('../models/Room');

const createRoom = async (req, res, next) => {

    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body);

    try {

        const savedRoom = await newRoom.save();

        await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } });

        res.status(200).json(savedRoom);

    } catch (error) {

        return next(error);

    }
}


const updateRoom = async (req, res, next) => {

    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    try {
        const savedRoom = await updatedRoom.save();
        res.status(200).json(savedRoom);

    } catch (error) {
        return next(error);
    }
}

const updateRoomAvailability = async (req, res, next) => {
    try {
        await Room.updateOne(
            { "roomNumbers._id": req.params.roomId },
            {
                $push: {
                    "roomNumbers.$.unavailableDates": req.body.dates
                },
            }
        );
        res.status(200).json("Room status has been updated.");
    } catch (err) {
        next(err);
    }
};


const deleteRoom = async (req, res, next) => {

    const hotelId = req.params.hotelId;
    const roomId = req.params.id;


    try {
        await Room.findByIdAndDelete(roomId);
        await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: roomId } });
        res.status(200).json("Room Deleted Successfully");

    } catch (error) {
        return next(error);
    }
}

const getRoom = async (req, res, next) => {

    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);

    } catch (error) {
        return next(error);
    }
}

const getAllRooms = async (req, res, next) => {

    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);

    } catch (error) {
        next(error);
    }
}

module.exports = { createRoom, updateRoom, deleteRoom, getRoom, getAllRooms, updateRoomAvailability };

