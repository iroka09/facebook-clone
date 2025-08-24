
import React from "react"
import News from "@/components/news"
import Reels from "@/components/reels"
import AddFriendsFeed from "@/components/AddFriendsFeed"
import { NewsDataArticle } from "@/lib/getNews"
import { UserDocument } from "@/lib/get_users_types"
import random from "random"


type ElementNames = "news" | "reels" | "add_friends_feed"

export default function NewsFeed({ news, users: _users }: { news: NewsDataArticle[], users: UserDocument[] }): React.ReactNode {
  const elements: Array<[ElementNames, React.JSX.Element]> = []
  //add news
  news.forEach((data) => {
    elements.push(["news", <News key={data.article_id} data={data} />])
  })
  //randomly add reels
  let i = 0;
  while (++i < news.length) {
    if (elements[i - 1]?.[0] !== "reels" && random.int(0, 20) > 14) {
      elements.splice(i, 0, ["reels", <Reels key={`seed_${i}`} seed={`seed_${i}`} />])
    }
  }

  //add people you may know
  const users = _users.slice(0, 15)
  users.reverse()
  const mutuals = _users.slice(users[15] ? 15 : 0)
  const withRemoveButton = random.boolean()
  elements.splice(
    random.int(0, elements.length - 1),
    0,
    [
      "add_friends_feed",
      <AddFriendsFeed
        key={Math.random()}
        people={users}
        mutuals={mutuals}
        totalMutual={[...Array(users.length)].map(() => random.int(2, 20))}
        withRemoveButton={withRemoveButton}
      />
    ])
  return elements.map(x => x[1])
}