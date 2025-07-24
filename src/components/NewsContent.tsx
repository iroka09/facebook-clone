"use client"

import { useState, useMemo } from "react"
import random from "random"

export default function Feed({ text }: { text: string }) {
  const shortText = useMemo(() => {
    if(!text)return "empty string"
    const totalWords = text.split(/\s+/).length;
    const totalShortWords = random.int(8, 15);
    if (totalShortWords >= totalWords) return text
    return text.split(/\s+/).slice(0, totalShortWords).join(" ").replace(/\.+$/, "")
  }, [])
  if (text === shortText) return <Result>{text}</Result>;
  const [show, setShow] = useState(false)
  return (
    <Result onClick={() => setShow(x => !x)} >
      {
        show ? 
        <span>{text}</span>
          :
          <>
            <span>{shortText}</span>
            <span className="text-slate-500/60"> ...&nbsp;show&nbsp;more</span>
          </>
      }
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