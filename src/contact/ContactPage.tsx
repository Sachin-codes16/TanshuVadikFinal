import React, { useRef, useState } from 'react';
import {
  Phone,
  Send,
  Check,
  Gem,
  Leaf,
  Users,
  Globe,
  ShieldCheck,
  Linkedin,
  Instagram,
  Facebook,
  IdCard,
  Download,
  FileText,
} from 'lucide-react';
import heroImage from '../assets/finalimages1/Contact Us Hero image.jpeg';
import indiaOfficePhoto from '../assets/Capablities/image.png';
import australiaOfficePhoto from '../assets/Capablities/image copy.png';
import indiaMapShape from '../assets/Capablities/ChatGPT Image Aug 1, 2026, 05_45_15 PM.png';
import australiaMapShape from '../assets/Capablities/australia-map-mask.png';
import { COUNTRIES } from '../data/countries';
import { offices } from '../data';
import { useInquiry } from '../context/InquiryContext';
import { submitContactUs } from '../api';
import { SimpleCaptcha, type CaptchaHandle } from '../components/SimpleCaptcha';

const ENQUIRY_TYPES = [
  'General Inquiry',
  'Product Inquiry',
  'Bulk / Wholesale Order',
  'Custom / Private Label',
  'Sample Request',
  'Partnership',
  'Other',
];

const indiaOffice = offices.find((o) => o.id === 'india-factory')!;
const australiaOffice = offices.find((o) => o.id === 'australia-office')!;

