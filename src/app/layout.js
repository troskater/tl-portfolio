import NavMenu from '@/components/NavMenu'
import Footer from '@/components/Footer'
import { DialogProvider } from '@/components/DialogProvider';
import { Analytics } from '@vercel/analytics/react';

import './globals.css'
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export const metadata = {
  title: 'TL Portfolio',
  description: 'Troy L. aka troskater',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavMenu />
        <DialogProvider>
          {children}
        </DialogProvider>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
