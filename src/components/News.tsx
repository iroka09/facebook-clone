import Image from "next/image"
import Link from "next/link"
import { FaRegComment } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { PiShareFatLight } from "react-icons/pi";
import { IoMdGlobe } from "react-icons/io";
import { IoIosMore } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { IoMdThumbsUp } from "react-icons/io";
import { FcLike } from "react-icons/fc";
import NewsContent from "@/components/NewsContent"
import random from "random"
import moment from "moment"




export default function News({ data }) {
  const likes = random.int(100, 999)
  const comments = random.int(100, 999)
  //console.log(data, "loded from news")
  return (
    <ul className="py-3 space-y-3">
      <li className="px-3 flex items-center gap-3">
        <img className={`rounded-full bg-gray-50/30 border-2 ${random.boolean ? "outline ouline-3 outline-primary outline-offset-2" : ""}`} alt="news picture" src={data.source_icon} width="50" height="50" />
        <div>
          <h3 className="font-medium border mb-1 font-medium">{data.source_name}</h3>
          <div className="text-xs flex gap-2 items-center text-slate-400">
            <span>{getPastTime(data.pubDate)}</span>
            <span>•</span>
            <span><IoMdGlobe /></span>
          </div>
        </div>
        <div className="ml-auto flex gap-3 items-center text-2xl">
          <IoIosMore />
          <IoMdClose />
        </div>
      </li>
      <li className="px-3 text-slate-700">
        <NewsContent text={data.description?.replace(/\.{3}.*$/s, ".")} />
      </li>
      <li>
        <Link href={data.link} className="bg-gray-500/30">
          <img className="w-full" alt="create story picture" src={data.image_url} width="200" height="120" />
        </Link>
      </li>
      {random.boolean() && (
        <li className="bg-gray-100">
          <Link
            href={data.link}
            className="px-3 block active:bg-gray-200"
          >
            <h4 className="text-slate-400">{data.source_url.replace(/^http(s)?\:\/\/(www\.)?/i, "").toUpperCase()}</h4>
            <span className="font-bold">{data.title.replace(/(?<=(\w+\s){9}\w+(?=\s)).+$/, "...")}</span>
            <span className="block text-slate-400 text-md">{data.description?.split(/\s+/).slice(0, 10).join(" ")}</span>
          </Link>
        </li>
      )}
      <li className="px-3 text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-[2px]">
          <span className="w-4 grid place-items-center bg-primary aspect-square rounded-full text-[70%] text-white">
            <IoMdThumbsUp />
          </span>
          {random.choice(["😀", "😥", "😡", <FcLike className="text-lg" />, ""])}
          <span>{likes}</span>
        </div>
        <div>{comments} comments</div>
      </li>
      <li className="px-3 flex justify-between">
        {[[AiOutlineLike, likes], [FaRegComment, comments], [FaWhatsapp], [PiShareFatLight]].map(([icon, num], i) => (
          <ButtonReaction key={i} Icon={icon} num={num} />
        ))}
      </li>
    </ul>
  )
}


function ButtonReaction({ Icon, num }) {
  return (
    <button className="flex gap-2 justify-center items-center py-2 px-5 bg-gray-100 active:bg-gray-200 rounded-full w-[70px]">
      <span className="text-lg"><Icon /></span> {(typeof num === "number") && <span className="text-sm">{num}</span>}
    </button>
  )
}


function getPastTime(publishedAt) {
  const pastTime = moment(publishedAt);
  const now = moment();
  const seconds = now.diff(pastTime, 'seconds');
  const minutes = now.diff(pastTime, 'minutes');
  const hours = now.diff(pastTime, 'hours');
  const days = now.diff(pastTime, 'days');
  const weeks = now.diff(pastTime, 'weeks');
  const months = now.diff(pastTime, 'months');
  const years = now.diff(pastTime, 'years');
  let result = '';
  if (seconds < 60)
    result = `${seconds}s`;
  else if (minutes < 60)
    result = `${minutes}m`;
  else if (hours < 24)
    result = `${hours}h`;
  else if (days < 7)
    result = `${days}d`;
  else if (weeks < 4)
    result = `${weeks}wk`;
  else if (months < 12)
    result = `${months}M`;
  else
    result = `${years}y`;
  return result
}