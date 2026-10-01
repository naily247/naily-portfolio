import { Experience } from '@/components/sections/experience';
import { HeroAboutTransition } from '@/components/sections/hero-about-transition';
import { MoreProjects } from '@/components/sections/more-projects';
import { ToolkitContactTransition } from '@/components/sections/toolkit-contact-transition';
import { WorkThemeTransition } from '@/components/sections/work-theme-transition';
import { CommandMenu } from '@/components/ui/command-menu';
import { PortfolioTelemetry } from '@/components/ui/portfolio-telemetry';

export default function HomePage() {
  return (
    <>
      <PortfolioTelemetry />
      <CommandMenu />

      <HeroAboutTransition />
      <WorkThemeTransition />
      <MoreProjects />
      <Experience />
      <ToolkitContactTransition />
    </>
  );
}