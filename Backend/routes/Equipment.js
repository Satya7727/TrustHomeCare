const express = require("express");
const router = express.Router();
const equipmentBookingValidator = require("../middleware/equipmentBookingValidator");
const {bookingEquipment} = require("../controller/Equipment");

router.post("/book",equipmentBookingValidator, bookingEquipment);

module.exports = router;
