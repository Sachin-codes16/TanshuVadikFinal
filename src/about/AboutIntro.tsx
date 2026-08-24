import { AlignJustify } from 'lucide-react';
import React from 'react';

const weavingImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDAgdEoJ388LYmLORQcLJNBrO3JtaR3-S-DyJB-hesRiPrvyrIBm3_Cqb38k7mKj2EL0pYUdsloUVvN4WdPpZWo9GZVnRHlX51HXdVSY-ydP7t7UClRXp7DjFvdEPaCWp_CGrPBwJ3xqhwzOkTDpMhJ_LAuHEHZ3-GHXbegT5K1Huu4T_Usb0AHedf-Jhy7xjAIyVHmGlCuWr4IJeOtxKvCjTjIB67dRkDAa-f1T9inhnqi6avKF6UvjAEBV5zzqkY7LLLmgv3-KVQ';

export const AboutIntro: React.FC = () => {
  return (
    <section id="about-intro" className="py-14 sm:py-16 bg-[#FAF8F5]">
      <div className="w-full px-[20px] grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div className="flex flex-col gap-4" style={{ textAlign: 'justify' }}>
          <span className="font-sans text-[11px] font-bold tracking-[0.3em] text-[#8F533C] uppercase">
            OUR STORY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2C2623] font-medium tracking-tight uppercase">
            About Tanshu Vaidik
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#615751] leading-relaxed">
            Every journey begins with a vision. Ours began when Naresh Kumar founded Tanshu Group in
            Sydney—built on precision, discipline, and a commitment to engineering excellence. What started
            with a single laser cutter and CNC press brake soon evolved into something far greater—a
            foundation for a global enterprise.
          </p>
          <p className="font-sans text-xs sm:text-sm text-[#615751] leading-relaxed">
            With growth came clarity of purpose. Tanshu expanded into specialised verticals—Metal Products,
            Machinery Solutions, and Robotics &amp; Automation—each defined by expertise, innovation, and
            performance. Over the years, the Group established a strong global footprint, exporting
            machinery across continents and delivering solutions shaped by international standards.
          </p>
          <p className="font-sans text-xs sm:text-sm text-[#615751] leading-relaxed">
            As the vision expanded, so did its horizons. The establishment of Tanshu Vaidik India Pvt. Ltd.
            marked a new chapter—bringing the Group's engineering mindset into the world of textiles and
            home furnishings. Rooted in Panipat, India's textile capital, Tanshu Vaidik was created to
            merge traditional craftsmanship with modern precision. Today, with a corporate office and
            multiple manufacturing facilities, Tanshu Vaidik delivers thoughtfully crafted products to
            markets across Europe, the United States, Australia, and beyond. Each piece reflects a balance
            of design, durability, and detail—shaped for contemporary living.
          </p>
          <p className="font-sans text-xs sm:text-sm text-[#615751] leading-relaxed">
            The journey did not stop there. From expanding into renewable energy to building advanced
            manufacturing capabilities in Northern India, and strengthening global logistics through its
            freight forwarding network, the Tanshu Group continues to evolve—quietly, confidently, and with
            purpose.
          </p>
          <p className="font-sans text-xs sm:text-sm text-[#615751] leading-relaxed">
            Yet, at its core, the philosophy remains unchanged:
            <br />
            To create with intention.
            <br />
            To deliver with precision.
            <br />
            To grow with integrity.
          </p>
          <p className="font-sans text-xs sm:text-sm text-[#615751] leading-relaxed">
            We stand today as a reflection of this journey—where heritage, engineering, and global vision
            come together to shape the future of modern living.
          </p>
        </div>

        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <img
            src={weavingImage}
            alt="Artisan hands weaving on a handloom"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </section>
  );
};
