'use client';
import { useState, useEffect } from 'react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(true);
      setTimeout(() => setLoading(false), 600);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  const letters = ['R', 'a', 'l', 'p', 'h', 'o', 'n', '.', 'd', 'e', 'v'];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#020409',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fade ? 0 : 1,
        transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: fade ? 'none' : 'all',
      }}
    >
      <div className="loader-wrapper">
        {letters.map((char, index) => (
          <span key={index} className="loader-letter" style={{ animationDelay: `${index * 0.08}s` }}>
            {char}
          </span>
        ))}
        <div className="loader"></div>
      </div>

      <style jsx global>{`
        /* From Uiverse.io by dexter-st */
        .loader-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 200px;
          height: 200px;
          font-family: var(--font-mono), sans-serif;
          font-size: 1.1em;
          font-weight: 500;
          color: white;
          border-radius: 50%;
          background-color: transparent;
          user-select: none;
          letter-spacing: 2px;
        }

        .loader {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          aspect-ratio: 1 / 1;
          border-radius: 50%;
          background-color: transparent;
          animation: loader-rotate 2s linear infinite;
          z-index: 0;
        }

        @keyframes loader-rotate {
          0% {
            transform: rotate(90deg);
            box-shadow:
              0 10px 20px 0 #fff inset,
              0 20px 30px 0 #ad5fff inset,
              0 60px 60px 0 #471eec inset;
          }
          50% {
            transform: rotate(270deg);
            box-shadow:
              0 10px 20px 0 #fff inset,
              0 20px 10px 0 #d60a47 inset,
              0 40px 60px 0 #311e80 inset;
          }
          100% {
            transform: rotate(450deg);
            box-shadow:
              0 10px 20px 0 #fff inset,
              0 20px 30px 0 #ad5fff inset,
              0 60px 60px 0 #471eec inset;
          }
        }

        .loader-letter {
          display: inline-block;
          opacity: 0.4;
          transform: translateY(0);
          animation: loader-letter-anim 1.8s infinite;
          z-index: 1;
          border-radius: 50ch;
          border: none;
        }

        @keyframes loader-letter-anim {
          0%,
          100% {
            opacity: 0.4;
            transform: translateY(0);
          }
          20% {
            opacity: 1;
            transform: scale(1.2);
            color: var(--cyan);
          }
          40% {
            opacity: 0.7;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
