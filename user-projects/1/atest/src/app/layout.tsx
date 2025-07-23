import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rapidux Sample Project',
  description: 'AI Generated Next.js Components Sample Project',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
