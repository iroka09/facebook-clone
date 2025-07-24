
import News from "@/components/News"
import Reels from "@/components/Reels"
import random from "random"
import { NewsDataArticle } from "@/lib/getNews"


export default function NewsFeed({ news }: { news: NewsDataArticle[] }) {
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
  /*
  console.log(news, "\n=≠===≠======\n")
  const box = [
    {
      name: "news",
      component: News,
      props: {}
    },
    {
      name: "reels",
      component: Reels,
      props: {}
    }]
  const output: typeof box = []
  output.push({ ...box[0], props: { data: pick(news) } })
  console.log("output.push(box[])= ", output[0])
  let i = 20
  while (i) {
    const result = { ...random.choice(box)! } as typeof output
    if (i > 19) console.log("result=", result)
    switch (result.name) {
      case "news":
        result.props.data = pick(news)
        if (i >= 19) console.log("result.props.data=", result.props.data)
        break;
      case "reels":
      default:
    }
    const lastInOutput = output[output.length - 1]
    if (lastInOutput.name === "news" || lastInOutput.name !== result.name) {
      output.push({ ...result })
    }
    i--
  }
  //console.log("output outside loop=", output.map(x => x.props.data))
  const elements: (React.JSX.Element | never)[] = []
  output.forEach((obj, i) => {
    elements.push(<obj.component key={i} seed={i} {...(obj.props)} />)
  })
  return elements
  */
}


function pick(arr: NewsDataArticle[], count = 1) {
  let x = arr.splice(random.int(0, arr.length - 1), count) || []

  return x.length > 1 ? [...x] : { ...x[0] }
}