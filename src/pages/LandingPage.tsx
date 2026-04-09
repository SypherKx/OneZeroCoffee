import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Coffee, Leaf, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import heroCoffee from '@/assets/hero-coffee.jpg';
import coffeeBeans from '@/assets/coffee-beans.jpg';
import cafeInterior from '@/assets/cafe-interior.jpg';
import { menuItems } from '@/lib/menu-data';

function FadeInSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-background/60" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12 pt-16">
        <div className="flex-1 text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-accent text-sm font-medium tracking-widest uppercase mb-4"
          >
            Premium Artisan Coffee
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold leading-tight mb-6"
          >
            Crafted with{' '}
            <span className="text-gradient">Passion</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-muted-foreground text-lg max-w-md mx-auto lg:mx-0 mb-8"
          >
            Experience the finest single-origin beans, expertly roasted and brewed to perfection.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex gap-4 justify-center lg:justify-start"
          >
            <Button variant="hero" size="lg" asChild>
              <Link to="/menu">
                Order Now <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
            <Button variant="glass" size="lg" asChild>
              <Link to="/about">Our Story</Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
          className="flex-1 flex justify-center"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-accent/10 rounded-full blur-3xl" />
            <img
              src={heroCoffee}
              alt="Premium artisan latte with beautiful foam art"
              width={480}
              height={480}
              className="relative rounded-full shadow-2xl animate-float w-72 h-72 md:w-96 md:h-96 object-cover"
            />
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-16 bg-foreground/5 rounded-full blur-xl steam-animation" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    { icon: Coffee, title: 'Fresh Beans', desc: 'Sourced from the world\'s finest coffee regions' },
    { icon: Award, title: 'Handcrafted', desc: 'Every cup made with precision and care' },
    { icon: Leaf, title: 'Sustainable', desc: 'Ethically sourced and eco-friendly practices' },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <FadeInSection className="text-center mb-16">
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">Why Choose Us</p>
          <h2 className="text-3xl md:text-4xl font-bold">The BrewHaven Difference</h2>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <FadeInSection key={f.title} delay={i * 0.15}>
              <div className="glass rounded-2xl p-8 text-center hover-lift">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-5">
                  <f.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedMenuSection() {
  const featured = menuItems.slice(0, 4);

  return (
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <FadeInSection className="text-center mb-16">
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">Our Menu</p>
          <h2 className="text-3xl md:text-4xl font-bold">Featured Picks</h2>
        </FadeInSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((item, i) => (
            <FadeInSection key={item.id} delay={i * 0.1}>
              <div className="glass rounded-2xl overflow-hidden hover-lift group">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-foreground mb-1">{item.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-accent font-bold">₹{item.price}</span>
                    <Button variant="hero" size="sm" asChild>
                      <Link to="/menu">Order</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection className="text-center mt-12">
          <Button variant="glass" size="lg" asChild>
            <Link to="/menu">View Full Menu <ArrowRight className="w-4 h-4 ml-1" /></Link>
          </Button>
        </FadeInSection>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={cafeInterior}
          alt="BrewHaven café interior"
          loading="lazy"
          width={1200}
          height={800}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/80" />
      </motion.div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <FadeInSection>
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">The Experience</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 max-w-2xl mx-auto leading-tight">
            More Than Just Coffee
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8 text-lg">
            A sanctuary where every sip is a moment of peace. Come for the coffee, stay for the atmosphere.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/about">Discover Our Story</Link>
          </Button>
        </FadeInSection>
      </div>
    </section>
  );
}

function LocationSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeInSection>
            <div className="rounded-2xl overflow-hidden">
              <img
                src={coffeeBeans}
                alt="Fresh roasted coffee beans"
                loading="lazy"
                width={600}
                height={400}
                className="w-full h-80 object-cover"
              />
            </div>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">Find Us</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Visit BrewHaven</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>📍 123 Coffee Lane, Brew District, BC 10001</p>
              <p>🕐 Mon – Fri: 7 AM – 9 PM</p>
              <p>🕐 Sat – Sun: 8 AM – 10 PM</p>
              <p>📞 +1 (555) 123-4567</p>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 bg-gradient-warm">
      <div className="container mx-auto px-4 text-center">
        <FadeInSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Ready for Your Perfect Cup?</h2>
          <p className="text-foreground/70 mb-8 max-w-md mx-auto">Order ahead and skip the line. Your handcrafted coffee awaits.</p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/menu">Order Now <ArrowRight className="w-4 h-4 ml-1" /></Link>
          </Button>
        </FadeInSection>
      </div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <FeaturedMenuSection />
      <ExperienceSection />
      <LocationSection />
      <CTASection />
      <Footer />
    </div>
  );
}
