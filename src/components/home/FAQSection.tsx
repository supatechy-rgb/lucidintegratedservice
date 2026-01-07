import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What areas do you serve?",
    answer: "We currently serve the metropolitan area and surrounding suburbs within a 50-mile radius. Contact us to check if we service your specific location.",
  },
  {
    question: "Are your cleaning products eco-friendly?",
    answer: "Yes! We use only eco-friendly, non-toxic cleaning products that are safe for your family, pets, and the environment. Our commitment to sustainability is at the core of everything we do.",
  },
  {
    question: "How do I book a service?",
    answer: "You can book a service through our online booking form, call us directly, or send us an email. We'll respond within 24 hours to confirm your appointment and provide a quote.",
  },
  {
    question: "Do you offer recurring services?",
    answer: "Absolutely! We offer weekly, bi-weekly, and monthly maintenance plans at discounted rates. Regular service ensures your space stays pristine year-round.",
  },
  {
    question: "What's included in post-construction cleaning?",
    answer: "Our post-construction cleaning includes debris removal, dust and particle cleanup, window cleaning, floor scrubbing and polishing, fixture cleaning, and a final walkthrough to ensure perfection.",
  },
  {
    question: "Are your technicians insured?",
    answer: "Yes, all our technicians are fully insured and bonded. We also conduct thorough background checks to ensure your safety and peace of mind.",
  },
];

export function FAQSection() {
  return (
    <section className="py-24 bg-muted">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary font-medium text-sm mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Got questions? We've got answers. If you can't find what you're looking for, 
            feel free to contact us.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl px-6 shadow-card border-none"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
