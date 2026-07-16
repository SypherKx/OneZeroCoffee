import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// We only wait for the first few frames to ensure the animation starts smoothly
// The rest will continue loading in the background within the ScrollCanvas
const CRITICAL_FRAME_COUNT = 24; 
const frameUrls = Array.from({ length: CRITICAL_FRAME_COUNT }).map((_, i) => 
  `/frames_webp/frame_${String(i).padStart(5, '0')}.webp`
);

const staticAssets = [
  '/logo.png',
];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    const allAssets = [...frameUrls, ...staticAssets];
    const totalAssets = allAssets.length;

    if (totalAssets === 0) {
      onComplete();
      return;
    }

    const updateProgress = () => {
      loadedCount++;
      const currentProgress = Math.round((loadedCount / totalAssets) * 100);
      setProgress(currentProgress);

      if (loadedCount === totalAssets) {
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(onComplete, 600);
        }, 400);
      }
    };

    allAssets.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = updateProgress;
      img.onerror = updateProgress;
    });
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0F0A07]/60 backdrop-blur-sm"
        >
          {/* Main Loader Container */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative flex flex-col items-center justify-center p-12 rounded-[3rem] bg-[#140D09] border border-white/5 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.5)]"
          >
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-accent/5 blur-3xl rounded-full" />

            {/* Coffee Cup Animation Container */}
            <div className="relative w-24 h-24 mb-6">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
                {/* Steam Lines */}
                <motion.path
                  d="M40,20 Q45,10 40,0"
                  fill="none"
                  stroke="#D46B25"
                  strokeWidth="2"
                  strokeLinecap="round"
                  animate={{ y: [0, -10], opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
                />
                <motion.path
                  d="M50,15 Q55,5 50,-5"
                  fill="none"
                  stroke="#D46B25"
                  strokeWidth="2"
                  strokeLinecap="round"
                  animate={{ y: [0, -10], opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
                />
                <motion.path
                  d="M60,20 Q65,10 60,0"
                  fill="none"
                  stroke="#D46B25"
                  strokeWidth="2"
                  strokeLinecap="round"
                  animate={{ y: [0, -10], opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: 0.8 }}
                />

                {/* Mug Handle */}
                <path 
                  d="M72 40 C 82 40, 88 45, 88 52 C 88 59, 82 64, 72 64" 
                  fill="none" 
                  stroke="#D46B25" 
                  strokeWidth="5" 
                  strokeLinecap="round" 
                />
                
                {/* Mug Body Outline */}
                <path 
                  d="M25 30 L30 75 C 31 82, 38 88, 45 88 L55 88 C 62 88, 69 82, 70 75 L75 30 Z" 
                  fill="none" 
                  stroke="#D46B25" 
                  strokeWidth="5" 
                  strokeLinejoin="round" 
                />
                
                <defs>
                  <clipPath id="cup-mask">
                    <path d="M25 30 L30 75 C 31 82, 38 88, 45 88 L55 88 C 62 88, 69 82, 70 75 L75 30 Z" />
                  </clipPath>
                </defs>
                
                {/* Coffee Fill */}
                <motion.rect
                  x="0"
                  y="90"
                  width="100"
                  height="100"
                  fill="#4A2D19"
                  clipPath="url(#cup-mask)"
                  animate={{ y: 90 - (progress * 0.6) }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </svg>
            </div>

            {/* Progress Label */}
            <div className="relative text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-white text-2xl font-display font-bold tracking-tighter">
                  {progress}
                </span>
                <span className="text-accent text-sm font-bold">%</span>
              </div>
              <p className="text-white/30 text-[9px] uppercase tracking-[0.3em] font-bold">
                Brewing Fast
              </p>
            </div>
          </motion.div>

          {/* Background overlay hints */}
          <div className="absolute inset-0 z-[-1] pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02]" 
              style={{ backgroundImage: 'radial-gradient(#D46B25 1px, transparent 1px)', backgroundSize: '32px 32px' }} 
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
