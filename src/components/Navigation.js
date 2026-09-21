'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const links = [
  { label: 'Accueil', href: '#hero' },
  { label: 'À propos', href: '#about' },
  { label: 'Compétences', href: '#skills' },
  { label: 'Projets', href: '#projects' },
  { label: 'Expérience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = links.map(l => document.querySelector(l.href));
      const mid = window.scrollY + window.innerHeight / 3;
      sections.forEach((el, i) => {
        if (el && el.offsetTop <= mid) setActive(links[i].href);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav ref={navRef} style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        height: 'var(--nav-h)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 clamp(20px,4vw,60px)',
        transition: 'background 0.4s, backdrop-filter 0.4s, border-color 0.4s',
        background: scrolled ? 'rgba(2,4,9,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}>
        {/* Logo */}
        <a href="#hero" style={{ display:'flex', alignItems:'center', gap:8, flex:'0 0 auto' }}>
          <span style={{
            width:32, height:32, borderRadius:'50%',
            background:'linear-gradient(135deg,var(--cyan),var(--violet))',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:13, fontWeight:700, color:'#000',
            boxShadow:'0 0 20px rgba(0,229,255,0.4)',
          }}>RN</span>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:13, color:'var(--white-80)', letterSpacing:'0.05em' }}>
            ralphon<span style={{ color:'var(--cyan)' }}>.dev</span>
          </span>
        </a>

        {/* Center links — desktop */}
        <ul style={{
          display:'flex', gap:4, listStyle:'none',
          margin:'0 auto',
        }} className="nav-links">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} style={{
                padding:'8px 16px',
                borderRadius:100,
                fontSize:14,
                fontWeight:500,
                color: active === l.href ? 'var(--white)' : 'var(--white-60)',
                background: active === l.href ? 'rgba(255,255,255,0.08)' : 'transparent',
                transition:'all 0.25s',
                display:'block',
              }}
              onMouseEnter={e => e.currentTarget.style.color='var(--white)'}
              onMouseLeave={e => e.currentTarget.style.color = active===l.href?'var(--white)':'var(--white-60)'}
              >{l.label}</a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a href="#contact" className="btn btn-primary" style={{ padding:'10px 22px', fontSize:13, flexShrink:0 }}>
          Me contacter
        </a>

        {/* Hamburger */}
        <button
          aria-label="Menu"
          onClick={() => setMenuOpen(o => !o)}
          style={{ display:'none', flexDirection:'column', gap:5, padding:8, marginLeft:12 }}
          className="hamburger"
        >
          {[0,1,2].map(i => (
            <span key={i} style={{
              display:'block', width:22, height:2,
              background:'var(--white)',
              borderRadius:2,
              transition:'all 0.3s',
              transformOrigin:'center',
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      <div style={{
        position:'fixed', inset:0, zIndex:999,
        background:'rgba(2,4,9,0.95)',
        backdropFilter:'blur(24px)',
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:8,
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition:'transform 0.4s var(--ease-out)',
      }}>
        {links.map(l => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{
            fontSize:'clamp(1.5rem,5vw,2.5rem)',
            fontWeight:700,
            color: active===l.href ? 'var(--cyan)' : 'var(--white)',
            padding:'12px 0',
            transition:'color 0.2s',
          }}>{l.label}</a>
        ))}
        <a href="#contact" className="btn btn-primary" style={{ marginTop:24 }} onClick={() => setMenuOpen(false)}>
          Me contacter
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
          nav > a[href="#contact"].btn { display: none; }
        }
      `}</style>
    </>
  );
}
