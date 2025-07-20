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
    (window as WindowWithEruda).eruda?.init()
  }, [])
  return (
    <ReduxProvider store={store} >
      {children}
    </ReduxProvider>
  )
}