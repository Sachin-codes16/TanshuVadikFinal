import React, { useState } from 'react';
import { useInquiry } from '../context/InquiryContext';
import logo from "../assets/Icons/tanshulogo.png";
import australianOwnedBadge from "../assets/Icons/Austrilla.png";
import familyOwnedBadge from "../assets/Icons/Family .png";

/* ------------------------------------------------------------------ */
/*  Palette                                                            */
/* ------------------------------------------------------------------ */
const CREAM = '#FAF8F5';
const DARK = '#2C2623';
const ACCENT = '#8F533C';
const ACCENT_DARK = '#723F2B';
const MUTED = '#615751';
const LIGHT = '#EBE4DC';

/* ------------------------------------------------------------------ */
/*  Inline SVG icons (no external deps)                                */
/* ------------------------------------------------------------------ */
type IconProps = { size?: number; color?: string };

const PhoneIcon: React.FC<IconProps> = ({ size = 14, color = ACCENT }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon: React.FC<IconProps> = ({ size = 14, color = ACCENT }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const MapPinIcon: React.FC<IconProps> = ({ size = 14, color = ACCENT }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const FacebookIcon: React.FC<IconProps> = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
  </svg>
);

const InstagramIcon: React.FC<IconProps> = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon: React.FC<IconProps> = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM2.4 9.5h5.16V21H2.4zM9.75 9.5h4.95v1.57h.07c.69-1.3 2.38-2.67 4.9-2.67 5.24 0 6.2 3.45 6.2 7.93V21h-5.16v-4.72c0-1.13-.02-2.58-1.57-2.58-1.57 0-1.81 1.23-1.81 2.5V21H9.75z" transform="translate(-2 0)" />
  </svg>
);



/* ------------------------------------------------------------------ */
/*  Fonts                                                              */
/* ------------------------------------------------------------------ */
const SERIF = "'Playfair Display', Georgia, 'Times New Roman', serif";
const SANS = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Collections', href: '/collections' },
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'Sustainability', href: '/sustainability' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Blogs', href: '/blogs' },
];

const socials = [
  { label: 'Facebook', Icon: FacebookIcon, href: 'https://www.facebook.com/Tanshuvaidik/' },
  { label: 'Instagram', Icon: InstagramIcon, href: 'https://www.instagram.com/tanshuvaidik/' },
  { label: 'LinkedIn', Icon: LinkedinIcon, href: 'https://in.linkedin.com/company/tanshu-vaidik-india-pvt-ltd' },
];

interface FooterProps {
  onNavigateAbout?: () => void;
  onNavigateCollections?: () => void;
  onNavigateBlogs?: () => void;
  onNavigateCapabilities?: () => void;
  onNavigateSustainability?: () => void;
  onNavigateContact?: () => void;
  onNavigateCertifications?: () => void;
}

const QUICK_LINK_HANDLER_KEYS: Record<string, keyof FooterProps> = {
  'About Us': 'onNavigateAbout',
  'Collections': 'onNavigateCollections',
  'Capabilities': 'onNavigateCapabilities',
  'Sustainability': 'onNavigateSustainability',
  'Certifications': 'onNavigateCertifications',
  'Contact Us': 'onNavigateContact',
  'Blogs': 'onNavigateBlogs',
};

