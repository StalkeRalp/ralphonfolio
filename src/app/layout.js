import './globals.css';

export const metadata = {
  title: 'Ralphon Justin Nkada — Portfolio',
  description: 'Ingénieur logiciel full-stack passionné par les technologies web, mobiles et l\'architecture des systèmes.',
  keywords: ['portfolio', 'développeur', 'full-stack', 'React', 'Next.js', 'Ralphon Nkada'],
  authors: [{ name: 'Ralphon Justin Nkada' }],
  openGraph: {
    title: 'Ralphon Justin Nkada — Portfolio',
    description: 'Ingénieur logiciel full-stack',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
