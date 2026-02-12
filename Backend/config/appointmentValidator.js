const Joi = require("joi");

const appointmentSchema = Joi.object({
  serviceType: Joi.string().required(),

  visitType: Joi.string()
    .valid("HOME_VISIT", "TELEHEALTH", "CLINIC_VISIT")
    .required(),

  preferredDate: Joi.date().required(),

  preferredTime: Joi.string().required(),

  reasonForVisit: Joi.string().allow("", null),

  consultationFee: Joi.number().required(),

  termsAccepted: Joi.boolean().valid(true).required(),

  patient: Joi.object({
    fullName: Joi.string().trim().required(),

    age: Joi.number().min(0).required(),

    contactNumber: Joi.string().required(),

    email: Joi.string().email().required(),

    emergencyContact: Joi.string().required(),

    insuranceProvider: Joi.string().allow("", null),

    specialRequirements: Joi.string().allow("", null),
  }).required(),
});

module.exports = appointmentSchema;
