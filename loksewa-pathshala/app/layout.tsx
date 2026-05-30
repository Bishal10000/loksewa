import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans, Tiro_Devanagari_Hindi } from 'next/font/google';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { Providers } from '@/components/providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-plus-jakarta' });
const tiroDevanagari = Tiro_Devanagari_Hindi({ subsets: ['devanagari'], weight: ['400'], variable: '--font-tiro-devanagari' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' });

export const metadata: Metadata = {
  metadataBase: new URL('https://loksewa-pathshala.test'),
  title: {
    default: 'LokSewa Pathshala',
    template: '%s | LokSewa Pathshala',
  },
  description: 'Premium Loksewa preparation platform for Nepal PSC exam aspirants with notes, syllabi, and exam explorers.',
  openGraph: {
    title: 'LokSewa Pathshala',
    description: 'Your civil service dream, our platform.',
    url: 'https://loksewa-pathshala.test',
    siteName: 'LokSewa Pathshala',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LokSewa Pathshala',
    description: 'Nepal’s beautiful Loksewa preparation platform.',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>): JSX.Element {
  return (
    <html className="dark" lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${plusJakarta.variable} ${tiroDevanagari.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <Providers>
          <Navbar />
          <main className="mx-auto w-full max-w-[1200px] px-6 pb-20 pt-[96px]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}