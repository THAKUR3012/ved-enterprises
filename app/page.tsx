import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustBar } from "@/components/home/TrustBar";
import { ServicesSection } from "@/components/home/ServicesSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { AboutSection } from "@/components/home/AboutSection";
import { ServiceAreasSection } from "@/components/home/ServiceAreasSection";
import { GallerySection } from "@/components/home/GallerySection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { BookingSection } from "@/components/home/BookingSection";
import { ContactSection } from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <div className="w-full overflow-hidden">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Trust Bar (4 blocks) */}
      <TrustBar />

      {/* 3. Services 8-Grid Section */}
      <ServicesSection />

      {/* 4. Why Choose Us (Split Layout) */}
      <WhyChooseUs />

      {/* 5. How It Works (4-Step Process) */}
      <HowItWorks />

      {/* 6. Featured Deep Dive Services */}
      <FeaturedServices />

      {/* 7. About Company Story & Stats */}
      <AboutSection />

      {/* 8. Service Areas Coverage */}
      <ServiceAreasSection />

      {/* 9. Gallery / Our Work with Lightbox */}
      <GallerySection />

      {/* 10. Customer Testimonials */}
      <TestimonialsSection />

      {/* 11. Booking System & Form */}
      <BookingSection />

      {/* 12. Contact & Service Hub Details */}
      <ContactSection />
    </div>
  );
}
