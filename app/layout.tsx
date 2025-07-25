import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Brenno Portfólio',
  description: 'Created with Brenno Oliveira',
  generator: 'Brenno Portfólio',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
