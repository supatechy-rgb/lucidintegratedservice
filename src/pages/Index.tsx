import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookingModal } from "@/components/BookingModal";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustSection } from "@/components/home/TrustSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { BentoGallery } from "@/components/home/BentoGallery";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header onBookingClick={() => setIsBookingOpen(true)} />
      
      <main>
        <HeroSection onBookingClick={() => setIsBookingOpen(true)} />
        <TrustSection />
        <ServicesSection onBookingClick={() => setIsBookingOpen(true)} />
        <BentoGallery />
        <TestimonialsSection />
        <FAQSection />
        <CTASection onBookingClick={() => setIsBookingOpen(true)} />
      </main>

      <Footer />
      
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
};

export default Index;
