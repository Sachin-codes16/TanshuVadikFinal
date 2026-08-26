import React, { useState } from 'react';
import { Menu, X, Mail, ClipboardList } from 'lucide-react';
import { useInquiry } from '../context/InquiryContext';
import { motion, AnimatePresence } from 'motion/react';
import tanshuLogo from '../assets/images/Tanshulogo.png';

interface NavbarProps {
  onNavigateCollections: () => void;
  onNavigateAbout: () => void;
  onNavigateHome: () => void;
  onNavigateCapabilities: () => void;
  onNavigateSustainability: () => void;
  onNavigateContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigateCollections,
  onNavigateAbout,
  onNavigateHome,
  onNavigateCapabilities,
  onNavigateSustainability,
  onNavigateContact,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, setIsPortalOpen } = useInquiry();

  const menuItems = [
    { label: 'ABOUT US', href: '#' },
    { label: 'COLLECTIONS', href: '#collections' },
    { label: 'CAPABILITIES', href: '#capabilities' },
    { label: 'SUSTAINABILITY', href: '#heritage' },
    { label: 'CONTACT US', href: '#contact' },
  ];

  return (
    <nav
      id="navbar-root"
      className="fixed top-0 left-0 w-full z-50 bg-[#FAF8F5] border-b border-[#EBE4DC] py-4 shadow-xs"
    >
      <div className="w-full px-1.25 sm:px-6 lg:px-[80px] flex items-center justify-between">

        {/* Brand Logo exactly as requested */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onNavigateHome();
          }}
          className="flex items-center select-none group shrink-0 mr-2 sm:mr-5 lg:mr-9"
        >
          <img
            src={tanshuLogo}
            alt="Tanshu Vaidik India Pvt. Ltd."
            className="h-9 sm:h-14 md:h-16 w-auto object-contain"
          />
        </a>

        {/* Desktop Links with active underline micro-interactions - visible from md screen up */}
        <div className="hidden md:flex items-center gap-5 lg:gap-9 shrink-0">
          {menuItems.map((item) =>
            item.label === 'COLLECTIONS' ? (
              <button
                key={item.label}
                onClick={onNavigateCollections}
                className="relative font-sans text-[10px] lg:text-xs font-bold text-[#2C2623] hover:text-[#8F533C] tracking-widest transition-colors py-1 nav-link flex items-center gap-1 uppercase shrink-0 cursor-pointer bg-transparent"
              >
                <span>{item.label}</span>
              </button>
            ) : item.label === 'ABOUT US' ? (
              <button
                key={item.label}
                onClick={onNavigateAbout}
                className="relative font-sans text-[10px] lg:text-xs font-bold text-[#2C2623] hover:text-[#8F533C] tracking-widest transition-colors py-1 nav-link flex items-center gap-1 uppercase shrink-0 cursor-pointer bg-transparent"
              >
                <span>{item.label}</span>
              </button>
            ) : item.label === 'CAPABILITIES' ? (
              <button
                key={item.label}
                onClick={onNavigateCapabilities}
                className="relative font-sans text-[10px] lg:text-xs font-bold text-[#2C2623] hover:text-[#8F533C] tracking-widest transition-colors py-1 nav-link flex items-center gap-1 uppercase shrink-0 cursor-pointer bg-transparent"
              >
                <span>{item.label}</span>
              </button>
            ) : item.label === 'SUSTAINABILITY' ? (
              <button
                key={item.label}
                onClick={onNavigateSustainability}
                className="relative font-sans text-[10px] lg:text-xs font-bold text-[#2C2623] hover:text-[#8F533C] tracking-widest transition-colors py-1 nav-link flex items-center gap-1 uppercase shrink-0 cursor-pointer bg-transparent"
              >
                <span>{item.label}</span>
              </button>
            ) : item.label === 'CONTACT US' ? (
              <button
                key={item.label}
                onClick={onNavigateContact}
                className="relative font-sans text-[10px] lg:text-xs font-bold text-[#2C2623] hover:text-[#8F533C] tracking-widest transition-colors py-1 nav-link flex items-center gap-1 uppercase shrink-0 cursor-pointer bg-transparent"
              >
                <span>{item.label}</span>
              </button>
            ) : (
              <a
                key={item.label}
                href={item.href}
                onClick={onNavigateHome}
                className="relative font-sans text-[10px] lg:text-xs font-bold text-[#2C2623] hover:text-[#8F533C] tracking-widest transition-colors py-1 nav-link flex items-center gap-1 uppercase shrink-0"
              >
                <span>{item.label}</span>
              </a>
            )
          )}
        </div>

        {/* Action Button & Inquiry Badge */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0 ml-0 sm:ml-4 lg:ml-10">

          {/* REQUEST CATALOGUE CTA (with optional badge) */}
          <button
            id="rfq-trigger-btn"
            onClick={() => setIsPortalOpen(true)}
            className="relative flex items-center gap-1.5 sm:gap-2 border border-[#8F533C] bg-[#8F533C] hover:bg-[#2C2623] hover:border-[#2C2623] text-white px-2.5 sm:px-3 lg:px-5 py-2 sm:py-2.5 font-sans text-[9px] lg:text-[10px] font-bold tracking-widest transition-all duration-300 rounded-none cursor-pointer shadow-xs shrink-0"
          >
            <ClipboardList size={11} className="shrink-0" />
            <span className="hidden min-[380px]:inline">REQUEST CATALOGUE</span>
            <span className="inline min-[380px]:hidden">CATALOGUE</span>
            <AnimatePresence>
              {cart.length > 0 && (
                <motion.span
                  key={cart.length}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                  className="absolute -top-2 -right-2 bg-[#C0392B] text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full border-2 border-[#FAF8F5] shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
                >
                  {cart.length}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* WhatsApp Icon */}
          <a
            href="https://wa.me/61299999166"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-[#EBE4DC] hover:border-[#8F533C] hover:text-[#8F533C] text-[#2C2623] transition-colors shrink-0"
            title="Chat with us on WhatsApp"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.86 9.86 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.14c-.24.68-1.4 1.32-1.94 1.4-.5.08-1.13.11-1.82-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.79-4.16-4.94-4.35-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.81 2 .88 2.15.07.15.12.32.02.51-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.72 1.19 1.55 1.93 1.06.95 1.96 1.24 2.24 1.38.28.14.44.12.61-.07.17-.19.71-.83.9-1.11.19-.28.38-.24.63-.14.26.09 1.65.78 1.93.92.28.14.47.21.54.33.07.12.07.68-.17 1.36z"/>
            </svg>
          </a>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center text-[#2C2623] hover:text-[#8F533C] w-9 h-9 sm:w-10 sm:h-10 transition-colors shrink-0"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-[72px] left-0 w-full bg-[#FAF8F5] border-b border-[#EBE4DC] px-6 py-8 flex flex-col gap-6 z-40 shadow-lg"
          >
            {menuItems.map((item) =>
              item.label === 'COLLECTIONS' ? (
                <button
                  key={item.label}
                  onClick={() => {
                    setIsOpen(false);
                    onNavigateCollections();
                  }}
                  className="text-left font-sans text-xs font-bold text-[#2C2623] hover:text-[#8F533C] tracking-widest border-b border-[#F4EFEA] pb-2 transition-colors uppercase cursor-pointer bg-transparent"
                >
                  {item.label}
                </button>
              ) : item.label === 'ABOUT US' ? (
                <button
                  key={item.label}
                  onClick={() => {
                    setIsOpen(false);
                    onNavigateAbout();
                  }}
                  className="text-left font-sans text-xs font-bold text-[#2C2623] hover:text-[#8F533C] tracking-widest border-b border-[#F4EFEA] pb-2 transition-colors uppercase cursor-pointer bg-transparent"
                >
                  {item.label}
                </button>
              ) : item.label === 'CAPABILITIES' ? (
                <button
                  key={item.label}
                  onClick={() => {
                    setIsOpen(false);
                    onNavigateCapabilities();
                  }}
                  className="text-left font-sans text-xs font-bold text-[#2C2623] hover:text-[#8F533C] tracking-widest border-b border-[#F4EFEA] pb-2 transition-colors uppercase cursor-pointer bg-transparent"
                >
                  {item.label}
                </button>
              ) : item.label === 'SUSTAINABILITY' ? (
                <button
                  key={item.label}
                  onClick={() => {
                    setIsOpen(false);
                    onNavigateSustainability();
                  }}
                  className="text-left font-sans text-xs font-bold text-[#2C2623] hover:text-[#8F533C] tracking-widest border-b border-[#F4EFEA] pb-2 transition-colors uppercase cursor-pointer bg-transparent"
                >
                  {item.label}
                </button>
              ) : item.label === 'CONTACT US' ? (
                <button
                  key={item.label}
                  onClick={() => {
                    setIsOpen(false);
                    onNavigateContact();
                  }}
                  className="text-left font-sans text-xs font-bold text-[#2C2623] hover:text-[#8F533C] tracking-widest border-b border-[#F4EFEA] pb-2 transition-colors uppercase cursor-pointer bg-transparent"
                >
                  {item.label}
                </button>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    setIsOpen(false);
                    onNavigateHome();
                  }}
                  className="font-sans text-xs font-bold text-[#2C2623] hover:text-[#8F533C] tracking-widest border-b border-[#F4EFEA] pb-2 transition-colors uppercase"
                >
                  {item.label}
                </a>
              )
            )}
            
            <div className="flex items-center gap-4 pt-2">
              <a
                href="mailto:info@tanshuvaidik.com.au"
                onClick={() => setIsOpen(false)}
                className="flex-1 py-3 border border-[#EBE4DC] text-[#2C2623] text-center font-button text-[11px] tracking-wider flex items-center justify-center gap-2"
              >
                <Mail size={14} />
                EMAIL DIRECT
              </a>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsPortalOpen(true);
                }}
                className="flex-1 py-3 bg-[#8F533C] hover:bg-[#2C2623] text-white font-button text-[11px] tracking-wider flex items-center justify-center gap-2"
              >
                <ClipboardList size={14} />
                CATALOGUE ({cart.length})
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
