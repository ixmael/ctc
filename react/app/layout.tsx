import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cuida Tu Comunidad',
  description: 'Cuida Tu Comunidad es una plataforma para incentivar la participación ciudadana en tareas comunitarias',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <header>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              <Link href="/">Cuida Tu Comunidad</Link>
            </h1>
          </div>
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
