'use client';
import { useState } from 'react';
import { useReveal } from './useReveal';
import { useScrollParallax } from './useScrollParallax';

// Row 1 Projects (Web Apps, Admin Dashboards & Mobile Apps)
const projectsRow1 = [
  {
    id: 1,
    title: 'ITexal Admin Portal',
    category: 'WEB APP',
    subtitle: 'RBAC & NestJS Backend',
    desc: 'Portail d\'administration full-stack avec RBAC multi-rôles, authentification JWT sécurisée, gestion des marques et reporting analytique en temps réel.',
    rating: 4.9,
    reviews: 48,
    stat: '+1.2k req/s',
    tag: 'Next.js · NestJS · Supabase',
    color: '#00e5ff',
    icon: '🛡️',
    links: { github: 'https://github.com/StalkeRalp', live: '#' },
    specs: ['NestJS Backend', 'JWT Auth & RBAC', 'Supabase RLS', 'Jest Test Coverage'],
  },
  {
    id: 2,
    title: 'Kouture Manager',
    category: 'ADMIN DASHBOARD',
    subtitle: 'Marketplace Mode & KPIs',
    desc: 'Command center d\'administration pour marketplace de mode avec messagerie temps réel Supabase, gestion des vendeurs et tableaux de bord analytiques.',
    rating: 5.0,
    reviews: 34,
    stat: '+450 vendeurs',
    tag: 'React · Supabase · WebSockets',
    color: '#a78bfa',
    icon: '👗',
    links: { github: 'https://github.com/StalkeRalp', live: '#' },
    specs: ['Realtime Chat', 'KPI Analytics', 'Seller Moderation', 'Order Pipeline'],
  },
  {
    id: 3,
    title: 'Agriwatch Monitoring',
    category: 'DESKTOP APP',
    subtitle: 'Surveillance Agricole IoT',
    desc: 'Système de supervision agricole en temps réel avec interface Java Swing événementielle, traitement de données capteurs et alertes automatisées.',
    rating: 4.8,
    reviews: 29,
    stat: '+80 fermes',
    tag: 'Java · Swing · IoT',
    color: '#34d399',
    icon: '🌱',
    links: { github: 'https://github.com/StalkeRalp', live: '#' },
    specs: ['Java Swing IHM', 'Event Listeners', 'IoT Sensor Feeds', 'Data Analytics'],
  },
  {
    id: 4,
    title: 'Android HomeWidget',
    category: 'MOBILE ENGINE',
    subtitle: 'Widget API Natif Android',
    desc: 'Composant widget Android natif optimisé en Kotlin, supportant la mise à jour en arrière-plan et la persistance locale d\'état.',
    rating: 4.9,
    reviews: 56,
    stat: '+5.4k DL',
    tag: 'Android · Kotlin · Widget API',
    color: '#f59e0b',
    icon: '📱',
    links: { github: 'https://github.com/StalkeRalp', live: '#' },
    specs: ['Kotlin Native', 'WidgetManager API', 'Zero Battery Drain', 'State Persistence'],
  },
];

// Row 2 Projects (PWAs, Cybersécurité, E-Commerce & Portfolio - Moves in Reverse!)
const projectsRow2 = [
  {
    id: 5,
    title: 'Digital Experience PWA',
    category: 'PWA SYSTEM',
    subtitle: 'App Web Progressive',
    desc: 'PWA haute performance pour expérience digitale fluide, avec mise en cache hors-ligne, temps de chargement instantanés et score Lighthouse 99%.',
    rating: 5.0,
    reviews: 62,
    stat: '+99% Lighthouse',
    tag: 'Next.js · PWA · Tailwind',
    color: '#f472b6',
    icon: '✨',
    links: { github: 'https://github.com/StalkeRalp', live: '#' },
    specs: ['Service Worker Cache', 'Hydration Safe', 'Offline First', 'PWA Manifest'],
  },
  {
    id: 6,
    title: 'Ralphon.dev 3D Space',
    category: 'PORTFOLIO',
    subtitle: 'Cosmic 3D Canvas Engine',
    desc: 'Portfolio d\'ingénierie logicielle intégrant un moteur 3D sur canvas HTML5 mathématique, portrait ASCII particulaire et terminal Kali Linux.',
    rating: 5.0,
    reviews: 95,
    stat: '+2.8k vues',
    tag: 'Next.js · Canvas 3D · CSS',
    color: '#00e5ff',
    icon: '🚀',
    links: { github: 'https://github.com/StalkeRalp', live: '#' },
    specs: ['Custom 3D Physics', 'Particle ASCII Engine', 'Cyber Terminal', 'Zero Engine Libs'],
  },
  {
    id: 7,
    title: 'CyberAudit OWASP Suite',
    category: 'CYBERSÉCURITÉ',
    subtitle: 'Pentest & Audit Sécurité',
    desc: 'Suite d\'évaluation et de tests d\'intrusion pour applications web et mobiles selon le référentiel OWASP Top 10 et détection de failles.',
    rating: 5.0,
    reviews: 41,
    stat: '+100% SEC_OK',
    tag: 'Kali Linux · Burp Suite · Python',
    color: '#ef4444',
    icon: '🗝️',
    links: { github: 'https://github.com/StalkeRalp', live: '#' },
    specs: ['OWASP Top 10 Audit', 'Burp Suite Pentest', 'Vulnerability Assessment', 'XSS & SQLi Proofing'],
  },
  {
    id: 8,
    title: 'Cosmetic Admin Hub',
    category: 'WEB APP',
    subtitle: 'Gestion Stocks & Audit',
    desc: 'Dashboard de gestion cosmétique avec contrôle des accès RBAC, assainissement de données serveur et journalisation d\'audit complète.',
    rating: 4.9,
    reviews: 38,
    stat: '+850 commandes',
    tag: 'React · Node.js · PostgreSQL',
    color: '#38bdf8',
    icon: '💎',
    links: { github: 'https://github.com/StalkeRalp', live: '#' },
    specs: ['Inventory Tracking', 'Audit Event Logs', 'Secure File Uploads', 'Rate Limiting'],
  },
];

