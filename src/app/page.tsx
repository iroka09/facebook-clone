
import Header from "@/components/Header"
import NewsCard from "@/components/NewsCard"
import Image from "next/image"
import { BsFileImage } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";


export default async function App() {
  return (
    <div>
      <Header withNav />
      <section className="flex items-center justify-between gap-3 p-3">
        <span className="relative block">
          <Image alt="profile picture" src="https://picsum.photos/seed/profile_pic/60" width="60" height="60" className="rounded-full " />
          <span className="block absolute bottom-0 -right-1 w-4 aspect-square rounded-full bg-green-600 border-2 border-white"></span>
        </span>
        <div className="flex w-full">
          <input className="block rounded-full bg-gray-200 w-full p-3 outline-none placeholder:text-gray-800" placeholder="What's on your mind?" />
        </div>
        <BsFileImage className="text-5xl text-green-500" />
      </section>
      <section>
        <ul className="p-3 *:w-[100px] *:h-[180px] *:rounded-md *:overflow-hidden *:border whitespace-nowrap space-x-1 overflow-x-auto [border-block:_2px_solid_#ccc] ">
          <li className="inline-block">
            <div className="flex flex-col h-full">
              <div className="h-[60%]">
                <Image className="h-full w-full" alt="create story picture" src="https://picsum.photos/seed/zero/100" width="100" height="100" />
              </div>
              <div className="relative flex pb-1 px-2 items-end justify-center gap-4 w-full border h-full">
                <IoMdAdd className="absolute rounded-full p-1 text-3xl text-white bg-primary inline-block border border-white top-[-20%]" />
                <span className="text-md">Create story</span>
              </div>
            </div>
          </li>
          {
            [...Array(10)].map((_, index) => (
              <li key={index} className="relative inline-block">
                <Image className="object-cover h-full w-full" alt="create story picture" src={`https://picsum.photos/seed/${"seed_" + index}/100/200`} width="100" height="200" />
                <span className="absolute z-1 bottom-0 left-0 right-0 p-2 font-bold text-white" style={{ textShadow: "0 0 1px black" }}>Joy Nwamaka</span>
              </li>
            ))
          }
        </ul>
      </section >
      <section >
        <NewsCard />
      </section>
    </div>
  )
}