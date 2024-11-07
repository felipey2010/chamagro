import { auth } from '@/auth'
import CookieConsentComponent from '@/components/CookieConsentComponent'
import LayoutManager from '@/components/layouts/LayoutManager'
import { ReactQueryProvider } from '@/components/ReactQueryProvider'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import localFont from 'next/font/local'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'ChamAgro',
  description: 'Sistema de chamadas para produtores, técnicos e outros órgãos',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <html lang="pt-br" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session} refetchWhenOffline={false}>
            <ReactQueryProvider>
              <LayoutManager>{children}</LayoutManager>
              <ScrollToTopButton />
              <Toaster />
              <CookieConsentComponent />
            </ReactQueryProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
