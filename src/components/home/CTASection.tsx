import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

interface CTASectionProps {
  onBookingClick: () => void;
}

export function CTASection({ onBookingClick }: CTASectionProps) {
  return (
    <section className="py-24 bg-surface-gradient">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-hero-gradient" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-secondary blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary-foreground blur-3xl" />
          </div>

          <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-6">
              Ready for a{" "}
              <span className="text-secondary">Spotless</span> Space?
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
              Let us take care of the cleaning and maintenance while you focus on what matters most. 
              Get a free quote today and experience the Lucid difference.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="hero"
                size="xl"
                onClick={onBookingClick}
              >
                Book Your Service
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="heroOutline"
                size="xl"
                asChild
              >
                <a href="tel:+1234567890">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us Now
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
