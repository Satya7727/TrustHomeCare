const transporter = require("./mail");

const sendMail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: `"Appointment System" <${process.env.MAIL_USER}>`,
    to,
    subject,
    html,
  });
};

module.exports = sendMail;
