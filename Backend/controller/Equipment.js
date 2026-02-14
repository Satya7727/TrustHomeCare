const Equipment = require("../models/Equipment");
const sendMail = require("../config/sendmail");

const sendEquipmentEmailsAsync = async (booking) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;

    const baseStyles = `
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #2d3748;
    `;

    await sendMail({
      to: booking.email,
      subject: "✅ Your Equipment Booking | TrustHomeCare",
      html: `
      <div style="${baseStyles} background-color: #f7fafc; padding: 40px 20px;">
        <div style="max-width: 620px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 6px 20px rgba(0,0,0,0.05);">

          <div style="background-color: #0056b3; padding: 28px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">TrustHomeCare</h1>
            <p style="color: #e0eaff; margin-top: 6px; font-size: 14px;">Medical Equipment Rental Services</p>
          </div>

          <div style="padding: 35px;">
            <h2 style="margin-top:0; font-size:20px;">Booking Request Confirmed</h2>
            <p>Dear <strong>${booking.customerName}</strong>,</p>
            <p>Thank you for choosing <strong>TrustHomeCare</strong>. Your equipment booking has been received successfully. Here are the details:</p>

            <div style="background-color:#f8fafc; border-left:4px solid #0056b3; padding:20px; margin:25px 0; border-radius:8px;">
              <p><strong>Equipment:</strong> ${booking.equipmentName}</p>
              <p><strong>Delivery Address:</strong> ${booking.address}</p>
              <p><strong>Phone:</strong> ${booking.phone}</p>
              <p><strong>Notes:</strong> ${booking.notes || "—"}</p>
            </div>

            <p style="font-size:14px; color:#4a5568;">
              Our team will contact you shortly to confirm availability, pricing, and delivery schedule.
            </p>

            <div style="text-align:center; margin-top:30px;">
              <a href="mailto:support@trusthomecare.com" style="background-color:#0056b3; color:white; padding:12px 25px; text-decoration:none; border-radius:5px; font-weight:bold;">Contact Support</a>
            </div>

            <p style="margin-top:25px; font-size:13px; color:#718096;">
              This is an automated email. Please do not reply.
            </p>
          </div>

          <div style="background-color:#edf2f7; padding:18px; text-align:center; font-size:12px; color:#718096;">
            © ${new Date().getFullYear()} TrustHomeCare. All rights reserved.
          </div>

        </div>
      </div>
      `,
    });

    if (adminEmail) {
      await sendMail({
        to: adminEmail,
        subject: `📢 New Equipment Booking | ${booking.equipmentName}`,
        html: `
        <div style="${baseStyles} background-color: #f4f7f6; padding: 35px;">
          <div style="max-width:620px; margin:auto; background:#ffffff; border-radius:12px; border-top:6px solid #2d3748; box-shadow:0 6px 18px rgba(0,0,0,0.08);">
            <div style="padding:30px;">
              <h2 style="margin-top:0; font-size:20px;">New Equipment Booking Received</h2>
              <p style="font-size:14px; color:#4a5568;">Hello Admin, a new equipment booking has been submitted. Details below:</p>

              <table style="width:100%; border-collapse:collapse; font-size:14px; margin-top:15px;">
                <tr><td style="padding:8px 0; color:#718096;">Equipment</td><td><strong>${booking.equipmentName}</strong></td></tr>
                <tr><td style="padding:8px 0; color:#718096;">Customer</td><td>${booking.customerName}</td></tr>
                <tr><td style="padding:8px 0; color:#718096;">Email</td><td>${booking.email}</td></tr>
                <tr><td style="padding:8px 0; color:#718096;">Phone</td><td>${booking.phone}</td></tr>
                <tr><td style="padding:8px 0; color:#718096;">Address</td><td>${booking.address}</td></tr>
                <tr><td style="padding:8px 0; color:#718096;">Notes</td><td>${booking.notes || "—"}</td></tr>
              </table>

              <p style="margin-top:20px; font-size:12px; color:#a0aec0;">
                Please contact the customer to confirm rental terms and delivery.
              </p>
            </div>
          </div>
        </div>
        `,
      });
    }

    console.log("✅ Equipment booking emails sent successfully");
  } catch (error) {
    console.error("❌ Equipment email error:", error.message);
  }
};

exports.bookingEquipment = async (req, res) => {
  try {
    const { equipmentName, customerName, email, phone, address, notes } = req.body;

    if (!equipmentName || !customerName || !email || !phone || !address) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled.",
      });
    }

    const booking = await Equipment.create({
      equipmentName,
      customerName,
      email,
      phone,
      address,
      notes,
    });

    await sendEquipmentEmailsAsync(booking.toObject());

    return res.status(201).json({
      success: true,
      message: "Equipment booking submitted successfully!",
      data: booking._id,
    });
  } catch (error) {
    console.error("Equipment Booking Error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ success: false, message: error.message });
    }

    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
