import React, { useState } from "react";
import toast from "react-hot-toast";

import api from "../../../api/axios";

import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import { Checkbox } from "../../../components/ui/Checkbox";

const BookingModal = ({ isOpen, onClose, service, professional }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    visitType: "home",
    patientName: "",
    patientAge: "",
    contactNumber: "",
    email: "",
    address: "",
    emergencyContact: "",
    symptoms: "",
    agreeToTerms: false,
  });

  if (!isOpen) return null;

  const visitTypeOptions = [
    { value: "home", label: "Home Visit" },
    { value: "telehealth", label: "Telehealth Consultation" },
    { value: "clinic", label: "Clinic Visit" },
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

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 3));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    if (isSubmitting) return;

    // ================= VALIDATIONS =================
    if (!bookingData.agreeToTerms) {
      toast.error("Please accept Terms & Conditions");
      return;
    }

    if (!bookingData.date || !bookingData.time) {
      toast.error("Please select date and time");
      return;
    }

    if (bookingData.visitType === "home" && !bookingData.address) {
      toast.error("Address is required for home visit");
      return;
    }

    // ================= START LOADING =================
    setIsSubmitting(true);

    try {
      const payload = {
        serviceType: "GENERAL_CONSULTATION",

        visitType:
          bookingData.visitType === "home"
            ? "HOME_VISIT"
            : bookingData.visitType === "telehealth"
              ? "TELEHEALTH"
              : "CLINIC_VISIT",

        preferredDate: bookingData.date,
        preferredTime: bookingData.time,

        reasonForVisit: bookingData.symptoms,

        patient: {
          fullName: bookingData.patientName,
          age: Number(bookingData.patientAge),
          contactNumber: bookingData.contactNumber,
          email: bookingData.email,
          emergencyContact: bookingData.emergencyContact,
          address:
            bookingData.visitType === "home" ? bookingData.address : undefined,
        },

        consultationFee: professional
          ? professional.consultationFee
          : service.price,

        termsAccepted: bookingData.agreeToTerms,
      };

      await api.post("/appointment/book", payload);

      toast.success("Appointment booked successfully!");
      setTimeout(onClose, 1200);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Failed to book appointment. Please try again.",
      );
    } finally {
      // ================= STOP LOADING =================
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* 🔥 FULL SCREEN LOADING OVERLAY */}
      {isSubmitting && (
        <div className="fixed inset-0 z-[999] bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-lg px-6 py-4 flex items-center gap-3 shadow-xl">
            <span className="w-6 h-6 border-3 border-primary border-t-transparent rounded-full animate-spin"></span>
            <p className="font-medium">Booking your appointment...</p>
          </div>
        </div>
      )}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
        <div className="bg-card rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-card border-b border-border p-4 md:p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name="Calendar" size={20} color="var(--color-primary)" />
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-foreground font-headline">
                  Book Appointment
                </h2>
                <p className="text-sm text-muted-foreground">
                  Step {step} of 3
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-md hover:bg-muted flex items-center justify-center transition-colors"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          <div className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              {[1, 2, 3]?.map((stepNum) => (
                <React.Fragment key={stepNum}>
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                        step >= stepNum
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {stepNum}
                    </div>
                    <span className="text-xs text-muted-foreground hidden md:block">
                      {stepNum === 1
                        ? "Details"
                        : stepNum === 2
                          ? "Patient Info"
                          : "Confirm"}
                    </span>
                  </div>
                  {stepNum < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 rounded-full transition-colors ${
                        step > stepNum ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    {professional && (
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={professional?.avatar}
                          alt={professional?.avatarAlt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground line-clamp-1">
                        {professional ? professional?.name : service?.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {professional
                          ? professional?.specialization
                          : service?.description}
                      </p>
                    </div>
                  </div>
                </div>

                <Select
                  label="Visit Type"
                  options={visitTypeOptions}
                  value={bookingData?.visitType}
                  onChange={(value) => handleInputChange("visitType", value)}
                  required
                />

                <Input
                  label="Preferred Date"
                  type="date"
                  value={bookingData?.date}
                  onChange={(e) => handleInputChange("date", e?.target?.value)}
                  required
                  min={new Date()?.toISOString()?.split("T")?.[0]}
                />

                <Select
                  label="Preferred Time"
                  options={timeSlots}
                  value={bookingData?.time}
                  onChange={(value) => handleInputChange("time", value)}
                  placeholder="Select time slot"
                  required
                />

                <Input
                  label="Reason for Visit"
                  type="text"
                  placeholder="Brief description of symptoms or concerns"
                  value={bookingData?.symptoms}
                  onChange={(e) =>
                    handleInputChange("symptoms", e?.target?.value)
                  }
                  description="This helps the professional prepare for your appointment"
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <Input
                  label="Patient Full Name"
                  type="text"
                  placeholder="Enter patient's full name"
                  value={bookingData?.patientName}
                  onChange={(e) =>
                    handleInputChange("patientName", e?.target?.value)
                  }
                  required
                />

                <Input
                  label="Patient Age"
                  type="number"
                  placeholder="Enter age"
                  value={bookingData?.patientAge}
                  onChange={(e) =>
                    handleInputChange("patientAge", e?.target?.value)
                  }
                  required
                />

                <Input
                  label="Contact Number"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={bookingData?.contactNumber}
                  onChange={(e) =>
                    handleInputChange("contactNumber", e?.target?.value)
                  }
                  required
                />

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="patient@example.com"
                  value={bookingData?.email}
                  onChange={(e) => handleInputChange("email", e?.target?.value)}
                  required
                />

                {bookingData?.visitType === "home" && (
                  <Input
                    label="Home Address"
                    type="text"
                    placeholder="Enter complete address"
                    value={bookingData?.address}
                    onChange={(e) =>
                      handleInputChange("address", e?.target?.value)
                    }
                    required
                  />
                )}

                <Input
                  label="Emergency Contact"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={bookingData?.emergencyContact}
                  onChange={(e) =>
                    handleInputChange("emergencyContact", e?.target?.value)
                  }
                  required
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="bg-muted rounded-lg p-4 space-y-3">
                  <h3 className="font-semibold text-foreground mb-3">
                    Appointment Summary
                  </h3>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Professional:</span>
                    <span className="font-medium text-foreground">
                      {professional ? professional?.name : service?.name}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Visit Type:</span>
                    <span className="font-medium text-foreground capitalize">
                      {bookingData?.visitType?.replace("-", " ")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Date & Time:</span>
                    <span className="font-medium text-foreground">
                      {bookingData?.date} at {bookingData?.time}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Patient:</span>
                    <span className="font-medium text-foreground">
                      {bookingData?.patientName}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Contact:</span>
                    <span className="font-medium text-foreground">
                      {bookingData?.contactNumber}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Consultation Fee:
                      </span>
                      <span className="text-xl font-bold text-primary">
                        $
                        {professional
                          ? professional?.consultationFee
                          : service?.price}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Icon
                      name="Info"
                      size={20}
                      color="var(--color-accent)"
                      className="flex-shrink-0 mt-0.5"
                    />
                    <div className="text-sm text-foreground">
                      <p className="font-medium mb-1">Important Information:</p>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>
                          • You will receive a confirmation email within 5
                          minutes
                        </li>
                        <li>
                          • The professional will contact you 24 hours before
                          the appointment
                        </li>
                        <li>
                          • Cancellation is free up to 24 hours before the
                          appointment
                        </li>
                        <li>
                          • Please have your insurance card ready if applicable
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Checkbox
                  label="I agree to the Terms of Service and Privacy Policy"
                  checked={bookingData?.agreeToTerms}
                  onChange={(e) =>
                    handleInputChange("agreeToTerms", e?.target?.checked)
                  }
                  required
                />
              </div>
            )}

            <div className="flex items-center justify-between gap-3 mt-6 pt-6 border-t border-border">
              {step > 1 && (
                <Button
                  variant="outline"
                  iconName="ChevronLeft"
                  iconPosition="left"
                  onClick={handleBack}
                >
                  Back
                </Button>
              )}
              {step < 3 ? (
                <Button
                  variant="default"
                  iconName="ChevronRight"
                  iconPosition="right"
                  onClick={handleNext}
                  className="ml-auto"
                >
                  Continue
                </Button>
              ) : (
                <Button
                  variant="default"
                  onClick={handleSubmit}
                  className="ml-auto flex items-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  )}
                  {isSubmitting ? "Booking Appointment..." : "Confirm Booking"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
