import { About } from '@/components/sections/about';
import { Approach } from '@/components/sections/approach';
import { Contact } from '@/components/sections/contact';
import { FeaturedWork } from '@/components/sections/featured-work';
import { Hero } from '@/components/sections/hero';
import { Toolkit } from '@/components/sections/toolkit';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedWork />
      <Approach />
      <Toolkit />
      <Contact />
    </>
  );
}
