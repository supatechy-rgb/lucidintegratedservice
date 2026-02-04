import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Bug, Wrench, Paintbrush, Truck, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import serviceConstruction from "@/assets/service-construction.jpg";
import serviceFumigation from "@/assets/service-fumigation.jpg";
import serviceMaintenance from "@/assets/service-maintenance.jpg";
import serviceInterior from "@/assets/service-interior.jpg";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Sparkles,
    title: "Cleaning",
    description:
      "Complete cleaning solutions including post-construction, deep cleaning, and upholstery care.",
    features: ["Post-Construction", "Deep Cleaning", "Upholstery"],
    image: serviceConstruction,
  },
  {
    icon: Bug,
    title: "Fumigation",
    description:
      "Professional pest control and fumigation services to keep your property safe and pest-free.",
    features: ["Pest Control", "Complete Fumigation"],
    image: serviceFumigation,
  },
  {
    icon: Wrench,
    title: "Maintenance",
    description:
      "HVAC, electrical, plumbing, and landscaping services to keep your property running smoothly.",
    features: ["HVAC Services", "Electrical & Plumbing", "Landscaping"],
    image: serviceMaintenance,
  },
  {
    icon: Paintbrush,
    title: "Interior",
    description:
      "Transform your space with our interior design, space planning, and furniture selection services.",
    features: ["Space Planning", "Interior Design", "Furniture Selection"],
    image: serviceInterior,
  },
  {
    icon: Truck,
    title: "Logistics",
    description:
      "Reliable moving services for stress-free relocations. We handle your belongings with care.",
    features: ["Moving In", "Move Out", "Packing Services"],
    image: serviceMaintenance,
  },
  {
    icon: Package,
    title: "Supplies",
    description:
      "Professional-grade fumigation and cleaning supplies available for purchase.",
    features: ["Fumigation Products", "Cleaning Supplies", "Equipment"],
    image: serviceFumigation,
  },
];

interface ServicesSectionProps {
  onBookingClick: () => void;
}

export function ServicesSection({ onBookingClick }: ServicesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean);
    if (!section || !cards.length) return;

    const ctx = gsap.context(() => {
      // Header animation
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

      // Cards staggered animation
      cards.forEach((card, index) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        });

        tl.fromTo(
          card,
          { y: 100, opacity: 0, rotateX: 15 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out",
          }
        );

        // Icon pop animation
        const icon = card?.querySelector(".service-icon");
        if (icon) {
          tl.fromTo(
            icon,
            { scale: 0, rotation: -90 },
            {
              scale: 1,
              rotation: 0,
              duration: 0.6,
              ease: "back.out(2)",
            },
            "-=0.4"
          );
        }

        // Features slide in
        const features = card?.querySelectorAll(".service-feature");
        if (features?.length) {
          tl.fromTo(
            features,
            { x: -20, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.4,
              stagger: 0.1,
              ease: "power2.out",
            },
            "-=0.3"
          );
        }
      });

      // Bottom CTA
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
      className="py-24 bg-surface-gradient overflow-hidden"
    >
      <div className="container">
        <div className="services-header text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary font-medium text-sm mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            Comprehensive Solutions for Every Need
          </h2>
          <p className="text-muted-foreground text-lg">
            From post-construction cleaning to interior design, we provide
            end-to-end services to keep your spaces pristine and functional.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2"
              style={{ perspective: "1000px" }}
            >
              {/* Image Section */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                <div className="service-icon absolute bottom-3 left-4 w-12 h-12 rounded-xl bg-primary/90 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                  <service.icon className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-5">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="service-feature flex items-center gap-2 text-sm text-foreground/80"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={onBookingClick}
                >
                  Book Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="services-cta text-center mt-12">
          <Button variant="default" size="lg" asChild>
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
