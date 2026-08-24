
import React, { useEffect, useState } from 'react';
import {
  Linkedin,
  Megaphone,
  Settings,
  Users,
  ShieldCheck,
  Truck,
  Calculator,
  HeartHandshake,
  Leaf,
  Globe,
  MapPin,
  Gem,
  PenTool,
} from 'lucide-react';
import nareshPhoto from '../assets/About/ChatGPT Image Jul 24, 2026, 06_29_24 PM.jpg';
import adityaPhoto from '../assets/About/ChatGPT Image Jul 24, 2026, 06_34_15 PM.jpg';
import shubhamPhoto from '../assets/About/ChatGPT Image Jul 24, 2026, 06_32_34 PM.jpg';
import ourTeamPhoto from '../assets/About/ourteam.jpeg';
import deepakPhoto from '../assets/Our Team/Deepak.jpg';
import monuPhoto from '../assets/About/Monu Sharma.jpeg';
import rahatPhoto from '../assets/Our Team/Rahat (1).jpg';
import rahulPhoto from '../assets/Our Team/Rahul Verma (2).jpg';
import vijayPhoto from '../assets/Our Team/Vijay Chugh.jpg';
import { getTeamList } from '../api';

interface Director {
  photo?: string;
  initials: string;
  name: string;
  title: string;
  bio: string;
}

interface ApiTeamMember {
  name: string;
  role?: string;
  designation?: string;
  position?: string;
  photo?: string;
  image?: string;
  thumbnail?: string;
  icon?: string;
  socialIcon?: string;
  linkedin?: string;
  linkedinUrl?: string;
  socialLink?: string;
}

interface TeamMember {
  name: string;
  role: string;
  photo?: string;
  initials: string;
  icon?: string;
  link?: string;
}

const toInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const directors: Director[] = [
  {
    photo: shubhamPhoto,
    initials: 'SK',
    name: 'Shubham Kaushik',
    title: 'Director & Group CEO',
    bio: 'Oversees global marketing strategies, client\nrelationships and brand positioning. With\nextensive experience in international\nmarkets, he ensures Tanshu Vaidik stays\nconnected with evolving customer needs.',
  },
  {
    initials: 'SS',
    name: 'Sheela Sharma',
    title: 'Director',
    bio: 'Ensures seamless execution across the\nsupply chain, production planning and\nquality assurance. Her operational expertise\nstrengthens efficiency and delivery\nexcellence.',
  },
];

interface Founder {
  photo: string;
  name: string;
  title: string;
  bio: string;
}

const founders: Founder[] = [
  {
    photo: nareshPhoto,
    name: 'Naresh Kumar Kaushik',
    title: 'Co-Founder & Managing Director',
    bio: 'Leads the overall vision, strategy and global business development initiatives. Passionate about driving innovation, building strong partnerships and creating sustainable growth for the company.',
  },
  {
    photo: adityaPhoto,
    name: 'Aditya Kush',
    title: 'Co-Founder & Director',
    bio: 'Oversees operations, production and product development with a strong focus on quality, craftsmanship and continuous improvement. Also looks after the department of marketing.',
  },
];



const values = [
  {
    icon: Users,
    title: 'People First',
    desc: 'We value our people and foster a culture of respect, trust and growth.',
  },
  {
    icon: HeartHandshake,
    title: 'Empowered Artisans',
    desc: 'We work hand-in-hand with artisans, especially women, to preserve heritage and create sustainable livelihoods.',
  },
  {
    icon: Leaf,
    title: 'Sustainable Future',
    desc: 'Every decision we make is guided by our commitment to the planet and future generations.',
  },
  {
    icon: Globe,
    title: 'Global Partnerships',
    desc: 'We build long-term relationships with global partners based on transparency, quality and reliability.',
  },
];

const InitialsAvatar: React.FC<{ initials: string; className?: string }> = ({ initials, className }) => (
  <div
    className={`bg-gradient-to-br from-[#D8B88A] to-[#8F533C] text-white font-serif font-bold flex items-center justify-center shrink-0 ${className ?? ''}`}
  >
    {initials}
  </div>
);

