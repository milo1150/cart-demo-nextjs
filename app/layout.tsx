import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

/**
 * @see https://ant.design/docs/react/v5-for-19
 */
import '@ant-design/v5-patch-for-react-19'

/**
 * @description prevent page flicker
 * @see https://ant.design/docs/react/use-with-next?theme=dark#using-app-router
 */
import { AntdRegistry } from '@ant-design/nextjs-registry'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: `Fur 'n Paws`,
  description: 'Demo App for testing only',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      {/* bg-red-500 for remark */}
      <body className={`${geistSans.variable} ${geistMono.variable} bg-black! antialiased h-auto`}>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  )
}
