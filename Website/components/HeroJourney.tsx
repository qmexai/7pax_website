'use client';
import {useEffect,useState} from 'react';

export default function HeroJourney(){
 const [progress,setProgress]=useState(0);
 const [time,setTime]=useState(0);
 useEffect(()=>{
   const f=()=>{const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);setProgress(Math.max(0,Math.min(1,scrollY/max)))};
   addEventListener('scroll',f,{passive:true}); f();
   const id=setInterval(()=>setTime(t=>t+1),1000);
   return()=>{removeEventListener('scroll',f);clearInterval(id)}
 },[]);
 const labels=['Station','Departure','Green Route','Discovery','Arrival'];
 const active=progress<.12?0:progress<.34?1:progress<.58?2:progress<.82?3:4;
 return <section id="home" className="hero-scroll">
   <div className="hero-sticky">
     <div className="hero-vignette"/>
     <div className="hero-overlay">
       <div className="hero-copy">
         <div className="hero-kicker"><span className="live-dot"/> 7PAX RAILWAYS • PLATFORM 02 • BOARDING</div>
         <h1 className="hero-title"><span>Your journey</span><strong>starts here.</strong></h1>
         <p className="hero-lead">Watch the station come alive, step aboard a moving train and travel from the city into vivid green landscapes — all inside one living 3D journey.</p>
         <div className="mt-7 flex flex-wrap gap-3">
           <a className="btn btn-primary" href="#packages">EXPLORE JOURNEYS ↗</a>
           <a className="btn btn-glass" href="#contact">PLAN WITH 7PAX ↗</a>
         </div>
         <div className="hero-ticket">
           <div><span>TRAIN</span><b>7PAX EXPRESS</b></div>
           <div><span>DEPARTURE</span><b>NOW BOARDING</b></div>
           <div><span>SCENE</span><b>{active < 2 ? 'CITY STATION' : active < 4 ? 'GREEN COUNTRY' : 'ARRIVAL'}</b></div>
         </div>
       </div>
     </div>
     <div className="hero-hud">
       <div className="hud-top"><span className="eyebrow">LIVE JOURNEY</span><span className="hud-time">00:{String(time%60).padStart(2,'0')}</span></div>
       <div className="hud-route"><span className="route-dot active"/><div><b>Pondicherry Central</b><small>Platform 02</small></div></div>
       <div className="hud-line"/>
       <div className="hud-route"><span className="route-dot"/><div><b>Green Hills</b><small>Scenic route ahead</small></div></div>
       <div className="hud-speed"><span>TRAIN SPEED</span><strong>{Math.round(72 + progress*48)} km/h</strong></div>
     </div>
     <div className="station-sign">7PAX <span>TRAVEL • RAIL • DISCOVER</span></div>
     <div className="milestones">{labels.map((x,i)=><span className={i===active?'active':''} key={x}>{String(i+1).padStart(2,'0')} {x}</span>)}</div>
     <div className="scroll-hint"><span>SCROLL</span><i>↓</i><small>THE TRAIN MOVES WITH YOU</small></div>
   </div>
 </section>
}
