const Joi = require("joi");

const equipmentBookingSchema = Joi.object({
  equipmentName: Joi.string().trim().required().messages({
    "string.empty": "Equipment name is required",
    "any.required": "Equipment name is required",
  }),

  customerName: Joi.string().trim().required().messages({
    "string.empty": "Customer name is required",
    "any.required": "Customer name is required",
  }),

  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please provide a valid email address",
      "string.empty": "Email address is required",
      "any.required": "Email address is required",
    }),

  phone: Joi.string()
    .trim()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must be exactly 10 digits",
      "string.empty": "Phone number is required",
      "any.required": "Phone number is required",
    }),

  address: Joi.string().trim().required().messages({
    "string.empty": "Address is required",
    "any.required": "Address is required",
  }),

  notes: Joi.string().trim().allow("").optional(),
});

const equipmentBookingValidator = (req, res, next) => {
  const { error } = equipmentBookingSchema.validate(req.body, {
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

module.exports = equipmentBookingValidator;
