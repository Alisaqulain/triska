import './globals.css'
import { Inter, Playfair_Display } from 'next/font/google'
import { AdminProvider } from '@/contexts/AdminContext'
import { CartProvider } from '@/contexts/CartContext'
import { UserProvider } from '@/contexts/UserContext'
import Chatbot from '@/components/Chatbot'

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
        <AdminProvider>
          <UserProvider>
            <CartProvider>
              {children}
              <Chatbot />
            </CartProvider>
          </UserProvider>
        </AdminProvider>
      </body>
    </html>
  )
}