export const ContactPage: React.FC = () => {
  const { setIsPortalOpen } = useInquiry();
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const captchaRef = useRef<CaptchaHandle>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!captchaRef.current?.validate()) return;

    const formData = new FormData(e.currentTarget);

    setSubmitting(true);
    setSubmitError(null);
    try {
      await submitContactUs({
        FullName: formData.get('fullName'),
        CompanyName: formData.get('companyName'),
        Email: formData.get('email'),
        Phone: formData.get('phone'),
        Country: formData.get('country'),
        EnquiryType: formData.get('enquiryType'),
        Message: formData.get('message'),
      });
      setSubmitted(true);
      captchaRef.current?.reset();
    } catch (err) {
      setSubmitError('Something went wrong while sending your message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

   return (
      <div className="pt-16 sm:pt-[76px]">
    {/* Hero */}
    <div className="relative w-full h-90 sm:h-120 overflow-hidden">
     <img
       src={heroImage}
       alt="Contact Tanshu Vaidik"
       className="absolute inset-0 w-full h-full object-cover object-[50%_30%]"
       referrerPolicy="no-referrer"
     />
     <div className="absolute inset-0 bg-gradient-to-r from-white from-5% via-white/50 via-30% to-transparent to-45%" />
     <div className="relative z-10 h-full w-full px-6 sm:px-[80px] flex flex-col justify-center gap-4 max-w-2xl">
       <span className="font-sans text-xs text-[#8F533C]">
         <a href="/" className="hover:underline">Home</a> / Contact Us
       </span>
       <div>
         <h1 className="font-serif text-4xl sm:text-6xl text-[#2C2623] tracking-tight font-medium leading-none">
           Contact Us
         </h1>
         <span className="block w-12 h-px bg-[#8F533C] mt-4" />
       </div>
       <p className="font-sans text-sm sm:text-base text-[#615751] max-w-lg leading-relaxed">
         We would love to hear from you.
         <br />
         Let's create something exceptional together.
       </p>
       <p className="font-sans text-sm sm:text-base text-[#615751] max-w-lg leading-relaxed">
         Whether you have a question about our products,
         <br />
         need a custom solution, or want to explore a
         <br />
         partnership, our team is here to help.
       </p>
     </div>
   </div>

   {/* Form + Get In Touch */}
   <section className="pt-8 sm:pt-10 pb-4 sm:pb-5 bg-[#FAF8F5]">
     <div className="w-full px-6 sm:px-[80px] grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4 max-w-[1600px] mx-auto items-stretch">
       {/* Send Us A Message */}
       <div className="border border-[#EBE4DC] bg-white p-6 sm:p-8">
         <h2 className="font-serif text-2xl sm:text-3xl text-[#2C2623] font-bold tracking-tight uppercase">
           Send Us A Message
         </h2>
         <p className="font-sans text-sm text-[#615751] mt-2 mb-6">
           Fill out the form below and our team will get back to you shortly.
         </p>

         {submitted ? (
           <div className="flex flex-col items-center text-center gap-3 py-12">
             <span className="w-12 h-12 rounded-full bg-[#8F533C]/10 flex items-center justify-center">
               <Check size={22} className="text-[#8F533C]" />
             </span>
             <h3 className="font-serif text-xl text-[#2C2623] font-bold">Message Sent</h3>
             <p className="font-sans text-sm text-[#615751] max-w-xs">
               Thank you for reaching out. Our team will get back to you shortly.
             </p>
           </div>
         ) : (
           <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div className="flex flex-col gap-2">
               <label className="font-sans text-sm text-[#2C2623]">
                 Full Name <span className="text-[#C0392B]">*</span>
               </label>
               <input
                 type="text"
                 name="fullName"
                 required
                 className="w-full border border-[#D8CFC4] bg-white px-4 py-3 font-sans text-sm text-[#2C2623] focus:outline-none focus:border-[#8F533C]"
               />
             </div>

             <div className="flex flex-col gap-2">
               <label className="font-sans text-sm text-[#2C2623]">Company Name</label>
               <input
                 type="text"
                 name="companyName"
                 className="w-full border border-[#D8CFC4] bg-white px-4 py-3 font-sans text-sm text-[#2C2623] focus:outline-none focus:border-[#8F533C]"
               />
             </div>

             <div className="flex flex-col gap-2">
               <label className="font-sans text-sm text-[#2C2623]">
                 Email Address <span className="text-[#C0392B]">*</span>
               </label>
               <input
                 type="email"
                 name="email"
                 required
                 className="w-full border border-[#D8CFC4] bg-white px-4 py-3 font-sans text-sm text-[#2C2623] focus:outline-none focus:border-[#8F533C]"
               />
             </div>

             <div className="flex flex-col gap-2">
               <label className="font-sans text-sm text-[#2C2623]">
                 Phone / WhatsApp <span className="text-[#C0392B]">*</span>
               </label>
               <input
                 type="tel"
                 name="phone"
                 required
                 className="w-full border border-[#D8CFC4] bg-white px-4 py-3 font-sans text-sm text-[#2C2623] focus:outline-none focus:border-[#8F533C]"
               />
             </div>

             <div className="flex flex-col gap-2">
               <label className="font-sans text-sm text-[#2C2623]">
                 Country <span className="text-[#C0392B]">*</span>
               </label>
               <select
                 name="country"
                 required
                 defaultValue=""
                 className="w-full border border-[#D8CFC4] bg-white px-4 py-3 font-sans text-sm text-[#2C2623] focus:outline-none focus:border-[#8F533C]"
               >
                 <option value="" disabled>
                   Select country
                 </option>
                 {COUNTRIES.map((c) => (
                   <option key={c.iso2} value={c.name}>
                     {c.name}
                   </option>
                 ))}
               </select>
             </div>

             <div className="flex flex-col gap-2">
               <label className="font-sans text-sm text-[#2C2623]">
                 Enquiry Type <span className="text-[#C0392B]">*</span>
               </label>
               <select
                 name="enquiryType"
                 required
                 defaultValue=""
                 className="w-full border border-[#D8CFC4] bg-white px-4 py-3 font-sans text-sm text-[#2C2623] focus:outline-none focus:border-[#8F533C]"
               >
                 <option value="" disabled>
                   Select enquiry type
                 </option>
                 {ENQUIRY_TYPES.map((type) => (
                   <option key={type} value={type}>
                     {type}
                   </option>
                 ))}
               </select>
             </div>

             <div className="flex flex-col gap-2 sm:col-span-2">
               <label className="font-sans text-sm text-[#2C2623]">
                 Your Message <span className="text-[#C0392B]">*</span>
               </label>
               <textarea
                 name="message"
                 required
                 rows={5}
                 className="w-full border border-[#D8CFC4] bg-white px-4 py-3 font-sans text-sm text-[#2C2623] resize-y focus:outline-none focus:border-[#8F533C]"
               />
             </div>

             <SimpleCaptcha ref={captchaRef} className="sm:col-span-2" />

             <label className="flex items-start gap-2.5 cursor-pointer sm:col-span-2">
               <input
                 type="checkbox"
                 checked={agreed}
                 onChange={(e) => setAgreed(e.target.checked)}
                 className="mt-0.5 accent-[#8F533C] shrink-0"
                 required
               />
               <span className="font-sans text-xs text-[#615751] leading-relaxed">
                 I agree to the{' '}
                 <a href="#" className="text-[#8F533C] hover:underline">Privacy Policy</a>{' '}
                 and{' '}
                 <a href="#" className="text-[#8F533C] hover:underline">Terms &amp; Conditions</a>.
               </span>
             </label>

             {submitError && (
               <p className="sm:col-span-2 font-sans text-sm text-[#C0392B]">{submitError}</p>
             )}

             <button
               type="submit"
               disabled={submitting}
               className="sm:col-span-2 w-full sm:w-fit flex items-center justify-center gap-2 px-6 py-4 bg-[#8F533C] hover:bg-[#2C2623] disabled:opacity-60 disabled:cursor-not-allowed text-white font-sans text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer"
             >
               {submitting ? 'Sending...' : 'Send Message'} <Send size={14} />
             </button>
           </form>
         )}
       </div>

       {/* Get In Touch */}
       <div className="border border-[#EBE4DC] bg-white p-6 sm:p-8 h-full flex flex-col justify-between gap-6">
         <h2 className="font-serif text-2xl sm:text-3xl text-[#2C2623] font-bold tracking-tight uppercase">
           Get In Touch
         </h2>

         <div className="flex flex-col gap-1">
           <h3 className="font-sans text-xs font-bold tracking-widest text-[#2C2623] uppercase">
             Email Us
           </h3>
           <a href="mailto:info@tanshuvaidik.com" className="font-sans text-sm text-[#615751] hover:text-[#8F533C]">
             info@tanshuvaidik.com
           </a>
         </div>

         <div className="h-px bg-[#EBE4DC]" />

         <div className="flex flex-col gap-1">
           <h3 className="font-sans text-xs font-bold tracking-widest text-[#2C2623] uppercase">
             INDIA
           </h3>
           <span className="font-sans text-sm text-[#615751]">Manufacturing Unit</span>
           <span className="font-sans text-xs text-[#615751] leading-snug">
             Industrial Area, Phase II, Hari Nagar,<br />
             Panipat, Haryana<br />
             Pin : 132103
           </span>
           <a href="tel:+918930009468" className="flex items-center gap-2 font-sans text-sm text-[#615751] hover:text-[#8F533C] mt-1">
             <Phone size={14} />
             +91 89300 09468
           </a>
         </div>

         <div className="h-px bg-[#EBE4DC]" />

         <div className="flex flex-col gap-1">
           <h3 className="font-sans text-xs font-bold tracking-widest text-[#2C2623] uppercase">
             AUSTRALIA
           </h3>
           <span className="font-sans text-sm text-[#615751]">Head Office</span>
           <span className="font-sans text-xs text-[#615751] leading-snug">
             4&amp;5/62 Argyle Street,<br />
             South Windsor 2756, New South Wales,<br />
             Sydney
           </span>
           <a href="tel:+610245108076" className="flex items-center gap-2 font-sans text-sm text-[#615751] hover:text-[#8F533C] mt-1">
             <Phone size={14} />
             +61 02 4510 8076
           </a>
         </div>

         <div className="h-px bg-[#EBE4DC]" />

         <div>
           <h3 className="flex items-center gap-2 font-sans text-xs font-bold tracking-widest text-[#2C2623] uppercase mb-3">
             <span className="w-10 h-10 rounded-full bg-[#4A5D3A] text-white flex items-center justify-center shrink-0">
               <Send size={16} />
             </span>
             Connect With Us
           </h3>
           <div className="flex items-center gap-3">
             {[
               { Icon: Linkedin, href: 'https://in.linkedin.com/company/tanshu-vaidik-india-pvt-ltd' },
               { Icon: Instagram, href: 'https://www.instagram.com/tanshuvaidik/' },
               { Icon: Facebook, href: 'https://www.facebook.com/Tanshuvaidik/' },
             ].map(({ Icon, href }, i) => (
               <a
                 key={i}
                 href={href}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="w-9 h-9 rounded-full bg-[#4A5D3A] text-white flex items-center justify-center hover:bg-[#8F533C] transition-colors"
               >
                 <Icon size={15} />
               </a>
             ))}
           </div>
         </div>
       </div>
     </div>
   </section>

   {/* Global Presence */}
   <section className="pt-4 sm:pt-5 pb-3 sm:pb-4 bg-white">
     <div className="w-full px-6 sm:px-[80px] flex flex-col items-center text-center gap-2 mb-6 max-w-[1600px] mx-auto">
       <div className="flex items-center gap-4 w-full max-w-lg">
         <span className="h-px flex-1 bg-[#8F533C]/40" />
         <h2 className="font-serif text-2xl sm:text-3xl text-[#4A5D3A] tracking-tight uppercase whitespace-nowrap">
           Our Global Presence
         </h2>
         <span className="h-px flex-1 bg-[#8F533C]/40" />
       </div>
       <p className="font-sans text-sm text-[#615751]">
         Serving global partners from India with a sales office in Australia.
       </p>
     </div>

     <div className="w-full px-6 sm:px-[80px] grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1600px] mx-auto">
       {[
         { office: indiaOffice, photo: indiaOfficePhoto, role: 'Manufacturing Unit', mapShape: indiaMapShape, maskMode: 'luminance', maskSize: '190%' },
         { office: australiaOffice, photo: australiaOfficePhoto, role: 'Head Office', mapShape: australiaMapShape, maskMode: 'alpha', maskSize: '150%' },
       ].map(({ office, photo, role, mapShape, maskMode, maskSize }) => (
         <div key={office.id} className="bg-white border border-[#EBE4DC] flex flex-col sm:flex-row overflow-hidden">
           <div
             style={{ backgroundImage: `url(${photo})` }}
             className="relative sm:w-2/5 min-h-[160px] sm:min-h-0 bg-cover bg-center"
           />
           <div className="relative flex-1 p-6 flex flex-col gap-2 overflow-hidden">
             <div
               style={{
                 WebkitMaskImage: `url(${mapShape})`,
                 maskImage: `url(${mapShape})`,
                 WebkitMaskSize: maskSize,
                 maskSize: maskSize,
                 WebkitMaskRepeat: 'no-repeat',
                 maskRepeat: 'no-repeat',
                 WebkitMaskPosition: 'center',
                 maskPosition: 'center',
                 backgroundColor: '#8F533C',
                 ...({ WebkitMaskMode: maskMode, maskMode } as React.CSSProperties),
               }}
               className="absolute right-8 top-1/2 -translate-y-1/2 w-36 h-36 sm:w-40 sm:h-40 opacity-25 pointer-events-none"
             />
             <span className="relative font-sans text-[11px] font-bold tracking-[0.2em] text-[#8F533C] uppercase">
               {office.country}
             </span>
             <h3 className="relative font-serif text-lg text-[#2C2623] font-bold">{role}</h3>
             <p className="relative font-sans text-sm text-[#615751] leading-relaxed">
               {office.id === 'india-factory' ? (
                 <>
                   Industrial Area, Phase II,<br />
                   Hari Nagar,<br />
                   Panipat, Haryana<br />
                   Pin : 132103
                 </>
               ) : office.id === 'australia-office' ? (
                 <>
                   4&amp;5/62 Argyle Street,<br />
                   South Windsor 2756,<br />
                   New South Wales,<br />
                   Sydney
                 </>
               ) : (
                 office.address
               )}
             </p>
             <a
               href={`tel:${(office.id === 'india-factory' ? '+918930009468' : office.id === 'australia-office' ? '+610245108076' : office.phone).replace(/\s/g, '')}`}
               className="relative flex items-center gap-2 font-sans text-sm font-bold text-[#2C2623] hover:text-[#8F533C] mt-1"
             >
               <Phone size={14} />
               {office.id === 'india-factory' ? '+91 89300 09468' : office.id === 'australia-office' ? '+61 02 4510 8076' : office.phone}
             </a>
           </div>
         </div>
       ))}
     </div>
   </section>

   {/* Why Partner With Us */}
   <section className="py-8 sm:py-10 bg-[#FAF8F5]">
     <div className="w-full px-6 sm:px-[80px] flex flex-col items-center text-center gap-2 mb-6 max-w-[1600px] mx-auto">
       <h2 className="font-serif text-2xl sm:text-3xl text-[#2C2623] font-bold tracking-tight uppercase">
         Why Partner With Tanshu Vaidik?
       </h2>
     </div>

     <div className="w-full px-6 sm:px-[80px] grid grid-cols-2 md:grid-cols-5 gap-8 max-w-[1600px] mx-auto text-center divide-x-0 md:divide-x divide-[#EBE4DC]">
       {[
         { icon: Gem, title: 'Premium Quality', desc: 'Crafted with care using natural, sustainable materials.' },
         { icon: Leaf, title: 'Sustainable By Choice', desc: 'Eco-friendly practices woven into every step of our process.' },
         { icon: Users, title: 'Custom Solutions', desc: 'Private label, custom sizes, designs & packaging tailored for you.' },
         { icon: Globe, title: 'Global Experience', desc: 'Exporting to 40+ countries with deep understanding of global markets.' },
         { icon: ShieldCheck, title: 'Trust & Reliability', desc: 'Ethical business, timely delivery & long-term partnerships.' },
       ].map(({ icon: Icon, title, desc }) => (
         <div key={title} className="flex flex-col items-center gap-3 px-4">
           <span className="w-14 h-14 rounded-full border border-[#8F533C] flex items-center justify-center text-[#8F533C]">
             <Icon size={22} />
           </span>
           <h3 className="font-sans text-xs font-bold tracking-widest text-[#2C2623] uppercase">{title}</h3>
           <p className="font-sans text-xs text-[#615751] leading-relaxed">{desc}</p>
         </div>
       ))}
     </div>
   </section>

   {/* CTA Banner */}
   <section className="bg-[#333F27]">
     <div className="w-full px-6 sm:px-[80px] py-6 max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
       <div className="flex items-center gap-4">
         <span className="w-12 h-12 border border-white/30 flex items-center justify-center text-[#D8B88A] shrink-0">
           <IdCard size={22} strokeWidth={1.5} />
         </span>
         <div>
           <h3 className="font-sans text-base font-bold text-white">
             Looking for our latest collections?
           </h3>
           <p className="font-sans text-sm text-white/70">
             Download our catalogue or request product details.
           </p>
         </div>
       </div>

       <div className="flex items-center gap-3 shrink-0">
         <button
           onClick={() => setIsPortalOpen(true)}
           className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/40 text-white hover:bg-white/10 font-sans text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer whitespace-nowrap"
         >
           <Download size={14} />
           Download Catalogue
         </button>
         <button
           onClick={() => setIsPortalOpen(true)}
           className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#F4EFEA] text-[#2C2623] hover:bg-white font-sans text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer whitespace-nowrap"
         >
           <FileText size={14} />
           Request Product Details
         </button>
       </div>
     </div>
   </section>
 </div>
   );
};
