import React, { useState } from "react";
import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import Icon from "../../components/AppIcon";
import ServiceCard from "./components/ServiceCard";
import ProfessionalCard from "./components/ProfessionalCard";
import BookingModal from "./components/BookingModal";
import SearchBar from "./components/SearchBar";
import EmergencyBanner from "./components/EmergencyBanner";
import TrustIndicators from "./components/TrustIndicators";

const ServicesBooking = () => {
  const [activeTab, setActiveTab] = useState("services");
  const [searchQuery, setSearchQuery] = useState("");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedProfessional, setSelectedProfessional] = useState(null);

  const services = [
    {
      id: 1,
      name: "24/7 Nursing Care",
      description:
        "Professional nursing care available round-the-clock for post-surgery recovery, chronic condition management, and elderly care support.",
      image:
        "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg",
      imageAlt:
        "Professional female nurse in blue scrubs checking patient vitals with stethoscope in modern home care setting",
      duration: "Flexible hours",
      location: "Home Visit",
      rating: 4.9,
      reviews: 342,
      price: 85,
      features: ["Licensed RN", "Insurance Accepted", "Emergency Available"],
      isPopular: true,
      isUrgent: false,
    },
    {
      id: 2,
      name: "Doctor Consultation",
      description:
        "Connect with board-certified physicians for comprehensive medical consultations, diagnosis, and treatment plans from the comfort of your home.",
      image:
        "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg",
      imageAlt:
        "Male doctor in white coat conducting telehealth video consultation on laptop in bright medical office",
      duration: "30-60 min",
      location: "Telehealth/Home",
      rating: 4.8,
      reviews: 567,
      price: 120,
      features: [
        "Board Certified",
        "Prescription Service",
        "Follow-up Included",
      ],
      isPopular: true,
      isUrgent: false,
    },
    {
      id: 3,
      name: "Physical Therapy",
      description:
        "Personalized physical therapy sessions designed to improve mobility, reduce pain, and accelerate recovery after injury or surgery.",
      image:
        "https://images.pixabay.com/photo/2017/08/25/15/10/physiotherapy-2680942_1280.jpg",
      imageAlt:
        "Physical therapist in gray uniform assisting elderly patient with leg exercises on therapy mat in rehabilitation center",
      duration: "45-60 min",
      location: "Home Visit",
      rating: 4.9,
      reviews: 289,
      price: 95,
      features: ["Licensed PT", "Custom Plans", "Progress Tracking"],
      isPopular: false,
      isUrgent: false,
    },
    {
      id: 4,
      name: "Emergency Care",
      description:
        "Immediate medical attention for urgent health concerns with rapid response team deployment and emergency treatment protocols.",
      image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133",
      imageAlt:
        "Emergency medical team in red uniforms rushing with medical equipment and stretcher in hospital emergency department",
      duration: "Immediate",
      location: "Home Visit",
      rating: 5.0,
      reviews: 178,
      price: 250,
      features: ["24/7 Available", "Rapid Response", "Full Equipment"],
      isPopular: false,
      isUrgent: true,
    },
    {
      id: 5,
      name: "Specialist Consultation",
      description:
        "Access to specialized medical experts including cardiologists, neurologists, and other specialists for advanced care needs.",
      image:
        "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg",
      imageAlt:
        "Female specialist doctor in white coat reviewing medical charts and x-rays on digital tablet in consultation room",
      duration: "45-90 min",
      location: "Telehealth/Clinic",
      rating: 4.9,
      reviews: 423,
      price: 180,
      features: ["Board Certified", "Advanced Diagnostics", "Treatment Plans"],
      isPopular: true,
      isUrgent: false,
    },
    {
      id: 6,
      name: "Mental Health Support",
      description:
        "Professional counseling and therapy services for mental health support, stress management, and emotional wellbeing.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
      imageAlt:
        "Compassionate female therapist in casual attire having supportive conversation with patient in comfortable therapy office",
      duration: "50 min",
      location: "Telehealth",
      rating: 4.8,
      reviews: 512,
      price: 110,
      features: ["Licensed Therapist", "Confidential", "Flexible Scheduling"],
      isPopular: false,
      isUrgent: false,
    },
  ];

  const professionals = [
    {
      id: 1,
      name: "Dr. Sarah Mitchell",
      specialization: "Family Medicine",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      avatarAlt:
        "Professional headshot of female doctor with brown hair in white medical coat smiling warmly at camera",
      rating: 4.9,
      totalReviews: 342,
      experience: 12,
      location: "Manhattan, NY",
      languages: ["English", "Spanish"],
      availability: "Today, 2:00 PM",
      consultationFee: 120,
      bio: "Board-certified family physician with extensive experience in preventive care, chronic disease management, and patient education.",
      certifications: ["Board Certified", "ACLS", "BLS"],
      isVerified: true,
    },
    {
      id: 2,
      name: "Nurse Emily Rodriguez",
      specialization: "Registered Nurse",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      avatarAlt:
        "Professional headshot of Hispanic female nurse with dark hair in blue scrubs with friendly smile",
      rating: 5.0,
      totalReviews: 567,
      experience: 8,
      location: "Brooklyn, NY",
      languages: ["English", "Spanish", "Portuguese"],
      availability: "Tomorrow, 9:00 AM",
      consultationFee: 85,
      bio: "Compassionate registered nurse specializing in post-operative care, wound management, and elderly patient support.",
      certifications: ["RN License", "CCRN", "Wound Care"],
      isVerified: true,
    },
    {
      id: 3,
      name: "Dr. James Chen",
      specialization: "Cardiologist",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      avatarAlt:
        "Professional headshot of Asian male cardiologist in white coat with stethoscope and confident expression",
      rating: 4.9,
      totalReviews: 423,
      experience: 15,
      location: "Queens, NY",
      languages: ["English", "Mandarin"],
      availability: "This Week",
      consultationFee: 180,
      bio: "Experienced cardiologist specializing in heart disease prevention, hypertension management, and cardiac rehabilitation.",
      certifications: ["Board Certified", "FACC", "Echo Certified"],
      isVerified: true,
    },
    {
      id: 4,
      name: "Physical Therapist Maria Santos",
      specialization: "Physical Therapy",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      avatarAlt:
        "Professional headshot of female physical therapist with blonde hair in athletic wear with encouraging smile",
      rating: 4.8,
      totalReviews: 289,
      experience: 10,
      location: "Bronx, NY",
      languages: ["English", "Spanish"],
      availability: "Today, 4:00 PM",
      consultationFee: 95,
      bio: "Licensed physical therapist with expertise in orthopedic rehabilitation, sports injuries, and geriatric mobility improvement.",
      certifications: [
        "PT License",
        "Orthopedic Specialist",
        "Geriatric Certified",
      ],
      isVerified: true,
    },
    {
      id: 5,
      name: "Dr. Michael Thompson",
      specialization: "Emergency Medicine",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      avatarAlt:
        "Professional headshot of male emergency physician in blue scrubs with serious focused expression",
      rating: 5.0,
      totalReviews: 178,
      experience: 18,
      location: "Manhattan, NY",
      languages: ["English"],
      availability: "24/7 Available",
      consultationFee: 250,
      bio: "Emergency medicine specialist with extensive trauma care experience and rapid response expertise for urgent medical situations.",
      certifications: ["Board Certified", "ATLS", "ACLS", "PALS"],
      isVerified: true,
    },
    {
      id: 6,
      name: "Therapist Lisa Anderson",
      specialization: "Mental Health Counselor",
      avatar: "https://randomuser.me/api/portraits/women/52.jpg",
      avatarAlt:
        "Professional headshot of female therapist with red hair in casual professional attire with warm compassionate smile",
      rating: 4.9,
      totalReviews: 512,
      experience: 14,
      location: "Brooklyn, NY",
      languages: ["English", "French"],
      availability: "Tomorrow, 10:00 AM",
      consultationFee: 110,
      bio: "Licensed mental health counselor specializing in anxiety, depression, stress management, and cognitive behavioral therapy.",
      certifications: ["LMHC", "CBT Certified", "Trauma Informed"],
      isVerified: true,
    },
  ];

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      serviceType: "all",
      availability: "all",
      location: "all",
      sortBy: "recommended",
      priceMin: "",
      priceMax: "",
    });
  };

  const handleBookService = (service) => {
    console.log("handleBookService called with:", service);
    setSelectedService(service);
    setSelectedProfessional(null);
    setIsBookingModalOpen(true);
    console.log("Modal should now be open");
  };

  const handleBookProfessional = (professional) => {
    setSelectedProfessional(professional);
    setSelectedService(null);
    setIsBookingModalOpen(true);
  };

  const handleViewProfile = (professional) => {
    console.log("View profile:", professional);
    alert(`Viewing profile for ${professional?.name}`);
  };

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 md:py-8 lg:py-12">
          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 font-headline">
              Book Healthcare Services
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Connect with certified healthcare professionals for quality care
              at home
            </p>
          </div>

          <EmergencyBanner />

          <TrustIndicators />

          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearch={handleSearch}
          />

          <div className="flex items-center justify-between my-6">
            <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
              <button
                onClick={() => setActiveTab("services")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "services"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon name="Briefcase" size={16} />
                  <span>Services</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab("professionals")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "professionals"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon name="Users" size={16} />
                  <span>Professionals</span>
                </div>
              </button>
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              {activeTab === "services"
                ? services?.length
                : professionals?.length}{" "}
              results
            </p>
          </div>

          {activeTab === "services" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
              {services?.map((service) => (
                <ServiceCard
                  key={service?.id}
                  service={service}
                  onBookNow={handleBookService}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
              {professionals?.map((professional) => (
                <ProfessionalCard
                  key={professional?.id}
                  professional={professional}
                  onViewProfile={handleViewProfile}
                  onBookAppointment={handleBookProfessional}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        service={selectedService}
        professional={selectedProfessional}
      />
    </div>
  );
};

export default ServicesBooking;
