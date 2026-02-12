import { useState } from "react";
import toast from "react-hot-toast";
import "./BookNowForm.css";

const BookNowForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    service: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.contact || !formData.service) {
      toast.error("Please fill all fields");
      return;
    }

    console.log("Booking Details:", formData);
    toast.success("Booking request submitted successfully ✅");

    setFormData({ name: "", contact: "", service: "" });
  };

  return (
    <div className="book-form-container">
      <h2>Book Home Care Service</h2>

      <form onSubmit={handleSubmit} className="book-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="tel"
          name="contact"
          placeholder="Contact Number"
          value={formData.contact}
          onChange={handleChange}
        />

        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
        >
          <option value="">Select Service</option>
          <option value="Nursing Care">Nursing Care</option>
          <option value="Patient Care">Patient Care</option>
          <option value="Physiotherapy">Physiotherapy</option>
          <option value="Medical Equipment">Medical Equipment</option>
        </select>

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookNowForm;
