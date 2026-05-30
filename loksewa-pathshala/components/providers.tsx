"use client";

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Locale = 'both' | 'ne' | 'en';

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }): JSX.Element {
  const [locale, setLocaleState] = useState<Locale>('both');

  useEffect(() => {
    const stored = window.localStorage.getItem('loksewa-language');

    if (stored === 'both' || stored === 'ne' || stored === 'en') {
      setLocaleState(stored);
    }
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale(nextLocale: Locale) {
        setLocaleState(nextLocale);
        window.localStorage.setItem('loksewa-language', nextLocale);
      },
    }),
    [locale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }

  return context;
}

export function Providers({ children }: { children: ReactNode }): JSX.Element {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <LanguageProvider>{children}</LanguageProvider>
    </NextThemesProvider>
  );
}