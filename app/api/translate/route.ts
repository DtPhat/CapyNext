import { translateText } from "@/lib/actions/google-cloud"

export async function POST(req: Request) {
  try {
    const { text } = await req.json()
    const translatedText = await translateText(text)
    return new Response(JSON.stringify({ text: translatedText }))
  } catch (error) {
    console.log(`Error when calling API --> ${error}`);
  }
}