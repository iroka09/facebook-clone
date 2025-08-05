
import React from "react"
import { Metadata } from "next"
import Providers from "@/app/Providers"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Script from "next/script"
import "@/styles/globals.css"
//import { cookies } from 'next/headers'


export const metadata: Metadata = {
  title: "Facebook"
}


export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="">
        <Providers>
          <Header withNav />
          {children}
          <Footer />
        </Providers>
        <Script
          src="/static/eruda.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  )
}