export const Footer: React.FC<FooterProps> = (props) => {
  const { setIsPortalOpen } = useInquiry();
  const [hovered, setHovered] = useState<string | null>(null);
  const [reqHover, setReqHover] = useState(false);
  const [bookHover, setBookHover] = useState(false);

  const headingStyle: React.CSSProperties = {
    fontFamily: SERIF,
    fontSize: 20,
    fontWeight: 700,
    color: DARK,
    letterSpacing: '0.3px',
    margin: 0,
    marginBottom: 16,
  };

  return (
    <footer
      id="contact"
      style={{
        background: CREAM,
        borderTop: `1px solid ${ACCENT}33`,
        padding: '0 0 0 0',
        fontFamily: SANS,
        color: `${DARK}e6`,
        // scrollMarginTop: '112px',
        // bottom: 0,
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[38%_1fr] items-stretch">
        {/* ---------------- Bestselling Collection CTA ---------------- */}
        <div
          style={{
            background: DARK,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: 16,
          }}
          className="px-6 py-10 sm:px-10 sm:py-12 lg:px-10 lg:py-14"
        >
          <h4
            style={{
              fontFamily: SERIF,
              fontSize: 24,
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1.2,
              margin: 0,
              letterSpacing: '0.3px',
            }}
          >
            Let's Build Your Next Bestselling Collection
          </h4>
          <p
            style={{
              fontSize: 12.5,
              color: `${LIGHT}cc`,
              lineHeight: 1.7,
              fontWeight: 300,
              margin: 0,
            }}
          >
            Whether you are launching a new brand or expanding your existing
            range, we are here to bring your vision to life.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 4 }}>
            <button
              onClick={() => setIsPortalOpen(true)}
              onMouseEnter={() => setReqHover(true)}
              onMouseLeave={() => setReqHover(false)}
              style={{
                padding: '11px 18px',
                background: reqHover ? ACCENT_DARK : ACCENT,
                color: '#fff',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.2s ease',
                whiteSpace: 'nowrap',
              }}
            >
              Request Catalogue
            </button>
            <a
              href="mailto:info@tanshuvaidik.com.au?subject=Meeting%20Request"
              onMouseEnter={() => setBookHover(true)}
              onMouseLeave={() => setBookHover(false)}
              style={{
                padding: '11px 18px',
                background: bookHover ? '#fff' : 'transparent',
                color: bookHover ? DARK : '#fff',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                border: '1px solid rgba(255,255,255,0.4)',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
              }}
            >
              Book a Meeting
            </a>
          </div>
        </div>

        {/* ---------------- Right content area ---------------- */}
        <div
          style={{
            display: 'grid',
            alignItems: 'start',
          }}
          className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-[280px_170px_210px] justify-between gap-8 lg:gap-10 px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-8 lg:pb-8"
        >
        {/* ---------------- Stay Updated ---------------- */}
        <div className="flex flex-col items-center sm:items-start justify-between h-full">

          <img
            src={logo}
            alt="Tanshu Group Logo"
            style={{
              width: '180px',
              height: 'auto',
              margin: 0,
            }}
          />
          <div className="flex flex-col items-center sm:flex-row sm:items-center gap-4 sm:gap-4" style={{ marginTop: 16 }}>
            <img
              src={australianOwnedBadge}
              alt="Australian Owned Certified"
              style={{ height: '95px', width: 'auto' }}
            />
            <img
              src={familyOwnedBadge}
              alt="A family owned Australian business"
              style={{ height: '95px', width: 'auto', filter: 'invert(1)', mixBlendMode: 'multiply' }}
            />
          </div>

          {/* Social Icons */}
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            {socials.map(({ label, Icon, href }) => {
              const isHover = hovered === label;
              return (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  onMouseEnter={() => setHovered(label)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    border: `1px solid ${isHover ? ACCENT : `${ACCENT}4d`}`,
                    color: isHover ? ACCENT : `${DARK}b3`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>

        {/* ---------------- Quick Links ---------------- */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <h4 style={headingStyle}>Quick Links</h4>

  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
    {quickLinks.map((item) => {
      const isHover = hovered === `ql-${item.label}`;
      const handler = props[QUICK_LINK_HANDLER_KEYS[item.label]] as (() => void) | undefined;

      return (
        <a
          key={item.label}
          href={item.href}
          onClick={
            handler
              ? (e) => {
                  e.preventDefault();
                  handler();
                }
              : undefined
          }
          onMouseEnter={() => setHovered(`ql-${item.label}`)}
          onMouseLeave={() => setHovered(null)}
          style={{
            fontSize: 12.5,
            color: isHover ? ACCENT : MUTED,
            textDecoration: 'none',
            transition: 'color 0.2s ease',
            cursor: handler ? 'pointer' : undefined,
          }}
        >
          {item.label}
        </a>
      );
    })}
  </div>
</div>

        {/* ---------------- Contact Us ---------------- */}
        <div className="flex flex-col items-center sm:items-start">
          <h4 style={headingStyle}>Contact Us</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 12.5, color: MUTED }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <PhoneIcon />
              <a href="tel:+918930009468" style={{ color: 'inherit', textDecoration: 'none' }}>
                +918930009468
              </a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <MailIcon />
              <a href="mailto:info@tanshuvaidik.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                info@tanshuvaidik.com
              </a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <MapPinIcon />
              <span>Panipat, Haryana, India</span>
            </div>
          </div>
        </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;