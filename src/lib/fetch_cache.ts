import fs from 'fs';
import path from 'path';

const CACHE_DIR = path.join(process.cwd(), '.data-cache');
const CACHE_FILE = path.join(CACHE_DIR, 'api-cache.json');
const prettifyJson = false;

// Ensure cache directory exists
function ensureCacheDir(): void {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
}

// Read from cache
export async function readFromCache<T>(cacheKey: string): Promise<T | null> {
  ensureCacheDir();
  if (!fs.existsSync(CACHE_FILE)) return null
  try {
    const cacheData = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
    return cacheData[cacheKey] as T || null;
  } catch (error) {
    console.log('Error reading cache:', error);
    return null;
  }
}

// Write to cache
export async function writeToCache(cacheKey: string, data: object): Promise<void> {
  ensureCacheDir();
  let cacheData = {};
  if (fs.existsSync(CACHE_FILE)) {
    cacheData = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
  }
  cacheData[cacheKey] = data;
  fs.writeFileSync(CACHE_FILE,
    JSON.stringify(...prettifyJson ? [cacheData, null, 2] : [cacheData])
  );
}