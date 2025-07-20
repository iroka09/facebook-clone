"use client"

import { useState } from "react"
import { submit } from "@/app/actions"



export default function () {
  const [result, setResult] = useState<string>()
  const handleSubmit = async (formData: FormData) => {
    try {
      console.clear()
      setResult("")
      console.log("Submiting...")
      let files = document.querySelector("input[type=file][name=files]")?.files
      if (files) {
        formData.delete("files")
        Array.from(files).forEach((file, i) => {
          formData.append(`file_${i}`, file)
        })
        console.log(Object.fromEntries(formData))
        // return
      }
      let data;
      const server_action = formData.get("server_action")?.toLowerCase().trim()
      if (server_action === "yes") {
        data = await submit(formData)
      }
      else if (server_action === "no") {
        const res = await fetch("/api/test?name=tobe", {
          method: "POST",
          body: formData
        })
        if (!res.ok) {
          throw { message: "Something went wrong in server." }
        }
        data = await res.json()
      }
      else {
        throw { message: "server action value must be either 'yes' or 'no'" }
      }
      console.log(data)
      setResult(data.message)
    }
    catch (e) {
      console.log(e)
      setResult(e.message)
    }
  }
  return (<>
    <form
      action={handleSubmit}
    >
      <input name="server_action" defaultValue="no" placeholder="use server action? enter yes or no" /><br />
      <input name="username" defaultValue="vincent" /><br />
      <input name="files" type="file" multiple /><br />
      <button>Submit</button>
    </form>
    <h2>{result}</h2>
    <img
      src="/api/image"
      className="image-view"
      onClick={e => {
        let src = e.target.src;
        src += "?rand=" + Math.random()
        e.target.src = src
      }}
    />
    <a
      href="/api/image/?download"
      className="download-button"
    >
      Download Image
    </a>
  </>)
}