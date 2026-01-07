import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Homeowner",
    content: "Lucid transformed our newly built home into a spotless sanctuary. Their attention to detail is unmatched, and the eco-friendly approach gave us peace of mind.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Property Manager",
    content: "Managing multiple properties is challenging, but Lucid's maintenance team makes it effortless. Reliable, professional, and always on time.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Business Owner",
    content: "Our office has never looked better. The team at Lucid understands the importance of a clean workspace for productivity. Highly recommend!",
    rating: 5,
  },
  {
    name: "David Okonkwo",
    role: "Restaurant Owner",
    content: "The fumigation service was thorough and effective. Six months later, still no pest issues. Great follow-up service too!",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoPlay]);

  const next = () => {
    setAutoPlay(false);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setAutoPlay(false);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-primary">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary font-medium text-sm mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-primary-foreground/70">
            Don't just take our word for it. Here's what our satisfied customers have to say about our services.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 md:p-12"
              >
                <Quote className="w-12 h-12 text-secondary mb-6" />
                <p className="text-xl md:text-2xl text-primary-foreground leading-relaxed mb-8">
                  "{testimonials[current].content}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-primary-foreground text-lg">
                      {testimonials[current].name}
                    </h4>
                    <p className="text-primary-foreground/70">
                      {testimonials[current].role}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-3 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
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
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === current ? "bg-secondary" : "bg-primary-foreground/30"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-3 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
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
