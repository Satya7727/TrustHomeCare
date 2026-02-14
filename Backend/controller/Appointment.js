const Appointment = require("../models/Appointment");
const sendMail = require("../config/sendmail");

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

    /* ================= VALIDATION ================= */
    if (
      !serviceType ||
      !visitType ||
      !preferredDate ||
      !preferredTime ||
      !patient ||
      !patient.fullName ||
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

    /* ================= SAVE APPOINTMENT ================= */
    const appointment = await Appointment.create({
      ...req.body,
      confirmedAt: new Date(),
    });

    /* ================= SEND RESPONSE FIRST ================= */
    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      data: appointment,
    });

    /* ================= EMAILS (BACKGROUND) ================= */

    const userEmail = appointment.patient.email;
    const adminEmail = process.env.ADMIN_EMAIL;
    const formattedDate = new Date(
      appointment.preferredDate
    ).toDateString();

    /* ================= USER EMAIL ================= */
    sendMail({
      to: userEmail,
      subject: "✅ Appointment Confirmed | TrustHomeCare",
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; background:#f4f6f8; padding:30px;">
          <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 6px 20px rgba(0,0,0,0.08);">
            
            <div style="background:#0a6ebd; padding:20px; text-align:center; color:#fff;">
              <h1 style="margin:0;">TrustHomeCare</h1>
              <p style="margin:5px 0 0;">Appointment Confirmation</p>
            </div>

            <div style="padding:25px; color:#333;">
              <p>Hello <strong>${appointment.patient.fullName}</strong>,</p>

              <p>Your appointment has been <strong style="color:#0a6ebd;">successfully booked</strong>.
              Please find the details below:</p>

              <table style="width:100%; border-collapse:collapse; margin-top:15px;">
                <tr>
                  <td style="padding:10px; border-bottom:1px solid #eee;"><strong>Service</strong></td>
                  <td style="padding:10px; border-bottom:1px solid #eee;">${appointment.serviceType}</td>
                </tr>
                <tr>
                  <td style="padding:10px; border-bottom:1px solid #eee;"><strong>Visit Type</strong></td>
                  <td style="padding:10px; border-bottom:1px solid #eee;">${appointment.visitType}</td>
                </tr>
                <tr>
                  <td style="padding:10px; border-bottom:1px solid #eee;"><strong>Date</strong></td>
                  <td style="padding:10px; border-bottom:1px solid #eee;">${formattedDate}</td>
                </tr>
                <tr>
                  <td style="padding:10px;"><strong>Time</strong></td>
                  <td style="padding:10px;">${appointment.preferredTime}</td>
                </tr>
              </table>

              <p style="margin-top:20px;">
                If you need to reschedule or cancel, please contact us in advance.
              </p>

              <p style="margin-top:25px;">
                Stay healthy,<br/>
                <strong>Team TrustHomeCare</strong>
              </p>
            </div>

            <div style="background:#f1f1f1; text-align:center; padding:12px; font-size:12px; color:#777;">
              © ${new Date().getFullYear()} TrustHomeCare. All rights reserved.
            </div>

          </div>
        </div>
      `,
    }).catch(err =>
      console.error("User email failed:", err.message)
    );

    /* ================= ADMIN EMAIL ================= */
    if (adminEmail) {
      sendMail({
        to: adminEmail,
        subject: "📢 New Appointment Booked | TrustHomeCare",
        html: `
          <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:30px;">
            <div style="max-width:650px; margin:auto; background:#fff; border-radius:10px; box-shadow:0 6px 20px rgba(0,0,0,0.08);">

              <div style="background:#222; padding:18px; color:#fff;">
                <h2 style="margin:0;">New Appointment Alert</h2>
              </div>

              <div style="padding:25px;">
                <table style="width:100%; border-collapse:collapse;">
                  <tr><td style="padding:10px;"><strong>Patient Name</strong></td><td style="padding:10px;">${appointment.patient.fullName}</td></tr>
                  <tr style="background:#fafafa;"><td style="padding:10px;"><strong>Contact</strong></td><td style="padding:10px;">${appointment.patient.contactNumber}</td></tr>
                  <tr><td style="padding:10px;"><strong>Email</strong></td><td style="padding:10px;">${appointment.patient.email}</td></tr>
                  <tr style="background:#fafafa;"><td style="padding:10px;"><strong>Service</strong></td><td style="padding:10px;">${appointment.serviceType}</td></tr>
                  <tr><td style="padding:10px;"><strong>Visit Type</strong></td><td style="padding:10px;">${appointment.visitType}</td></tr>
                  <tr style="background:#fafafa;"><td style="padding:10px;"><strong>Date</strong></td><td style="padding:10px;">${formattedDate}</td></tr>
                  <tr><td style="padding:10px;"><strong>Time</strong></td><td style="padding:10px;">${appointment.preferredTime}</td></tr>
                  ${
                    appointment.visitType === "HOME_VISIT"
                      ? `<tr style="background:#fafafa;"><td style="padding:10px;"><strong>Address</strong></td><td style="padding:10px;">${appointment.patient.address}</td></tr>`
                      : ""
                  }
                </table>
              </div>

            </div>
          </div>
        `,
      }).catch(err =>
        console.error("Admin email failed:", err.message)
      );
    }

  } catch (error) {
    console.error("Booking Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while booking appointment",
    });
  }
};
