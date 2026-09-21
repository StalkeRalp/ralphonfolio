'use client';
import { useEffect, useRef, useState } from 'react';
import { useReveal } from './useReveal';

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useReveal();
  const titleRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Typewriter effect
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const words = ['Développeur Front-end', 'Apprenant en Cybersécurité', 'Architecte Logiciel', 'Mobile Engineer & Pentester'];
  useEffect(() => {
    let i = 0;
    let deleting = false;
    const currentWord = words[wordIdx];
    const interval = setInterval(() => {
      if (!deleting) {
        setText(currentWord.slice(0, i + 2));
        i++;
        if (i === currentWord.length) { deleting = true; clearInterval(interval); setTimeout(() => {
          const del = setInterval(() => {
            setText(prev => prev.slice(0,-1));
            if (text.length <= 1) { clearInterval(del); setWordIdx(w => (w+1)%words.length); }
          }, 40);
        }, 2000); }
      }
    }, 70);
    return () => clearInterval(interval);
  }, [wordIdx]);

  const parallax = scrollY * 0.4;

  return (
    <section id="hero" ref={sectionRef} style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      overflow: 'hidden',
      padding: 'var(--nav-h) 20px 60px',
    }}>
      {/* Hero BG video with parallax */}
      <div style={{
        position: 'absolute', inset: 0,
        transform: `translateY(${parallax}px)`,
        transition: 'transform 0.1s linear',
        zIndex: 0,
      }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
        >
          <source src="/videos/video5.mp4" type="video/mp4" />
        </video>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(2,4,9,0.3) 0%, rgba(2,4,9,0.1) 50%, rgba(2,4,9,0.95) 100%)',
        }} />
      </div>

      {/* Content */}
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Label */}
        <div className="label reveal" style={{ marginBottom: 20, animationDelay:'0.1s' }}>
          🚀 &nbsp; Bienvenue dans mon univers
        </div>

        {/* Main name */}
        <h1 className="headline-xl reveal" style={{ marginBottom: 12, lineHeight: 1 }}>
          <span className="text-gradient">Ralphon Justin</span>
          <br />
          <span style={{ color: 'var(--white)' }}>Nkada Mbatonga</span>
        </h1>

        {/* Typewriter */}
        <div className="reveal reveal-delay-1" style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
          color: 'var(--cyan)',
          height: '2em',
          marginBottom: 24,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4,
        }}>
          <span>{text}</span>
          <span style={{
            display: 'inline-block',
            width: 2,
            height: '1.1em',
            background: 'var(--cyan)',
            animation: 'blink 1s step-end infinite',
          }} />
        </div>

        {/* Subtitle */}
        <p className="body-lg reveal reveal-delay-2" style={{ maxWidth: 600, margin: '0 auto 40px' }}>
          Je conçois des expériences numériques immersives et des architectures
          logicielles robustes — de la terre jusqu'aux étoiles.
        </p>

        {/* CTAs */}
        <div className="reveal reveal-delay-3" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#projects" className="btn btn-primary">
            <span>Voir mes projets</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="/CV_Nkada_Ralphon_Justin_2026.pdf" download className="btn btn-ghost">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v8M5 7l3 3 3-3M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Télécharger CV
          </a>
        </div>

        {/* Stats row */}
        <div className="reveal reveal-delay-4" style={{
          display: 'flex',
          gap: 'clamp(24px, 4vw, 60px)',
          justifyContent: 'center',
          marginTop: 72,
          flexWrap: 'wrap',
        }}>
          {[
            { num: '3+', label: 'Ans d\'expérience' },
            { num: '20+', label: 'Projets livrés' },
            { num: '5+', label: 'Technologies' },
            { num: '∞', label: 'Passion' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div className="headline-md text-gradient" style={{ lineHeight: 1 }}>{s.num}</div>
              <div className="body-md" style={{ fontSize: 13, marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: 32,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        opacity: scrollY > 100 ? 0 : 1,
        transition: 'opacity 0.4s',
        zIndex: 1,
      }}>
        <span className="label" style={{ fontSize: 10 }}>SCROLL</span>
        <div style={{
          width: 22,
          height: 36,
          border: '1.5px solid rgba(255,255,255,0.2)',
          borderRadius: 12,
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 6,
        }}>
          <div style={{
            width: 3,
            height: 8,
            background: 'var(--cyan)',
            borderRadius: 2,
            animation: 'scrollDot 1.5s ease-in-out infinite',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes scrollDot {
          0%{transform:translateY(0);opacity:1}
          100%{transform:translateY(12px);opacity:0}
        }
      `}</style>
    </section>
  );
}
