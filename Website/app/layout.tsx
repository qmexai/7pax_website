import './globals.css';
import type { Metadata } from 'next';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://7pax.in';
export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: '7PAX Travel Agency | Best Travel Agency in Malappuram and Tirur',
	description: '7PAX is a trusted travel agency in Malappuram and Tirur for personalized domestic and international holidays, custom itineraries, stays and experiences.',
	keywords: ['best travel agency in Malappuram', 'best travel agency in Tirur', 'travel agency Malappuram', 'travel agency Tirur', 'holiday packages Kerala', 'custom travel planning Kerala', '7PAX travel agency'],
	authors: [{ name: '7PAX Travel Agency' }],
	creator: 'QmexAI',
	publisher: '7PAX Travel Agency',
	alternates: { canonical: '/' },
	openGraph: { type: 'website', url: siteUrl, title: '7PAX Travel Agency', description: 'Personalized holidays and thoughtfully planned travel experiences from Malappuram and Tirur.', siteName: '7PAX Travel Agency' },
	robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const structuredData = { '@context': 'https://schema.org', '@type': 'TravelAgency', name: '7PAX Travel Agency', url: siteUrl, description: 'Personalized domestic and international travel planning in Malappuram, Tirur and across Kerala.', areaServed: ['Malappuram', 'Tirur', 'Kerala', 'India'], sameAs: ['https://qmexai.in'] };
	return <html lang="en"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></body></html>;
}
