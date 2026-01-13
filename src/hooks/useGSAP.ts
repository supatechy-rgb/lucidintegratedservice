import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGSAP() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Refresh ScrollTrigger on route changes
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return { gsap, ScrollTrigger };
}

export function useScrollReveal(
  selector: string,
  options?: {
    y?: number;
    x?: number;
    opacity?: number;
    duration?: number;
    stagger?: number;
    start?: string;
    delay?: number;
    scale?: number;
    rotation?: number;
  }
) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    const defaults = {
      y: options?.y ?? 60,
      x: options?.x ?? 0,
      opacity: options?.opacity ?? 0,
      duration: options?.duration ?? 1,
      stagger: options?.stagger ?? 0.15,
      start: options?.start ?? "top 85%",
      delay: options?.delay ?? 0,
      scale: options?.scale ?? 1,
      rotation: options?.rotation ?? 0,
    };

    const ctx = gsap.context(() => {
      gsap.from(elements, {
        y: defaults.y,
        x: defaults.x,
        opacity: defaults.opacity,
        scale: defaults.scale,
        rotation: defaults.rotation,
        duration: defaults.duration,
        stagger: defaults.stagger,
        delay: defaults.delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: elements[0],
          start: defaults.start,
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, [selector, options]);
}

export function useParallax(selector: string, speed: number = 0.5) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    const ctx = gsap.context(() => {
      elements.forEach((element) => {
        gsap.to(element, {
          y: () => speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, [selector, speed]);
}

export function useMagneticEffect(selector: string) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    const handlers: Array<{ element: Element; mouseMove: (e: MouseEvent) => void; mouseLeave: () => void }> = [];

    elements.forEach((element) => {
      const el = element as HTMLElement;
      
      const mouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(el, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: "power2.out",
        });
      };
      
      const mouseLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.5)",
        });
      };

      el.addEventListener("mousemove", mouseMove);
      el.addEventListener("mouseleave", mouseLeave);
      
      handlers.push({ element: el, mouseMove, mouseLeave });
    });

    return () => {
      handlers.forEach(({ element, mouseMove, mouseLeave }) => {
        element.removeEventListener("mousemove", mouseMove);
        element.removeEventListener("mouseleave", mouseLeave);
      });
    };
  }, [selector]);
}

export function useTextReveal(selector: string) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    const ctx = gsap.context(() => {
      elements.forEach((element) => {
        const text = element.textContent || "";
        element.innerHTML = "";
        
        const words = text.split(" ");
        words.forEach((word, i) => {
          const span = document.createElement("span");
          span.className = "inline-block overflow-hidden";
          const inner = document.createElement("span");
          inner.className = "inline-block gsap-word";
          inner.textContent = word + (i < words.length - 1 ? "\u00A0" : "");
          span.appendChild(inner);
          element.appendChild(span);
        });

        gsap.from(element.querySelectorAll(".gsap-word"), {
          y: "100%",
          opacity: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    });

    return () => ctx.revert();
  }, [selector]);
}

export function useCountUp(selector: string) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    const ctx = gsap.context(() => {
      elements.forEach((element) => {
        const value = element.getAttribute("data-value") || element.textContent || "0";
        const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
        const suffix = value.replace(/[0-9.]/g, "");
        
        const obj = { value: 0 };
        
        gsap.to(obj, {
          value: numericValue,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            element.textContent = Math.floor(obj.value) + suffix;
          },
        });
      });
    });

    return () => ctx.revert();
  }, [selector]);
}

export { gsap, ScrollTrigger };
