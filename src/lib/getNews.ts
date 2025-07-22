

const API_KEY = process.env.GNEWS_API_KEY || "1046cb69a7c3778bb143226d67d60b1c"
const categories = ["general", "world", "nation", "business", "technology", "entertainment", "sports", "science", "health"] as const


export interface NewsType {
  totalArticles: number,
  articles: Array<{
    id: string,
    title: string,
    description: string,
    content: string,
    url: string,
    image: string,
    publishedAt: string,
    source: {
      id: string,
      name: string,
      url: string
    }
  }>
}


export async function getNews(_url?: string): Promise<NewsType["articles"]> {
  const url = _url || `https:gnews.io/api/v4/top-headlines?category=${categories[0]}&lang=en&country=us&max=10&apikey=${API_KEY}`
  const resp = await fetch(url, { cache: "force-cache" })
  const news = (await resp.json()) as NewsType
  return news.articles
}