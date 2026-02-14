const express = require("express");
const router = express.Router();
const appointmentBookingValidator = require("../middleware/appointmentBookingValidator");

const {bookAppointment} = require("../controller/Appointment");

router.post("/book",appointmentBookingValidator, bookAppointment);

module.exports = router;
