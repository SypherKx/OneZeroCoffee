import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 240;

function currentFrame(index: number): string {
  return `/frames/ezgif-frame-${String(index + 1).padStart(3, '0')}.jpg`;
}

export default function ScrollCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef({ value: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Pre-load all frames
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Set the internal buffer to full DPR resolution
      canvas.width = w * dpr;
      canvas.height = h * dpr;

      // Keep CSS size at viewport dimensions
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      // Scale context so all draw calls are in CSS-pixel space
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Best quality interpolation
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    };
    setCanvasSize();

    const renderFrame = (index: number) => {
      const img = images[index];
      if (!img || !img.complete) return;

      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      // Cover-fit the image using CSS-pixel dimensions
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = w / h;

      let drawW: number, drawH: number, drawX: number, drawY: number;
      if (canvasRatio > imgRatio) {
        drawW = w;
        drawH = w / imgRatio;
        drawX = 0;
        drawY = (h - drawH) / 2;
      } else {
        drawH = h;
        drawW = h * imgRatio;
        drawX = (w - drawW) / 2;
        drawY = 0;
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1) {
          // Render first frame immediately
          renderFrame(0);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;

    // GSAP ScrollTrigger animation
    const frameObj = frameIndexRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=300%',
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Animate through frames
    tl.to(frameObj, {
      value: FRAME_COUNT - 1,
      ease: 'none',
      duration: 3,
      snap: { value: 1 },
      onUpdate: () => {
        renderFrame(Math.round(frameObj.value));
      },
    });

    // Overlay animations — fade in content elements as we scroll
    const overlay = overlayRef.current;
    if (overlay) {
      // Initial state — content starts hidden
      gsap.set(overlay, { opacity: 0 });

      // At ~40% through the frames, start fading in overlay
      tl.to(overlay, {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      }, 0.8);

      // Stagger text elements in
      const textEls = overlay.querySelectorAll('.hero-animate');
      gsap.set(textEls, { y: 60, opacity: 0 });
      tl.to(textEls, {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power3.out',
      }, 1.0);
    }

    // Handle resize
    const handleResize = () => {
      setCanvasSize();
      renderFrame(Math.round(frameObj.value));
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden">
      {/* Canvas for frame animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: 'block' }}
      />

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.1) 70%, transparent 100%)',
      }} />

      {/* Bottom vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to top, rgba(27,17,10,0.9) 0%, transparent 40%)',
      }} />

      {/* Top subtle vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 20% 10%, rgba(212,107,37,0.12) 0%, transparent 60%)',
      }} />

      {/* Content overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-10 flex items-center pointer-events-none"
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            {/* Logo + Badge */}
            <div className="hero-animate mb-6 pointer-events-auto">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <img src="/logo.png" alt="One Zero Coffee" className="w-7 h-7 rounded-full" />
                <span className="text-[11px] font-semibold tracking-[0.18em] uppercase" style={{ color: '#D4956C' }}>
                  Est. 2020 · Artisan Roasters
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="hero-animate text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-display font-bold leading-[1.05] mb-6 text-white">
              Where Every
              <br />
              <span className="italic font-medium" style={{
                background: 'linear-gradient(135deg, #E6A87C, #D46B25)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Sip Matters
              </span>
            </h1>

            {/* Subtitle */}
            <p className="hero-animate text-base sm:text-lg lg:text-xl font-light leading-relaxed mb-8 max-w-lg"
              style={{ color: 'rgba(255,255,255,0.65)' }}
            >
              Single-origin beans, roasted in small batches, brewed with obsessive precision. This isn't just coffee — it's a ritual.
            </p>

            {/* Social proof */}
            <div className="hero-animate flex items-center gap-5 mb-10 pointer-events-auto">
              <div className="flex -space-x-3">
                {['AK', 'PS', 'RM', 'VG'].map((initial, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-medium shadow-sm"
                    style={{
                      background: '#2A1B14',
                      border: '2px solid rgba(27,17,10,1)',
                      color: 'rgba(255,255,255,0.5)',
                    }}
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#D46B25] text-[#D46B25]" />
                  ))}
                </div>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  Loved by <span className="text-white font-medium">2,400+</span> coffee lovers
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="hero-animate flex flex-row gap-4 pointer-events-auto">
              <Button
                asChild
                className="text-[15px] font-semibold px-8 py-7 rounded-full text-white hover:opacity-90 border-0 shadow-lg transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #D78B5D, #A4532B)',
                  boxShadow: '0 8px 32px rgba(212,107,37,0.3)',
                }}
              >
                <Link to="/menu" className="flex items-center">
                  Order Now <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                asChild
                className="text-[15px] font-medium px-8 py-7 rounded-full text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300"
                style={{
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                <Link to="/about" className="flex items-center">Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator — pulsing at bottom center */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <p className="text-[10px] uppercase tracking-[0.3em] font-medium" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Scroll
        </p>
        <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-white/40 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
