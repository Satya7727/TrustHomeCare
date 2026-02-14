const Appointment = require("../models/Appointment");
const sendMail = require("../config/sendmail");

const sendEmailsAsync = async (appointment) => {
  try {
    const userEmail = appointment.patient.email;
    const adminEmail = process.env.ADMIN_EMAIL;
    const formattedDate = new Date(appointment.preferredDate).toDateString();

    await sendMail({
      to: userEmail,
      subject: "✅ Appointment Confirmed | TrustHomeCare",
      html: `<h2>Appointment Confirmed</h2>
             <p>Hello ${appointment.patient.fullName},</p>
             <p>Your appointment is confirmed for <b>${formattedDate}</b> at <b>${appointment.preferredTime}</b>.</p>`
    });

    if (adminEmail) {
      await sendMail({
        to: adminEmail,
        subject: "📢 New Appointment Booked",
        html: `<p>New appointment booked by ${appointment.patient.fullName}</p>`
      });
    }

    console.log("✅ Emails sent");
  } catch (err) {
    console.error("❌ Email Error:", err.message);
  }
};

exports.bookAppointment = async (req, res) => {
  try {
    const {
      serviceType,
      visitType,
      preferredDate,
      preferredTime,
      patient,
      consultationFee,
      termsAccepted,
    } = req.body;

    // 🔐 BASIC VALIDATION
    if (
      !serviceType ||
      !visitType ||
      !preferredDate ||
      !preferredTime ||
      !patient?.fullName ||
      patient.age == null ||
      !patient.contactNumber ||
      !patient.email ||
      !patient.emergencyContact ||
      consultationFee == null ||
      termsAccepted !== true
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing or invalid appointment details",
      });
    }

    // 🔥 IMPORTANT FIX (HOME VISIT ADDRESS)
    if (visitType === "HOME_VISIT" && !patient.address) {
      return res.status(400).json({
        success: false,
        message: "Address is required for home visit",
      });
    }

    // SAVE
    const appointment = await Appointment.create({
      ...req.body,
      confirmedAt: new Date(),
    });

    // RESPOND FAST
    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      data: appointment._id,
    });

    // EMAILS (BACKGROUND)
    sendEmailsAsync(appointment.toObject());

  } catch (error) {
    console.error("❌ Mongo Error:", error.message);
    console.error(error.errors); // <-- THIS shows exact field issue

    return res.status(500).json({
      success: false,
      message: "Internal server error while booking appointment",
    });
  }
};
