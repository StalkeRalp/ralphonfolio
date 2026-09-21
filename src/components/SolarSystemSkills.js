'use client';
import React, { useRef, useEffect, useState } from 'react';

const planetsData = [
  {
    id: 'react',
    name: 'React',
    category: 'Front-end',
    tagline: 'Interfaces utilisateur & Applications Web modernes',
    icon: '⚛️',
    color: '#00d8ff',
    glowColor: 'rgba(0, 216, 255, 0.85)',
    size: 20,
    orbitRadius: 150,
    speed: 0.007,
    level: 92,
    desc: 'Architecture de composants React 19, Hooks sur-mesure, gestion d\'état réactive & performances d\'affichage optimales.',
    specs: ['React 19', 'Virtual DOM', 'Custom Hooks', 'UI/UX State'],
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'Full-stack',
    tagline: 'Applications web performantes & optimisées',
    icon: '▲',
    color: '#f8fafc',
    glowColor: 'rgba(248, 250, 252, 0.95)',
    hasRing: true,
    ringColor: 'rgba(248, 250, 252, 0.45)',
    size: 26,
    orbitRadius: 215,
    speed: 0.0055,
    level: 90,
    desc: 'App Router Next.js 16, Server Rendering (SSR/SSG), Server Actions, routes d\'API & SEO ultra-rapide.',
    specs: ['App Router', 'Server Actions', 'SSR / ISR', 'SEO Engine'],
  },
  {
    id: 'typescript',
    name: 'UX/UI - Figma / Canva',
    category: 'Language',
    tagline: 'Code type-safe, robuste et maintenable',
    icon: '🟦',
    color: '#3178c6',
    glowColor: 'rgba(49, 120, 198, 0.85)',
    size: 19,
    orbitRadius: 280,
    speed: 0.0042,
    level: 85,
    desc: 'Briques applicatives entièrement typées, détection d\'erreurs à la compilation et maintenabilité sur le long terme.',
    specs: ['Strict Types', 'Generics', 'AST Tooling', 'Interfaces'],
  },
  {
    id: 'flutter',
    name: 'Flutter / React Native',
    category: 'Mobile Engine',
    tagline: 'Applications mobiles iOS & Android fluides',
    icon: '📱',
    color: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.85)',
    size: 23,
    orbitRadius: 345,
    speed: 0.0034,
    level: 82,
    desc: 'Applications mobiles hybrides haute performance, géolocalisation native, notifications push & mode hors-ligne.',
    specs: ['Android & iOS', 'FCM Push', 'Geolocation', 'Native Modules'],
  },
  {
    id: 'taiwind',
    name: 'Tailwind CSS / Bootstrap',
    category: 'Mobile Engine',
    tagline: 'Applications mobiles iOS & Android fluides',
    icon: '📱',
    color: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.85)',
    size: 23,
    orbitRadius: 345,
    speed: 0.0034,
    level: 82,
    desc: 'Applications mobiles hybrides haute performance, géolocalisation native, notifications push & mode hors-ligne.',
    specs: ['Android & iOS', 'FCM Push', 'Geolocation', 'Native Modules'],
  },
  {
    id: 'nodejs',
    name: 'Node.js / NestJS',
    category: 'Backend',
    tagline: 'APIs REST, Microservices & Architecture Backend',
    icon: '⚙️',
    color: '#22c55e',
    glowColor: 'rgba(34, 197, 94, 0.85)',
    size: 24,
    orbitRadius: 410,
    speed: 0.0027,
    level: 88,
    desc: 'Conception de serveurs d\'API scalables sous NestJS & Express, sécurité RBAC, authentification JWT et WebSockets.',
    specs: ['NestJS', 'Express', 'JWT Auth', 'REST & WebSockets'],
  },
  {
    id: 'supabase',
    name: 'BaaS & DB',
    category: 'BaaS & DB',
    tagline: 'Bases de données PostgreSQL temps réel & Auth',
    icon: '⚡',
    color: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.85)',
    size: 21,
    orbitRadius: 475,
    speed: 0.0022,
    level: 86,
    desc: 'Gestion de bases PostgreSQL en temps réel, politiques de sécurité au niveau ligne (RLS) et buckets de stockage.',
    specs: ['PostgreSQL', 'RLS Policies', 'Realtime DB', 'Storage Buckets'],
  },
  {
    id: 'cybersecurity',
    name: 'Cybersécurité & Pentest',
    category: 'SecOps & Audit',
    tagline: 'Audit OWASP, Pentesting & Sécurisation avancée',
    icon: '🛡️',
    color: '#ef4444',
    glowColor: 'rgba(239, 68, 68, 0.95)',
    hasRing: true,
    ringColor: 'rgba(239, 68, 68, 0.5)',
    size: 28,
    orbitRadius: 540,
    speed: 0.0017,
    level: 90,
    desc: 'Audit de sécurité des applications web & mobiles selon le référentiel OWASP, Pentesting avec Burp Suite, Nmap & Kali Linux.',
    specs: ['OWASP Top 10', 'Burp Suite', 'Kali Linux', 'Pentest & Audit'],
  },
  {
    id: 'git',
    name: 'Git / GitHub',
    category: 'DevOps',
    tagline: 'CI/CD, Conteneurisation Docker & Cloud',
    icon: '🌿',
    color: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.85)',
    size: 21,
    orbitRadius: 605,
    speed: 0.0013,
    level: 92,
    desc: 'Workflow Git collaboratif, conteneurisation des services avec Docker et intégration continue GitHub Actions.',
    specs: ['Git Flow', 'Docker', 'GitHub Actions', 'CI/CD Pipelines'],
  },
];

