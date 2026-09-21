'use client';
import { useReveal } from './useReveal';
import { useScrollParallax } from './useScrollParallax';
import SolarSystemSkills from './SolarSystemSkills';

export default function SkillsSection() {
  const ref = useReveal();
  const videoParallax = useScrollParallax(0.14);

  return (
    <section id="skills" className="section" ref={ref} style={{ position: 'relative', overflow: 'hidden', paddingLeft: 0, paddingRight: 0, paddingTop: '4rem', paddingBottom: '4rem' }}>
      {/* Background Video with Parallax & Smooth Fade Transitions */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        transform: `translateY(${videoParallax * 0.4}px)`,
        transition: 'transform 0.1s ease-out',
      }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{ width: '100%', height: '120%', objectFit: 'cover', opacity: 0.38 }}
        >
          <source src="/videos/video3.mp4" type="video/mp4" />
        </video>
        
        {/* Smooth Top, Center & Bottom Overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, #020409 0%, rgba(2,4,9,0.4) 15%, rgba(2,4,9,0.4) 85%, #020409 100%)',
        }} />
      </div>

      {/* Header Container */}
      <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: 1380, marginBottom: 24, paddingLeft: 24, paddingRight: 24 }}>
        <div className="label reveal" style={{ marginBottom: 16 }}>02 / Compétences</div>
        <div className="divider reveal" />
        <h2 className="headline-lg reveal" style={{ marginBottom: 12 }}>
          Système Solaire des <span className="text-gradient">Compétences</span>
        </h2>
        <p className="body-lg reveal reveal-delay-1" style={{ maxWidth: 780 }}>
          Chaque planète en orbite représente une technologie clé de mon univers. Faites glisser le curseur pour pivoter le système solaire sous tous les angles 3D (orientations latérale et verticale), ou cliquez sur une planète pour l'examiner.
        </p>
      </div>

      {/* Borderless Solar System Scene */}
      <div className="reveal reveal-delay-2" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <SolarSystemSkills />
      </div>
    </section>
  );
}
