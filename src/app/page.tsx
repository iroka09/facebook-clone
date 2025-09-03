
import NewsFeed from "@/components/NewsFeed"
import Image from "next/image"
import Header from "@/components/Header"
import Link from "next/link"
import { BsFileImage } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { getNews } from "@/lib/getNews"
import { getUsers } from "@/lib/getUsers"



function CircleButton({ className = "", children, ...props }) {
  return (
    <button className="inline-grid place-items-center p-1 rounded-full bg-slate-200 text-slate-700 dormant-btn" {...props}>
      {children}
    </button>
  )
}


export default async function App() {
  const users = await getUsers()
  const news = await getNews()
  return (
    <div>
      <div className="px-3 py-2 flex justify-between items-center">
        <Link
          className="font-bold text-primary text-3xl"
          href="/"
        >
          facebook
        </Link>
        <div className="space-x-3 text-3xl active:*:bg-slate-300">
          <CircleButton><IoMdAdd /></CircleButton>
          <CircleButton><IoSearch /></CircleButton>
          <CircleButton><RxHamburgerMenu /></CircleButton>
        </div>
      </div>
      <Header />
      <section className="flex items-center justify-between gap-3 p-3">
        <span className="relative block dormant-btn">
          <Image alt="profile picture" src="https://picsum.photos/seed/profile_pic/60" width="60" height="60" className="rounded-full " />
          <span className="block absolute bottom-0 -right-1 w-4 aspect-square rounded-full bg-green-600 border-2 border-white"></span>
        </span>
        <div className="flex w-full">
          <input className="block rounded-full bg-slate-100 w-full p-3 outline-none placeholder:text-gray-800" placeholder="What's on your mind?" />
        </div>
        <BsFileImage className="text-5xl text-green-500 dormant-btn" />
      </section>
      <section>
        <ul className="p-3 *:w-[100px] *:h-[180px] *:rounded-md *:overflow-hidden *:border whitespace-nowrap space-x-1 overflow-x-auto hide-scrollbar border-t-2 ">
          <StoryLine>
            <div className="flex flex-col h-full">
              <div className="h-[60%]">
                <Image className="h-full w-full" alt="create story picture" src="https://picsum.photos/seed/zero/100" width="100" height="100" />
              </div>
              <div className="relative flex p-2 items-end justify-center gap-4 w-full border h-full">
                <IoMdAdd className="absolute rounded-full p-1 text-3xl text-white bg-primary inline-block border border-white top-[-20%]" />
                <span className="text-sm">Create story</span>
              </div>
            </div>
          </StoryLine>
          {
            users?.slice(0, 15).map((user, index) => (
              <StoryLine key={index}>
                <img className="object-cover h-full w-full" alt={`${user.name.first} ${user.name.last} story picture`} src={user.picture.large} width="100" height="200" />
                <span
                  className="absolute bottom-0 inset-x-0 p-2 font-bold text-white whitespace-normal [text-shadow:0_0_1px_black] capitalize"
                >
                  {user.name.first} {user.name.last}
                </span>
              </StoryLine>
            ))
          }
        </ul>
      </section >
      <section className="divide-y-4 divide-gray-300">
        <NewsFeed news={news} users={users} />
      </section>
    </div>
  )
}


function StoryLine({ className = "", children }) {
  return (
    <li
      className={"relative inline-block active:bg-gray-100 active:scale-[0.95] select-none transition dormant-btn" +
        " " + className}
    >
      {children}
    </li>
  )
}