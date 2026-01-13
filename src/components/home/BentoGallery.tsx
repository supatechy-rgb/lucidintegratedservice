import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import bentoCleaning1 from "@/assets/bento-cleaning-1.jpg";
import bentoCleaning2 from "@/assets/bento-cleaning-2.jpg";
import bentoOffice from "@/assets/bento-office.jpg";
import bentoFumigation from "@/assets/bento-fumigation.jpg";
import bentoInterior from "@/assets/bento-interior.jpg";
import bentoConstruction from "@/assets/bento-construction.jpg";

gsap.registerPlugin(ScrollTrigger);

const bentoItems = [
  {
    image: bentoCleaning1,
    title: "Residential Cleaning",
    subtitle: "Transform your home",
    size: "large",
  },
  {
    image: bentoCleaning2,
    title: "Eco-Friendly Products",
    subtitle: "Safe & sustainable",
    size: "small",
  },
  {
    image: bentoOffice,
    title: "Office Spaces",
    subtitle: "Pristine workplaces",
    size: "tall",
  },
  {
    image: bentoFumigation,
    title: "Fumigation Services",
    subtitle: "Pest-free guarantee",
    size: "small",
  },
  {
    image: bentoInterior,
    title: "Interior Design",
    subtitle: "Beautiful spaces",
    size: "medium",
  },
  {
    image: bentoConstruction,
    title: "Post-Construction",
    subtitle: "Ready to move in",
    size: "medium",
  },
];

export function BentoGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const items = itemsRef.current.filter(Boolean);
    if (!section || !items.length) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(".bento-title", {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      });

      // Staggered card entrance
      items.forEach((item, index) => {
        gsap.from(item, {
          y: 100,
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
          },
        });

        // Hover animation setup
        const overlay = item?.querySelector(".bento-overlay");
        const title = item?.querySelector(".bento-item-title");
        const subtitle = item?.querySelector(".bento-item-subtitle");

        if (overlay && title && subtitle) {
          const tl = gsap.timeline({ paused: true });
          tl.to(overlay, { opacity: 1, duration: 0.3 })
            .from(title, { y: 20, opacity: 0, duration: 0.3 }, "-=0.2")
            .from(subtitle, { y: 10, opacity: 0, duration: 0.3 }, "-=0.2");

          item?.addEventListener("mouseenter", () => tl.play());
          item?.addEventListener("mouseleave", () => tl.reverse());
        }
      });

      // Parallax on images
      items.forEach((item) => {
        const img = item?.querySelector("img");
        if (img) {
          gsap.to(img, {
            y: "-20%",
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "large":
        return "md:col-span-2 md:row-span-2";
      case "tall":
        return "md:row-span-2";
      case "medium":
        return "md:col-span-1";
      case "small":
      default:
        return "";
    }
  };

  return (
    <section ref={sectionRef} className="py-24 bg-background overflow-hidden">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="bento-title inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary font-medium text-sm mb-4">
            Our Work
          </span>
          <h2 className="bento-title text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            See the <span className="text-primary">Lucid</span> Difference
          </h2>
          <p className="bento-title text-muted-foreground text-lg">
            From residential homes to commercial spaces, we deliver exceptional results every time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {bentoItems.map((item, index) => (
            <div
              key={item.title}
              ref={(el) => (itemsRef.current[index] = el)}
              className={`relative group cursor-pointer overflow-hidden rounded-2xl ${getSizeClasses(item.size)} min-h-[250px] md:min-h-[280px]`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-[120%] object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="bento-overlay absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="bento-item-title text-xl font-bold text-primary-foreground mb-1">
                  {item.title}
                </h3>
                <p className="bento-item-subtitle text-primary-foreground/80 text-sm">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
