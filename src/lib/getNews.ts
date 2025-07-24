
import random from "random"


const categories = ["general", "world", "nation", "business", "technology", "entertainment", "sports", "science", "health"] as const

export interface NewsDataResponse {
  status: string; // "success"
  totalResults: number;
  results: NewsDataArticle[];
  nextPage?: string;
}

export interface NewsDataArticle {
  article_id: string;
  title: string;
  link: string;
  keywords?: string[];
  creator?: string[];
  description?: string;
  content?: string;
  pubDate: string;
  pubDateTZ?: string;
  image_url?: string;
  video_url?: string | null;
  source_id: string;
  source_name?: string;
  source_priority?: number;
  source_url?: string;
  source_icon?: string;
  language?: string;
  country?: string[];
  category?: string[];
  sentiment?: 'positive' | 'neutral' | 'negative';
  sentiment_stats?: {
    positive: number;
    neutral: number;
    negative: number;
  };
  ai_tag?: string[];
  ai_region?: string[];
  ai_org?: string[] | null;
  ai_summary?: string;
  ai_content?: string;
  duplicate?: boolean;
}

const NEWSDATA_API_KEY = process.env.NEWSDATA_API_KEY

export async function getNews(_url?: string): Promise<NewsDataResponse["results"]> {
  const url = _url || `https://newsdata.io/api/1/latest?apikey=${NEWSDATA_API_KEY}&q=${random.choice(categories)}&language=en&prioritydomain=top`
  const resp = await fetch(url, { cache: "no-store" })
  const news = (await resp.json()) as NewsDataResponse
  return news.results
}




/*
export interface NewsType {
  totalArticles: number,
  articles: NewsArticles
}

export type NewsArticles = Array<{
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
    url: string,
    logo_icon?: string
  }
}>


const GNEWS_API_KEY = process.env.GNEWS_API_KEY

export async function getNews(_url?: string): Promise<NewsType["articles"]> {
  const url = _url || `https:gnews.io/api/v4/top-headlines?category=${categories[0]}&lang=en&country=us&max=10&apikey=${GNEWS_API_KEY}`
  const resp = await fetch(url, { cache: "force-cache" })
  const news = (await resp.json()) as NewsType
  return news.articles
}
*/