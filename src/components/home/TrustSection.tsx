import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, Award, Clock, ThumbsUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Users, value: 500, suffix: "+", label: "Happy Clients" },
  { icon: Award, value: 10, suffix: "+", label: "Years Experience" },
  { icon: Clock, value: 24, suffix: "/7", label: "Support Available" },
  { icon: ThumbsUp, value: 99, suffix: "%", label: "Satisfaction Rate" },
];

export function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const valuesRef = useRef<{ value: number }[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const statElements = statsRef.current.filter(Boolean);
    if (!section || !statElements.length) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(".trust-title", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      });

      // Stats cards animation with stagger
      statElements.forEach((stat, index) => {
        gsap.from(stat, {
          y: 80,
          opacity: 0,
          scale: 0.8,
          duration: 0.8,
          delay: index * 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: stat,
            start: "top 85%",
          },
        });

        // Animate the icon
        const icon = stat?.querySelector(".stat-icon");
        if (icon) {
          gsap.from(icon, {
            rotation: -180,
            scale: 0,
            duration: 1,
            delay: index * 0.15 + 0.3,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
              trigger: stat,
              start: "top 85%",
            },
          });
        }

        // Count up animation
        const valueEl = stat?.querySelector(".stat-value");
        const targetValue = stats[index].value;
        
        if (valueEl) {
          valuesRef.current[index] = { value: 0 };
          
          gsap.to(valuesRef.current[index], {
            value: targetValue,
            duration: 2,
            delay: index * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stat,
              start: "top 85%",
            },
            onUpdate: () => {
              valueEl.textContent = Math.floor(valuesRef.current[index].value) + stats[index].suffix;
            },
          });
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-card overflow-hidden">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="trust-title text-2xl md:text-3xl font-bold text-foreground">
            Trusted by <span className="text-primary">Hundreds</span> of
            Satisfied Clients
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              ref={(el) => (statsRef.current[index] = el)}
              className="text-center group"
            >
              <div className="stat-icon w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors duration-300">
                <stat.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <div
                className="stat-value text-3xl md:text-4xl font-extrabold text-foreground mb-1"
                data-value={stat.value}
              >
                0{stat.suffix}
              </div>
              <div className="text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