const allCategories = ['Tous', 'WEB APP', 'ADMIN DASHBOARD', 'MOBILE ENGINE', 'PWA SYSTEM', 'DESKTOP APP', 'CYBERSÉCURITÉ', 'PORTFOLIO'];

export default function ProjectsSection() {
  const [filter, setFilter] = useState('Tous');
  const [selectedProject, setSelectedProject] = useState(null);

  const ref = useReveal();
  const parallax = useScrollParallax(0.15);

  // Filter lists
  const filterList = (list) => filter === 'Tous' ? list : list.filter(p => p.category === filter);
  
  const filteredRow1 = filterList(projectsRow1);
  const filteredRow2 = filterList(projectsRow2);

  // Fallbacks if filter renders a row empty
  const row1Display = filteredRow1.length > 0 ? filteredRow1 : filterList([...projectsRow1, ...projectsRow2]).slice(0, 4);
  const row2Display = filteredRow2.length > 0 ? filteredRow2 : filterList([...projectsRow1, ...projectsRow2]).slice(4);

  // Triple array for seamless infinite marquee loop
  const marqueeItemsRow1 = [...row1Display, ...row1Display, ...row1Display];
  const marqueeItemsRow2 = [...row2Display, ...row2Display, ...row2Display];

  return (
    <section id="projects" className="section" ref={ref} style={{ position: 'relative', overflow: 'hidden', paddingLeft: 0, paddingRight: 0 }}>
      {/* Background Parallax Ambient Glow Orb */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '-5%',
        width: 550,
        height: 550,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 229, 255, 0.08) 0%, rgba(124, 58, 237, 0.05) 50%, transparent 70%)',
        transform: `translateY(${parallax * 0.5}px)`,
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Header Container */}
      <div className="container" style={{ position: 'relative', zIndex: 1, paddingLeft: 24, paddingRight: 24, marginBottom: 36 }}>
        <div className="label reveal" style={{ marginBottom: 16 }}>03 / Projets &amp; Réalisations</div>
        <div className="divider reveal" />
        
        <div className="project-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <h2 className="headline-lg reveal">
              Mes <span className="text-gradient">Missions &amp; Projets</span>
            </h2>
            <p className="body-lg reveal reveal-delay-1" style={{ maxWidth: 680, marginTop: 8 }}>
              Survolez une carte projet pour l'ouvrir comme un livre 3D et découvrir ses fonctionnalités. Deux rangées défilent en sens inverse pour une présentation dynamique.
            </p>
          </div>

          {/* Category Filters */}
          <div className="reveal reveal-delay-1 project-filter-group" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {allCategories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                style={{
                  padding: '8px 18px',
                  borderRadius: 0,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  border: `1px solid ${filter === c ? 'rgba(0, 229, 255, 0.6)' : 'rgba(255, 255, 255, 0.12)'}`,
                  background: filter === c ? 'rgba(0, 229, 255, 0.15)' : 'rgba(10, 18, 30, 0.7)',
                  color: filter === c ? 'var(--cyan)' : 'var(--white-70)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.25s ease',
                  cursor: 'pointer',
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 1: Moves Left (De Droite à Gauche) */}
      <div className="marquee-container reveal reveal-delay-2" style={{ marginBottom: 28 }}>
        <div className="marquee-track track-left">
          {marqueeItemsRow1.map((p, index) => (
            <Book3DCard
              key={`row1-${p.id}-${index}`}
              project={p}
              onOpenModal={() => setSelectedProject(p)}
            />
          ))}
        </div>
      </div>

      {/* ROW 2: Moves Right (Sens Inverse - De Gauche à Droite) */}
      <div className="marquee-container reveal reveal-delay-3">
        <div className="marquee-track track-right">
          {marqueeItemsRow2.map((p, index) => (
            <Book3DCard
              key={`row2-${p.id}-${index}`}
              project={p}
              onOpenModal={() => setSelectedProject(p)}
            />
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'rgba(2, 4, 9, 0.88)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
          onClick={() => setSelectedProject(null)}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 640,
              background: '#090f1d',
              border: `1.5px solid ${selectedProject.color}`,
              borderRadius: 0,
              padding: '32px clamp(20px, 4vw, 40px)',
              boxShadow: `0 24px 60px rgba(0,0,0,0.9), 0 0 40px ${selectedProject.color}35`,
              animation: 'modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              style={{
                position: 'absolute',
                top: 18,
                right: 18,
                width: 34,
                height: 34,
                borderRadius: 0,
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: 'var(--white)',
                cursor: 'pointer',
                fontSize: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ✕
            </button>

            {/* Header info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
              <div style={{
                width: 52,
                height: 52,
                borderRadius: 0,
                background: `radial-gradient(circle at 30% 30%, ${selectedProject.color}40, #050a12)`,
                border: `1px solid ${selectedProject.color}60`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 26,
              }}>
                {selectedProject.icon}
              </div>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: selectedProject.color }}>
                  {selectedProject.category}
                </span>
                <h3 className="headline-sm" style={{ fontSize: 24, margin: '2px 0' }}>
                  {selectedProject.title}
                </h3>
              </div>
            </div>

            <p className="body-md" style={{ fontSize: 14.5, lineHeight: 1.7, color: 'var(--white-80)', marginBottom: 24 }}>
              {selectedProject.desc}
            </p>

            {/* Rating & Stat badge */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, padding: '12px 18px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: 0, border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#f59e0b', fontSize: 15 }}>★★★★★</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--white)' }}>{selectedProject.rating}</span>
                <span style={{ fontSize: 12, color: 'var(--white-60)' }}>({selectedProject.reviews} avis)</span>
              </div>

              <span style={{
                padding: '4px 14px',
                borderRadius: 0,
                fontSize: 12,
                fontWeight: 700,
                background: 'rgba(167, 139, 250, 0.15)',
                color: '#c4b5fd',
                border: '1px solid rgba(167, 139, 250, 0.3)',
              }}>
                {selectedProject.stat}
              </span>
            </div>

            {/* Specs Grid */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--white-60)', marginBottom: 10, textTransform: 'uppercase' }}>
                Spécifications Techniques
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 8 }}>
                {selectedProject.specs.map(spec => (
                  <div key={spec} style={{
                    padding: '8px 12px',
                    borderRadius: 0,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    fontSize: 12,
                    fontWeight: 500,
                    color: 'var(--white-90)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}>
                    <span style={{ color: selectedProject.color }}>✓</span>
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 12 }}>
              <a
                href={selectedProject.links.github}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
                style={{ flex: 1, justifyContent: 'center', borderRadius: 0 }}
              >
                Code Source (GitHub)
              </a>
              <a
                href={selectedProject.links.live}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
                style={{ flex: 1, justifyContent: 'center', borderRadius: 0 }}
              >
                Voir Démo Directe 🚀
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MARQUEE STYLES AND 3D BOOK FLIP STYLES */}
      <style>{`
        .marquee-container {
          display: flex;
          overflow: hidden;
          width: 100%;
          position: relative;
          padding: 20px 0;
          mask-image: linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%);
        }

        .marquee-track {
          display: flex;
          gap: 28px;
          width: max-content;
          will-change: transform;
        }

        .track-left {
          animation: marquee-left 36s linear infinite;
        }

        .track-right {
          animation: marquee-right 36s linear infinite;
        }

        .marquee-container:hover .marquee-track {
          animation-play-state: paused;
        }

        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }

        @keyframes marquee-right {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }

        /* 3D BOOK CONTAINER (SQUARE / NO BORDER RADIUS) */
        .book-card-3d {
          position: relative;
          width: 310px;
          height: 380px;
          border-radius: 0px;
          background: #060b14;
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.7);
          perspective: 2000px;
          transform-style: preserve-3d;
          flex-shrink: 0;
        }

        /* BOOK COVER (FRONT - SWINGS OPEN ON HOVER) */
        .book-cover-front {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 0px;
          background: #090f1d;
          transform-origin: 0% 50%;
          transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.55s ease;
          backface-visibility: hidden;
          box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.7);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 24px;
          z-index: 2;
          cursor: pointer;
        }

        .book-card-3d:hover .book-cover-front {
          transform: rotateY(-112deg);
          box-shadow: -12px 12px 32px rgba(0, 0, 0, 0.85);
        }

        /* BOOK INSIDE (REVEALED WHEN COVER OPENS) */
        .book-inside-page {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 0px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          z-index: 1;
          background: #0a1323;
        }

        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        @media (max-width: 768px) {
          .project-header {
            flex-direction: column !important;
            align-items: stretch !important;
          }

          .project-filter-group {
            width: 100%;
          }

          .project-filter-group button {
            flex: 1 1 calc(50% - 8px);
            min-width: 0;
          }

          .book-card-3d {
            width: 260px;
            height: 330px;
          }
        }
      `}</style>
    </section>
  );
}

/* =========================================================
   3D BOOK CARD COMPONENT (No rounded corners, Book Open on Hover)
   ========================================================= */
function Book3DCard({ project, onOpenModal }) {
  return (
    <div className="book-card-3d">
      
      {/* 1. FRONT COVER (Pivots 3D on Hover) */}
      <div
        className="book-cover-front"
        style={{
          border: `1px solid ${project.color}45`,
          boxShadow: `0 8px 32px rgba(0,0,0,0.7), inset 0 0 24px ${project.color}15`,
        }}
      >
        <div>
          {/* Header Row: Emoji Box + Category */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 0,
              background: `${project.color}20`,
              border: `1px solid ${project.color}40`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
            }}>
              {project.icon}
            </div>
            
            <span style={{
              padding: '4px 10px',
              borderRadius: 0,
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: '0.1em',
              background: `${project.color}18`,
              color: project.color,
              border: `1px solid ${project.color}35`,
            }}>
              {project.category}
            </span>
          </div>

          {/* Title & Tag */}
          <h3 className="headline-sm" style={{ fontSize: 20, marginBottom: 8, color: 'var(--white)' }}>
            {project.title}
          </h3>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: project.color, letterSpacing: '0.04em', marginBottom: 12 }}>
            {project.tag}
          </p>

          {/* Rating stars & review count */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
            <span style={{ color: '#f59e0b', fontSize: 13, letterSpacing: 1 }}>★★★★★</span>
            <span style={{ fontSize: 11.5, color: 'var(--white-50)', fontWeight: 500 }}>
              ({project.reviews})
            </span>
          </div>
        </div>

        {/* Cover Footer: Subtitle left + Stat pill right */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 14,
            paddingTop: 12,
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--white-90)' }}>
              {project.subtitle}
            </span>

            {/* Stat Pill */}
            <span style={{
              padding: '4px 10px',
              borderRadius: 0,
              fontSize: 11,
              fontWeight: 700,
              background: 'rgba(238, 224, 255, 0.12)',
              color: '#e9d5ff',
              border: '1px solid rgba(216, 180, 254, 0.25)',
              whiteSpace: 'nowrap',
            }}>
              {project.stat}
            </span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 12,
            color: 'var(--white-50)',
            fontFamily: 'var(--font-mono)',
          }}>
            <span>📖 Survolez pour ouvrir</span>
            <span style={{ color: project.color }}>→</span>
          </div>
        </div>
      </div>

      {/* 2. INSIDE CONTENT (Revealed when Cover Swings Open) */}
      <div className="book-inside-page">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{ fontSize: 22 }}>{project.icon}</span>
            <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--white)' }}>Spécifications Produit</h4>
          </div>

          <p className="body-md" style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--white-80)', marginBottom: 16 }}>
            {project.desc}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {project.specs.slice(0, 3).map((spec) => (
              <div key={spec} style={{ fontSize: 11.5, color: 'var(--white-90)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: project.color, fontWeight: 700 }}>✓</span>
                <span>{spec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Inside Actions: Detail Modal + Links */}
        <div style={{ display: 'flex', gap: 8, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button
            onClick={onOpenModal}
            style={{
              flex: 1,
              padding: '8px 10px',
              borderRadius: 0,
              fontSize: 11.5,
              fontWeight: 700,
              background: `${project.color}25`,
              border: `1px solid ${project.color}50`,
              color: project.color,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
            }}
          >
            Fiche complète 🚀
          </button>

          <a
            href={project.links.github}
            target="_blank"
            rel="noreferrer"
            style={{
              padding: '8px 10px',
              borderRadius: 0,
              fontSize: 11.5,
              fontWeight: 600,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'var(--white-90)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            GitHub
          </a>
        </div>
      </div>

    </div>
  );
}


