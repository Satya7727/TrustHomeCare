const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    // Appointment details
    serviceType: {
      type: String,
      required: true,
    },

    visitType: {
      type: String,
      enum: ["HOME_VISIT", "TELEHEALTH", "CLINIC_VISIT"],
      required: true,
    },

    preferredDate: {
      type: Date,
      required: true,
    },

    preferredTime: {
      type: String,
      required: true,
    },

    reasonForVisit: {
      type: String,
      trim: true,
    },

    // Patient details
    patient: {
      fullName: {
        type: String,
        required: true,
        trim: true,
      },

      age: {
        type: Number,
        required: true,
        min: 0,
      },

      contactNumber: {
        type: String,
        required: true,
      },

      email: {
  type: String,
  required: true,
  lowercase: true,
  trim: true, // Add this!
  match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
},

      emergencyContact: {
        type: String,
        required: true,
      },

      address: {
  type: String,
  trim: true,
  required: function () {
    // 'this' is the patient object. Use 'this.parent()' to get the root.
    const root = this.ownerDocument ? this.ownerDocument() : this.parent();
    return root.visitType === "HOME_VISIT";
  },
},
    },

    consultationFee: {
      type: Number,
      required: true,
    },

    termsAccepted: {
      type: Boolean,
      required: true,
      validate: {
        validator: (v) => v === true,
        message: "Terms must be accepted to confirm booking",
      },
    },

    confirmedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
