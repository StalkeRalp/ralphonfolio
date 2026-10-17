'use client';
import { useReveal } from './useReveal';

const experiences = [

  {
    period: '2025 – 2026',
    title: 'Développeur Mobile & Web',
    company: 'Projet Freelance',
    type: 'Freelance',
    color: '#34d399',
    desc: 'Développement d\'applications mobiles Android et web responsive pour divers Apprentissages. Livraison complète de la conception à la production.',
    tags: ['React Native', 'Android', 'Firebase', 'Flutter', 'Next Js', '...'],
  },
  {
    period: '2025 – 2026',
    title: 'Etudiant en CyberSécurité',
    company: 'Université de Yaoundé I - Yaoundé',
    type: 'Formation',
    color: 'var(--cyan)',
    desc: 'Licence professionnelle en cybersécurité',
    tags: ['Niveau 3'],
  },
  {
    period: '2024 – 2025',
    title: 'Etudiant en CyberSécurité',
    company: 'Université de Yaoundé I - Yaoundé',
    type: 'Formation',
    color: 'var(--cyan)',
    desc: 'Licence professionnelle en cybersécurité',
    tags: ['Niveau 2'],
  },
  {
    period: '2023 – 2024',
    title: 'Etudiant en CyberSécurité',
    company: 'Université de Yaoundé I - Yaoundé',
    type: 'Formation',
    color: 'var(--cyan)',
    desc: 'Licence professionnelle en cybersécurité',
    tags: ['Niveau 1'],
  },
  {
    period: '2024 – 2025',
    title: 'Baccalauréat C - Sciences',
    company: 'Collège Catholique Deo-Gratias  Emana – Yaoundé',
    type: 'Formation',
    color: '#a78bfa',
    desc: 'Ayant fait un parcours scolaire sans faute de la 6ieme en Tle-C car je prends vraiment mes etudes au serieux',
    tags: ['3ieme Chinois', '2ndeC', '1iere C', 'TleC'],
  },


];

export default function ExperienceSection() {
  const ref = useReveal();

  return (
    <section id="experience" className="section section--dark" ref={ref}>
      <div className="container">
        <div className="label reveal" style={{ marginBottom:16 }}>04 / Parcours</div>
        <div className="divider reveal" />
        <h2 className="headline-lg reveal" style={{ marginBottom:12 }}>
          Trajectoire de <span className="text-gradient">lancement</span>
        </h2>
        <p className="body-lg reveal reveal-delay-1" style={{ maxWidth:520, marginBottom:72 }}>
          Chaque mission, un nouveau palier franchi vers l'excellence.
        </p>

        {/* Timeline */}
        <div style={{ position:'relative' }}>
          {/* Vertical line */}
          <div style={{
            position:'absolute',
            left: 'clamp(20px, 4vw, 40px)',
            top:0, bottom:0,
            width:1,
            background:'linear-gradient(to bottom, transparent, rgba(0,229,255,0.3) 10%, rgba(0,229,255,0.3) 90%, transparent)',
          }} />

          <div style={{ display:'flex', flexDirection:'column', gap:48 }}>
            {experiences.map((exp, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${Math.min(i+1, 5)}`}
                style={{
                  display:'grid',
                  gridTemplateColumns:'clamp(40px,8vw,80px) 1fr',
                  gap:'clamp(20px,3vw,40px)',
                  alignItems:'flex-start',
                }}
              >
                {/* Dot */}
                <div style={{ display:'flex', justifyContent:'center', paddingTop:4, position:'relative', zIndex:1 }}>
                  <div style={{
                    width:16, height:16,
                    borderRadius:'50%',
                    background:exp.color,
                    boxShadow:`0 0 16px ${exp.color}80`,
                    border:`3px solid var(--deep-space)`,
                    flexShrink:0,
                  }} />
                </div>

                {/* Card */}
                <div className="glass-card" style={{ padding:'clamp(20px,3vw,36px)', borderLeft:`2px solid ${exp.color}30` }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:8, marginBottom:12 }}>
                    <div>
                      <span style={{
                        display:'inline-block',
                        padding:'3px 12px',
                        borderRadius:100,
                        fontSize:11,
                        fontWeight:600,
                        background:`${exp.color}18`,
                        color:exp.color,
                        marginBottom:8,
                      }}>{exp.type}</span>
                      <h3 className="headline-sm" style={{ lineHeight:1.2 }}>{exp.title}</h3>
                      <p style={{ color:'var(--white-60)', fontSize:14, marginTop:4 }}>{exp.company}</p>
                    </div>
                    <div style={{
                      fontFamily:'var(--font-mono)',
                      fontSize:12,
                      color:'var(--white-40)',
                      whiteSpace:'nowrap',
                      paddingTop:4,
                    }}>{exp.period}</div>
                  </div>

                  <p className="body-md" style={{ fontSize:14, lineHeight:1.7, marginBottom:16 }}>{exp.desc}</p>

                  <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                    {exp.tags.map(t => (
                      <span key={t} style={{
                        padding:'4px 12px',
                        borderRadius:100,
                        fontSize:12,
                        background:'rgba(255,255,255,0.05)',
                        border:'1px solid rgba(255,255,255,0.1)',
                        color:'var(--white-80)',
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #experience .glass-card {
            padding: 20px 18px !important;
          }

          #experience .glass-card > div:first-child {
            flex-direction: column;
            align-items: flex-start !important;
          }

          #experience .glass-card > div:first-child > div:last-child {
            white-space: normal;
          }
        }
      `}</style>
    </section>
  );
}
