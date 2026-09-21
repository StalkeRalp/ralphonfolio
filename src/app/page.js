'use client';
import Preloader from '@/components/Preloader';
import StarField from '@/components/StarField';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      {/* Full-screen initial loader screen */}
      <Preloader />

      {/* Persistent animated starfield background */}
      <StarField />

      {/* Sticky navigation */}
      <Navigation />

      {/* Main content */}
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
