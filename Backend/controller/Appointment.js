const Appointment = require("../models/Appointment");
const sendMail = require("../config/sendmail");


const sendEmailsAsync = async (appointment) => {
  try {
    const userEmail = appointment.patient.email;
    const adminEmail = process.env.ADMIN_EMAIL;
    const formattedDate = new Date(appointment.preferredDate).toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    const commonStyles = `
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        line-height: 1.6;
        color: #2d3748;
    `;

    await sendMail({
      to: userEmail,
      subject: "✅ Confirmed: Your Appointment with TrustHomeCare",
      html: `
        <div style="${commonStyles} background-color: #f7fafc; padding: 40px 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
            
            <div style="background-color: #0056b3; padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">TrustHomeCare</h1>
              <p style="color: #e0eaff; margin: 5px 0 0; font-size: 14px;">Professional Healthcare at Your Doorstep</p>
            </div>

            <div style="padding: 40px;">
              <h2 style="color: #1a202c; margin-top: 0; font-size: 20px;">Appointment Confirmed</h2>
              <p>Dear <strong>${appointment.patient.fullName}</strong>,</p>
              <p>Thank you for choosing TrustHomeCare. Your booking has been successfully received and scheduled. Here are your visit details:</p>

              <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin: 25px 0; border-left: 4px solid #0056b3;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #718096; font-size: 13px; text-transform: uppercase;">Service</td>
                    <td style="padding: 8px 0; font-weight: 600; text-align: right;">${appointment.serviceType}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #718096; font-size: 13px; text-transform: uppercase;">Visit Mode</td>
                    <td style="padding: 8px 0; font-weight: 600; text-align: right;">${appointment.visitType.replace('_', ' ')}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #718096; font-size: 13px; text-transform: uppercase;">Date</td>
                    <td style="padding: 8px 0; font-weight: 600; text-align: right;">${formattedDate}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #718096; font-size: 13px; text-transform: uppercase;">Time</td>
                    <td style="padding: 8px 0; font-weight: 600; text-align: right;">${appointment.preferredTime}</td>
                  </tr>
                </table>
              </div>

              <p style="font-size: 14px; color: #4a5568;">
                <strong>What's next?</strong><br>
                Our team will reach out to you if any further information is required. If you need to reschedule, please contact our support desk.
              </p>

              <div style="text-align: center; margin-top: 30px;">
                <a href="mailto:support@trusthomecare.com" style="background-color: #0056b3; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Contact Support</a>
              </div>
            </div>

            <div style="background-color: #edf2f7; padding: 20px; text-align: center; font-size: 12px; color: #718096;">
              © ${new Date().getFullYear()} TrustHomeCare Services. <br>
              This is an automated confirmation. Please do not reply directly to this email.
            </div>
          </div>
        </div>
      `,
    });


    if (adminEmail) {
      await sendMail({
        to: adminEmail,
        subject: `📢 NEW BOOKING: ${appointment.patient.fullName} | ${appointment.visitType}`,
        html: `
          <div style="${commonStyles} background-color: #f4f7f6; padding: 30px;">
            <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; border-top: 5px solid #2d3748; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <div style="padding: 25px;">
                <h2 style="margin: 0 0 20px; color: #1a202c;">New Appointment Alert</h2>
                
                <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
                  <tr style="border-bottom: 1px solid #edf2f7;"><td style="padding: 10px 0; color: #718096;">Patient</td><td style="padding: 10px 0; font-weight: bold;">${appointment.patient.fullName} (Age: ${appointment.patient.age})</td></tr>
                  <tr style="border-bottom: 1px solid #edf2f7;"><td style="padding: 10px 0; color: #718096;">Contact</td><td style="padding: 10px 0;">${appointment.patient.contactNumber}</td></tr>
                  <tr style="border-bottom: 1px solid #edf2f7;"><td style="padding: 10px 0; color: #718096;">Email</td><td style="padding: 10px 0;">${appointment.patient.email}</td></tr>
                  <tr style="border-bottom: 1px solid #edf2f7;"><td style="padding: 10px 0; color: #718096;">Schedule</td><td style="padding: 10px 0;">${formattedDate} at ${appointment.preferredTime}</td></tr>
                  <tr style="border-bottom: 1px solid #edf2f7;"><td style="padding: 10px 0; color: #718096;">Visit Type</td><td style="padding: 10px 0;"><span style="background: #e2e8f0; padding: 2px 8px; border-radius: 4px; font-size: 12px;">${appointment.visitType}</span></td></tr>
                  ${
                    appointment.visitType === "HOME_VISIT"
                      ? `<tr><td style="padding: 10px 0; color: #718096;">Location</td><td style="padding: 10px 0; color: #e53e3e; font-weight: bold;">${appointment.patient.address}</td></tr>`
                      : ""
                  }
                </table>

                <div style="margin-top: 25px; padding-top: 15px; border-top: 1px dashed #cbd5e0;">
                  <p style="font-size: 12px; color: #a0aec0;">Reason for visit: ${appointment.reasonForVisit || 'Not provided'}</p>
                </div>
              </div>
            </div>
          </div>
        `,
      });
    }

    console.log("✅ Emails sent successfully");
  } catch (err) {
    console.error("❌ Email sending failed:", err.message);
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
        message: "Please fill in all required fields properly.",
      });
    }

    if (visitType === "HOME_VISIT" && !patient.address) {
      return res.status(400).json({
        success: false,
        message: "Address is mandatory for Home Visit appointments.",
      });
    }

    const appointment = await Appointment.create({
      ...req.body,
      confirmedAt: new Date(),
    });


    await sendEmailsAsync(appointment.toObject());

    return res.status(201).json({
      success: true,
      message: "Your appointment has been booked successfully!",
      data: appointment._id,
    });

  } catch (error) {
    console.error("Booking Error:", error);
    
    if (error.name === 'ValidationError') {
        return res.status(400).json({ success: false, message: error.message });
    }

    return res.status(500).json({
      success: false,
      message: "We encountered a server error. Please try again in a moment.",
    });
  }
};