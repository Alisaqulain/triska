import './globals.css'
import { Poppins, Playfair_Display, Libre_Baskerville } from 'next/font/google'
import { AdminProvider } from '@/contexts/AdminContext'
import { CartProvider } from '@/contexts/CartContext'
import { UserProvider } from '@/contexts/UserContext'
import { WishlistProvider } from '@/contexts/WishlistContext'
import Chatbot from '@/components/Chatbot'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const libre = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-libre',
  display: 'swap',
})

export const metadata = {
  title: 'Trisaka - Premium Women Fashion',
  description: 'Discover elegant and luxurious fashion for women. Shop sarees, suits, kurtis, and accessories.',
  keywords: 'women fashion, saree, suit, kurti, accessories, premium fashion',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${playfair.variable} ${libre.variable}`}>
      <body className={poppins.className}>
        <AdminProvider>
          <UserProvider>
            <CartProvider>
              <WishlistProvider>
                {children}
                <Chatbot />
              </WishlistProvider>
            </CartProvider>
          </UserProvider>
        </AdminProvider>
      </body>
    </html>
  )
}


