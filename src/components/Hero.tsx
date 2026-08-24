import React from 'react';
import { ChevronDown, Play } from 'lucide-react';
import { motion } from 'motion/react';
import bannerDogVideo from "../assets/images/banner-dog .mp4";

export const Hero: React.FC = () => {
  return (
    <section
      id="hero-root"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#2C2623]"
    >
      {/* Background Image with elegant split overlay for high readability & contrast */}
      <div className="absolute inset-0 z-0">
        {/* <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAgdEoJ388LYmLORQcLJNBrO3JtaR3-S-DyJB-hesRiPrvyrIBm3_Cqb38k7mKj2EL0pYUdsloUVvN4WdPpZWo9GZVnRHlX51HXdVSY-ydP7t7UClRXp7DjFvdEPaCWp_CGrPBwJ3xqhwzOkTDpMhJ_LAuHEHZ3-GHXbegT5K1Huu4T_Usb0AHedf-Jhy7xjAIyVHmGlCuWr4IJeOtxKvCjTjIB67dRkDAa-f1T9inhnqi6avKF6UvjAEBV5zzqkY7LLLmgv3-KVQ"
          alt="Premium textured heritage home textiles and lifestyle setup"
          className="w-full h-full object-cover object-center opacity-40 scale-100 select-none pointer-events-none"
          referrerPolicy="no-referrer"
        /> */}

        
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
         <source src ={bannerDogVideo} type="video/mp4" />
         your browser doesnot support the video tag
        </video>

    
        {/* Dark linear contrast gradients for elite editorial legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2C2623] via-[#2C2623]/90 to-[#2C2623]/25" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Typography content */}
        <div className="lg:col-span-8 flex flex-col items-start gap-6 text-white">
          
          {/* Headline matches the mockup perfectly */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.05] font-light max-w-2xl"
          >
            Crafted for Living.<br />
            <span className="font-medium italic text-[#EBE4DC]">Designed for the World.</span>
          </motion.h1>

          {/* Subtitle matches the mockup perfectly */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-sans text-sm sm:text-base lg:text-lg text-[#FAF8F5]/85 max-w-xl leading-relaxed font-light"
          >
            Premium handmade home décor & pet lifestyle manufacturing for global brands.
          </motion.p>


          {/* CTA Buttons in line with mockup */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-6"
          >
            <a
              href="#collections"
              className="px-8 py-4 bg-[#8F533C] hover:bg-white hover:text-[#2C2623] text-white font-button text-[11px] tracking-widest text-center transition-all duration-300 rounded-none border border-[#8F533C] hover:border-white shadow-md cursor-pointer"
            >
              EXPLORE COLLECTIONS
            </a>
            <a
              href="#heritage"
              className="px-8 py-4 border border-white/40 hover:border-white hover:bg-white/5 text-white font-button text-[11px] tracking-widest text-center transition-all duration-300 rounded-none cursor-pointer flex items-center justify-center gap-2"
            >
              <Play size={12} fill="currentColor" />
              WATCH OUR STORY
            </a>
          </motion.div>
        </div>

        {/* Right Side: Showcase badge card matching luxury brand aesthetic */}
        {/* <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden lg:flex lg:col-span-4 flex-col items-start gap-4 p-8 bg-[#FAF8F5]/5 backdrop-blur-md border border-white/10 rounded-none text-white shadow-2xl"
        > */}
          {/* <span className="text-[10px] font-bold tracking-[0.25em] text-[#8F533C] uppercase">
            NOW FEATURING
          </span> */}
          {/* <div className="font-serif text-xl font-light italic leading-snug">
            "Sustainably Crafted Pet Linens"
          </div> */}
          {/* <p className="font-sans text-xs text-[#E0D7CD] leading-relaxed font-light">
            Integrating premium hand-loomed cotton yarns, AZO-free non-toxic vegetable pigments, and high-tension shuttle loom structures.
          </p>
          <a
            href="#collections"
            className="text-xs font-bold text-[#8F533C] hover:text-white flex items-center gap-1.5 transition-colors uppercase tracking-wider mt-2 border-b border-[#8F533C]/30 pb-1"
          >
            VIEW PRIVATE LABEL SOLUTIONS &rarr;
          </a> */}
        {/* </motion.div> */}
      </div>

      {/* Floating Scroll Indicator */}
      <a
        href="#heritage"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 select-none group cursor-pointer z-20 focus:outline-none"
        aria-label="Scroll to heritage section"
      >
        <span className="font-sans text-[9px] font-semibold tracking-[0.3em] text-[#E0D7CD]/40 group-hover:text-[#E0D7CD]/80 transition-colors uppercase">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="group-hover:translate-y-0.5 transition-transform"
        >
          <ChevronDown size={14} className="text-[#8F533C] group-hover:text-white transition-colors" />
        </motion.div>
      </a>
    </section>
  );
};
