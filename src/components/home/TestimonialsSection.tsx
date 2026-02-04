import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

const defaultTestimonials: Testimonial[] = [
  {
    id: "default-1",
    name: "Sarah Johnson",
    role: "Homeowner",
    content:
      "Lucid transformed our newly built home into a spotless sanctuary. Their attention to detail is unmatched, and the eco-friendly approach gave us peace of mind.",
    rating: 5,
  },
  {
    id: "default-2",
    name: "Michael Chen",
    role: "Property Manager",
    content:
      "Managing multiple properties is challenging, but Lucid's maintenance team makes it effortless. Reliable, professional, and always on time.",
    rating: 5,
  },
  {
    id: "default-3",
    name: "Emily Rodriguez",
    role: "Business Owner",
    content:
      "Our office has never looked better. The team at Lucid understands the importance of a clean workspace for productivity. Highly recommend!",
    rating: 5,
  },
  {
    id: "default-4",
    name: "David Okonkwo",
    role: "Restaurant Owner",
    content:
      "The fumigation service was thorough and effective. Six months later, still no pest issues. Great follow-up service too!",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Fetch approved testimonials from database
  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("id, name, role, content, rating")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        setTestimonials(data as Testimonial[]);
        // If the fetched list is shorter than the fallback list, ensure we
        // don't briefly render an out-of-bounds index.
        setCurrent(0);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(".testimonials-header", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      });

      // Card container animation
      gsap.from(".testimonials-card-container", {
        y: 80,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testimonials-card-container",
          start: "top 85%",
        },
      });

      // Navigation animation
      gsap.from(".testimonials-nav", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testimonials-nav",
          start: "top 95%",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!autoPlay || testimonials.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoPlay, testimonials.length]);

  // Reset current index when testimonials change to prevent out-of-bounds access
  useEffect(() => {
    if (current >= testimonials.length && testimonials.length > 0) {
      setCurrent(0);
    }
  }, [testimonials.length, current]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.fromTo(
      card,
      { opacity: 0, x: 50, scale: 0.98 },
      { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: "power2.out" }
    );
  }, [current]);

  const next = () => {
    setAutoPlay(false);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setAutoPlay(false);
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  // Prevent out-of-bounds access if the list length changes (e.g. fallback -> fetched)
  const safeIndex = testimonials.length
    ? Math.min(Math.max(current, 0), testimonials.length - 1)
    : 0;
  const active = testimonials[safeIndex];

  return (
    <section ref={sectionRef} className="py-24 bg-primary overflow-hidden">
      <div className="container">
        <div className="testimonials-header text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary font-medium text-sm mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-primary-foreground/70">
            Don't just take our word for it. Here's what our satisfied customers
            have to say about our services.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="testimonials-card-container overflow-hidden py-8">
            <div
              ref={cardRef}
              className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 md:p-12"
            >
              <Quote className="w-12 h-12 text-secondary mb-6" />
              <p className="text-xl md:text-2xl text-primary-foreground leading-relaxed mb-8">
                "{active?.content ?? ""}"
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-primary-foreground text-lg">
                    {active?.name ?? ""}
                  </h4>
                  <p className="text-primary-foreground/70">
                    {active?.role ?? ""}
                  </p>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: active?.rating ?? 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-secondary text-secondary"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="testimonials-nav flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-3 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors hover:scale-110 active:scale-95"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-primary-foreground" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setAutoPlay(false);
                    setCurrent(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === current
                      ? "bg-secondary w-6"
                      : "bg-primary-foreground/30 hover:bg-primary-foreground/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-3 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors hover:scale-110 active:scale-95"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-primary-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
