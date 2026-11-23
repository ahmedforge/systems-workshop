import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { profile } from "../content";
const display = localFont({
  src: "../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2",
  variable: "--display",
  display: "swap",
});
export const metadata: Metadata = {
  title: "Ahmed Ali / Systems Workshop",
  description: profile.description,
  openGraph: {
    title: "Ahmed Ali / Systems Workshop",
    description: profile.description,
    type: "website",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={display.variable + " " + GeistMono.variable}
    >
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{const t=localStorage.getItem('palette');if(['ember','acid','sea'].includes(t))document.documentElement.dataset.theme=t}catch{}",
          }}
        />
        {children}
      </body>
    </html>
  );
}
