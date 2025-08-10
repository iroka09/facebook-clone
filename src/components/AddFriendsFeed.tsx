"use client"


import { useState } from "react"
import { UserDocument } from "@/lib/get_users_types"
import { RiGroupLine } from "react-icons/ri";
import { IoIosMore } from "react-icons/io";
import { FaChevronRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { HiUserAdd } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";



export default function AddFriendsFeed({ people: _people, mutuals, totalMutual, withRemoveButton }: { people: UserDocument[], mutuals: UserDocument[], totalMutual: number[], withRemoveButton: boolean }) {
  const [people, setPeople] = useState(_people)
  const removePerson = (email: string) => {
    setPeople(x => x.filter(y => y.email !== email))
  }
  const toggleRequest = (email: string) => {
    setPeople(people => people.map(person => {
      if (person.email === email) {
        return { ...person, sent_friend_request: !person.sent_friend_request }
      }
      return { ...person }
    }))
  }
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
        {people.map((person, i) => {
          const mutualPic = mutuals[i] ? mutuals[i].picture.thumbnail : mutuals[0].picture.thumbnail
          return (
            <li key={person.email} className="inline-flex flex-col w-[260px] snap-center rounded-lg overflow-hidden border">
              <img src={person.picture.large} className="w-full aspect-square" />
              <div className="flex-1 p-3 space-y-2">
                <h4 className="text-lg font-bold capitalize">
                  {person.name.first} {person.name.last}
                </h4>
                <div className="flex items-center gap-1 opacity-70">
                  <img src={mutualPic} className="w-5 aspect-square rounded-full border" />
                  <span className="text-sm">{totalMutual[i]} mutual friends</span>
                </div>
                {withRemoveButton ? (
                  <div className="mt-4 flex justify-between flex-1 items-end justify-between *:text-sm">
                    {(person.sent_friend_request) ?
                      <Button variant="outline" onClick={() => toggleRequest(person.email)} className="hover:border-destructive hover:text-destructive hover:bg-transparent"><IoMdClose /> &nbsp; Cancel Req</Button>
                      :
                      <Button onClick={() => toggleRequest(person.email)}><HiUserAdd /> Add Friend</Button>
                    }
                    <Button variant="outline" className="order ml-auto" onClick={() => removePerson(person.email)}>Remove</Button>
                  </div>
                ) : (
                  <div className="mt-4">
                    <Button className="flex gap-2 w-full border border-primary text-primary rounded-none py-5 dormant-btn" variant="outline">
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