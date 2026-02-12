import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      role: 'Family Caregiver',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      imageAlt: 'Professional woman with warm smile wearing light blue cardigan in bright indoor setting with natural lighting',
      rating: 5,
      text: 'TrustHomeCare has been a lifesaver for our family. When my mother needed post-surgery care, their nurses were professional, compassionate, and incredibly skilled. The equipment rental process was seamless, and everything was delivered and set up the same day. I can\'t recommend them enough.',
      service: 'Nursing Care & Equipment Rental',
      date: 'January 2026'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      role: 'Healthcare Professional',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d',
      imageAlt: 'Asian male doctor in white medical coat with stethoscope standing in modern hospital corridor with professional demeanor',
      rating: 5,
      text: 'As a physician, I appreciate the flexibility TrustHomeCare offers. I can provide quality care to patients in their homes on my schedule. The platform handles all the logistics, insurance verification, and scheduling, allowing me to focus on what I do best—caring for patients.',
      service: 'Doctor Consultations',
      date: 'December 2025'
    },
    {
      id: 3,
      name: 'Robert Thompson',
      role: 'Patient',
      image: 'https://images.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg',
      imageAlt: 'Middle-aged man with gray beard wearing casual navy sweater smiling warmly in outdoor natural setting',
      rating: 5,
      text: 'Managing my chronic condition became so much easier with TrustHomeCare. The medical equipment I needed was delivered quickly, and the physical therapist who visits twice a week has made a tremendous difference in my recovery. The entire team treats me like family.',
      service: 'Physical Therapy & Equipment',
      date: 'November 2025'
    },
    {
      id: 4,
      name: 'Jennifer Rodriguez',
      role: 'Family Caregiver',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      imageAlt: 'Hispanic woman with long dark hair wearing professional attire with confident smile in modern office environment',
      rating: 5,
      text: 'When my father was discharged from the hospital, I was overwhelmed with all the care requirements. TrustHomeCare coordinated everything—from the hospital bed and oxygen equipment to daily nursing visits. Their 24/7 support gave me peace of mind knowing help was always available.',
      service: 'Complete Care Coordination',
      date: 'October 2025'
    }
  ];

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials?.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-background px-4 py-2 rounded-full mb-4">
            <Icon name="MessageSquare" size={16} color="var(--color-primary)" />
            <span className="text-xs md:text-sm text-primary font-medium">Patient Stories</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 font-headline">
            Trusted by Families Nationwide
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Real stories from real people who have experienced the TrustHomeCare difference in their healthcare journey.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="bg-background rounded-xl md:rounded-2xl shadow-medium p-6 md:p-8 lg:p-12 border border-border">
            <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-center lg:items-start">
              <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden flex-shrink-0 border-4 border-primary/20">
                <Image
                  src={testimonials?.[activeTestimonial]?.image}
                  alt={testimonials?.[activeTestimonial]?.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-1 mb-3 md:mb-4">
                  {[...Array(testimonials?.[activeTestimonial]?.rating)]?.map((_, index) => (
                    <Icon key={index} name="Star" size={20} color="var(--color-accent)" />
                  ))}
                </div>

                <blockquote className="text-base md:text-lg lg:text-xl text-foreground mb-4 md:mb-6 leading-relaxed italic">
                  "{testimonials?.[activeTestimonial]?.text}"
                </blockquote>

                <div className="mb-4">
                  <h4 className="text-lg md:text-xl font-bold text-foreground font-cta">
                    {testimonials?.[activeTestimonial]?.name}
                  </h4>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {testimonials?.[activeTestimonial]?.role}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Icon name="Briefcase" size={16} color="var(--color-primary)" />
                    <span>{testimonials?.[activeTestimonial]?.service}</span>
                  </div>
                  <div className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground"></div>
                  <div className="flex items-center gap-2">
                    <Icon name="Calendar" size={16} color="var(--color-primary)" />
                    <span>{testimonials?.[activeTestimonial]?.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6 md:mt-8">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-background border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center shadow-soft"
              aria-label="Previous testimonial"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>

            <div className="flex items-center gap-2">
              {testimonials?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial
                      ? 'bg-primary w-6 md:w-8' :'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-background border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center shadow-soft"
              aria-label="Next testimonial"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>
        </div>

        <div className="mt-10 md:mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="bg-background rounded-xl p-6 text-center shadow-soft border border-border">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">4.9/5</div>
            <div className="text-sm md:text-base text-muted-foreground">Average Rating</div>
            <div className="flex items-center justify-center gap-1 mt-3">
              {[...Array(5)]?.map((_, index) => (
                <Icon key={index} name="Star" size={16} color="var(--color-accent)" />
              ))}
            </div>
          </div>

          <div className="bg-background rounded-xl p-6 text-center shadow-soft border border-border">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">5,000+</div>
            <div className="text-sm md:text-base text-muted-foreground">Happy Families</div>
            <div className="flex items-center justify-center gap-2 mt-3 text-success">
              <Icon name="TrendingUp" size={16} />
              <span className="text-xs md:text-sm font-medium">Growing Daily</span>
            </div>
          </div>

          <div className="bg-background rounded-xl p-6 text-center shadow-soft border border-border">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">98%</div>
            <div className="text-sm md:text-base text-muted-foreground">Would Recommend</div>
            <div className="flex items-center justify-center gap-2 mt-3 text-success">
              <Icon name="ThumbsUp" size={16} />
              <span className="text-xs md:text-sm font-medium">Verified Reviews</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;