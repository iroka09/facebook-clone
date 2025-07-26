
import { UsersResponse } from "./get_users_types"
import { writeToCache, readFromCache } from "@/lib/fetch_cache"



const cacheKey = "fetched_users"
// Fetch with cache fallback
export async function getUsers(params?: string): Promise<UsersResponse["users"]> {
  try {
    // First try to fetch fresh data
    params = params?.startsWith("?") ? params : "?" + params
    const resp = await fetch('https://dummyjson.com/users/' + params || "", { cache: "no-store" });
    if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`);
    const data = (await resp.json()) as UsersResponse;
    // Cache the fresh data
    await writeToCache(cacheKey, data);
    return data.users
  } catch (fetchError) {
    console.error('Users Fetch failed, trying cache');
    // If fetch fails, try to get cached data
    const cachedData = await readFromCache<UsersResponse>(cacheKey);
    if (cachedData) {
      console.log('Users Fetch Using cached data');
      return cachedData.users;
    }
    // If no cached data available, rethrow the original error
    throw fetchError;
  }
}