import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookingModal } from "@/components/BookingModal";
import { ComingSoonModal } from "@/components/ComingSoonModal";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustSection } from "@/components/home/TrustSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { BentoGallery } from "@/components/home/BentoGallery";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleBookService = (serviceName?: string) => {
    if (serviceName === "Laundry") {
      setSelectedService("Laundry Service");
      setIsComingSoonOpen(true);
    } else {
      setSelectedService(serviceName || "");
      setIsBookingOpen(true);
    }
  };

  return (
    <div className="min-h-screen">
      <Header onBookingClick={() => handleBookService()} />
      
      <main>
        <HeroSection onBookingClick={() => handleBookService()} />
        <TrustSection />
        <ServicesSection onBookingClick={handleBookService} />
        <BentoGallery />
        <TestimonialsSection />
        <FAQSection />
        <CTASection onBookingClick={() => handleBookService()} />
      </main>

      <Footer />
      
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setSelectedService("");
        }}
        preselectedService={selectedService}
      />

      <ComingSoonModal
        isOpen={isComingSoonOpen}
        onClose={() => {
          setIsComingSoonOpen(false);
          setSelectedService("");
        }}
        serviceName={selectedService}
      />
    </div>
  );
};

export default Index;
