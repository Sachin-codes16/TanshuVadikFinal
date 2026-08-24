import React from "react";
import { ArrowRight } from "lucide-react";

import academy from "./Academy.png";
import metal from "./Metal.png";
import robotics from "./Robotics.png";
import vaidik from "./Vaidik.png";
import green from "./Green.png";
import navi from "./Navi.png";

const logos = [metal, academy, robotics, vaidik, green, navi];

export const CapabilitiesGroup: React.FC = () => {
  return (
    <section className="bg-[#F4EFEA]">
      <div className="w-full px-6 sm:px-[80px]">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-10 items-stretch">

          {/* Left Content */}
          <div className="py-6 lg:py-8 flex flex-col justify-center items-start">
            <span className="font-sans text-xs font-bold tracking-[3px] uppercase text-[#8F533C]">
              The Tanshu Group
            </span>

            <h2 className="font-serif text-4xl text-[#2C2623] mt-1 mb-6">
              One Group.
              <br />
              Many Strengths.
            </h2>

            <a
              href="https://www.tanshuaustralia.com.au/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 border border-[#8F533C] text-[#8F533C] hover:bg-[#8F533C] hover:text-white transition-all duration-300 uppercase tracking-[2px] font-semibold text-sm"
            >
              Explore The Group
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Right Logos */}
          <div className="grid grid-cols-6 bg-white w-full h-full">
            {logos.map((logo, index) => (
              <div
                key={index}
                className={`flex items-center justify-center p-2 border-[#EBE4DC] ${
                  index !== logos.length - 1 ? 'border-r' : ''
                }`}
              >
                <img
                  src={logo}
                  alt=""
                  className={`w-auto max-w-full object-contain ${
                    index === 4 ? 'max-h-44' : 'max-h-36'
                  }`}
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};