import NavMenu from '@/components/NavMenu'
import Footer from '@/components/Footer'

import { Source_Code_Pro } from 'next/font/google'
import './globals.css'
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const font = Source_Code_Pro({ subsets: ['latin'] })

export const metadata = {
  title: 'TL Portfolio',
  description: 'Troy L. aka troskater',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavMenu />
        {children}
        <Footer />
      </body>
    </html>
  )
}
