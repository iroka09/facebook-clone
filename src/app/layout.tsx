
import React from "react"
import { Metadata } from "next"
import Providers from "@/app/Providers"
import Script from "next/script"
//import { cookies } from 'next/headers'
import "@/styles/globals.css"


export const metadata: Metadata = {
  title: "Facebook"
}


export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="">
        <Providers>
          {children}
        </Providers>
        <Script
          src="/static/eruda.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  )
}