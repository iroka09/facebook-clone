
import React from "react"
import News from "@/components/news"
import Reels from "@/components/reels"
import AddFriendsFeed from "@/components/AddFriendsFeed"
import random from "random"
import { NewsDataArticle } from "@/lib/getNews"
import { UserDocument } from "@/lib/get_users_types"



export default function NewsFeed({ news, users: _users }: { news: NewsDataArticle[], users: UserDocument[] }): React.ReactNode {
  const elements: ([string, React.JSX.Element] | never)[] = []
  //add news
  news.forEach((data) => {
    elements.push(["news", <News key={data.article_id} data={data} />])
  })
  //randomly add reels
  let i = 0;
  while (i < news.length) {
    if (i > 0 && elements[i - 1]?.[0] !== "reels" && random.int(0, 20) > 14) {
      elements.splice(i, 0, ["reels", <Reels key={Math.random()} seed={i} />])
    }
    i++
  }
  //add people you may know
  const users = _users.slice(0, 15)
  users.reverse()
  const mutuals = _users.slice(users[15] ? 15 : 0)
  const withRemoveButton = random.boolean()
  elements.splice(random.int(0, elements.length - 1), 0, ["add_friends_feed", <AddFriendsFeed key={Math.random()} users={users} mutuals={mutuals} withRemoveButton={withRemoveButton} />])
  return elements.map(x => x[1])
}