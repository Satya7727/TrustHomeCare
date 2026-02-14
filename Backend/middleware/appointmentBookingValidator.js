const Joi = require("joi");

const appointmentBookingSchema = Joi.object({
  serviceType: Joi.string().required(),

  visitType: Joi.string()
    .valid("HOME_VISIT", "TELEHEALTH", "CLINIC_VISIT")
    .required(),

  preferredDate: Joi.date().required(),

  preferredTime: Joi.string().required(),

  reasonForVisit: Joi.string().allow("").optional(),

  patient: Joi.object({
    fullName: Joi.string().trim().required(),

    age: Joi.number().min(0).required(),

    contactNumber: Joi.string().required(),

    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),

    emergencyContact: Joi.string().required(),

    address: Joi.when(Joi.ref("...visitType"), {
      is: "HOME_VISIT",
      then: Joi.string().trim().required(),
      otherwise: Joi.string().optional(),
    }),
  }).required(),

  consultationFee: Joi.number().required(),

  termsAccepted: Joi.boolean()
    .valid(true)
    .required()
    .messages({
      "any.only": "Terms must be accepted to confirm booking",
    }),
});


const appointmentBookingValidator = (req, res, next) => {
  const { error } = appointmentBookingSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.details.map((err) => err.message),
    });
  }

  next();
};

module.exports = appointmentBookingValidator;
