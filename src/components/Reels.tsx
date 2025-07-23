import Image from "next/image"
import { FaPlay } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { BiSolidMoviePlay } from "react-icons/bi";
import { IoIosMore } from "react-icons/io";
import random from "random"


export default function Reels({ seed }) {
  return (
    <>
      <ul className="p-3 space-y-2">
        <li className="flex justify-between ">
          <div className="flex gap-2 items-centerfont-bold *:inline-block">
            <BiSolidMoviePlay className="text-2xl" />
            <h4 className="text-lg pb-1">Reels</h4>
          </div>
          <IoIosMore className="ml-auto text-2xl" />
        </li>
        <li className="rounded-xl overflow-hidden w-full aspect-[5/7] relative">
          <Image className="block w-full h-full absolute inset-0" alt="create story picture" src={`https://picsum.photos/seed/reel${seed}/100`} width="100" height="100" />
          <div className="absolute inset-0 grid place-items-center">
            <span className="grid place-items-center w-12 aspect-square rounded-full border-2 bg-gray-800/50 text-white">
              <FaPlay />
            </span>
          </div>
          <div className="flex gap-2 absolute bottom-2 text-white left-2">
            <IoEyeSharp className="text-2xl" />
            <span className="text-lg">{random.int(1, 99)}M</span>
          </div>
        </li>
      </ul>
    </>)
}