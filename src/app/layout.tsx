import type { Metadata } from "next";
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  ColorSchemeScript,
  createTheme,
  DEFAULT_THEME,
  MantineProvider,
  mergeMantineTheme,
} from "@mantine/core";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";

import '@mantine/notifications/styles.css';
import { Notifications } from "@mantine/notifications";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Blog do Hofmann",
  description: "Projeto de blog com Next.js e Mantine - por Adalberto Hofmann",
};

const theme = mergeMantineTheme(
  DEFAULT_THEME,
  createTheme({
    fontFamily: geistSans.style.fontFamily,
    fontFamilyMonospace: geistMono.style.fontFamily,
  }),
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className="antialiased">
        <MantineProvider theme={theme}>
          <Notifications />
          <AppShell header={{ height: 60 }} padding="md">
            <AppShellHeader>
              <Header />
            </AppShellHeader>
            <AppShellMain>
              {children}
            </AppShellMain>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}

