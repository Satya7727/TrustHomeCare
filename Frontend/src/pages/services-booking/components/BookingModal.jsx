import React, { useState } from 'react';
import toast from 'react-hot-toast';

import api from '../../../api/axios';

import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const BookingModal = ({ isOpen, onClose, service, professional }) => {
  const [step, setStep] = useState(1);

  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    visitType: 'home',
    patientName: '',
    patientAge: '',
    contactNumber: '',
    email: '',
    address: '',
    symptoms: '',
    emergencyContact: '',
    agreeToTerms: false
  });

  if (!isOpen) return null;

  const visitTypeOptions = [
    { value: 'home', label: 'Home Visit' },
    { value: 'telehealth', label: 'Telehealth Consultation' },
    { value: 'clinic', label: 'Clinic Visit' }
  ];

  const timeSlots = [
    { value: '09:00', label: '9:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '15:00', label: '3:00 PM' },
    { value: '16:00', label: '4:00 PM' }
  ];

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    try {
      if (!bookingData.agreeToTerms) {
        return toast.error('Please accept terms & conditions');
      }

      const payload = {
        serviceType: professional
          ? professional.specialization
          : service.name,

        visitType:
          bookingData.visitType === 'home'
            ? 'HOME_VISIT'
            : bookingData.visitType === 'telehealth'
            ? 'TELEHEALTH'
            : 'CLINIC_VISIT',

        preferredDate: new Date(bookingData.date),
        preferredTime: bookingData.time,

        reasonForVisit: bookingData.symptoms,

        patient: {
          fullName: bookingData.patientName,
          age: Number(bookingData.patientAge),
          contactNumber: bookingData.contactNumber,
          email: bookingData.email,
          emergencyContact: bookingData.emergencyContact,
          address:
            bookingData.visitType === 'home'
              ? bookingData.address
              : 'N/A'
        },

        consultationFee: professional
          ? professional.consultationFee
          : service.price,

        termsAccepted: bookingData.agreeToTerms
      };

      await api.post('/appointment/book', payload);

      toast.success('Appointment booked successfully!');
      setTimeout(onClose, 1200);

    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
        'Failed to book appointment. Please try again.'
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">

        {/* HEADER */}
        <div className="sticky top-0 bg-card border-b border-border p-4 md:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="Calendar" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-semibold">Book Appointment</h2>
              <p className="text-sm text-muted-foreground">Step {step} of 3</p>
            </div>
          </div>
          <button onClick={onClose}>
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-4 md:p-6">

          {/* STEP INDICATOR */}
          <div className="flex items-center justify-between mb-6">
            {[1, 2, 3].map(num => (
              <div key={num} className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= num ? 'bg-primary text-white' : 'bg-muted'}`}>
                {num}
              </div>
            ))}
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <Select
                label="Visit Type"
                options={visitTypeOptions}
                value={bookingData.visitType}
                onChange={value => handleInputChange('visitType', value)}
                required
              />

              <Input
                label="Preferred Date"
                type="date"
                value={bookingData.date}
                onChange={e => handleInputChange('date', e.target.value)}
                required
              />

              <Select
                label="Preferred Time"
                options={timeSlots}
                value={bookingData.time}
                onChange={value => handleInputChange('time', value)}
                required
              />

              <Input
                label="Reason for Visit"
                value={bookingData.symptoms}
                onChange={e => handleInputChange('symptoms', e.target.value)}
              />
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <Input label="Patient Name" value={bookingData.patientName}
                onChange={e => handleInputChange('patientName', e.target.value)} required />

              <Input label="Age" type="number" value={bookingData.patientAge}
                onChange={e => handleInputChange('patientAge', e.target.value)} required />

              <Input label="Contact Number" value={bookingData.contactNumber}
                onChange={e => handleInputChange('contactNumber', e.target.value)} required />

              <Input label="Email" type="email" value={bookingData.email}
                onChange={e => handleInputChange('email', e.target.value)} required />

              {bookingData.visitType === 'home' && (
                <Input label="Home Address" value={bookingData.address}
                  onChange={e => handleInputChange('address', e.target.value)} required />
              )}

              <Input label="Emergency Contact" value={bookingData.emergencyContact}
                onChange={e => handleInputChange('emergencyContact', e.target.value)} required />
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <Checkbox
                label="I agree to the Terms & Conditions"
                checked={bookingData.agreeToTerms}
                onChange={e => handleInputChange('agreeToTerms', e.target.checked)}
              />
            </>
          )}

          {/* FOOTER */}
          <div className="flex justify-between mt-6">
            {step > 1 && <Button onClick={handleBack}>Back</Button>}
            {step < 3
              ? <Button onClick={handleNext}>Continue</Button>
              : <Button onClick={handleSubmit} disabled={!bookingData.agreeToTerms}>Confirm</Button>
            }
          </div>

        </div>
      </div>
    </div>
  );
};

export default BookingModal;
