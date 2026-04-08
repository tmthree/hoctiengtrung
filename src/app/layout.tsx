import type { Metadata } from "next";
import { Inter, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { QueryProvider } from "@/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

// Load only the weights we actually use (400 = normal, 700 = bold headings).
// next/font/google self-hosts the font and injects <link rel="preload"> automatically —
// this eliminates the flash of unstyled Chinese text on first render.
const notoSansSC = Noto_Sans_SC({
  variable: "--font-chinese",
  weight: ["400", "700"],
  display: "swap",
  preload: false, // CJK fonts are large — preload only on pages that use Chinese text
});

export const metadata: Metadata = {
  title: {
    default: "Học Tiếng Trung",
    template: "%s | Học Tiếng Trung",
  },
  description: "Tự học tiếng Trung từ cơ bản đến nâng cao cho người Việt",
  metadataBase: new URL("https://hoctiengtrung.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning className={`${inter.variable} ${notoSansSC.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider>
          <QueryProvider>{children}</QueryProvider>
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
