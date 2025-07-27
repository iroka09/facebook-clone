
import React from "react"
import News from "@/components/news"
import Reels from "@/components/reels"
import random from "random"
import { NewsDataArticle } from "@/lib/getNews"


export default function NewsFeed({ news }: { news: NewsDataArticle[] }): React.ReactNode {
  const elements: Array<React.JSX.Element | never>[] = []
  news.forEach((data) => {
    elements.push(["news", <News key={data.article_id} data={data} />])
  })
  let i = 0;
  while (i < news.length) {
    if (i > 0 && elements[i - 1]?.[0] !== "reels" && random.int(0, 20) > 14) {
      elements.splice(i, 0, ["reels", <Reels key={Math.random()} seed={i} />])
    }
    i++
  }
  return elements.map(x => x[1])
}