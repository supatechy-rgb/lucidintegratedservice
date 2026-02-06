import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface CTASectionProps {
  onBookingClick: () => void;
}

export function CTASection({ onBookingClick }: CTASectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const decor = decorRef.current;
    if (!section || !card) return;

    const ctx = gsap.context(() => {
      // Card entrance animation
      gsap.from(card, {
        y: 100,
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        },
      });

      // Text animations
      gsap.from(".cta-title", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
        },
      });

      gsap.from(".cta-text", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
        },
      });

      gsap.from(".cta-buttons", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
        },
      });

      // Floating decorative elements
      if (decor) {
        gsap.to(decor.querySelectorAll(".cta-decor"), {
          y: "random(-30, 30)",
          x: "random(-20, 20)",
          rotation: "random(-15, 15)",
          duration: "random(4, 6)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: {
            each: 0.5,
            from: "random",
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-surface-gradient overflow-hidden">
      <div className="container">
        <div
          ref={cardRef}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-hero-gradient" />
          <div ref={decorRef} className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="cta-decor absolute top-0 right-0 w-96 h-96 rounded-full bg-secondary blur-3xl" />
            <div className="cta-decor absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary-foreground blur-3xl" />
            <div className="cta-decor absolute top-1/2 right-1/4 w-48 h-48 rounded-full bg-secondary/60 blur-2xl" />
          </div>

          <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center">
            <h2 className="cta-title text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-6">
              Ready for a <span className="text-secondary">Spotless</span>{" "}
              Space?
            </h2>
            <p className="cta-text text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
              Let us take care of the cleaning and maintenance while you focus
              on what matters most. Get a free quote today and experience the
              Lucid difference.
            </p>

            <div className="cta-buttons flex flex-wrap justify-center gap-4">
              <Button variant="heroOutline" size="xl" asChild>
                <a href="tel:+2349160198122">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
