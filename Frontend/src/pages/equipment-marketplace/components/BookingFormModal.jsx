import React, { useState } from "react";
import toast from "react-hot-toast";

import api from "../../../api/axios";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";

const BookingFormModal = ({ isOpen, onClose, equipment }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!form.name || !form.email || !form.phone || !form.address) {
      toast.error("Please fill all required fields");
      return;
    }

    const payload = {
      equipment: equipment?.name,
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      notes: form.notes,
    };

    try {
      setIsSubmitting(true);

      await api.post("/equipment/book", payload);

      toast.success("Equipment booking submitted successfully!");
      setTimeout(onClose, 1200);

    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Failed to submit booking. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isSubmitting && (
        <div className="fixed inset-0 z-[999] bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-lg px-6 py-4 flex items-center gap-3 shadow-xl">
            <span className="w-6 h-6 border-3 border-primary border-t-transparent rounded-full animate-spin"></span>
            <p className="font-medium">Submitting booking...</p>
          </div>
        </div>
      )}

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="bg-card rounded-lg shadow-strong max-w-lg w-full p-6">

          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-bold">Book Equipment</h3>
            <button onClick={onClose}>
              <Icon name="X" size={22} />
            </button>
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            <strong>{equipment?.name}</strong>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              placeholder="Full Name"
              required
              className="w-full p-2 border rounded-md"
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="w-full p-2 border rounded-md"
              onChange={handleChange}
            />

            <input
              name="phone"
              placeholder="Phone Number"
              required
              className="w-full p-2 border rounded-md"
              onChange={handleChange}
            />

            <textarea
              name="address"
              placeholder="Delivery Address"
              required
              className="w-full p-2 border rounded-md"
              onChange={handleChange}
            />

            <textarea
              name="notes"
              placeholder="Additional Notes (Optional)"
              className="w-full p-2 border rounded-md"
              onChange={handleChange}
            />

            <Button type="submit" fullWidth disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Booking Request"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingFormModal;
