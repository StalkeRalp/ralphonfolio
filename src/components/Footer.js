'use client';
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{
      position:'relative',
      zIndex:1,
      borderTop:'1px solid rgba(255,255,255,0.06)',
      padding:'40px clamp(20px,5vw,80px)',
      display:'flex',
      alignItems:'center',
      justifyContent:'space-between',
      flexWrap:'wrap',
      gap:16,
      background:'rgba(2,4,9,0.8)',
      backdropFilter:'blur(20px)',
    }}>
      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        <div style={{
          width:28, height:28, borderRadius:'50%',
          background:'linear-gradient(135deg,var(--cyan),var(--violet))',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:11, fontWeight:700, color:'#000',
          boxShadow:'0 0 14px rgba(0,229,255,0.3)',
        }}>RN</div>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--white-60)' }}>
          ralphon<span style={{ color:'var(--cyan)' }}>.dev</span>
        </span>
      </div>

      <p style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--white-30)', textAlign:'center' }}>
        © {year} Nkada Ralphon Justin — Conçu avec ❤️ &amp; ☕ depuis le Cameroun
      </p>

      <div style={{ display:'flex', gap:20 }}>
        {['#hero','#about','#projects','#contact'].map(h => (
          <a key={h} href={h} style={{
            fontSize:12,
            color:'var(--white-40)',
            transition:'color 0.2s',
          }}
          onMouseEnter={e=>e.currentTarget.style.color='var(--white)'}
          onMouseLeave={e=>e.currentTarget.style.color='var(--white-40)'}
          >{h.replace('#','').charAt(0).toUpperCase()+h.slice(2)}</a>
        ))}
      </div>
    </footer>
  );
}
