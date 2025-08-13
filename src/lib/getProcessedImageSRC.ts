
// Client-side usage example
export function getProcessedImageSRC(originalUrl: string, q = 50): string {
  if (process.env.NODE_ENV === "production")
    return `/api/process_image?q=${q}&url=${encodeURIComponent(originalUrl)}`
  return originalUrl
}