export default function SolarSystemSkills() {
  const canvasRef = useRef(null);

  // Active Planet State
  const [activePlanet, setActivePlanet] = useState(null);
  const [hoveredPlanet, setHoveredPlanet] = useState(null);

  // 3D Rotation & Transformation State
  const transformRef = useRef({
    // 3D Angles (radians)
    rotX: 0.85,          // Pitch (vertical tilt angle)
    targetRotX: 0.85,
    rotY: 0.2,           // Yaw (horizontal rotation angle)
    targetRotY: 0.2,

    // Scale & Pan
    scale: 1,
    targetScale: 1,
    panX: 0,
    panY: 0,
    targetPanX: 0,
    targetPanY: 0,

    // Interaction State
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    mouseCanvasX: -1000,
    mouseCanvasY: -1000,
  });

  const anglesRef = useRef(planetsData.map((_, i) => (i * Math.PI) / 4));
  const planetPositionsRef = useRef([]);

  // Reset Camera View
  const resetView = () => {
    const tf = transformRef.current;
    tf.targetRotX = 0.85;
    tf.targetRotY = 0.2;
    tf.targetScale = 1;
    tf.targetPanX = 0;
    tf.targetPanY = 0;
    setActivePlanet(null);
  };

  const selectPlanet = (planet) => {
    setActivePlanet(planet);
    const tf = transformRef.current;

    const found = planetPositionsRef.current.find((p) => p.id === planet.id);
    if (found) {
      tf.targetScale = 1.25;
      tf.targetPanX = -found.screenX * 0.4;
      tf.targetPanY = -found.screenY * 0.4;
    } else {
      tf.targetScale = 1.15;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    // Background 3D twinkling stars
    const spaceDust = Array.from({ length: 140 }, () => ({
      x: Math.random() * 2400 - 1200,
      y: Math.random() * 2400 - 1200,
      z: Math.random() * 1200 - 600,
      size: Math.random() * 1.5 + 0.4,
      alpha: Math.random() * 0.75 + 0.25,
      speed: Math.random() * 0.02 + 0.005,
    }));

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = Math.min(850, Math.max(540, window.innerHeight * 0.76));
      const dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 3D Point Projection Helper
    const project3D = (x, y, z, rotX, rotY) => {
      // 1. Yaw (Y-axis rotation)
      const x1 = x * Math.cos(rotY) + z * Math.sin(rotY);
      const z1 = -x * Math.sin(rotY) + z * Math.cos(rotY);
      const y1 = y;

      // 2. Pitch (X-axis rotation)
      const x2 = x1;
      const y2 = y1 * Math.cos(rotX) - z1 * Math.sin(rotX);
      const z2 = y1 * Math.sin(rotX) + z1 * Math.cos(rotX);

      // Perspective scale factor
      const focalLength = 900;
      const F = focalLength / (focalLength + z2);

      return {
        screenX: x2 * F,
        screenY: y2 * F,
        z: z2,
        scale: F,
      };
    };

    const render = () => {
      animationId = requestAnimationFrame(render);

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      const centerX = width / 2;
      const centerY = height / 2;

      const tf = transformRef.current;

      // Smooth camera interpolation (Damping)
      tf.rotX += (tf.targetRotX - tf.rotX) * 0.08;
      tf.rotY += (tf.targetRotY - tf.rotY) * 0.08;
      tf.scale += (tf.targetScale - tf.scale) * 0.08;
      tf.panX += (tf.targetPanX - tf.panX) * 0.08;
      tf.panY += (tf.targetPanY - tf.panY) * 0.08;

      ctx.clearRect(0, 0, width, height);

      ctx.save();
      ctx.translate(centerX + tf.panX, centerY + tf.panY);
      ctx.scale(tf.scale, tf.scale);

      // 1. Render 3D Space Dust
      spaceDust.forEach((star) => {
        const proj = project3D(star.x, star.y, star.z, tf.rotX, tf.rotY);
        star.alpha += Math.sin(Date.now() * star.speed) * 0.005;

        ctx.beginPath();
        ctx.arc(proj.screenX, proj.screenY, Math.max(0.4, star.size * proj.scale), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, Math.min(0.9, star.alpha))})`;
        ctx.fill();
      });

      // 2. Render 3D Orbits
      planetsData.forEach((planet) => {
        const isSelected = activePlanet?.id === planet.id;

        ctx.beginPath();
        const segments = 90;
        for (let i = 0; i <= segments; i++) {
          const a = (i / segments) * Math.PI * 2;
          const ox = Math.cos(a) * planet.orbitRadius;
          const oz = Math.sin(a) * planet.orbitRadius;
          const proj = project3D(ox, 0, oz, tf.rotX, tf.rotY);

          if (i === 0) {
            ctx.moveTo(proj.screenX, proj.screenY);
          } else {
            ctx.lineTo(proj.screenX, proj.screenY);
          }
        }

        ctx.strokeStyle = isSelected ? planet.color : 'rgba(255, 255, 255, 0.09)';
        ctx.lineWidth = isSelected ? 2 : 1;
        if (isSelected) {
          ctx.setLineDash([6, 6]);
        } else {
          ctx.setLineDash([]);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // 3. Render Central Sun
      const sunGlow = ctx.createRadialGradient(0, 0, 4, 0, 0, 48);
      sunGlow.addColorStop(0, '#ffffff');
      sunGlow.addColorStop(0.25, '#00e5ff');
      sunGlow.addColorStop(0.65, '#7c3aed');
      sunGlow.addColorStop(1, 'rgba(124, 58, 237, 0)');

      ctx.beginPath();
      ctx.arc(0, 0, 56, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 229, 255, 0.12)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, 0, 34, 0, Math.PI * 2);
      ctx.fillStyle = sunGlow;
      ctx.fill();

      ctx.font = 'bold 10px monospace';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.textAlign = 'center';
      ctx.fillText('CORE HUB', 0, 4);

      // Unproject mouse coordinates in canvas space
      const mouseWorldX = (tf.mouseCanvasX - centerX - tf.panX) / tf.scale;
      const mouseWorldY = (tf.mouseCanvasY - centerY - tf.panY) / tf.scale;

      // 4. Calculate 3D Positions of Planets & Sort by Z depth
      const renderList = [];
      let currentHovered = null;

      planetsData.forEach((planet, index) => {
        // Orbit animation angle
        anglesRef.current[index] += planet.speed;
        const angle = anglesRef.current[index];

        const worldX = Math.cos(angle) * planet.orbitRadius;
        const worldZ = Math.sin(angle) * planet.orbitRadius;

        const proj = project3D(worldX, 0, worldZ, tf.rotX, tf.rotY);

        const isSelected = activePlanet?.id === planet.id;

        // Distance check for hover on 2D screen projection
        const dx = mouseWorldX - proj.screenX;
        const dy = mouseWorldY - proj.screenY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const isHover = dist < planet.size * proj.scale + 16;

        if (isHover) {
          currentHovered = planet;
        }

        renderList.push({
          planet,
          proj,
          isHover,
          isSelected,
          screenX: proj.screenX,
          screenY: proj.screenY,
          z: proj.z,
        });
      });

      // Sort by Z distance (back to front rendering)
      renderList.sort((a, b) => b.z - a.z);
      planetPositionsRef.current = renderList.map((item) => ({
        id: item.planet.id,
        screenX: item.screenX,
        screenY: item.screenY,
        planet: item.planet,
      }));

      // 5. Draw 3D Planets (Back-to-Front)
      renderList.forEach(({ planet, proj, isHover, isSelected }) => {
        const px = proj.screenX;
        const py = proj.screenY;
        const pSize = Math.max(8, planet.size * proj.scale * (isHover || isSelected ? 1.3 : 1.0));

        // Saturn / Cyber Ring in 3D
        if (planet.hasRing) {
          ctx.beginPath();
          ctx.ellipse(px, py, pSize * 1.75, pSize * 0.55, tf.rotY, 0, Math.PI * 2);
          ctx.strokeStyle = planet.ringColor || 'rgba(255,255,255,0.45)';
          ctx.lineWidth = isHover || isSelected ? 3.5 : 2;
          ctx.stroke();
        }

        // Atmosphere Glow Aura
        ctx.beginPath();
        ctx.arc(px, py, pSize * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = isHover || isSelected ? planet.glowColor : `${planet.color}22`;
        ctx.fill();

        // 3D Planet Surface Gradient
        const pGrad = ctx.createRadialGradient(
          px - pSize * 0.35,
          py - pSize * 0.35,
          2,
          px,
          py,
          pSize
        );
        pGrad.addColorStop(0, '#ffffff');
        pGrad.addColorStop(0.4, planet.color);
        pGrad.addColorStop(1, '#030712');

        ctx.beginPath();
        ctx.arc(px, py, pSize, 0, Math.PI * 2);
        ctx.fillStyle = pGrad;
        ctx.fill();

        // Selection / Hover Target Halo
        if (isSelected || isHover) {
          ctx.beginPath();
          ctx.arc(px, py, pSize + 9, 0, Math.PI * 2);
          ctx.strokeStyle = planet.color;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Planet Label
        ctx.font = isHover || isSelected ? 'bold 12px sans-serif' : '11px sans-serif';
        ctx.fillStyle = isHover || isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.8)';
        ctx.textAlign = 'center';
        ctx.fillText(planet.name, px, py + pSize + 16);
      });

      ctx.restore();
      setHoveredPlanet(currentHovered);
    };

    render();

    // 3D Mouse Dragging (Pitch & Yaw Rotation)
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const tf = transformRef.current;
      tf.mouseCanvasX = e.clientX - rect.left;
      tf.mouseCanvasY = e.clientY - rect.top;

      if (tf.isDragging) {
        const deltaX = e.clientX - tf.dragStartX;
        const deltaY = e.clientY - tf.dragStartY;

        // Horizontal drag = Yaw rotation (rotY)
        tf.targetRotY += deltaX * 0.006;
        // Vertical drag = Pitch tilt rotation (rotX)
        tf.targetRotX = Math.min(Math.PI / 2.1, Math.max(-Math.PI / 2.1, tf.targetRotX + deltaY * 0.006));

        tf.dragStartX = e.clientX;
        tf.dragStartY = e.clientY;
      }
    };

    const handleMouseDown = (e) => {
      const tf = transformRef.current;
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      const centerX = width / 2;
      const centerY = height / 2;

      const mouseWorldX = (mouseX - centerX - tf.panX) / tf.scale;
      const mouseWorldY = (mouseY - centerY - tf.panY) / tf.scale;

      const clickedPlanetObj = planetPositionsRef.current.find((p) => {
        const dx = mouseWorldX - p.screenX;
        const dy = mouseWorldY - p.screenY;
        return Math.sqrt(dx * dx + dy * dy) < 26;
      });

      if (clickedPlanetObj) {
        selectPlanet(clickedPlanetObj.planet);
      } else {
        tf.isDragging = true;
        tf.dragStartX = e.clientX;
        tf.dragStartY = e.clientY;
      }
    };

    const handleMouseUp = () => {
      transformRef.current.isDragging = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [activePlanet]);

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: 620 }}>
      {/* 3D Camera Controls & Planet Quick Badges Bar */}
      <div style={{
        position: 'relative',
        zIndex: 20,
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 24px 16px 24px',
      }}>
        <button
          onClick={resetView}
          style={{
            padding: '8px 16px',
            borderRadius: 100,
            fontSize: 12,
            fontWeight: 700,
            border: '1px solid rgba(0, 229, 255, 0.4)',
            background: 'rgba(0, 229, 255, 0.12)',
            color: 'var(--cyan)',
            backdropFilter: 'blur(12px)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          🔄 Réinitialiser la Vue 3D
        </button>

        {planetsData.map((planet) => {
          const isSelected = activePlanet?.id === planet.id;
          return (
            <button
              key={planet.id}
              onClick={() => selectPlanet(planet)}
              style={{
                padding: '8px 16px',
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 600,
                border: `1.5px solid ${isSelected ? planet.color : 'rgba(255,255,255,0.12)'}`,
                background: isSelected ? `${planet.color}25` : 'rgba(5, 10, 20, 0.75)',
                color: isSelected ? planet.color : 'var(--white-80)',
                backdropFilter: 'blur(12px)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span>{planet.icon}</span>
              <span>{planet.name}</span>
            </button>
          );
        })}
      </div>

      {/* 3D Interactive Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          cursor: hoveredPlanet ? 'pointer' : 'move',
          touchAction: 'pan-y',
        }}
      />

      {/* Selected Planet Details Panel */}
      {activePlanet && (
        <div
          className="glass-card"
          style={{
            position: 'absolute',
            bottom: 24,
            right: 24,
            width: 'clamp(300px, 90vw, 420px)',
            zIndex: 30,
            padding: '24px 28px',
            borderRadius: 24,
            background: 'rgba(6, 12, 24, 0.94)',
            border: `1.5px solid ${activePlanet.color}`,
            boxShadow: `0 12px 48px rgba(0,0,0,0.85), 0 0 36px ${activePlanet.glowColor}`,
            backdropFilter: 'blur(24px)',
            animation: 'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <button
            onClick={() => resetView()}
            style={{
              position: 'absolute',
              top: 14,
              right: 14,
              background: 'rgba(255,255,255,0.08)',
              border: 'none',
              color: 'var(--white-80)',
              width: 28,
              height: 28,
              borderRadius: '50%',
              cursor: 'pointer',
              fontSize: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <div style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              background: `radial-gradient(circle at 30% 30%, ${activePlanet.color}, #050a12)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 26,
              boxShadow: `0 0 24px ${activePlanet.color}aa`,
              flexShrink: 0,
            }}>
              {activePlanet.icon}
            </div>
            <div>
              <span style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 1,
                color: activePlanet.color,
                display: 'block',
              }}>
                Planète {activePlanet.category}
              </span>
              <h3 className="headline-sm" style={{ fontSize: 22, margin: '2px 0' }}>
                {activePlanet.name}
              </h3>
            </div>
          </div>

          <p style={{ fontSize: 13, color: 'var(--cyan)', fontWeight: 600, marginBottom: 12 }}>
            "{activePlanet.tagline}"
          </p>

          <div style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12 }}>
              <span style={{ color: 'var(--white-60)' }}>Niveau de maîtrise</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: activePlanet.color }}>
                {activePlanet.level}%
              </span>
            </div>
            <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${activePlanet.level}%`,
                background: `linear-gradient(90deg, ${activePlanet.color}, #ffffff)`,
                borderRadius: 10,
                boxShadow: `0 0 12px ${activePlanet.color}`,
              }} />
            </div>
          </div>

          <p className="body-md" style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--white-80)', marginBottom: 20 }}>
            {activePlanet.desc}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {activePlanet.specs.map((spec) => (
              <span
                key={spec}
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  padding: '4px 10px',
                  borderRadius: 100,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'var(--white-90)',
                }}
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
