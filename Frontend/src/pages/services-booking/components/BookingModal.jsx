import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import { Checkbox } from "../../../components/ui/Checkbox";
import toast from "react-hot-toast";
import api from "../../../api/axios";

const BookingModal = ({ isOpen, onClose, service, professional }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    visitType: "HOME_VISIT",
    patientName: "",
    patientAge: "",
    contactNumber: "",
    email: "",
    symptoms: "",
    insuranceProvider: "",
    emergencyContact: "",
    specialRequirements: "",
    agreeToTerms: false,
  });

  if (!isOpen) return null;

  const visitTypeOptions = [
    { value: "HOME_VISIT", label: "Home Visit" },
    { value: "TELEHEALTH", label: "Telehealth Consultation" },
    { value: "CLINIC_VISIT", label: "Clinic Visit" },
  ];

  const timeSlots = [
    { value: "09:00", label: "9:00 AM" },
    { value: "10:00", label: "10:00 AM" },
    { value: "11:00", label: "11:00 AM" },
    { value: "14:00", label: "2:00 PM" },
    { value: "15:00", label: "3:00 PM" },
    { value: "16:00", label: "4:00 PM" },
  ];

  const handleInputChange = (field, value) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step === 1 && (!bookingData.date || !bookingData.time)) {
      toast.error("Please select date and time");
      return;
    }

    if (step === 2 && (!bookingData.patientName || !bookingData.email)) {
      toast.error("Please fill required patient details");
      return;
    }

    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (!bookingData.agreeToTerms) {
      toast.error("You must accept terms to continue");
      return;
    }

    const finalData = {
      serviceType: professional
        ? professional.specialization
        : service?.name,

      visitType: bookingData.visitType,

      preferredDate: bookingData.date,
      preferredTime: bookingData.time,
      reasonForVisit: bookingData.symptoms,

      patient: {
        fullName: bookingData.patientName,
        age: bookingData.patientAge,
        contactNumber: bookingData.contactNumber,
        email: bookingData.email,
        emergencyContact: bookingData.emergencyContact,
        insuranceProvider: bookingData.insuranceProvider,
        specialRequirements: bookingData.specialRequirements,
      },

      consultationFee: professional
        ? professional.consultationFee
        : service?.price,

      termsAccepted: bookingData.agreeToTerms,
    };

    try {
      setLoading(true);

      const response = await api.post(
        "/appointment/book",
        finalData
      );

      toast.success(
        response.data?.message || "Appointment booked successfully"
      );

      // Reset state
      setBookingData({
        date: "",
        time: "",
        visitType: "HOME_VISIT",
        patientName: "",
        patientAge: "",
        contactNumber: "",
        email: "",
        symptoms: "",
        insuranceProvider: "",
        emergencyContact: "",
        specialRequirements: "",
        agreeToTerms: false,
      });

      setStep(1);
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Booking failed. Please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-4 flex justify-between">
          <h2 className="text-lg font-semibold">Book Appointment</h2>
          <button onClick={onClose}>
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {step === 1 && (
            <>
              <Select
                label="Visit Type"
                options={visitTypeOptions}
                value={bookingData.visitType}
                onChange={(value) =>
                  handleInputChange("visitType", value)
                }
              />

              <Input
                label="Preferred Date"
                type="date"
                value={bookingData.date}
                onChange={(e) =>
                  handleInputChange("date", e.target.value)
                }
                min={new Date().toISOString().split("T")[0]}
              />

              <Select
                label="Preferred Time"
                options={timeSlots}
                value={bookingData.time}
                onChange={(value) =>
                  handleInputChange("time", value)
                }
              />
            </>
          )}

          {step === 2 && (
            <>
              <Input
                label="Patient Name"
                value={bookingData.patientName}
                onChange={(e) =>
                  handleInputChange("patientName", e.target.value)
                }
              />

              <Input
                label="Email"
                type="email"
                value={bookingData.email}
                onChange={(e) =>
                  handleInputChange("email", e.target.value)
                }
              />
            </>
          )}

          {step === 3 && (
            <Checkbox
              label="I agree to Terms & Conditions"
              checked={bookingData.agreeToTerms}
              onChange={(e) =>
                handleInputChange("agreeToTerms", e.target.checked)
              }
            />
          )}

          <div className="flex justify-between pt-4">
            {step > 1 && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}

            {step < 3 ? (
              <Button onClick={handleNext}>Continue</Button>
            ) : (
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Booking..." : "Confirm Booking"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
