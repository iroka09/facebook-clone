
// Client-side usage example
export function getProcessedImageSRC(originalUrl: string, q = 10): string {
  if (process.env.NODE_ENV === "production")
    return `/api/process_image?q=${q}url=${originalUrl}`
  return originalUrl
}