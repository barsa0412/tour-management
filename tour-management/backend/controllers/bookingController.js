import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);

    const savedBooking = await newBooking.save();

    res.status(200).json({
      success: true,
      message: "Your tour is booked",
      data: savedBooking,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Booking failed",
    });
  }
};

export const getBooking = async (req, res) => {
  try {
    const book = await Booking.findById(req.params.id);

    res.status(200).json({
      success: true,
      message: "Successful",
      data: book,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
};

export const getAllBooking = async (req, res) => {
  try {
    const books = await Booking.find();

    res.status(200).json({
      success: true,
      message: "Successful",
      data: books,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};