import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
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
  const sectionRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    location: "",
    address: "",
    date: "",
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
      !formData.firstName ||
      !formData.lastName ||
      !formData.location ||
      !formData.address
    ) {
      toast({
        title: "Please fill in all required fields",
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
          firstName: formData.firstName,
          lastName: formData.lastName,
          location: formData.location,
          address: formData.address,
          preferredDate: formData.date,
        }),
      });

      if (response.ok) {
        toast({
          title: "Request Received!",
          description: "We'll contact you shortly with your free quotation.",
        });
        setFormData({ firstName: "", lastName: "", location: "", address: "", date: "" });
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
            <div className="bg-card rounded-2xl shadow-2xl p-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Quick Booking
              </h3>
              <p className="text-muted-foreground mb-6">
                Get a free quotation
              </p>

              <form onSubmit={handleQuickBooking} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hero-firstname">First Name *</Label>
                    <Input
                      id="hero-firstname"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hero-lastname">Last Name *</Label>
                    <Input
                      id="hero-lastname"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hero-location">Location *</Label>
                  <Input
                    id="hero-location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="City, State"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hero-address">Address *</Label>
                  <Input
                    id="hero-address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="Your full address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hero-date">Preferred Start Date</Label>
                  <Input
                    id="hero-date"
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Get a Free Quotation"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
