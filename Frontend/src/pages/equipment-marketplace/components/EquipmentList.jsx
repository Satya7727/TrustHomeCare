import { useState } from "react";
import EquipmentCard from "./EquipmentCard";
import EquipmentModal from "./EquipmentModal";
import BookingFormModal from "./BookingFormModal";

const EquipmentList = ({ equipments }) => {
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [showBooking, setShowBooking] = useState(false);

  const handleBookNow = (equipment) => {
    setSelectedEquipment(equipment);
    setShowBooking(true);
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-6">
        {equipments.map(eq => (
          <EquipmentCard
            key={eq._id}
            equipment={eq}
            onViewDetails={setSelectedEquipment}
            onBookNow={handleBookNow}
          />
        ))}
      </div>

      {selectedEquipment && (
        <EquipmentModal
          equipment={selectedEquipment}
          onClose={() => setSelectedEquipment(null)}
          onBookNow={handleBookNow}
        />
      )}

      <BookingFormModal
        isOpen={showBooking}
        equipment={selectedEquipment}
        onClose={() => {
  setShowBooking(false);
  setSelectedEquipment(null);
}}

      />
    </>
  );
};

export default EquipmentList;
