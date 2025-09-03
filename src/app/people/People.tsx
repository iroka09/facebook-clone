"use client"


import React, { useState } from "react"
import { UserDocument } from "@/lib/get_users_types"
import Link from "next/link"
//import { RiGroupLine } from "react-icons/ri";
//import { IoIosMore } from "react-icons/io";
//import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { IoMdClose } from "react-icons/io";
//import * as yup from "yup"

import { IoSearch } from "react-icons/io5";


interface AppProps {
  people: UserDocument[],
  mutuals: (UserDocument | null)[],
  totalMutualPerUser: number[],
}

export default function People({ people: _people, mutuals, totalMutualPerUser }: AppProps) {
  //  const router = useRouter()
  const [people, setPeople] = useState(_people)
  const removePerson = (email: string) => {
    setPeople(x => x.filter(y => y.email !== email))
  }
  const sendRequest = (email: string, sent = true) => {
    setPeople(people => people.map(person => {
      if (person.email === email) {
        return { ...person, sent_friend_request: sent }
      }
      return { ...person }
    }))
  }
  return (
    <div className="px-3">
      <div className="flex justify-between py-2 sticky top-0 z-[500] bg-white">
        <div className="flex gap-3 items-center">
          <Link href="/">
            <FaChevronLeft className="text-lg" />
          </Link>
          <h1 className="text-2xl font-bold">Friends</h1>
        </div>
        <IoSearch className="inline-grid place-items-center p-1 rounded-full bg-slate-200 text-slate-700 text-3xl active:bg-slate-300" />
      </div>
      <div className="space-y-5 my-2">
        <div className="space-x-4 *:font-bold *:inline-block *:rounded-full *:px-3 *:py-1 *:bg-gray-200 active:*:bg-gray-300 ">
          <span>Friend requests</span>
          <span>Your friends</span>
        </div>
        <span className="block font-bold text-lg">people you may know</span>
      </div>
      <ul className="space-y-3">
        {people.map((person, i) => {
          const mutualPic = mutuals[i] ? mutuals[i].picture.thumbnail : mutuals[0]?.picture.thumbnail
          return (
            <li
              key={person.email}
              className="flex gap-3 items-center"
            >
              <img src={person.picture.large} className="w-[100px] h-[100px] rounded-full" />
              <div className="flex-1 flex flex-col justify-around space-y-2 ">
                <h4 className="text-lg capitalize">
                  {`${person.name.first} ${person.name.last}`}`
                </h4>
                <div className="flex items-center gap-1 opacity-70">
                  {(mutuals[i] && mutualPic) ?
                    <>
                      <img src={mutualPic} className="w-5 aspect-square rounded-full border" />
                      <span className="text-sm">{totalMutualPerUser[i]} mutual friends</span>
                    </>
                    :
                    <span className="block h-[10px]"></span>
                  }
                </div>
                <div>
                  {(person.sent_friend_request) ?
                    <Button variant="outline" onClick={() => sendRequest(person.email, false)} className="cancel_req text-sm hover:text-foreground hover:bg-transparent w-full"><IoMdClose /> &nbsp; Cancel Request</Button>
                    :
                    <div className="flex justify-between flex-1 items-end justify-between *:text-sm *:flex-1 gap-3">
                      <Button onClick={() => sendRequest(person.email, true)} className="add_friend_button shadow-none">
                        Add friend
                      </Button>
                      <Button className="shadow-none text-foreground order ml-auto bg-gray-200 hover:bg-gray-300" onClick={() => removePerson(person.email)}>Remove</Button>
                    </div>
                  }
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}