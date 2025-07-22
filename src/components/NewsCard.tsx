import Image from "next/image"
import Link from "next/link"
import { FaRegComment } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { PiShareFatLight } from "react-icons/pi";
import { IoMdGlobe } from "react-icons/io";
import { IoIosMore } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import FeedContent from "@/components/FeedContent"
import random from "random"
import moment from "moment"




type kk = {
  id: string,
  title: string,
  description: string,
  content: string,
  url: string,
  image: string,
  publishedAt: string,
  source: {
    id: string,
    name: string,
    url: string
  }
}



export default function News({ data }) {
  const likes = random.int(100, 999)
  const comments = random.int(100, 999)
  return (
    <ul className="py-3 space-y-3 border-t-4 border-t-gray-300">
      <li className="px-3 flex items-center gap-3">
        <Image className="rounded-full" alt="news picture" src="https://picsum.photos/seed/news1/60" width="50" height="50" />
        <div>
          <h3 className="font-medium mb-1 font-medium">{data.source.name}</h3>
          <div className="text-xs flex gap-2 items-center text-slate-400">
            <span>{getPastTime(data.publishedAt)}</span>
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
        <FeedContent text={data.content.replace(/\.{3}.*$/s, ".")} />
      </li>
      <li>
        <Link href={data.url}>
          <img className="w-full" alt="create story picture" src={data.image} width="200" height="120" />
        </Link>
      </li>
      {random.int(1, 10) > 4 && (
        <li className="px-3 bg-gray-100">
          <Link
            href={data.url}
            className="block active:bg-gray-200"
          >
            <h4 className="text-slate-400">{data.source.name}</h4>
            <span className="font-bold">{data.title}</span>
            <span className="block text-slate-400 text-md">{data.description}</span>
          </Link>
        </li>
      )}
      <li className="px-3 text-slate-400 flex items-center justify-between">
        <div>😡😂<span>{likes}</span></div>
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