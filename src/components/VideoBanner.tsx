import React, { useState } from 'react';
import { Play, X, Heart, Award, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const VideoBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="bg-[#FAF8F5] py-3 sm:py-4">
        <div className="w-full">
          <div className="relative min-h-[360px] sm:h-[420px] py-16 sm:py-0 flex items-center justify-center overflow-hidden bg-[#2C2623]">
            {/* Background image with parallax-like styling and deep dark overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAgdEoJ388LYmLORQcLJNBrO3JtaR3-S-DyJB-hesRiPrvyrIBm3_Cqb38k7mKj2EL0pYUdsloUVvN4WdPpZWo9GZVnRHlX51HXdVSY-ydP7t7UClRXp7DjFvdEPaCWp_CGrPBwJ3xqhwzOkTDpMhJ_LAuHEHZ3-GHXbegT5K1Huu4T_Usb0AHedf-Jhy7xjAIyVHmGlCuWr4IJeOtxKvCjTjIB67dRkDAa-f1T9inhnqi6avKF6UvjAEBV5zzqkY7LLLmgv3-KVQ"
                alt="Artisan hands weaving on a handloom"
                className="w-full h-full object-cover opacity-30 select-none pointer-events-none scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/45" />
            </div>

            {/* Floating Play Button & Text Content */}
            <div className="relative z-10 text-center flex flex-col items-center gap-6 max-w-4xl px-6">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="w-20 h-20 rounded-full bg-white text-[#2C2623] hover:bg-[#8F533C] hover:text-white transition-all duration-300 shadow-xl flex items-center justify-center cursor-pointer group border border-white/20"
                aria-label="Play our story video"
              >
                <Play size={24} className="ml-1.5 transition-transform group-hover:scale-110" fill="currentColor" />
              </motion.button>

              <div className="flex flex-col gap-3">
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white tracking-wide font-light leading-snug">
                  Crafted by Skilled Hands. Inspired by Nature. <br className="hidden sm:inline" />
                  <span className="italic font-normal text-[#EBE4DC]">Made for the World.</span>
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#E0D7CD]/90 uppercase tracking-[0.2em] font-medium">
                  Watch our story of craftsmanship, care and commitment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FAF8F5] border border-[#EBE4DC] w-full max-w-3xl relative shadow-2xl rounded-none p-5 sm:p-8 md:p-12 flex flex-col gap-6 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-[#2C2623] hover:text-[#8F533C] transition-colors p-2"
              >
                <X size={20} />
              </button>

              {/* Modal Content - Storytelling Showcase */}
              <div className="flex flex-col gap-4 mt-2">
                <span className="font-sans text-[10px] font-bold tracking-[0.3em] text-[#8F533C] uppercase flex items-center gap-1.5">
                  <Sparkles size={11} />
                  OUR HERITAGE STORY
                </span>
                <h4 className="font-serif text-3xl text-[#2C2623] font-medium leading-tight">
                  Tanshu Vaidik Craftsmanship
                </h4>
                <div className="h-[1px] bg-[#8F533C]/20 w-16" />
                
                {/* Embedded atmospheric Loom image/video simulator */}
                <div className="relative aspect-video w-full bg-[#2C2623] border border-[#EBE4DC] overflow-hidden group">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAgdEoJ388LYmLORQcLJNBrO3JtaR3-S-DyJB-hesRiPrvyrIBm3_Cqb38k7mKj2EL0pYUdsloUVvN4WdPpZWo9GZVnRHlX51HXdVSY-ydP7t7UClRXp7DjFvdEPaCWp_CGrPBwJ3xqhwzOkTDpMhJ_LAuHEHZ3-GHXbegT5K1Huu4T_Usb0AHedf-Jhy7xjAIyVHmGlCuWr4IJeOtxKvCjTjIB67dRkDAa-f1T9inhnqi6avKF6UvjAEBV5zzqkY7LLLmgv3-KVQ"
                    alt="Loom shuttle simulation"
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/20 p-6 text-center">
                    <span className="font-serif text-lg italic text-[#FAF8F5] mb-2">
                      "Every thread is a conversation between weaver and loom."
                    </span>
                    <span className="text-[10px] tracking-widest font-mono text-white/70 uppercase">
                      Panipat Heritage Looms, Haryana
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="flex flex-col gap-2">
                    <span className="font-serif text-lg font-semibold text-[#2C2623] flex items-center gap-1.5">
                      <Heart size={16} className="text-[#8F533C]" />
                      Ethical Sourcing
                    </span>
                    <p className="font-sans text-xs text-[#615751] leading-relaxed">
                      All products are hand-spun and hand-woven by verified adult artisans. We pay 35% higher than fair-trade benchmarks and mandate clean, safe environments with zero child labor.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="font-serif text-lg font-semibold text-[#2C2623] flex items-center gap-1.5">
                      <Award size={16} className="text-[#8F533C]" />
                      Global Quality Standards
                    </span>
                    <p className="font-sans text-xs text-[#615751] leading-relaxed">
                      Our manufacturing facility maintains active ISO 9001 and ISO 14001 audits, with all textiles and accessories constructed under strict quality checks for global tier-1 retail placement.
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer Button */}
              <div className="flex justify-end gap-3 mt-4 border-t border-[#EBE4DC] pt-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2.5 bg-[#8F533C] hover:bg-[#723F2B] text-white font-sans text-xs font-bold tracking-widest uppercase transition-all rounded-none"
                >
                  Return to Site
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
