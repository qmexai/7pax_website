import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = {title:'7PAX Travel Agency | Explore • Experience • Escape',description:'Thoughtfully planned travel experiences shaped around where you want to go and how you want to feel.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
