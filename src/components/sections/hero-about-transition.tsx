'use client';

import { About } from '@/components/sections/about';
import { Hero } from '@/components/sections/hero';

export function HeroAboutTransition() {
  return (
    <div className="relative">
      <div className="sticky top-0 z-0 h-screen overflow-hidden">
        <Hero />
      </div>

      <div className="relative z-20 -mt-[6vh]">
        <About />
      </div>
    </div>
  );
}