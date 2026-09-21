'use client';
import { useReveal } from './useReveal';
import { useScrollParallax } from './useScrollParallax';
import AsciiPortrait from './AsciiPortrait';
import KaliTerminal from './KaliTerminal';

export default function AboutSection() {
  const ref = useReveal();
  const parallax = useScrollParallax(0.12);

  return (
    <section id="about" className="section" ref={ref} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background Parallax Ambient Glow Orb */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '-10%',
        width: 600,
        height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 229, 255, 0.08) 0%, rgba(124, 58, 237, 0.04) 50%, transparent 70%)',
        transform: `translateY(${parallax * 0.8}px)`,
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: 1440, paddingLeft: 'clamp(16px, 4vw, 48px)', paddingRight: 'clamp(16px, 4vw, 48px)' }}>
        {/* Section label */}
        <div className="label reveal" style={{ marginBottom: 16 }}>01 / À propos</div>
        <div className="divider reveal" />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'clamp(260px, 25%, 360px) 1fr',
          gap: 'clamp(32px, 4vw, 64px)',
          alignItems: 'start',
        }} className="about-grid">
          
          {/* Left: ASCII Particle Portrait with Parallax Lift */}
          <div className="reveal" style={{
            position: 'relative',
            justifySelf: 'center',
            width: '100%',
            transform: `translateY(${parallax * 0.3}px)`,
            transition: 'transform 0.1s ease-out',
          }}>
            <div style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <AsciiPortrait />
            </div>

            {/* Badge */}
            <div className="glass-card" style={{
              position: 'absolute',
              bottom: 12,
              right: 12,
              padding: '10px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              whiteSpace: 'nowrap',
              zIndex: 10,
              backdropFilter: 'blur(16px)',
            }}>
              <span style={{ fontSize: 20 }}>🌍</span>
              <div>
                <div style={{ fontSize: 11, color: 'var(--white-60)' }}>Basé à</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Cameroun</div>
              </div>
            </div>
          </div>

          {/* Right: Text Content & Kali Terminal */}
          <div style={{ width: '100%' }}>
            {/* Title stretched across right side */}
            <h2 className="headline-lg reveal" style={{ marginBottom: 24, lineHeight: 1.2, maxWidth: '100%' }}>
              Ingénieur Logiciel &amp; Apprenant en Cybersécurité{' '}
              <span className="text-gradient" style={{ whiteSpace: 'nowrap' }}>passionné</span>
            </h2>

            {/* Kali Linux Terminal Container with Progressive Typewriter Animation */}
            <div className="reveal reveal-delay-1" style={{ marginBottom: 32, width: '100%' }}>
              <KaliTerminal />
            </div>

            {/* Info grid */}
            <div className="reveal reveal-delay-3" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 16,
              marginBottom: 36,
              width: '100%',
            }}>
              {[
                { icon: '🎓', label: 'Formation', value: 'Licence Cybersécurité' },
                { icon: '🛡️', label: 'Spécialité', value: 'Web, Mobile & Security' },
                { icon: '💼', label: 'Disponibilité', value: 'Ouvert aux opportunités' },
                { icon: '🌐', label: 'Langues', value: 'Français · Anglais' },
              ].map(item => (
                <div key={item.label} className="glass-card" style={{ padding: '16px 20px', borderRadius: 16 }}>
                  <div style={{ fontSize: 22, marginBottom: 6 }}>{item.icon}</div>
                  <div style={{ fontSize: 11, color: 'var(--white-60)', marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--white)' }}>{item.value}</div>
                </div>
              ))}
            </div>

            <div className="reveal reveal-delay-4" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a href="#contact" className="btn btn-primary">Travaillons ensemble</a>
              <a href="/CV_Nkada_Ralphon_Justin_2026.pdf" download className="btn btn-ghost">Télécharger CV PDF</a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
