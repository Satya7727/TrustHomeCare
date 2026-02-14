require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");

const appointmentBooking = require("./routes/Appointment");

const app = express();


app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: "https://trust-home-care-jg61.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);



app.use("/appointment", appointmentBooking);




app.use((err, req, res, next) => {
  console.error("Error:", err.message);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});


const PORT = process.env.PORT || 8080;
const DB_URL = process.env.DB_URL;

if (!DB_URL) {
  throw new Error("DB_URL is missing in environment variables");
}

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server is ready to rock on port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(" MongoDB connection error:", error.message);
  });
