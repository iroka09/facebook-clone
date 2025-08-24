"use client"


import React, { useState, useEffect, useRef } from "react"
import { UserDocument } from "@/lib/get_users_types"
import Link from "next/link"
import { RiGroupLine } from "react-icons/ri";
import { IoIosMore } from "react-icons/io";
import { FaChevronRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { HiUserAdd } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
//import * as yup from "yup"



interface AppProps {
  people: UserDocument[],
  mutuals: UserDocument[],
  totalMutual: number[],
  withRemoveButton: boolean
}

function Test({ children }: { children: React.ReactNode }) {
  // console.log(children)
  return <></>
}

export default function AddFriendsFeed({ people: _people, mutuals, totalMutual, withRemoveButton }: AppProps) {
  const [people, setPeople] = useState(_people)
  const containerRef = useRef<HTMLUListElement>(null)
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
  useEffect(() => {
    const addFriendsBox = containerRef.current
    const card = addFriendsBox?.firstElementChild as (HTMLLIElement | null)
    if (addFriendsBox && card) {
      const cardWidth = card.offsetWidth / 2
      function trigger(e: MouseEvent) {
        const clicked = e.target as HTMLElement
        if (clicked.tagName === "BUTTON" && clicked.classList.contains("add_friend_button")) {
          addFriendsBox!.scrollBy({
            left: cardWidth,
            top: 0,
            behavior: "smooth"
          })
        }
      }
      addFriendsBox.addEventListener("click", trigger)
      return () => addFriendsBox.removeEventListener("click", trigger)
    }
  }, [])
  return (
    <div>
      <Test>
        <h2>My heading</h2>
        <button key="my_key_btn" onClick={(e) => alert(e.target)}>Testing Button</button>
      </Test>
      <div className="flex justify-between px-3 py-2">
        <div className="flex gap-2 items-center">
          <RiGroupLine className="text-lg" />
          <span>people you may know</span>
        </div>
        <IoIosMore className="text-3xl active:bg-slate-200 dormant-btn" />
      </div>
      <ul ref={containerRef} className="whitespace-nowrap overflow-x-auto space-x-3 snap-x snap-mandatory px-3">
        <AnimatePresence >
          {people.map((person, i) => {
            const mutualPic = mutuals[i] ? mutuals[i].picture.thumbnail : mutuals[0].picture.thumbnail
            return (
              <motion.li
                key={person.email}
                className="inline-flex flex-col snap-center rounded-lg overflow-hidden border"
                initial={{
                  opacity: 1,
                  width: 260
                }}
                exit={{
                  opacity: 0,
                  width: 0,
                  transition: {
                    opacity: { duration: 0.2 },
                    width: { duration: 0.3, delay: 0.2 }
                  }
                }}
              >
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
                        <Button variant="outline" onClick={() => sendRequest(person.email, false)} className="cancel_req hover:text-foreground hover:bg-transparent w-full"><IoMdClose /> &nbsp; Cancel Request</Button>
                        :
                        <>
                          <Button onClick={() => sendRequest(person.email, true)} className="add_friend_button">
                            <HiUserAdd /> Add Friend
                          </Button>
                          <Button variant="outline" className=" remove_card order ml-auto" onClick={() => removePerson(person.email)}>Remove</Button>
                        </>
                      }
                    </div>
                  ) : (
                    <div className="mt-4">
                      {
                        (person.sent_friend_request) ?
                          <Button variant="outline" onClick={() => sendRequest(person.email, false)} className="cancel_req flex gap-3 hover:text-foreground hover:bg-transparent w-full rounded-none">
                            <IoMdClose /> Cancel Request
                          </Button>
                          :
                          <Button className="add_friend_button flex gap-3 w-full border border-primary text-primary rounded-none" variant="outline" onClick={() => sendRequest(person.email, true)}>
                            <HiUserAdd /> Add Friend
                          </Button>
                      }
                    </div>
                  )}
                </div>
              </motion.li>
            )
          })}
        </AnimatePresence>
      </ul>
      <div className="text-center py-3 px-4 ">
        <Link href="/people" className="inline-flex gap-2 items-center active:bg-slate-200 p-2 mx-auto">See All <FaChevronRight /></Link>
      </div>
    </div>
  )
}