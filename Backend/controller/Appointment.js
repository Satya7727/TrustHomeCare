const Appointment = require("../models/Appointment");
const sendMail = require("../config/sendmail");
const appointmentValidator = require("../config/appointmentValidator");

exports.bookAppointment = async (req, res) => {
  try {
    // 1️⃣ Basic request validation
    if (!req.body || !req.body.patient || !req.body.patient.email) {
      return res.status(400).json({
        success: false,
        message: "Invalid request data",
      });
    }

    // 2️⃣ Create appointment
    const appointment = new Appointment(req.body);
    await appointment.save();

    const userEmail = appointment.patient.email;
    const adminEmail = process.env.ADMIN_EMAIL;

    // Format date safely
    const formattedDate = appointment.preferredDate
      ? new Date(appointment.preferredDate).toDateString()
      : "Not Provided";
    try {
      await sendMail({
        to: userEmail,
        subject: "Appointment Confirmation | TrustHomeCare",
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <h2 style="color: #0a6ebd;">TrustHomeCare</h2>
            <p>Dear <strong>${appointment.patient.fullName}</strong>,</p>
            <p>Your appointment has been <strong>successfully booked</strong>.</p>

            <table style="border-collapse: collapse; margin-top: 15px;">
              <tr>
                <td style="padding: 8px;"><strong>Service</strong></td>
                <td style="padding: 8px;">${appointment.serviceType}</td>
              </tr>
              <tr>
                <td style="padding: 8px;"><strong>Date</strong></td>
                <td style="padding: 8px;">${formattedDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px;"><strong>Time</strong></td>
                <td style="padding: 8px;">${appointment.preferredTime}</td>
              </tr>
            </table>

            <p style="margin-top: 20px;">
              Thank you for choosing TrustHomeCare.
            </p>
          </div>
        `,
      });

      if (adminEmail) {
        await sendMail({
          to: adminEmail,
          subject: "New Appointment Booked | TrustHomeCare",
          html: `
            <div style="font-family: Arial, sans-serif;">
              <h3>New Appointment Details</h3>
              <p><strong>Patient:</strong> ${appointment.patient.fullName}</p>
              <p><strong>Contact:</strong> ${appointment.patient.contactNumber}</p>
              <p><strong>Email:</strong> ${appointment.patient.email}</p>
              <p><strong>Service:</strong> ${appointment.serviceType}</p>
              <p><strong>Date:</strong> ${formattedDate}</p>
              <p><strong>Time:</strong> ${appointment.preferredTime}</p>
            </div>
          `,
        });
      }

    } catch (mailError) {
      console.error("Email sending failed:", mailError.message);
    }

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      data: appointment,
    });

  } catch (error) {
    console.error("Booking Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error while booking appointment",
    });
  }
};
