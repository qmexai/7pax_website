'use client';

import { useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 300;
const framePath = (version: 'v1' | 'v2', index: number) =>
  `/img/${version}/ezgif-frame-${String(index + 1).padStart(3, '0')}.jpg`;

export default function GlobalJourneyScene() {
  const [frame, setFrame] = useState(framePath('v1', 0));
  const frames = useRef<string[]>([]);

  useEffect(() => {
    const urls = Array.from({ length: FRAME_COUNT * 2 }, (_, index) => {
      const version = index < FRAME_COUNT ? 'v1' : 'v2';
      return framePath(version, index % FRAME_COUNT);
    });
    frames.current = urls;

    urls.forEach((url) => {
      const image = new Image();
      image.src = url;
    });

    const updateFrame = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      const index = Math.min(urls.length - 1, Math.floor(progress * urls.length));
      setFrame(urls[index]);
    };

    updateFrame();
    window.addEventListener('scroll', updateFrame, { passive: true });
    window.addEventListener('resize', updateFrame);
    return () => {
      window.removeEventListener('scroll', updateFrame);
      window.removeEventListener('resize', updateFrame);
    };
  }, []);

  return (
    <div className="global-journey-scene" aria-hidden="true">
      <img src={frame} alt="" onError={(event) => { event.currentTarget.src = '/images/mountain.svg'; }} />
      <div className="global-journey-wash" />
    </div>
  );
}
