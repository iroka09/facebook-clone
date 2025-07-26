
import News from "@/components/news"
import Reels from "@/components/Reels"
import random from "random"
import { NewsDataArticle } from "@/lib/getNews"


export default function NewsFeed({ news }: { news: NewsDataArticle[] }): React.ReactNode {
  const elements: Array<React.JSX.Element | never>[] = []
  news.forEach((data, i) => {
    elements.push(["news", <News key={i} data={data} />])
  })
  let i = 0, newsLength = news.length
  while (i < newsLength) {
    if (i > 0 && elements[i - 1]?.[0] !== "reels" && random.boolean()) {
      elements.splice(i, 0, ["reels", <Reels key={i} seed={i} />])
    }
    i++
  }
  return elements.map(x => x[1])
}