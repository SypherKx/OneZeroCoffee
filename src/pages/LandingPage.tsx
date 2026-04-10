import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Coffee, Leaf, Award, Star, MapPin, Clock, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import heroCoffee from '@/assets/hero-coffee.jpg';
import coffeeBeans from '@/assets/coffee-beans.jpg';
import cafeInterior from '@/assets/cafe-interior.jpg';
import espressoImg from '@/assets/espresso.jpg';
import cappuccinoImg from '@/assets/cappuccino.jpg';
import icedCoffeeImg from '@/assets/iced-coffee.jpg';
import croissantImg from '@/assets/croissant.jpg';

function FadeIn({ children, className = '', delay = 0, direction = 'up' }: {
  children: React.ReactNode; className?: string; delay?: number; direction?: 'up' | 'left' | 'right' | 'none';
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const initial = direction === 'up' ? { y: 50 } : direction === 'left' ? { x: -60 } : direction === 'right' ? { x: 60 } : {};

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...initial }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────── HERO ─────────────────── */
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={ref} className="relative min-h-[110vh] flex items-center overflow-hidden bg-gradient-hero">
      {/* Background Glows & Typography */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Glow behind main text */}
        <div className="absolute top-[5%] left-[0%] w-[800px] h-[800px] rounded-full blur-[120px] animate-pulse" style={{ backgroundColor: 'rgba(255, 140, 66, 0.25)', animationDuration: '4s' }} />
        {/* Glow behind coffee cup */}
        <div className="absolute top-[10%] right-[-10%] w-[800px] h-[800px] rounded-full blur-[140px] animate-pulse" style={{ backgroundColor: 'rgba(212, 107, 37, 0.3)', animationDuration: '6s' }} />

        {/* Animated Background Text - Top */}
        <div className="absolute top-[2%] w-full overflow-visible whitespace-nowrap opacity-100">
          <p className="outline-text-animated text-[140px] lg:text-[280px] font-display italic leading-none transform -rotate-[6deg] origin-left pl-6">
            Artisan Roasters
          </p>
        </div>

        {/* Animated Background Text - Bottom */}
        <div className="absolute bottom-[-5%] w-full overflow-visible whitespace-nowrap opacity-100">
          <p className="outline-text-animated text-[140px] lg:text-[280px] font-display italic leading-none transform -rotate-[6deg] origin-right text-right pr-6" style={{ animationDelay: '3s' }}>
            Craft Brew
          </p>
        </div>

        {/* Floating blurred beans simulated */}
        <div className="absolute top-[18%] right-[25%] w-12 h-16 rounded-full blur-[4px] rotate-[20deg]" style={{ backgroundColor: 'rgba(74, 45, 25, 0.8)' }} />
        <div className="absolute top-[28%] right-[8%] w-8 h-12 rounded-full blur-[2px] rotate-[65deg]" style={{ backgroundColor: 'rgba(60, 34, 16, 0.9)' }} />
        <div className="absolute bottom-[22%] left-[40%] w-20 h-28 rounded-full blur-[6px] -rotate-[15deg]" style={{ backgroundColor: 'rgba(86, 49, 24, 0.7)' }} />


      </div>

      <motion.div style={{ opacity: heroOpacity }} className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:grid-rows-[auto_auto] items-center gap-10 lg:gap-8 pt-24 lg:pt-0 w-full">
          
          {/* 1. TOP TEXT (Mobile Top, Desktop Top-Left) */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:col-start-1 lg:row-start-1 lg:self-end lg:pr-8 mx-auto lg:mx-0 max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-6"
            >
              <img src="/logo.png" alt="One Zero Coffee Logo" className="w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-2xl shadow-accent/20" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full glass text-[11px] font-semibold tracking-[0.15em] uppercase text-accent/90"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Est. 2020 · Artisan Roasters
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[3.2rem] sm:text-6xl lg:text-7xl xl:text-8xl font-display font-bold leading-[1.05] mb-6"
            >
              Where Every
              <br />
              <span className="text-[#E6A87C] italic font-medium tracking-wide">Sip Matters</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-muted-foreground/90 text-base sm:text-lg lg:text-xl max-w-md lg:max-w-lg mb-4 leading-relaxed font-light"
            >
              Single-origin beans, roasted in small batches, brewed with obsessive precision. This isn't just coffee — it's a ritual.
            </motion.p>
          </div>

          {/* 2. IMAGE (Mobile Middle, Desktop Right Span-2) */}
          <motion.div
            style={{ scale: imageScale }}
            className="flex justify-center relative w-full lg:col-start-2 lg:row-start-1 lg:row-span-2 pt-4 pb-2 lg:py-0"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative scale-95 sm:scale-100"
            >
              {/* Glow behind cup */}
              <div className="absolute inset-0 blur-[80px] bg-[#D46B25]/20 blob animate-glow" />

              <div className="relative animate-float">
                <img
                  src={heroCoffee}
                  alt="Premium artisan latte"
                  width={520}
                  height={520}
                  className="relative blob w-72 h-72 sm:w-80 sm:h-80 lg:w-[460px] lg:h-[460px] object-cover shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                />
                {/* Steam wisps */}
                <div className="absolute -top-6 left-1/3 w-16 h-20 bg-white/5 rounded-full blur-xl steam-animation" />
                <div className="absolute -top-4 left-1/2 w-12 h-16 bg-white/5 rounded-full blur-lg steam-animation" style={{ animationDelay: '1s' }} />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 }}
                className="absolute -right-2 sm:-right-8 top-1/4 glass-strong rounded-2xl px-5 py-3.5 shadow-xl backdrop-blur-md"
              >
                <p className="text-sm text-foreground font-semibold">100% Arabica</p>
                <p className="text-[11px] text-[#D46B25] font-medium tracking-wider uppercase mt-0.5">Single Origin</p>
              </motion.div>

              {/* Floating price tag */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6 }}
                className="absolute -left-2 sm:-left-8 bottom-1/4 glass-strong rounded-2xl px-5 py-3.5 shadow-xl backdrop-blur-md"
              >
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-0.5">Starting at</p>
                <p className="text-xl font-bold text-foreground">₹149</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* 3. BOTTOM CONTENT (Mobile Bottom, Desktop Bottom-Left) */}
          <div className="flex flex-col items-center lg:items-start lg:col-start-1 lg:row-start-2 lg:self-start w-full gap-8 mt-2 lg:mt-0">
            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex items-center gap-5 justify-center lg:justify-start"
            >
              <div className="flex -space-x-3">
                {['AK','PS','RM','VG'].map((initial, i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-[#2A1B14] border-2 border-background flex items-center justify-center text-[10px] font-medium text-muted-foreground shadow-sm">
                    {initial}
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1 mb-1">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-[#D46B25] text-[#D46B25]" />)}
                </div>
                <p className="text-xs text-muted-foreground">Loved by <span className="text-foreground font-medium">2,400+</span> coffee lovers</p>
              </div>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-row gap-4 justify-center lg:justify-start w-full sm:w-auto px-4 sm:px-0 pb-10 lg:pb-0"
            >
              <Button asChild className="flex-1 sm:flex-none text-[15px] font-semibold px-6 sm:px-8 py-7 rounded-full bg-gradient-to-r from-[#D78B5D] to-[#A4532B] text-white hover:opacity-90 border-0 shadow-lg shadow-[#D46B25]/20 transition-all duration-300">
                <Link to="/menu" className="flex items-center justify-center">
                  Order Now <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="glass" className="flex-1 sm:flex-none text-[15px] font-medium px-6 sm:px-8 py-7 rounded-full border border-white/10 hover:bg-white/5 transition-all duration-300" asChild>
                <Link to="/about" className="flex items-center justify-center">Our Story</Link>
              </Button>
            </motion.div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}

/* ─────────────── MARQUEE BANNER ─────────────── */
function MarqueeBanner() {
  const words = ['Fresh Roasted', '·', 'Single Origin', '·', 'Handcrafted', '·', 'Ethically Sourced', '·', 'Small Batch', '·', 'Artisan Blend', '·'];
  const doubled = [...words, ...words];

  return (
    <div className="py-6 overflow-hidden border-y border-border/30 bg-card/30">
      <div className="animate-scroll flex whitespace-nowrap">
        {doubled.map((word, i) => (
          <span key={i} className={`mx-4 text-sm font-light tracking-widest uppercase ${word === '·' ? 'text-accent' : 'text-muted-foreground/60'}`}>
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────── PHILOSOPHY ─────────────── */
function PhilosophySection() {
  return (
    <section className="py-28 lg:py-36 relative overflow-hidden">
      <div className="absolute top-20 right-0 w-[400px] h-[400px] blob-2 bg-accent/3 animate-drift pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left: Large statement */}
          <div className="lg:col-span-5">
            <FadeIn>
              <img src="/logo.png" alt="One Zero Coffee Logo" className="w-12 h-12 rounded-full mb-6 opacity-80" />
              <p className="text-accent text-xs font-medium tracking-[0.25em] uppercase mb-6">Our Philosophy</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight mb-6">
                Coffee is an art.<br />
                <span className="text-muted-foreground font-light italic">We're the artists.</span>
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-accent to-transparent mb-6" />
              <p className="text-muted-foreground leading-relaxed text-lg font-light">
                From farm to cup, every step is intentional. We partner with growers who share our obsession with quality, and we roast every bean to unlock its fullest potential.
              </p>
            </FadeIn>
          </div>

          {/* Right: Offset image + floating cards */}
          <div className="lg:col-span-7 relative">
            <FadeIn delay={0.2} direction="right">
              <div className="relative ml-0 lg:ml-12">
                <img
                  src={coffeeBeans}
                  alt="Fresh roasted coffee beans"
                  loading="lazy"
                  width={700}
                  height={500}
                  className="w-full h-[350px] lg:h-[450px] object-cover blob-3"
                />
                {/* Overlapping stat cards */}
                <div className="absolute -bottom-6 -left-6 lg:-left-16 glass-strong rounded-2xl p-5 max-w-[200px]">
                  <p className="text-3xl font-display font-bold text-accent mb-1">12+</p>
                  <p className="text-xs text-muted-foreground">Countries sourced from across three continents</p>
                </div>
                <div className="absolute -top-4 -right-4 glass-strong rounded-2xl p-4">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-green-400" />
                    <p className="text-xs text-muted-foreground">100% Sustainable</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── ELEGANT BEAN TRAIL ─────────────── */
const OutlineBean = ({ x, y, size, rotate, opacity, blur }: { x: number; y: number; size: number; rotate: number; opacity: number; blur: number }) => (
  <svg 
    viewBox="0 0 60 80" 
    width={size} 
    height={size * 1.3}
    className="absolute"
    style={{ 
      left: `${x}%`, 
      top: `${y}%`, 
      transform: `rotate(${rotate}deg)`, 
      opacity,
      filter: blur ? `blur(${blur}px)` : 'none',
    }}
  >
    <ellipse cx="30" cy="40" rx="22" ry="34" fill="none" stroke="#C8956C" strokeWidth="1.5" />
    <path d="M24 8 C 42 28, 18 52, 36 72" fill="none" stroke="#C8956C" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

function BeanTrail() {
  const beans = [
    // Top-right dense cluster (near the coffee image)
    { x: 82, y: -8, size: 38, rotate: 20, opacity: 0.7, blur: 0 },
    { x: 88, y: -2, size: 28, rotate: -30, opacity: 0.4, blur: 2 },
    { x: 75, y: -4, size: 44, rotate: 50, opacity: 0.8, blur: 0 },
    { x: 80, y: 5, size: 32, rotate: -15, opacity: 0.5, blur: 1 },
    { x: 92, y: 2, size: 50, rotate: 80, opacity: 0.2, blur: 4 },
    { x: 72, y: -12, size: 22, rotate: -50, opacity: 0.35, blur: 3 },
    
    // Flowing diagonally down — mid section
    { x: 70, y: 10, size: 40, rotate: 30, opacity: 0.7, blur: 0 },
    { x: 65, y: 6, size: 30, rotate: -40, opacity: 0.4, blur: 2 },
    { x: 62, y: 18, size: 46, rotate: 55, opacity: 0.8, blur: 0 },
    { x: 58, y: 12, size: 26, rotate: 15, opacity: 0.5, blur: 1.5 },
    { x: 67, y: 25, size: 34, rotate: -65, opacity: 0.3, blur: 3 },
    { x: 54, y: 22, size: 42, rotate: 35, opacity: 0.7, blur: 0 },
    { x: 48, y: 16, size: 24, rotate: -25, opacity: 0.4, blur: 2.5 },
    
    // Continuing flow — lower section  
    { x: 45, y: 32, size: 36, rotate: 85, opacity: 0.6, blur: 1 },
    { x: 40, y: 42, size: 48, rotate: -15, opacity: 0.8, blur: 0 },
    { x: 38, y: 28, size: 28, rotate: 45, opacity: 0.4, blur: 2 },
    { x: 32, y: 38, size: 32, rotate: -55, opacity: 0.5, blur: 1.5 },
    { x: 28, y: 48, size: 40, rotate: 10, opacity: 0.7, blur: 0 },
    { x: 24, y: 35, size: 24, rotate: 65, opacity: 0.3, blur: 3 },
    { x: 20, y: 45, size: 36, rotate: -30, opacity: 0.6, blur: 1 },
    
    // Scattered atmospheric (depth of field)
    { x: 60, y: 38, size: 55, rotate: 75, opacity: 0.12, blur: 5 },
    { x: 50, y: -5, size: 52, rotate: -45, opacity: 0.12, blur: 4 },
    { x: 30, y: 20, size: 30, rotate: 120, opacity: 0.2, blur: 3 },
    { x: 78, y: 35, size: 28, rotate: -85, opacity: 0.25, blur: 2.5 },
    { x: 85, y: 50, size: 65, rotate: 15, opacity: 0.08, blur: 6 },
    { x: 15, y: 55, size: 44, rotate: 95, opacity: 0.15, blur: 4 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {beans.map((bean, i) => (
        <OutlineBean key={i} {...bean} />
      ))}
    </div>
  );
}

/* ─────────────── FEATURES ─────────────── */
function FeaturesSection() {
  const features = [
    { icon: Coffee, title: 'Fresh Daily Roasts', desc: 'Beans roasted every morning in micro-batches for peak freshness and flavor', num: '01' },
    { icon: Award, title: 'Award-Winning Blends', desc: 'Our signature blends have won 8 national barista championships', num: '02' },
    { icon: Leaf, title: 'Farm to Cup', desc: 'Direct trade with farmers ensures fair wages and exceptional quality', num: '03' },
  ];

  return (
    <section className="py-28 lg:py-36 section-flow relative">
      <BeanTrail />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <FadeIn className="max-w-xl mb-20">
          <img src="/logo.png" alt="One Zero Coffee Logo" className="w-12 h-12 rounded-full mb-6 opacity-80" />
          <p className="text-accent text-xs font-medium tracking-[0.25em] uppercase mb-4">Why One Zero Coffee</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold">
            What makes us <span className="italic text-gradient-warm">different</span>
          </h2>
        </FadeIn>

        <div className="space-y-0">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.12}>
              <div className="group flex flex-col sm:flex-row items-start gap-6 sm:gap-10 py-10 border-b border-border/30 hover:border-accent/30 transition-colors duration-500">
                <span className="text-xs text-accent/40 font-mono tracking-wider mt-1">{f.num}</span>
                <div className="w-12 h-12 rounded-2xl bg-accent/5 flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors duration-500">
                  <f.icon className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-display font-semibold mb-2 text-foreground group-hover:text-accent transition-colors duration-500">{f.title}</h3>
                  <p className="text-muted-foreground font-light leading-relaxed max-w-lg">{f.desc}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-accent group-hover:translate-x-2 transition-all duration-500 hidden sm:block mt-1" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── FEATURED MENU ─────────────── */
function FeaturedMenuSection() {
  const items = [
    { name: 'Classic Espresso', price: 149, image: espressoImg, tag: 'Best Seller' },
    { name: 'Signature Latte', price: 249, image: heroCoffee, tag: 'House Special' },
    { name: 'Cappuccino', price: 229, image: cappuccinoImg, tag: null },
    { name: 'Iced Mocha', price: 279, image: icedCoffeeImg, tag: 'New' },
  ];

  return (
    <section className="py-28 lg:py-36 relative overflow-hidden">
      <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] blob bg-accent/3 animate-drift pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-16">
          <FadeIn>
            <p className="text-accent text-xs font-medium tracking-[0.25em] uppercase mb-4">The Menu</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold">
              Curated <span className="italic font-light">for you</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Button variant="glass" className="rounded-full" asChild>
              <Link to="/menu">View Full Menu <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, i) => (
            <FadeIn key={item.name} delay={i * 0.1}>
              <Link to="/menu" className="group block">
                <div className="organic-card bg-card hover-lift overflow-hidden">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      width={400}
                      height={500}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />

                    {item.tag && (
                      <span className="absolute top-4 left-4 text-[10px] font-medium tracking-wider uppercase px-3 py-1 rounded-full glass text-accent">
                        {item.tag}
                      </span>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="font-display text-lg font-semibold text-foreground mb-1">{item.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-accent font-bold text-lg">₹{item.price}</span>
                        <span className="text-xs text-muted-foreground group-hover:text-accent transition-colors">
                          Order →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── EXPERIENCE / PARALLAX ─────────────── */
function ExperienceSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);

  return (
    <section ref={ref} className="relative py-0 overflow-hidden min-h-[80vh] flex items-center">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={cafeInterior}
          alt="One Zero Coffee interior"
          loading="lazy"
          width={1200}
          height={800}
          className="w-full h-[120%] object-cover"
        />
        <div className="absolute inset-0 bg-background/75 backdrop-blur-[2px]" />
      </motion.div>

      <motion.div style={{ y: textY }} className="relative z-10 container mx-auto px-4 lg:px-8 py-28">
        <div className="max-w-2xl">
          <FadeIn>
            <p className="text-accent text-xs font-medium tracking-[0.25em] uppercase mb-6">The Space</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-8">
              More than<br />
              a coffee shop.
              <br />
              <span className="italic text-muted-foreground font-light">A feeling.</span>
            </h2>
            <p className="text-muted-foreground text-lg font-light leading-relaxed mb-10 max-w-lg">
              Warm lights, the hum of quiet conversation, the rich aroma filling the air — One Zero Coffee is designed to be your third place. Come in, slow down, be present.
            </p>
            <Button variant="hero" size="lg" className="rounded-full px-8 py-6" asChild>
              <Link to="/about">Discover Our Story</Link>
            </Button>
          </FadeIn>
        </div>
      </motion.div>
    </section>
  );
}

/* ─────────────── TESTIMONIALS ─────────────── */
function TestimonialsSection() {
  const testimonials = [
    { text: "The best latte I've ever had. The atmosphere is unmatched — you can feel the care in every detail.", name: 'Ananya R.', role: 'Regular since 2021' },
    { text: "I drive 30 minutes just for their cold brew. Worth every kilometer.", name: 'Karthik M.', role: 'Cold Brew Enthusiast' },
    { text: "One Zero Coffee turned me from a tea person into a coffee lover. That's the highest praise I can give.", name: 'Divya S.', role: 'Converted Coffee Lover' },
  ];

  return (
    <section className="py-28 lg:py-36 section-flow">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn className="text-center mb-20">
          <p className="text-accent text-xs font-medium tracking-[0.25em] uppercase mb-4">Kind Words</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold">
            What our <span className="italic font-light">community</span> says
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.15}>
              <div className="organic-card bg-card/50 glass p-8 flex flex-col justify-between min-h-[280px]">
                <div>
                  <div className="flex gap-1 mb-5">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-accent text-accent" />)}
                  </div>
                  <p className="text-foreground/90 font-light leading-relaxed text-[15px] italic">
                    "{t.text}"
                  </p>
                </div>
                <div className="mt-6 pt-5 border-t border-border/20">
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── LOCATION ─────────────── */
function LocationSection() {
  return (
    <section className="py-28 lg:py-36 relative overflow-hidden">
      <div className="absolute top-10 -right-10 w-[250px] h-[250px] blob-3 bg-accent/3 animate-drift pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <FadeIn>
              <p className="text-accent text-xs font-medium tracking-[0.25em] uppercase mb-6">Find Us</p>
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-8">
                Come say <span className="italic">hello</span>
              </h2>

              <div className="space-y-5">
                {[
                  { icon: MapPin, label: '123 Coffee Lane, Brew District, BC 10001' },
                  { icon: Clock, label: 'Mon – Fri: 7 AM – 9 PM · Weekends: 8 AM – 10 PM' },
                  { icon: Phone, label: '+1 (555) 123-4567' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-accent/5 flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors">
                      <item.icon className="w-4 h-4 text-accent" />
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed pt-2">{item.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-7">
            <FadeIn delay={0.2} direction="right">
              <div className="relative">
                <img
                  src={cafeInterior}
                  alt="One Zero Coffee café"
                  loading="lazy"
                  width={700}
                  height={450}
                  className="w-full h-[350px] lg:h-[420px] object-cover blob-2"
                />
                <div className="absolute inset-0 blob-2 bg-gradient-to-r from-background/30 to-transparent" />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── FINAL CTA ─────────────── */
function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-warm" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] blob bg-accent/10 animate-drift" />
        <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] blob-2 bg-foreground/5 animate-drift" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <FadeIn>
          <img src="/logo.png" alt="One Zero Coffee Logo" className="w-20 h-20 rounded-full mx-auto mb-8 shadow-2xl" />
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 text-foreground leading-tight">
            Your perfect cup<br />
            <span className="italic font-light">is waiting.</span>
          </h2>
          <p className="text-foreground/60 text-lg font-light mb-10 max-w-md mx-auto">
            Order ahead and skip the line. Ready in minutes.
          </p>
          <Button variant="hero" size="lg" className="rounded-full px-10 py-6 text-base" asChild>
            <Link to="/menu">
              Start Your Order <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────── PAGE ─────────────── */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <MarqueeBanner />
      <PhilosophySection />
      <FeaturesSection />
      <FeaturedMenuSection />
      <ExperienceSection />
      <TestimonialsSection />
      <LocationSection />
      <CTASection />
      <Footer />
    </div>
  );
}
