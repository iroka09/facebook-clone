
import { UserDocument } from "./get_users_types"
import { RiGroupLine } from "react-icons/ri";
import { IoIosMore } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { HiUserAdd } from "react-icons/hi";
import { FaChevronRight } from "react-icons/fa";
import random from "random"



export default function AddFriendsFeed({ users, mutuals, withRemoveButton }: { users: UserDocument[], mutuals: UserDocument[], withRemoveButton: boolean }) {
  return (
    <div>
      <div className="flex justify-between px-3 py-2">
        <div className="flex gap-2 items-center">
          <RiGroupLine className="text-lg" />
          <span>people you may know</span>
        </div>
        <IoIosMore className="text-3xl active:bg-slate-200 dormant-btn" />
      </div>
      <ul className="whitespace-nowrap overflow-x-scroll space-x-3 snap-x snap-mandatory px-3">
        {users.map((user, i) => {
          const mutualPic = mutuals[i] ? mutuals[i].picture.thumbnail : mutuals[0].picture.thumbnail
          return (
            <li key={user.email} className="inline-flex flex-col w-[260px] snap-center rounded-lg overflow-hidden border">
              <img src={user.picture.large} className="w-full aspect-square" />
              <div className="flex-1 p-3">
                <h4 className="text-lg font-bold capitalize">
                  {user.name.first} {user.name.last}
                </h4>
                <div className="flex items-center gap-1 opacity-70">
                  <img src={mutualPic} className="w-5 aspect-square rounded-full border" />
                  <span className="text-sm">{random.int(2, 20)} mutual friends</span>
                </div>
                {withRemoveButton ? (
                  <div className="mt-4 flex justify-between flex-1 items-end justify-between *:text-sm dormant-btn">
                    <Button><HiUserAdd /> Add Friend</Button>
                    <Button variant="outline" className="order ml-auto">Remove</Button>
                  </div>
                ) : (
                  <div className="mt-4">
                    <Button className="flex gap-2 w-full border border-primary text-primary active:bg-primary/10 dormant-btn" variant="outline">
                      <HiUserAdd /> Add Friend</Button>
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ul>
      <div className="text-center py-3 px-4 ">
        <span className="inline-flex gap-2 items-center active:bg-slate-200 p-2 mx-auto dormant-btn">See All <FaChevronRight /></span>
      </div>
    </div>
  )
}