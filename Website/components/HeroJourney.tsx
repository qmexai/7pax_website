'use client';

import { useEffect, useState } from 'react';

export default function HeroJourney() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setProgress(Math.max(0, Math.min(1, window.scrollY / max)));
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  const labels = ['Discover', 'Plan', 'Experience', 'Remember'];
  const active = Math.min(labels.length - 1, Math.floor(progress * labels.length));

  return (
    <section id="home" className="hero-scroll">
      <div className="hero-sticky">
        <div className="hero-vignette" />
        <div className="hero-overlay">
          <div className="hero-copy">
            <div className="hero-kicker"><span className="live-dot" /> 7PAX TRAVEL EXPERIENCES • NOW OPEN</div>
            <h1 className="hero-title"><span>Travel well.</span><strong>Feel more.</strong></h1>
            <p className="hero-lead">Personalized holidays, meaningful stays and beautifully planned experiences across India and beyond, created around the way you want to travel.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a className="btn btn-primary" href="#packages">EXPLORE EXPERIENCES ↗</a>
              <a className="btn btn-glass" href="#contact">PLAN WITH 7PAX ↗</a>
            </div>
            <div className="hero-ticket">
              <div><span>PLANNING</span><b>MADE PERSONAL</b></div>
              <div><span>EXPERIENCES</span><b>CURATED FOR YOU</b></div>
              <div><span>APPROACH</span><b>HUMAN SUPPORT</b></div>
            </div>
          </div>
        </div>
        <div className="hero-hud">
          <div className="hud-top"><span className="eyebrow">YOUR NEXT ESCAPE</span><span className="hud-time">7PAX</span></div>
          <div className="hud-route"><span className="route-dot active" /><div><b>Tell us what you love</b><small>We shape the right itinerary</small></div></div>
          <div className="hud-line" />
          <div className="hud-route"><span className="route-dot" /><div><b>Go somewhere memorable</b><small>India and international journeys</small></div></div>
          <div className="hud-speed"><span>JOURNEY STATUS</span><strong>READY</strong></div>
        </div>
        <div className="brand-sign">7PAX <span>TRAVEL • EXPERIENCE • ESCAPE</span></div>
        <div className="milestones">{labels.map((label, index) => <span className={index === active ? 'active' : ''} key={label}>{String(index + 1).padStart(2, '0')} {label}</span>)}</div>
        <div className="scroll-hint"><span>SCROLL</span><i>↓</i><small>DISCOVER YOUR NEXT ESCAPE</small></div>
      </div>
    </section>
  );
}
