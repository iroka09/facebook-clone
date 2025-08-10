
// Client-side usage example
export function getProcessedImageSRC(originalUrl: string, q = 10): string {
  return originalUrl
  if (process.env.NODE_ENV === "production") {
    const url = `/api/process_image?q=${q}url=${encodeURIComponent(originalUrl)}`;
    return url
  }
  return originalUrl
}