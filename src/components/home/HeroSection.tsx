import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const propertyTypes = [
  "Residential",
  "Commercial",
  "Industrial",
  "Office",
  "Retail",
  "Other",
];

export function HeroSection({ onBookingClick }: HeroSectionProps) {
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    serviceType: "",
    propertyType: "",
    preferredDate: "",
    preferredTime: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const heroContent = heroContentRef.current;
    const form = formRef.current;
    const decor = decorRef.current;

    if (!section || !heroContent || !form) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Hero content animation
      tl.from(heroContent.querySelectorAll(".hero-animate"), {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Form slide in
      tl.from(
        form,
        {
          x: 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8"
      );

      // Decorative elements
      if (decor) {
        gsap.to(decor.querySelectorAll(".decor-circle"), {
          y: "random(-20, 20)",
          x: "random(-10, 10)",
          duration: "random(3, 5)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: {
            each: 0.5,
            from: "random",
          },
        });
      }

      // Parallax background
      gsap.to(".hero-bg", {
        y: "30%",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleQuickBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.serviceType ||
      !formData.propertyType ||
      !formData.preferredDate
    ) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({
        title: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    // Phone validation
    if (!/^[\d\s\-+()]{10,}$/.test(formData.phone)) {
      toast({
        title: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formspree.io/f/maqqekka", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          serviceType: formData.serviceType,
          propertyType: formData.propertyType,
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime,
          notes: formData.notes,
        }),
      });

      if (response.ok) {
        toast({
          title: "Request Received!",
          description: "We'll contact you within 24 hours.",
        });
        setFormData({ 
          fullName: "", 
          email: "", 
          phone: "", 
          serviceType: "", 
          propertyType: "", 
          preferredDate: "", 
          preferredTime: "", 
          notes: "" 
        });
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBackground}
          alt="Professional cleaning team at work"
          className="hero-bg w-full h-[120%] object-cover"
        />
        {/* Dark overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
        {/* White fade at top for logo visibility */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/70 to-transparent" />
      </div>

      {/* Decorative elements */}
      <div ref={decorRef} className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="decor-circle absolute top-20 right-20 w-96 h-96 rounded-full bg-secondary blur-3xl" />
        <div className="decor-circle absolute bottom-20 left-20 w-64 h-64 rounded-full bg-primary-foreground blur-3xl" />
        <div className="decor-circle absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-secondary/50 blur-2xl" />
      </div>

      <div className="container relative z-10 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div ref={heroContentRef} className="text-primary-foreground">
            <span className="hero-animate inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary font-medium text-sm mb-6">
              🌿 Eco-Friendly Practices and Solutions
            </span>
            <h1 className="hero-animate text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Spotless Spaces,{" "}
              <span className="text-secondary">Healthy</span> Living
            </h1>
            <p className="hero-animate text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl">
              Professional cleaning and maintenance services for residential and 
              commercial properties. Delivering excellent eco-conscious practices 
              coupled with detailed finishing.
            </p>

            {/* Trust Badges */}
            <div className="hero-animate flex flex-wrap gap-6 mb-10">
              {[
                { icon: Shield, text: "Trusted by 100+" },
                { icon: Clock, text: "2+ Years Experience" },
                { icon: Leaf, text: "Eco-Friendly Practices" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 text-primary-foreground/80"
                >
                  <Icon className="w-5 h-5 text-secondary" />
                  <span className="font-medium">{text}</span>
                </div>
              ))}
            </div>

            <div className="hero-animate flex flex-wrap gap-4">
              <Button variant="hero" size="lg" onClick={onBookingClick}>
                Book a Service Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <a href="#services">Explore Services</a>
              </Button>
            </div>
          </div>

          {/* Right - Quick Booking Form */}
          <div ref={formRef}>
            <div className="bg-card rounded-2xl shadow-2xl p-6 md:p-8">
              <h3 className="text-2xl font-bold text-foreground mb-1">
                Book a Service
              </h3>
              <p className="text-muted-foreground mb-6 text-sm">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              <form onSubmit={handleQuickBooking} className="space-y-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="hero-fullname">Full Name *</Label>
                  <Input
                    id="hero-fullname"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    placeholder="John Doe"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hero-email">Email *</Label>
                    <Input
                      id="hero-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hero-phone">Phone *</Label>
                    <Input
                      id="hero-phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+1 (234) 567-890"
                    />
                  </div>
                </div>

                {/* Service Type & Property Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Service Type *</Label>
                    <Select
                      value={formData.serviceType}
                      onValueChange={(value) =>
                        setFormData({ ...formData, serviceType: value })
                      }
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
                    <Label>Property Type *</Label>
                    <Select
                      value={formData.propertyType}
                      onValueChange={(value) =>
                        setFormData({ ...formData, propertyType: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        {propertyTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hero-date">Preferred Date *</Label>
                    <Input
                      id="hero-date"
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) =>
                        setFormData({ ...formData, preferredDate: e.target.value })
                      }
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hero-time">Preferred Time (Optional)</Label>
                    <Input
                      id="hero-time"
                      type="time"
                      value={formData.preferredTime}
                      onChange={(e) =>
                        setFormData({ ...formData, preferredTime: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="space-y-2">
                  <Label htmlFor="hero-notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="hero-notes"
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    placeholder="Tell us more about your requirements..."
                    rows={2}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Booking"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
