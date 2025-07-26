"use client"

import { useState } from "react"
import { FaRegComment } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { PiShareFatLight } from "react-icons/pi";
import { IoMdThumbsUp } from "react-icons/io";



export default function NewsReaction({ likes, comments, emoji, link }) {
  const [liked, setLiked] = useState(false)
  return (
    <>
      <li className="px-3 text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-[2px]">
          <span className="w-4 grid place-items-center bg-primary aspect-square rounded-full text-[70%] text-white">
            <IoMdThumbsUp />
          </span>
          {emoji}
          <span>{likes + (+liked)}</span>
        </div>
        <div>{comments} comments</div>
      </li>
      <li className="px-3 flex justify-between">
        {([[[AiOutlineLike, IoMdThumbsUp], "likes", likes], [FaRegComment, "comments", comments], [FaWhatsapp, "whatsapp"], [PiShareFatLight, "share"]] as const).map(([Icon, name, num], i) => {
          let LikedIcon = (name === "likes") ? Icon[1] : null
          let ThumbIcon = (name === "likes") ? Icon[0] : null
          let icon = (name === "likes") ?
            (liked ? <LikedIcon className={liked ? "text-blue-500" : ""} /> : <ThumbIcon />) :
            <Icon />
          return (
            <ButtonReaction
              key={i}
              icon={icon}
              num={num}
              name={name}
              liked={liked}
              onClick={
                name === "likes" ?
                  () => setLiked(x => !x)
                  :
                  (
                    name === "whatsapp" ?
                      () => location.href = "whatsapp://send?text=" + encodeURIComponent(link)
                      :
                      (
                        name === "share" ?
                          () => {
                            navigator.share?.({
                              // title: 'Awesome Website',
                              // text: 'Check out this cool site!',
                              url: link
                            }) || alert("Sorry, your browser doesn't support this action")
                          }
                          :
                          () => { } //comment
                      )
                  )
              }
            />
          )
        })}
      </li>
    </>
  )
}


function ButtonReaction({ icon, num, name, liked, onClick }) {
  return (
    <button className="flex gap-2 justify-center items-center py-2 px-5 bg-gray-100 active:bg-gray-200 rounded-full w-[70px]" onClick={onClick}>
      <span className="text-lg">{icon}</span> {(typeof num === "number") && <span className="text-sm">{name === "likes" ? num + (+liked) : num}</span>}
    </button>
  )
}
