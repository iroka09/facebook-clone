"use client"


import { useState, useEffect, useRef } from "react"
import { UserDocument } from "@/lib/get_users_types"
import { RiGroupLine } from "react-icons/ri";
import { IoIosMore } from "react-icons/io";
import { FaChevronRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { HiUserAdd } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";



export default function AddFriendsFeed({ people: _people, mutuals, totalMutual, withRemoveButton }: { people: UserDocument[], mutuals: UserDocument[], totalMutual: number[], withRemoveButton: boolean }) {
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
    const cardWidth = Number(card?.offsetWidth) / 2
    if (addFriendsBox && card) {
      function trigger(e: MouseEvent) {
        const clicked = e.target as HTMLElement
        if (clicked.tagName === "BUTTON") {
          const email = clicked.dataset.email
          const isAddButton = clicked.classList.contains("add_friend_button")
          const isCancelButton = clicked.classList.contains("cancel_req")
          const isRemoveButton = clicked.classList.contains("remove_card")
          if (isRemoveButton) removePerson(email)
          else sendRequest(email, isAddButton)
          if (isAddButton) {
            addFriendsBox!.scrollBy({
              left: cardWidth,
              top: 0,
              behavior: "smooth"
            })
          }
        }
      }
      addFriendsBox.addEventListener("click", trigger)
      return () => addFriendsBox.removeEventListener("click", trigger)
    }
  }, [])
  return (
    <div>
      <div className="flex justify-between px-3 py-2">
        <div className="flex gap-2 items-center">
          <RiGroupLine className="text-lg" />
          <span>people you may know</span>
        </div>
        <IoIosMore className="text-3xl active:bg-slate-200 dormant-btn" />
      </div>
      <ul ref={containerRef} className="whitespace-nowrap overflow-x-auto space-x-3 snap-x snap-mandatory px-3">
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
                      <Button variant="outline" data-email={person.email} /*onClick={() => sendRequest(person.email, false)}*/ className="cancel_req hover:text-foreground hover:bg-transparent w-full"><IoMdClose /> &nbsp; Cancel Request</Button>
                      :
                      <>
                        <Button data-email={person.email}  /*onClick={() => sendRequest(person.email, true)}*/ className="add_friend_button">
                          <HiUserAdd /> Add Friend
                        </Button>
                        <Button variant="outline" data-email={person.email} className=" remove_card order ml-auto" /*onClick={() => removePerson(person.email)}*/>Remove</Button>
                      </>
                    }
                  </div>
                ) : (
                  <div className="mt-4">
                    {(person.sent_friend_request) ?
                      <Button variant="outline" data-email={person.email}  /*onClick={() => sendRequest(person.email, false)}*/ className="cancel_req flex gap-3 hover:text-foreground hover:bg-transparent w-full rounded-none">
                        <IoMdClose /> Cancel Request
                      </Button>
                      :
                      <Button className="add_friend_button flex gap-3 w-full border border-primary text-primary rounded-none" variant="outline" data-email={person.email}  /*onClick={() => sendRequest(person.email, true)}*/>
                        <HiUserAdd /> Add Friend
                      </Button>
                    }
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