import type { Metadata } from "next";
import './globals.css'
import { Github } from "lucide-react";
import Link from "next/link";
import { MathJaxContext } from "better-react-mathjax";

export const metadata: Metadata = {
  title: "Antenna App",
  description: "A simple tool to calculate antenna impedance ",
   alternates: {
    canonical: 'https://antenna-app.vercel.app/',
  },
  keywords: ['Antenna', 'Antenna App', 'Bagus Mustaqim', 'Antenna Impedance'],
  authors: [{ name: 'Bagus Mustaqim', url: 'https://antenna-app.vercel.app/' }],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head> 
        <link rel="icon" href="./favicon.ico"/>
      </head>
      <body
        className={`antialiased `}
      >
        <MathJaxContext>
          <header className="bg-blue-950 text-white shadow-md">
              <div className="container mx-auto px-2 py-4">
                <div className="flex flex-row justify-between items-center mx-2">
                  <h1 className="text-xl md:text-3xl font-semibold font-serif text-left">Antenna App</h1>
                    <Link href={'https://github.com/Bagus135/antenna-app'} className="hover:bg-accent/10 p-1 rounded-sm">
                      <Github className="size-6"/>
                    </Link>
                </div>
              </div>
          </header>
          {children}
          
          <footer className="bg-blue-950 text-white py-6">
              <div className="container mx-auto px-4 text-center">
                <p>&copy; {new Date().getFullYear()} Bagus Mustaqim</p>
                <p className="text-gray-400 text-sm mt-2">
                  A simple tool to calculate antenna impedance 
                </p>
              </div>
          </footer>
        </MathJaxContext>
      </body>
    </html>
  );
}
