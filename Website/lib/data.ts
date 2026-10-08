export type PackageItem = {
  id: string; title: string; destination: string; duration: string; price: string;
  description: string; highlights: string[]; image: string; alt: string;
};
export type Destination = { id:string; name:string; category:'Beach'|'Mountain'|'Culture'|'Adventure'|'Family'; highlight:string; image:string; alt:string };
export const packages: PackageItem[] = [
 {id:'coastal-escape',title:'Coastal Escape',destination:'Ocean Horizons',duration:'Duration on request',price:'Price on request',description:'A relaxed shoreline itinerary shaped around beautiful stays and unhurried discovery.',highlights:['Beach','Local culture','Flexible pacing'],image:'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1200&q=85',alt:'Abstract coastal travel scene'},
 {id:'mountain-journey',title:'Mountain Journey',destination:'Alpine Passage',duration:'Duration on request',price:'Price on request',description:'A considered highland route balancing scenery, comfort, and time outdoors.',highlights:['Rail journey','Nature','Scenic stays'],image:'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85',alt:'Abstract mountain travel scene'},
 {id:'cultural-discovery',title:'Cultural Discovery',destination:'Living Heritage',duration:'Duration on request',price:'Price on request',description:'An immersive city and region itinerary designed around heritage, food, and place.',highlights:['Architecture','Cuisine','Guided moments'],image:'https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1200&q=85',alt:'Abstract cultural travel scene'}
];
export const destinations: Destination[] = [
 {id:'ocean',name:'Ocean Horizons',category:'Beach',highlight:'Salt air and slow mornings.',image:'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=900&q=85',alt:'Ocean horizon'},
 {id:'alpine',name:'Alpine Passage',category:'Mountain',highlight:'Highland scenery and scenic stays.',image:'https://images.unsplash.com/photo-1486911278844-a81c5267e227?auto=format&fit=crop&w=900&q=85',alt:'Alpine landscape'},
 {id:'heritage',name:'Living Heritage',category:'Culture',highlight:'Architecture, cuisine and local stories.',image:'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=85',alt:'Heritage architecture'},
 {id:'wild',name:'Wild Terrain',category:'Adventure',highlight:'Open landscapes and active days.',image:'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85',alt:'Adventure landscape'},
 {id:'together',name:'Together Away',category:'Family',highlight:'Easy-going moments for everyone.',image:'https://images.unsplash.com/photo-1504150558240-0b4fd8946624?auto=format&fit=crop&w=900&q=85',alt:'Family travel landscape'}
];
export const pillars = [
 ['Personalized Travel Planning','Every itinerary begins with your interests, pace, and practical needs.'],
 ['Curated Experiences','Meaningful places and moments, selected with intention.'],
 ['Transparent Pricing','Clear proposals designed to help you make confident decisions.'],
 ['Dedicated Travel Support','A clear point of support through the planning process.']
] as const;
export const testimonials = [{quote:'Verified client testimonial will appear here.',name:'Client name and journey — to be confirmed'}];
