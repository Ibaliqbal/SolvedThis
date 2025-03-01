/**
 * Original source
 * @see https://medium.com/@bypanda/add-rate-limit-to-server-actions-in-next-js-14-609edc68813d
 */

const idToRequestCount = new Map<string, number>(); // keeps track of individual users
const rateLimiter = (day: number, max: number) => {
  return {
    windowStart: Date.now(),
    windowSize: 60 * 60 * 24 * day, // Milliseconds (currently 1 Hour)
    maxRequests: max,
  };
};

export const rateLimit = (ip: string, day: number = 1, max: number = 15) => {
  // Check and update current window
  const now = Date.now();
  const rateLimit = rateLimiter(day, max);
  const isNewWindow = now - rateLimit.windowStart > rateLimit.windowSize;
  if (isNewWindow) {
    rateLimit.windowStart = now;
    idToRequestCount.set(ip, 0);
  }

  // Check and update current request limits
  const currentRequestCount = idToRequestCount.get(ip) ?? 0;
  if (currentRequestCount >= rateLimit.maxRequests) return true;
  idToRequestCount.set(ip, currentRequestCount + 1);

  return false;
};
