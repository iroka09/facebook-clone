
import { Metadata } from "next"
import { getUsers } from "@/lib/getUsers"
import People from "./People"
import Header from "@/components/Header"
import random from "random"



export const metadata: Metadata = {
  title: "Friends"
}


export default async function App() {
  const _users = await getUsers()
  const users = _users//.slice(0, 15)
  users.reverse()
  const mutuals = _users.map(x => random.boolean() ? x : null).slice(users[15] ? 15 : 0)
  return (<>
    <Header />
    <People
      people={users}
      mutuals={mutuals}
      totalMutualPerUser={[...Array(users.length)].map(() => random.int(2, 20))}
    />
  </>)
}