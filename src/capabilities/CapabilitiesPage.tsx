import React from 'react';
import { CapabilitiesHero } from './CapabilitiesHero';
import { CapabilitiesProcess } from './CapabilitiesProcess';
import { CapabilitiesProductStory } from './CapabilitiesProductStory';
import { CapabilitiesInfrastructure } from './CapabilitiesInfrastructure';
import { CapabilitiesWomen } from './CapabilitiesWomen';
import { CapabilitiesGroup } from './CapabilitiesGroup';
import { VideoBanner } from '../components/VideoBanner';

export const CapabilitiesPage: React.FC = () => {
  return (
    <div className="pt-16 sm:pt-[76px] bg-[#FAF8F5]">
      <CapabilitiesHero />
      <CapabilitiesProcess />
      <CapabilitiesProductStory />
      <CapabilitiesInfrastructure />
      <VideoBanner youtubeId="N8M9PQCyIRs" />
      <CapabilitiesWomen />
      <CapabilitiesGroup />
    </div>
  );
};
