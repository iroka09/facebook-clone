"use client"

import { useEffect } from "react"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "@/lib/redux/store"

interface WindowWithEruda extends Window {
  eruda?: {
    init: Function
  }
}

export default function ({ children }) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      (window as WindowWithEruda).eruda?.init()
    }
    const fn = () => alert("Coming Soon 😀")
    const eles = document.querySelectorAll(".dormant-btn")
    eles.forEach(ele => {
      ele.addEventListener("click", fn)
    })
    return () => {
      eles.forEach(ele => {
        ele.addEventListener("click", fn)
      })
    }
  }, [])
  return (
    <ReduxProvider store={store} >
      {children}
    </ReduxProvider>
  )
}