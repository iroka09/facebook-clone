
import Header from "@/components/Header"
import NewsFeed from "@/components/NewsFeed"
import Image from "next/image"
import { BsFileImage } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { getNews } from "@/lib/getNews"
import { getUsers } from "@/lib/getUsers"


export default async function App() {
  const users = await getUsers()
  const news = await getNews()
  return (
    <div>
      <Header withNav />
      <section className="flex items-center justify-between gap-3 p-3">
        <span className="relative block">
          <Image alt="profile picture" src="https://picsum.photos/seed/profile_pic/60" width="60" height="60" className="rounded-full " />
          <span className="block absolute bottom-0 -right-1 w-4 aspect-square rounded-full bg-green-600 border-2 border-white"></span>
        </span>
        <div className="flex w-full">
          <input className="block rounded-full bg-slate-100 w-full p-3 outline-none placeholder:text-gray-800" placeholder="What's on your mind?" />
        </div>
        <BsFileImage className="text-5xl text-green-500" />
      </section>
      <section>
        <ul className="p-3 *:w-[100px] *:h-[180px] *:rounded-md *:overflow-hidden *:border whitespace-nowrap space-x-1 overflow-x-auto border-t-2 ">
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
                <img className="object-cover h-full w-full" alt="create story picture" src={user.picture.large} width="100" height="200" />
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
      className={"relative inline-block active:bg-gray-100 active:scale-[0.95] select-none transition" +
        " " + className}
    >
      {children}
    </li>
  )
}