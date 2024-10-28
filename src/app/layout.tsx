import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import GoogleMapsWrapper from '@/components/GoogleMapsWrapper'
import AuthButton from '@/components/AuthButton'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Travel Journal',
  description: 'Log your travels with photos, notes, and maps',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <GoogleMapsWrapper>
            <nav className="bg-blue-600 p-4 shadow-md">
              <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-white text-2xl font-bold hover:text-blue-200 transition duration-300">
                  Travel Journal
                </Link>
                <div className="space-x-4">
                  <Link href="/travels" className="text-white hover:text-blue-200 transition duration-300">
                    View Travels
                  </Link>
                  <Link href="/add-travel" className="text-white hover:text-blue-200 transition duration-300">
                    Add Travel
                  </Link>
                  <AuthButton />
                </div>
              </div>
            </nav>
            <main className="container mx-auto mt-8 px-4">
              {children}
            </main>
          </GoogleMapsWrapper>
        </Providers>
      </body>
    </html>
  )
}