const Appointment = require("../models/Appointment");
const sendMail = require("../config/sendmail");

exports.bookAppointment = async (req, res) => {
  try {
    // 1️⃣ Basic request validation
    if (!req.body || !req.body.patient || !req.body.patient.email) {
      return res.status(400).json({
        success: false,
        message: "Invalid request data",
      });
    }

    // 2️⃣ Create and save appointment
    const appointment = new Appointment(req.body);
    await appointment.save();

    const userEmail = appointment.patient.email;
    const adminEmail = process.env.ADMIN_EMAIL;

    // 3️⃣ Format date safely
    const formattedDate = appointment.preferredDate
      ? new Date(appointment.preferredDate).toDateString()
      : "Not Provided";

    // 4️⃣ Safe address handling (important for TELEHEALTH / CLINIC)
    const patientAddress =
      appointment.patient.address || "Not Required / Not Provided";

    // 5️⃣ Send emails (failure here should NOT affect booking)
    try {
      // 📩 User confirmation email
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

      // 📩 Admin notification email
      if (adminEmail) {
        await sendMail({
          to: adminEmail,
          subject: "New Appointment Booked | TrustHomeCare",
          html: `
            <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
              <h2 style="color: #0a6ebd;">New Appointment Alert</h2>

              <table style="border-collapse: collapse; margin-top: 15px;">
                <tr>
                  <td style="padding: 8px;"><strong>Patient Name</strong></td>
                  <td style="padding: 8px;">${appointment.patient.fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px;"><strong>Contact</strong></td>
                  <td style="padding: 8px;">${appointment.patient.contactNumber}</td>
                </tr>
                <tr>
                  <td style="padding: 8px;"><strong>Email</strong></td>
                  <td style="padding: 8px;">${appointment.patient.email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px;"><strong>Service</strong></td>
                  <td style="padding: 8px;">${appointment.serviceType}</td>
                </tr>
                <tr>
                  <td style="padding: 8px;"><strong>Visit Type</strong></td>
                  <td style="padding: 8px;">${appointment.visitType}</td>
                </tr>
                <tr>
                  <td style="padding: 8px;"><strong>Date</strong></td>
                  <td style="padding: 8px;">${formattedDate}</td>
                </tr>
                <tr>
                  <td style="padding: 8px;"><strong>Time</strong></td>
                  <td style="padding: 8px;">${appointment.preferredTime}</td>
                </tr>
                <tr>
                  <td style="padding: 8px;"><strong>Address</strong></td>
                  <td style="padding: 8px;">${patientAddress}</td>
                </tr>
              </table>
            </div>
          `,
        });
      }
    } catch (mailError) {
      console.error("Email sending failed:", mailError.message);
    }

    // 6️⃣ Final response
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
