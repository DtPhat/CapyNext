
export function capText(text: string, maxLength: number = 300) {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.substring(0, maxLength) + '...';
  }
}

export function isSentence(text: string) {

  // Check if the string contains spaces or ends with a punctuation mark
  const isSentence = /\s/.test(text.trim()) || /[.!?]$/.test(text.trim());

  console.log("isSentenceCheck: ", text,  isSentence);

  // Return 'sentence' or 'word'
  return isSentence;
}