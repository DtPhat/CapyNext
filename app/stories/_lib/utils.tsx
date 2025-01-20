export function estimateReadingTime(text: string, wordsPerMinute = 200) {
  // Split the text into words
  const words = text.trim().split(/\s+/);
  // Calculate the number of words
  const numWords = words.length;
  // Calculate the reading time in minutes and round to the nearest integer
  const readingTimeMinutes = Math.ceil(numWords / wordsPerMinute);
  return readingTimeMinutes;
}
