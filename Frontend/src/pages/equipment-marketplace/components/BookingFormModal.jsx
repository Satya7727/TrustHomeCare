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
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!equipment?.name) {
      toast.error("Equipment information is missing. Please refresh.");
      return;
    }

    const payload = {
      equipmentName: equipment.name, 
      customerName: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      notes: form.notes.trim(),
    };

    try {
      setIsSubmitting(true);
      const response = await api.post("/equipment/book", payload);

      if (response.data.success) {
        toast.success("Booking request submitted!");
        setTimeout(onClose, 1500);
      }
    } catch (error) {
      console.error("Submission Error:", error);

      
      const errorMessage = 
        error.response?.data?.message || 
        error.response?.data?.errors?.[0] || 
        "Something went wrong. Please try again.";

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      {isSubmitting && (
        <div className="absolute inset-0 z-[60] bg-white/60 flex items-center justify-center rounded-lg">
          <div className="flex flex-col items-center gap-2">
            <span className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
            <p className="text-sm font-semibold text-blue-900">Processing Request...</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden">
        <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
          <h3 className="text-lg font-bold">Equipment Booking</h3>
          <button onClick={onClose} className="hover:rotate-90 transition-transform">
            <Icon name="X" size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6 p-3 bg-blue-50 border-l-4 border-blue-600 rounded">
            <p className="text-xs uppercase tracking-wider text-blue-600 font-bold">Selected Item</p>
            <p className="text-lg font-semibold text-slate-800">{equipment?.name}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="name"
                value={form.name}
                placeholder="Full Name"
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                value={form.email}
                placeholder="Email Address"
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={handleChange}
                required
              />
            </div>

            <input
              name="phone"
              value={form.phone}
              placeholder="Phone (e.g. 9876543210)"
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
              required
            />

            <textarea
              name="address"
              value={form.address}
              placeholder="Full Delivery Address"
              rows="2"
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
              required
            />

            <textarea
              name="notes"
              value={form.notes}
              placeholder="Any special instructions? (Optional)"
              rows="2"
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-light"
              onChange={handleChange}
            />

            <Button 
              type="submit" 
              fullWidth 
              disabled={isSubmitting}
              className="py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-lg"
            >
              {isSubmitting ? "Sending Request..." : "Confirm Booking Request"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingFormModal;