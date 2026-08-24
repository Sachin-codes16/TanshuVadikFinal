import React from 'react';
import { SustainabilityHero } from './SustainabilityHero';
import { SustainabilityValues } from './SustainabilityValues';
import { SustainabilityApproach } from './SustainabilityApproach';
import { SustainabilityMaterials } from './SustainabilityMaterials';
import { SustainabilityCertifications } from './SustainabilityCertifications';
import { SustainabilityPromise } from './SustainabilityPromise';

export const SustainabilityPage: React.FC = () => {
  return (
    <div className="pt-16 sm:pt-[76px] bg-[#FAF8F5]">
      <SustainabilityHero />
      <SustainabilityValues />
      <SustainabilityApproach />
      <SustainabilityMaterials />
      <SustainabilityCertifications />
      <SustainabilityPromise />
    </div>
  );
};
