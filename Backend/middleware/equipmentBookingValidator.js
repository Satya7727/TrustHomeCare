const Joi = require("joi");

const equipmentBookingSchema = Joi.object({

  equipmentName: Joi.string().trim().required().messages({
    "string.empty": "Equipment name is missing",
    "any.required": "Equipment name is required",
  }),

  customerName: Joi.string().trim().required().messages({
    "string.empty": "Customer name is required",
  }),

  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please provide a valid email address",
      "string.empty": "Email is required",
    }),

  phone: Joi.string()
    .trim()

    .pattern(/^(\+91[\-\s]?)?[0]?[6789]\d{9}$/) 
    .required()
    .messages({
      "string.pattern.base": "Please enter a valid 10-digit phone number",
      "string.empty": "Phone number is required",
    }),

  address: Joi.string().trim().required().messages({
    "string.empty": "Delivery address is required",
  }),

  notes: Joi.string().trim().allow("").optional(),
});

const equipmentBookingValidator = (req, res, next) => {
  const { error } = equipmentBookingSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    console.log("Joi Validation Error Details:", error.details.map(d => d.message));

    return res.status(400).json({
      success: false,
      message: error.details[0].message, 
      errors: error.details.map((err) => err.message),
    });
  }

  next();
};

module.exports = equipmentBookingValidator;