
import React from "react"
import { type Metadata } from "next"
import Providers from "@/app/Providers"
import Footer from "@/components/Footer"
import Script from "next/script"
import "@/styles/globals.css"
import "@/styles/custom-globals.css"
// import { headers as _headers } from 'next/headers'


export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Facebook"
  }
}


export default async function Layout({ children }: {
  children: React.ReactNode
}) {
  return (<>
    <html lang="en" suppressHydrationWarning>
      <body className="">
        <Providers >
          {children}
          <Footer />
        </Providers>
        <Script
          src="/static/eruda.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  </>)
}