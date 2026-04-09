import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import cafeInterior from '@/assets/cafe-interior.jpg';
import coffeeBeans from '@/assets/coffee-beans.jpg';

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">Our Story</p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">About BrewHaven</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <FadeIn>
            <img
              src={cafeInterior}
              alt="BrewHaven café interior"
              loading="lazy"
              width={600}
              height={400}
              className="rounded-2xl w-full h-80 object-cover"
            />
          </FadeIn>
          <FadeIn delay={0.2}>
            <h2 className="text-2xl font-bold text-foreground mb-4">Where Every Cup Tells a Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              BrewHaven was born from a simple belief: great coffee should be an experience, not just a drink. Founded in 2020, we set out to create a space where quality meets comfort.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We source our beans directly from small farms across Colombia, Ethiopia, and Guatemala, ensuring every batch meets our exacting standards. Our roasters carefully craft each profile to bring out the unique character of every origin.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <FadeIn delay={0.1} className="order-2 lg:order-1">
            <h2 className="text-2xl font-bold text-foreground mb-4">Crafted by Hand, Served with Heart</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our baristas are artists. Each one undergoes months of training to master the art of extraction, steaming, and latte art. We believe that the person behind the machine matters as much as the machine itself.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Beyond coffee, we're committed to sustainability. From compostable cups to energy-efficient equipment, every decision we make considers our impact on the planet.
            </p>
          </FadeIn>
          <FadeIn delay={0.2} className="order-1 lg:order-2">
            <img
              src={coffeeBeans}
              alt="Premium roasted coffee beans"
              loading="lazy"
              width={600}
              height={400}
              className="rounded-2xl w-full h-80 object-cover"
            />
          </FadeIn>
        </div>

        <FadeIn>
          <div className="glass rounded-2xl p-8 md:p-12 text-center max-w-2xl mx-auto">
            <p className="text-2xl md:text-3xl font-light text-foreground italic leading-relaxed">
              "Coffee is not just what we serve — it's who we are."
            </p>
            <p className="text-accent mt-4 font-medium">— The BrewHaven Team</p>
          </div>
        </FadeIn>
      </div>

      <Footer />
    </div>
  );
}
