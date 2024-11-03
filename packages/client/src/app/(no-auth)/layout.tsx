import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import StoreProvider from "../StoreProvider";
import "../global.css";
import { Toaster } from "sonner";

import { GeistSans } from "geist/font/sans";
import AuthCheckLayout from "@/layouts/AuthCheckLayout";

export const metadata: Metadata = {
  title: "Mail man",
  description: "Mail main is a marketing tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className}`}>
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <AuthCheckLayout>{children}</AuthCheckLayout>
            <Toaster />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
