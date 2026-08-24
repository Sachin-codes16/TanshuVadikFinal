import React, { useState } from 'react';
import { AboutHero, AboutTab } from './AboutHero';
import { AboutIntro } from './AboutIntro';
import { AboutStats } from './AboutStats';
import { AboutVisionMission } from './AboutVisionMission';
import { AboutBusiness } from './AboutBusiness';
import { AboutTeam } from './AboutTeam';

const ComingSoon: React.FC<{ title: string }> = ({ title }) => (
  <section className="py-24 bg-[#FAF8F5]">
    <div className="w-full px-[20px] flex flex-col items-center text-center gap-3">
      <h3 className="font-serif text-2xl sm:text-3xl text-[#2C2623] font-medium uppercase tracking-tight">
        {title}
      </h3>
      <p className="font-sans text-sm text-[#615751]">This section is coming soon.</p>
    </div>
  </section>
);

export const AboutPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AboutTab>('about');

  return (
    <div className="pt-16 sm:pt-[76px]">
      <AboutHero activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'about' && (
        <>
          <AboutIntro />
          <AboutStats />
          <AboutVisionMission />
        </>
      )}

      {activeTab === 'business' && <AboutBusiness />}
      {activeTab === 'team' && <AboutTeam />}
    </div>
  );
};
