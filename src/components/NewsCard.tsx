import Image from "next/image"
import { FaRegComment } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { PiShareFatLight } from "react-icons/pi";
import { IoMdGlobe } from "react-icons/io";
import { IoIosMore } from "react-icons/io";
import { IoMdClose } from "react-icons/io";


export default function News() {
  return (<>
    <ul className="py-3 space-y-3">
      <li className="px-3 flex items-center gap-3">
        <Image className="rounded-full" alt="news picture" src="https://picsum.photos/seed/news1/60" width="60" height="60" />
        <div>
          <h3 className="font-medium mb-1 font-medium">Informations Nigeria</h3>
          <div className="text-xs flex gap-2 items-center text-slate-400">
            <span>19h</span>
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
        The Chief Medical Director of Afe Babalola University Multi-System Hospital (AMSH), Dr Akinola Akinmade...
      </li>
      <li>
        <Image className="w-full" alt="create story picture" src="https://picsum.photos/seed/news55/200/120" width="200" height="120" />
      </li>
      <li className="px-3 bg-neutral-100">
        <h4 className="text-slate-400">VANGUARDNGR.COM</h4>
        <span className="font-bold">Buhari Could Have Lived If Treated At Our Facility ___ ABUAD Hospital's CMD</span>
        <span className="block text-slate-400">The Chief Medical Director Of Afe Babalola...</span>
      </li>
      <li className="px-3 text-slate-400 flex items-center justify-between">
        <div>😡😂<span>265</span></div>
        <div>54 comments</div>
      </li>
      <li className="px-3 flex justify-between">
        {[[AiOutlineLike, 256], [FaRegComment, 54], [FaWhatsapp], [PiShareFatLight]].map(([icon, num], i) => (
          <ButtonReaction key={i} Icon={icon} num={num} />
        ))}
      </li>
    </ul>
  </>)
}


function ButtonReaction({ Icon, num }) {
  return (
    <button className="flex gap-2 justify-center items-center py-2 px-4 bg-gray-200 rounded-full w-[70px]">
      <span className="text-lg"><Icon /></span> {(typeof num === "number") && <span className="text-sm">{num}</span>}
    </button>
  )
}