import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookingModal } from "@/components/BookingModal";
import { Award, Leaf, Shield, Users, Heart, Target, Eye, Lightbulb } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const values = [
  {
    icon: Award,
    title: "Quality",
    description: "We take pride in delivering the highest standards of service."
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "We believe in doing the right thing, being honest, reliable, and transparent in all our interactions."
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "We prioritize eco-friendly practices and products to protect the environment."
  },
  {
    icon: Users,
    title: "Customer-Centricity",
    description: "We listen to our customers' needs and aim to exceed their expectations."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We continuously seek ways to improve our services through new techniques, technologies, and methods."
  }
];

const About = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  return (
    <div className="min-h-screen">
      <Header onBookingClick={() => setIsBookingOpen(true)} />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        {/* Blue Tint Overlay */}
        <div className="absolute inset-0 bg-primary/85" />
        {/* White Gradient at Top */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/40 to-transparent" />

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center text-primary-foreground"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary font-medium text-sm mb-6">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              Creating <span className="text-secondary">Spotless</span> Spaces
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Founded to deliver stress-free eco-conscious cleaning and maintenance 
              services that satisfies our clients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-card">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary font-medium text-sm mb-4">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
                About Lucid Integrated Services
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Lucid Integrated Services was founded with the mission to provide spotless, 
                  stress-free environments for homes and businesses. Lucid embodies clarity, 
                  efficiency, and reliability, ensuring every corner shines with perfection.
                </p>
                <p>
                  When our clients think of Lucid, they think of a professional, reliable 
                  service provider that makes their living space healthier, more welcoming, 
                  and impeccably clean. The brand stands for attention to detail, eco-friendly 
                  practices, and delivering outstanding customer satisfaction.
                </p>
                <p>
                  Lucid Integrated Services is passionate about enhancing lives through 
                  exceptional cleaning, fumigation, interior, and maintenance solutions. 
                  With eco-friendly practices at our core, we create pristine spaces that 
                  foster comfort, health, and productivity.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-surface-gradient">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-8 shadow-card"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Mission Statement</h3>
              <p className="text-muted-foreground leading-relaxed">
                At Lucid, our mission is to provide exceptional cleaning, fumigation, interior, 
                and maintenance services that enhance the quality of life for our clients and 
                create pristine, well-maintained spaces that foster comfort, health, and 
                productivity with eco-friendly practices.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl p-8 shadow-card"
            >
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Vision Statement</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our vision is to become the trusted leader in cleaning, fumigation, interior, 
                and maintenance services, known for our unwavering commitment to quality, 
                customer satisfaction, and sustainable practices.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-card">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary font-medium text-sm mb-4">
              Core Values
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
              What Drives Us Every Day
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-muted rounded-xl p-6 hover:shadow-card transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
};

export default About;
