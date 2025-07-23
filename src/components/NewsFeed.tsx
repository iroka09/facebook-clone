
import News from "@/components/News"
import Reels from "@/components/Reels"
import random from "random"
import { NewsArticles } from "@/lib/getNews"


export default function NewsFeed({ news }: { news: NewsArticles }) {
  const output = []
  const box = [
    {
      name: "news",
      component: News
    },
    {
      name: "reels",
      component: Reels
    }]
  let i = 20
  while (i > 0) {
    i--
    let result
    if (i > 17) {
      result = box[0]
    }
    else {
      result = random.choice(box)
    }
    if (result.name === "news") {
      result.props = {
        data: random.choice(news)
      }
    }
  //  else if (result.name === "reels") { }
    output.push(<result.component key={i} seed={i}{...(result.props)} />)
  }
  return output
}
