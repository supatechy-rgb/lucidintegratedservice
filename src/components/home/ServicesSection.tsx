import { motion } from "framer-motion";
import { Sparkles, Droplets, Wrench, Paintbrush } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Sparkles,
    title: "Post-Construction",
    description: "Complete cleaning solutions for newly built or renovated spaces. We handle debris, dust, and finishing touches.",
    features: ["Deep Cleaning", "Debris Removal", "Final Polish"],
  },
  {
    icon: Droplets,
    title: "Fumigation",
    description: "Professional pest control and fumigation services to keep your property safe and pest-free.",
    features: ["Complete Solutions", "Safe Products", "Long-lasting Results"],
  },
  {
    icon: Wrench,
    title: "Maintenance",
    description: "General maintenance, HVAC, electrical, plumbing, and landscaping services under one roof.",
    features: ["HVAC Services", "Electrical & Plumbing", "Gardening"],
  },
  {
    icon: Paintbrush,
    title: "Interiors & Design",
    description: "Transform your space with our interior design, space planning, and furniture selection services.",
    features: ["Space Planning", "Color Consultation", "Furniture Selection"],
  },
];

interface ServicesSectionProps {
  onBookingClick: () => void;
}

export function ServicesSection({ onBookingClick }: ServicesSectionProps) {
  return (
    <section id="services" className="py-24 bg-surface-gradient">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary font-medium text-sm mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            Comprehensive Solutions for Every Need
          </h2>
          <p className="text-muted-foreground text-lg">
            From post-construction cleaning to interior design, we provide end-to-end services 
            to keep your spaces pristine and functional.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors">
                <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-foreground/80"
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
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="default" size="lg" asChild>
            <Link to="/services">View All Services</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
