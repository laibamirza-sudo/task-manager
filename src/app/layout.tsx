import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

import { CopilotKit } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Task Manager with CopilotKit, Prisma, and Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* <CopilotKit publicApiKey="ck_pub_abb6fc27f5070e19cc8da260ced032df"> */}
<CopilotKit runtimeUrl="/api/copilot">
  <CopilotSidebar
    defaultOpen={false}
    instructions="You are an AI assistant helping the user manage tasks."
    labels={{
      title: "Task Assistant",
      initial: "Hi! How can I help with your tasks?",
    }}
  >
    <nav className="p-4 bg-gray-100 flex gap-4">
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
    </nav>
    {children}
  </CopilotSidebar>
</CopilotKit>

      </body>
    </html>
  );
}
