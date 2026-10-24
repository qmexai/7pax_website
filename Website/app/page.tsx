'use client';
import Navbar from '@/components/Navbar';
import HeroJourney from '@/components/HeroJourney';
import AboutSection from '@/components/AboutSection';
import PackageSection from '@/components/PackageSection';
import Destinations from '@/components/Destinations';
import Why7Pax from '@/components/Why7Pax';
import Testimonials from '@/components/Testimonials';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import GlobalJourneyScene from '@/components/GlobalJourneyScene';

export default function Home(){
  return <div className="site-shell">
    <GlobalJourneyScene />
    <div className="site-content">
      <Navbar/>
      <main>
        <HeroJourney/>
        <AboutSection/>
        <PackageSection onSelect={()=>setTimeout(()=>document.getElementById('contact')?.scrollIntoView({behavior:'smooth'}),50)}/>
        <Destinations/>
        <Why7Pax/>
        <Testimonials/>
        <ContactSection/><section className="section section-3d" aria-label="Travel gallery"><div className="container-x"><div className="eyebrow">Travel in colour</div><h2 className="section-title mt-4">Every place should feel like a story.</h2><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10"><div className="travel-photo"><img className="gallery-photo" src="https://images.unsplash.com/photo-1473445361085-b9a07f55608b?auto=format&fit=crop&w=900&q=85" alt="Green landscape travel experience"/><div className="photo-caption">Slow escapes</div></div><div className="travel-photo"><img className="gallery-photo" src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=900&q=85" alt="Traveller exploring a destination"/><div className="photo-caption">Discovery</div></div><div className="travel-photo"><img className="gallery-photo" src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85" alt="Mountain holiday landscape"/><div className="photo-caption">Mountain escapes</div></div><div className="travel-photo"><img className="gallery-photo" src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=85" alt="Colourful cultural destination"/><div className="photo-caption">Culture and colour</div></div></div></div></section>
      </main>
      <Footer/>
    </div>
  </div>
}
