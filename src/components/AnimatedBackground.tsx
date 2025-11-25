'use client';

import { useEffect } from 'react';

export default function AnimatedBackground() {
  useEffect(() => {
    // Load the custom element script
    const script = document.createElement('script');
    script.src = '/ahole.js';
    script.type = 'module';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div is="a-hole">
        <canvas className="js-canvas"></canvas>
        <div className="aura"></div>
        <div className="overlay"></div>
      </div>
    </div>
  );
}
