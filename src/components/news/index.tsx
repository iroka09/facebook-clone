
import Link from "next/link"
import { IoMdClose } from "react-icons/io";
import { IoIosMore } from "react-icons/io";
import { IoMdGlobe } from "react-icons/io";
import NewsContent from "./NewsContent"
import NewsReactions from "./NewsReactions"
import { FcLike } from "react-icons/fc";
import random from "random"
import moment from "moment"




export default function News({ data }) {
  const hasStatus = random.boolean()
  const showSourceLinkBelow = random.boolean()
  //console.log(data, "loded from news")
  return (
    <ul className="py-3 space-y-3">
      <li className="px-3 flex items-center gap-3">
        <div className={`w-fit aspect-square overflow-hidden rounded-full box-border ${hasStatus ? "border-2 border-primary" : "border-2 border-gray-500"}`}>
          <img className="bg-gray-50/30 dormant-btn" alt="news picture" src={data.source_icon} width="50" height="50" />
        </div>
        <div>
          <h3 className="font-medium mb-1 font-medium">{data.source_name}</h3>
          <div className="text-xs flex gap-2 items-center text-slate-400">
            <span>{getPastTime(data.pubDate)}</span>
            <span>•</span>
            <span><IoMdGlobe /></span>
          </div>
        </div>
        <div className="ml-auto flex gap-3 items-center text-2xl dormant-btn">
          <IoIosMore />
          <IoMdClose />
        </div>
      </li>
      <li className="px-3 text-slate-700">
        <NewsContent
          text={data.description?.replace(/\.{3}.*$/s, ".")}
          totalShortWords={random.int(8, 15)}
        />
      </li>
      <li>
        <Link href={data.link} className="bg-gray-500/30">
          <img className="w-full" alt="create story picture" src={data.image_url} width="200" height="120" />
        </Link>
      </li>
      {random.boolean() && (
        <li className="bg-gray-100">
          <Link
            className="px-3 block active:bg-gray-200"
            href={data.link}
          >
            {showSourceLinkBelow && <h4 className="text-slate-400">{data.source_url.replace(/^http(s)?\:\/\/(www\.)?/i, "").toUpperCase()}</h4>}

            <span className="font-bold">{data.title.replace(/(?<=(\w+\s){9}\w+(?=\s)).+$/, "...")}</span>
            {showSourceLinkBelow && random.boolean() && <span className="block text-slate-400 text-md">{data.description?.split(/\s+/).slice(0, 10).join(" ")}</span>}
          </Link>
        </li>
      )}
      <NewsReactions
        comments={random.int(1, 999) + ""}
        likes={random.int(1, 999)}
        emoji={random.choice(["😀", "😥", "😡", <FcLike className="text-lg" />, ""])}
        link={data.link}
      />
    </ul>
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