const SectionLabel: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex items-center gap-4 w-full mb-4">
    <span className="h-px flex-1 bg-[#8F533C]/40" />
    <span className="font-sans text-[13px] sm:text-sm font-bold tracking-[0.3em] text-[#8F533C] uppercase whitespace-nowrap">
      {label}
    </span>
    <span className="h-px flex-1 bg-[#8F533C]/40" />
  </div>
);
// Api team member
export const AboutTeam: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    let cancelled = false;

    const fetchTeam = async () => {
      try {
        const res = await getTeamList();
        const list: ApiTeamMember[] = res?.data?.data ?? [];

        if (!cancelled) {
          setTeamMembers(
            list.map((item) => ({
              name: item.name,
              role: item.role ?? item.designation ?? item.position ?? '',
              photo: item.photo ?? item.image ?? item.thumbnail,
              initials: toInitials(item.name ?? ''),
              icon: item.icon ?? item.socialIcon,
              link: item.linkedin ?? item.linkedinUrl ?? item.socialLink,
            }))
          );
        }
      } catch (error) {
        console.error('Team API Error:', error);
      }
    };

    fetchTeam();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      {/* Founders */}
      <section id="about-team" className="pt-25 sm:pt-8 pb-6 sm:pb-4 bg-[#FAF8F5]">
        <div className="w-full px-6 sm:px-10 lg:px-20 flex flex-col items-center text-center gap-3 mb-8">
          <SectionLabel label="Founders" />
          <h2 className="font-serif text-5xl sm:text-6xl text-[#2C3A4D] font-medium tracking-tight">
            The Vision Behind Tanshu Vaidik
          </h2>
        </div>

        <div className="w-full px-6 sm:px-10 lg:px-20 grid grid-cols-1 lg:grid-cols-[0.85fr_1.6fr_0.85fr] gap-3 lg:gap-8 lg:items-stretch">
          <div className="order-3 lg:order-1 flex flex-col gap-6 font-sans text-base text-[#615751] leading-relaxed">
            <p style={{ textAlign: 'justify' }}>
              Tanshu Vaidik was founded on the belief that traditional craftsmanship, when combined
              with contemporary design and ethical practices, can create products that enhance lives
              across the globe.
            </p>
            <p style={{ textAlign: 'justify' }}>
              Our founders bring together a shared vision of sustainability, quality and empowerment —
              building a brand that supports artisans and delivers excellence to our partners
              worldwide.
            </p>
          </div>

          <div className="order-1 lg:order-2 rounded-2xl overflow-hidden aspect-2212/1557 flex shadow-sm lg:self-start">
            <img src={ourTeamPhoto} alt="Tanshu Vaidik founders" className="w-full h-full object-cover" />
          </div>

          <div className="order-2 lg:order-3 flex flex-col gap-3">
            {founders.map((f) => (
              <div key={f.name}>
                <h3 className="font-sans text-base font-bold tracking-wider text-[#8F533C] uppercase">
                  {f.name}
                </h3>
                <span className="font-sans text-base text-[#2C2623] font-semibold">{f.title}</span>
                <span className="block w-8 h-px bg-[#8F533C]/40 my-2" />
                <p className="font-sans text-base text-[#615751] leading-relaxed">{f.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Directors */}
      <section className="pt-14 sm:pt-10 pb-6 sm:pb-4 bg-[#FAF8F5]">
        <div className="w-full px-6 sm:px-10 lg:px-20 flex flex-col items-center text-center gap-3 mb-10">
          <SectionLabel label="Directors" />
        </div>

        <div className="w-full px-6 sm:px-10 lg:px-20 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
          {directors.map((d) => (
            <div key={d.name} className="flex gap-8 items-start text-left">
              {d.photo ? (
                <img
                  src={d.photo}
                  alt={d.name}
                  className="w-47.5 h-56.25 rounded-xl object-cover shrink-0"
                />
              ) : (
                <InitialsAvatar initials={d.initials} className="w-47.5 h-56.25 rounded-xl text-3xl" />
              )}
              <div className="flex flex-col gap-2">
                <h3 className="font-sans text-base font-bold tracking-wider text-[#8F533C] uppercase">
                  {d.name}
                </h3>
                <span className="font-sans text-base text-[#2C2623] font-semibold">{d.title}</span>
                <span className="block w-8 h-px bg-[#8F533C]/40" />
                <p className="font-sans text-lg text-[#615751] leading-relaxed">
                  {d.bio.split('\n').map((line, i, arr) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < arr.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
                <a
                  href="#"
                  className="w-8 h-8 rounded bg-[#2C2623] hover:bg-[#8F533C] text-white flex items-center justify-center transition-colors"
                >
                  <Linkedin size={15} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Team */}
      <section className="py-14 sm:py-10 bg-[#FAF8F5]">
        <div className="w-full px-6 sm:px-10 lg:px-20 flex flex-col items-center text-center gap-3 mb-10">
          <SectionLabel label="Our Team" />
        </div>

        <div className="w-full px-6 sm:px-10 lg:px-20 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-5">
          {teamMembers.map((m) => (
            <div
              key={m.name}
              className="bg-[#F4EFEA] rounded-2xl overflow-hidden flex flex-col items-center text-center shadow-sm"
            >
              {m.photo ? (
                <img src={m.photo} alt={m.name} className="w-full aspect-3/4 object-cover" />
              ) : (
                <InitialsAvatar initials={m.initials} className="w-full aspect-3/4 text-3xl" />
              )}
              <div className="p-3 flex flex-col items-center gap-1">
                <h3 className="font-sans text-sm font-bold text-[#8F533C] uppercase tracking-wide">
                  {m.name}
                </h3>
                <span className="font-sans text-xs text-[#615751]">{m.role}</span>
                {(m.icon || m.link) && (
                  <a
                    href={m.link || undefined}
                    target={m.link ? '_blank' : undefined}
                    rel={m.link ? 'noopener noreferrer' : undefined}
                    className="mt-1 w-7 h-7 rounded bg-[#2C2623] hover:bg-[#8F533C] text-white flex items-center justify-center transition-colors overflow-hidden"
                  >
                    {m.icon ? (
                      <img src={m.icon} alt="" className="w-3.5 h-3.5 object-contain" />
                    ) : (
                      <Linkedin size={13} />
                    )}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-10 sm:py-12 bg-[#EBE4DC]/40 border-t border-[#E4DACB]">
        <div className="w-full px-6 sm:px-10 lg:px-20 grid grid-cols-2 sm:grid-cols-4 gap-10 sm:divide-x sm:divide-[#D8CFC4]">
          {values.map((v) => (
            <div key={v.title} className="flex items-start text-left gap-3 sm:px-4">
              <v.icon size={34} className="text-[#8F533C] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-sans text-xs font-bold text-[#2C2623] uppercase tracking-wide">
                  {v.title}
                </h3>
                <p className="font-sans text-[11px] text-[#615751] leading-relaxed mt-1">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Banner */}
      <section className="relative bg-[#2C2623] overflow-hidden">
        <div className="w-full px-6 sm:px-10 lg:px-20 py-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="w-11 h-11 rounded-full border border-[#D8B88A]/40 flex items-center justify-center text-[#D8B88A] shrink-0">
              <Gem size={20} strokeWidth={1.5} />
            </span>
            <div className="text-left">
              <h3 className="font-serif text-lg text-white font-semibold tracking-tight">
                Tanshu Vaidik
              </h3>
              <p className="font-sans text-[11px] text-white/60 tracking-[0.15em] uppercase">
                Crafted For Living. Designed For The World.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2 text-white/80">
              <MapPin size={16} className="text-[#D8B88A] shrink-0" />
              <span className="font-sans text-sm">Panipat, India (Head Office &amp; Manufacturing)</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Globe size={16} className="text-[#D8B88A] shrink-0" />
              <span className="font-sans text-sm">Exporting to 40+ Countries</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
