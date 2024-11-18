import { ThemeProvider } from "@/components/theme-provider"
import { ReactNode } from "react"
import { Poppins } from 'next/font/google';
import Header from "@/components/sections/header/Header";
import "./globals.css";

const poppins = Poppins({
  subsets: ['latin'], // Ajuste o subset conforme necessário
  weight: ['400', '700'], // Escolha os pesos desejados
  style: ['normal', 'italic'], // (opcional) estilos
  variable: '--font-poppins', // (opcional) variável CSS
});
interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head >
          <title>Weather App</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body className={poppins.className} >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
