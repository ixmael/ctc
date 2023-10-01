import 'normalize.css'
import './globals.scss'

import type { Metadata } from 'next'
import { Lora } from 'next/font/google'

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
      <body className="ctc-body">
        <header>
          <h1>
            Cuida Tu Comunidad
          </h1>
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
