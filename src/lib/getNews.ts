
import random from "random"
import { writeToCache, readFromCache } from "@/lib/fetch_cache"

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
const categories = ["general", "world", "nation", "business", "technology", "entertainment", "sports", "science", "health"] as const
const cacheKey = "fetched_news"


export async function getNews(count = 1): Promise<NewsDataResponse["results"]> {
  const arr: NewsDataResponse[] = []
  const q = [...categories]
  try {
    // First try to fetch fresh data
    while (count--) {
      const url = `https://newsdata.io/api/1/latest?apikey=${NEWSDATA_API_KEY}&q=${q.splice(random.int(0, q.length - 1), 1)[0]}&language=en&prioritydomain=top`
      const resp = await fetch(url, { cache: "no-store" })
      if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`);
      const news = (await resp.json()) as NewsDataResponse
      arr.push(news)
    }
    let value: Partial<NewsDataResponse> = {}
    arr.forEach((x, i) => {
      if (i === 0) {
        value = { ...x }
      }
      else {
        value.totalResults! += x.totalResults;
        value.results = [...value.results!, ...x.results]
      }
    })
    // Cache the fresh data
    await writeToCache(cacheKey, value);
    return (value as NewsDataResponse).results
  }
  catch (fetchError) {
    console.log('News Fetch failed, trying cache');
    // If fetch fails, try to get cached data
    const cachedData = await readFromCache<NewsDataResponse>(cacheKey);
    if (cachedData) {
      console.log('News Fetch Using cached data');
      return cachedData.results;
    }
    // If no cached data available, rethrow the original error
    throw fetchError;
  }
}