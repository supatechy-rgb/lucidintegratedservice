import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookingModal } from "@/components/BookingModal";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Droplets,
  Wrench,
  Paintbrush,
  Sofa,
  WashingMachine,
  Bug,
  Wind,
  Plug,
  Flower,
  Layout,
  Palette,
} from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const serviceCategories = [
  {
    title: "Post-Construction",
    icon: Sparkles,
    description: "Complete cleaning solutions for newly built or renovated spaces.",
    services: [
      {
        name: "Post-Construction Cleaning",
        icon: Sparkles,
        description: "Thorough removal of construction debris, dust, and residue. We ensure your new space is move-in ready with detailed cleaning of all surfaces, windows, and fixtures.",
      },
      {
        name: "Deep Cleaning",
        icon: Droplets,
        description: "Intensive cleaning that goes beyond regular maintenance. Perfect for spring cleaning or preparing spaces for special events.",
      },
      {
        name: "Upholstery Cleaning",
        icon: Sofa,
        description: "Professional cleaning for furniture, curtains, and fabric surfaces. We use eco-friendly products safe for all materials.",
      },
      {
        name: "Laundry Services",
        icon: WashingMachine,
        description: "Comprehensive laundry solutions including washing, drying, ironing, and folding. Available for residential and commercial clients.",
      },
    ],
  },
  {
    title: "Fumigation",
    icon: Bug,
    description: "Professional pest control for a safe and healthy environment.",
    services: [
      {
        name: "Complete Fumigation",
        icon: Bug,
        description: "Full-spectrum pest control solutions targeting all types of pests. We use safe, effective products with lasting results.",
      },
    ],
  },
  {
    title: "Maintenance",
    icon: Wrench,
    description: "Keep your property in perfect condition with our maintenance services.",
    services: [
      {
        name: "General Maintenance",
        icon: Wrench,
        description: "Routine maintenance and repairs to keep your property functioning smoothly. From minor fixes to preventive care.",
      },
      {
        name: "HVAC Services",
        icon: Wind,
        description: "Heating, ventilation, and air conditioning maintenance, repair, and installation services.",
      },
      {
        name: "Electrical & Plumbing",
        icon: Plug,
        description: "Licensed technicians for all your electrical and plumbing needs. Safety and quality guaranteed.",
      },
      {
        name: "Pest Control",
        icon: Bug,
        description: "Ongoing pest management programs to keep your space pest-free year-round.",
      },
      {
        name: "Gardening & Landscaping",
        icon: Flower,
        description: "Professional landscaping, lawn care, and garden maintenance to enhance your outdoor spaces.",
      },
    ],
  },
  {
    title: "Interiors & Branding",
    icon: Paintbrush,
    description: "Transform your space with our design expertise.",
    services: [
      {
        name: "Space Planning",
        icon: Layout,
        description: "Optimize your space layout for functionality, flow, and aesthetics. Perfect for offices, retail, and homes.",
      },
      {
        name: "Interior Design",
        icon: Paintbrush,
        description: "Full-service interior design from concept to completion. We bring your vision to life.",
      },
      {
        name: "Furniture Selection",
        icon: Sofa,
        description: "Expert guidance on furniture selection that balances style, comfort, and budget.",
      },
      {
        name: "Color Consultation",
        icon: Palette,
        description: "Professional color schemes that set the right mood and complement your space.",
      },
    ],
  },
];

const Services = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleBookService = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Header onBookingClick={() => setIsBookingOpen(true)} />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        {/* Blue Tint Overlay */}
        <div className="absolute inset-0 bg-primary/85" />
        {/* White Gradient at Top */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/40 to-transparent" />
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center text-primary-foreground"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary font-medium text-sm mb-6">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              Comprehensive <span className="text-secondary">Solutions</span> for Every Need
            </h1>
            <p className="text-lg text-primary-foreground/80">
              From post-construction cleaning to interior design, we offer a complete range of services 
              to keep your spaces pristine and beautiful.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-surface-gradient">
        <div className="container space-y-20">
          {serviceCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <category.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    {category.title}
                  </h2>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>
              </div>

              {/* Service Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.services.map((service, serviceIndex) => (
                  <motion.div
                    key={service.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: serviceIndex * 0.05 }}
                    className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary transition-colors">
                      <service.icon className="w-6 h-6 text-secondary group-hover:text-secondary-foreground transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-3">
                      {service.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => handleBookService(service.name)}
                    >
                      Book This Service
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setSelectedService("");
        }}
        preselectedService={selectedService}
      />
    </div>
  );
};

export default Services;
