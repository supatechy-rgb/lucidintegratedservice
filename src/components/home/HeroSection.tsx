import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Shield, Clock, Leaf } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

interface HeroSectionProps {
  onBookingClick: () => void;
}

const services = [
  "Post-Construction Cleaning",
  "Deep Cleaning",
  "Fumigation",
  "General Maintenance",
  "Interior Design",
  "Other Services",
];

export function HeroSection({ onBookingClick }: HeroSectionProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuickBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.service) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      toast({
        title: "Request Received!",
        description: "We'll contact you shortly to confirm your booking.",
      });
      setFormData({ name: "", email: "", phone: "", service: "", date: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBackground}
          alt="Professional cleaning team at work"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
        {/* White fade at top for logo visibility */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/70 to-transparent" />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-secondary blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-primary-foreground blur-3xl" />
      </div>

      <div className="container relative z-10 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-primary-foreground"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary font-medium text-sm mb-6">
              🌿 Eco-Friendly Cleaning Solutions
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Spotless Spaces,{" "}
              <span className="text-secondary">Stress-Free</span> Living
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl">
              Professional cleaning and maintenance services that exceed expectations. 
              We deliver excellence with eco-conscious practices and meticulous attention to detail.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 mb-10">
              {[
                { icon: Shield, text: "Trusted by 500+" },
                { icon: Clock, text: "24/7 Support" },
                { icon: Leaf, text: "Eco-Friendly" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-primary-foreground/80">
                  <Icon className="w-5 h-5 text-secondary" />
                  <span className="font-medium">{text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" onClick={onBookingClick}>
                Book a Service
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <a href="#services">Explore Services</a>
              </Button>
            </div>
          </motion.div>

          {/* Right - Quick Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="bg-card rounded-2xl shadow-2xl p-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Quick Booking
              </h3>
              <p className="text-muted-foreground mb-6">
                Get a free quote in minutes
              </p>

              <form onSubmit={handleQuickBooking} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hero-name">Full Name *</Label>
                  <Input
                    id="hero-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hero-email">Email *</Label>
                    <Input
                      id="hero-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hero-phone">Phone *</Label>
                    <Input
                      id="hero-phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 234 567 890"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Service Type *</Label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) => setFormData({ ...formData, service: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hero-date">Preferred Date</Label>
                  <Input
                    id="hero-date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Get Free Quote"}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
