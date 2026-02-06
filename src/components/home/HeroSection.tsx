import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { ArrowRight, Shield, Clock, Leaf, CalendarIcon, Send } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

interface HeroSectionProps {
  onBookingClick: () => void;
}

const services = [
  "Cleaning",
  "Laundry",
  "Fumigation",
  "Maintenance",
  "Interior",
  "Logistics",
  "Supplies",
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
    preferredDate: undefined as Date | undefined,
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

      tl.from(heroContent.querySelectorAll(".hero-animate"), {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

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
      !formData.preferredDate
    ) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({
        title: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

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
          preferredDate: formData.preferredDate ? format(formData.preferredDate, "PPP") : "",
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
          preferredDate: undefined, 
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
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
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
              <Button variant="heroOutline" size="lg" asChild>
                <a href="#services">Explore Services</a>
              </Button>
            </div>
          </div>

          {/* Right - Quick Booking Form */}
          <div ref={formRef}>
            <div className="bg-card rounded-3xl shadow-2xl overflow-hidden">
              {/* Form Header */}
              <div className="bg-primary px-6 py-5">
                <h3 className="text-xl font-bold text-primary-foreground">
                  Quick Booking
                </h3>
                <p className="text-primary-foreground/70 text-sm">
                  Get a free quote within 24 hours
                </p>
              </div>

              {/* Form Body */}
              <form onSubmit={handleQuickBooking} className="p-6 space-y-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="hero-fullname" className="text-sm font-medium">
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="hero-fullname"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    placeholder="John Doe"
                    className="h-11"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <Label htmlFor="hero-email" className="text-sm font-medium">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="hero-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="john@example.com"
                    className="h-11"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <Label htmlFor="hero-phone" className="text-sm font-medium">
                    Phone <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="hero-phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+234 916 019 8122"
                    className="h-11"
                  />
                </div>

                {/* Service Type */}
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">
                    Service Type <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.serviceType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, serviceType: value })
                    }
                  >
                    <SelectTrigger className="h-11">
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

                {/* Preferred Date */}
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">
                    Preferred Date <span className="text-destructive">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-11 justify-start text-left font-normal",
                          !formData.preferredDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.preferredDate ? (
                          format(formData.preferredDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.preferredDate}
                        onSelect={(date) =>
                          setFormData({ ...formData, preferredDate: date })
                        }
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Additional Notes */}
                <div className="space-y-1.5">
                  <Label htmlFor="hero-notes" className="text-sm font-medium">
                    Additional Notes <span className="text-muted-foreground text-xs">(Optional)</span>
                  </Label>
                  <Textarea
                    id="hero-notes"
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    placeholder="Tell us more about your requirements..."
                    rows={2}
                    className="resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold mt-2"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      Get Free Quote
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
