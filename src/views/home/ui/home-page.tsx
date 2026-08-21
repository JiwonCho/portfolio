import { AboutSection } from '@/widgets/about';
import { ContactSection } from '@/widgets/contact';
import { ExperienceSection } from '@/widgets/experience';
import { HeroSection } from '@/widgets/hero';
import { ProjectsSection } from '@/widgets/projects';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </>
  );
}
