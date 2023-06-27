import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '../context/AuthContext'
import NavBar from './navBar';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ShifTable',
  description: 'Generated by create next app',
  url: 'http://localhost:3000/'
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <script src="https://kit.fontawesome.com/1975b960c2.js" crossOrigin="anonymous"></script>
      </head>
      <body>
        <AuthProvider>
          <NavBar></NavBar>
          <main className={inter.className}>{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}