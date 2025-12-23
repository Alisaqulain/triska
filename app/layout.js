import './globals.css'
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata = {
  title: 'Trisaka - Premium Women Fashion',
  description: 'Discover elegant and luxurious fashion for women. Shop sarees, suits, kurtis, and accessories.',
  keywords: 'women fashion, saree, suit, kurti, accessories, premium fashion',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}

