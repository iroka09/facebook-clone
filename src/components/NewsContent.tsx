"use client"

import { useState } from "react"

export default function Feed({ text }: { text: string }) {
  const shortText = text.replace(/\..*$/s, ".")
  if (text === shortText) return <Result>{text}</Result>;
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(x => !x)
  return (
    <Result onClick={handleClick} >
      {show ? (
        <>
          <span>{text}</span>
          <span className="text-slate-500/60"> show&nbsp;less</span>
        </>
      ) : (
        <>
          <span>{shortText}</span>
          <span className="text-slate-500/60"> show&nbsp;more</span>
        </>
      )}
    </Result>
  )
}

function Result({ children, className = "", ...props }) {
  return (
    <div
      className={`active:bg-gray-100 ${className}`}
      {...props}
    >
      {children}
    </div >
  )
}