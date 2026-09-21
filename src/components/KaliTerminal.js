'use client';
import React, { useState, useEffect, useRef } from 'react';

const bioParagraphs = [
  "Je suis Nkada Ralphon Justin, Titulaire d'une Licence professionnelle en Cybersécurité et développeur Front-end web & mobile, je conçois des applications Android et web modernes, sécurisées et orientées utilisateur. Je maîtrise le cycle de développement complet : architecture, UI/UX, intégration d'API REST, Firebase/Supabase, authentification, géolocalisation, notifications, stockage local et paiements.",
  "Ma formation en cybersécurité m'a permis de pratiquer l'audit et le pentest (tests d'intrusion, recherche de vulnérabilités), la sécurité des applications web selon les référentiels OWASP, ainsi que des notions de cryptographie. J'utilise des outils comme Burp Suite, Nmap, Wireshark, Metasploit et Kali Linux pour analyser, tester et sécuriser des systèmes et applications.",
  "Cette double compétence me permet d'intégrer la sécurité dès la conception : gestion rigoureuse des authentifications, protection des données sensibles, prévention des failles courantes (injections, XSS, CSRF) et réduction de la surface d'attaque des applications que je développe.",
  "Rigoureux, autonome et orienté résultats, je transforme les besoins métiers en solutions fiables, maintenables et sécurisées.",
  "Curieux et autodidacte, j'explore constamment de nouvelles technologies — des architectures cloud jusqu'aux interfaces 3D immersives — pour repousser les limites de ce qui est possible dans le numérique."
];

export default function KaliTerminal() {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef(null);

  // Full text concatenated with line breaks
  const fullText = bioParagraphs.join("\n\n");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
          setIsTyping(true);
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!isTyping) return;

    let idx = 0;
    const speed = 12; // ms per char for smooth fast typing

    const interval = setInterval(() => {
      if (idx < fullText.length) {
        setDisplayedText(fullText.slice(0, idx + 1));
        idx++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [isTyping, fullText]);

  const handleSkip = () => {
    setDisplayedText(fullText);
    setIsTyping(false);
  };

  return (
    <div
      ref={containerRef}
      className="glass-card"
      style={{
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid rgba(0, 255, 170, 0.25)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 255, 170, 0.08)',
        background: 'rgba(5, 10, 18, 0.92)',
        fontFamily: 'var(--font-mono), monospace',
        width: '100%',
      }}
    >
      {/* Kali Window Top Bar */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.95)',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}>
        {/* Buttons */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#eab308', display: 'inline-block' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
        </div>

        {/* Title */}
        <div style={{ fontSize: 12, color: 'var(--white-60)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: '#22c55e' }}>⚡</span>
          <span>root@kali-linux:~ /etc/ralphon_bio.sh</span>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {isTyping && (
            <button
              onClick={handleSkip}
              style={{
                background: 'rgba(0, 229, 255, 0.15)',
                border: '1px solid rgba(0, 229, 255, 0.3)',
                color: 'var(--cyan)',
                fontSize: 11,
                padding: '2px 8px',
                borderRadius: 4,
                cursor: 'pointer',
              }}
            >
              ⏩ Afficher tout
            </button>
          )}
          <span style={{ fontSize: 11, color: '#22c55e', fontWeight: 600 }}>[SEC_OK]</span>
        </div>
      </div>

      {/* Terminal Content */}
      <div style={{
        padding: '20px 24px',
        fontSize: 'clamp(0.88rem, 1vw, 0.98rem)',
        lineHeight: 1.7,
        color: '#e2e8f0',
        minHeight: 280,
      }}>
        {/* Prompt Command */}
        <div style={{ marginBottom: 16, color: '#38bdf8' }}>
          <span style={{ color: '#22c55e', fontWeight: 700 }}>kali@ralphon-cyber</span>
          <span style={{ color: '#94a3b8' }}>:</span>
          <span style={{ color: '#38bdf8' }}>~</span>
          <span style={{ color: '#a855f7' }}>#</span>{' '}
          <span style={{ color: '#facc15' }}>cat</span> /var/log/profile_bio.sec
        </div>

        {/* Printed Text */}
        <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: 'var(--white-90)' }}>
          {displayedText}
          {isTyping && (
            <span style={{
              display: 'inline-block',
              width: 8,
              height: 16,
              background: '#22c55e',
              marginLeft: 4,
              verticalAlign: 'middle',
              animation: 'blink 0.8s step-end infinite',
            }} />
          )}
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </div>
  );
}
