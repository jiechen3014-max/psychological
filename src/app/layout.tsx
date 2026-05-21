import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "道·心理命理 | 以易经为镜，照见内心",
  description: "基于心理学和传统文化的命理解读工具——通过易经智慧与心理分析，帮助你看清内心真实的想法",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}