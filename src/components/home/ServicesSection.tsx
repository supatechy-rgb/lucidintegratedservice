import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, WashingMachine, Bug, Wrench, Paintbrush, Truck, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import serviceCleaning from "@/assets/service-cleaning.jpg";
import serviceLaundry from "@/assets/service-laundry.jpg";
import serviceFumigation from "@/assets/service-fumigation-new.jpg";
import serviceMaintenance from "@/assets/service-maintenance-new.jpg";
import serviceInterior from "@/assets/service-interior-new.jpg";
import serviceLogistics from "@/assets/service-logistics.jpg";
import serviceSupplies from "@/assets/service-supplies.jpg";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Sparkles,
    title: "Cleaning",
    description: "Post-construction, deep cleaning & upholstery care for spotless spaces.",
    features: ["Post-Construction", "Deep Cleaning", "Upholstery"],
    image: serviceCleaning,
    accent: "from-blue-500/80 to-blue-600/80",
  },
  {
    icon: WashingMachine,
    title: "Laundry",
    description: "Professional washing, drying, ironing & folding services.",
    features: ["Washing & Drying", "Ironing", "Folding"],
    image: serviceLaundry,
    accent: "from-cyan-500/80 to-cyan-600/80",
    comingSoon: true,
  },
  {
    icon: Bug,
    title: "Fumigation",
    description: "Expert pest control to keep your property safe and pest-free.",
    features: ["Pest Control", "Complete Fumigation"],
    image: serviceFumigation,
    accent: "from-emerald-500/80 to-emerald-600/80",
  },
  {
    icon: Wrench,
    title: "Maintenance",
    description: "HVAC, electrical, plumbing & landscaping for smooth operations.",
    features: ["HVAC Services", "Electrical & Plumbing", "Landscaping"],
    image: serviceMaintenance,
    accent: "from-orange-500/80 to-orange-600/80",
  },
  {
    icon: Paintbrush,
    title: "Interior",
    description: "Transform your space with expert design & furniture selection.",
    features: ["Space Planning", "Interior Design", "Furniture Selection"],
    image: serviceInterior,
    accent: "from-purple-500/80 to-purple-600/80",
  },
  {
    icon: Truck,
    title: "Logistics",
    description: "Reliable moving services for stress-free relocations.",
    features: ["Moving In", "Move Out", "Packing Services"],
    image: serviceLogistics,
    accent: "from-amber-500/80 to-amber-600/80",
  },
  {
    icon: Package,
    title: "Supplies",
    description: "Professional-grade fumigation & cleaning supplies for purchase.",
    features: ["Fumigation Products", "Cleaning Supplies", "Equipment"],
    image: serviceSupplies,
    accent: "from-rose-500/80 to-rose-600/80",
  },
];

interface ServicesSectionProps {
  onBookingClick: (serviceName?: string) => void;
}

export function ServicesSection({ onBookingClick }: ServicesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean);
    if (!section || !cards.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".services-header",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        }
      );

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
            },
          }
        );
      });

      gsap.fromTo(
        ".services-cta",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".services-cta",
            start: "top 90%",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-24 bg-gradient-to-b from-background via-muted/30 to-background overflow-hidden"
    >
      <div className="container">
        <div className="services-header text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-4 uppercase tracking-wide">
            What We Offer
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            End-to-end solutions for cleaning, maintenance, design & more. 
            Your trusted partner for every property need.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map((service, index) => (
            <div
              key={service.title}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group relative rounded-2xl overflow-hidden bg-card shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image with gradient overlay */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${service.accent} opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                
                {/* Coming Soon Badge */}
                {service.comingSoon && (
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-wide">
                    Coming Soon
                  </div>
                )}
                
                {/* Icon badge */}
                <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-primary shadow-lg flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <service.icon className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {service.description}
                </p>
                
                {/* Features as tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {service.features.slice(0, 2).map((feature) => (
                    <span
                      key={feature}
                      className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                  {service.features.length > 2 && (
                    <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                      +{service.features.length - 2}
                    </span>
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group/btn"
                  onClick={() => onBookingClick(service.title)}
                  disabled={service.comingSoon}
                >
                  {service.comingSoon ? "Coming Soon" : (
                    <>
                      Book Now
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="services-cta text-center mt-14">
          <Button variant="default" size="lg" asChild className="group">
            <Link to="/services">
              Explore All Services
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
