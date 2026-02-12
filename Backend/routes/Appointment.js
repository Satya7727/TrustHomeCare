const express = require("express");
const router = express.Router();

const {bookAppointment} = require("../controller/Appointment");

router.post("/book", bookAppointment);

module.exports = router;
