'use client';
import { useState, useEffect } from 'react';

export function useScrollParallax(speed = 0.2) {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(() => {
        setOffsetY(window.scrollY * speed);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed]);

  return offsetY;
}
