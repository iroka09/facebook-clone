
import { UserData, UserDocument } from "./get_users_types"
import { writeToCache, readFromCache } from "@/lib/fetch_cache"
import random from "random"


const cacheKey = "fetched_users"
// Fetch with cache fallback
export async function getUsers(): Promise<UserDocument[] | never> {
  try {
    // First try to fetch fresh data
    const resp = await fetch('https://raw.githubusercontent.com/feedhenry/users-api/master/seed/users.json', { cache: "force-cache" });
    if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`);
    const data = (await resp.json() as UserData)[0]
    // Cache the fresh data
    // console.log(data)
    await writeToCache(cacheKey, data.documents);
    data.documents.sort(() => random.boolean() ? 1 : -1)
    return data.documents
  }
  catch (e) {
    console.log('Users Fetch failed, trying cache');
    // If fetch fails, try to get cached data
    const cachedData = await readFromCache<UserDocument[]>(cacheKey);
    if (cachedData) {
      console.log('Users Fetch Using cached data');
      return cachedData;
    }
    // If no cached data available, rethrow the original error
    throw e
  }
}