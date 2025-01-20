import { generateSpeech } from "@/lib/actions/google-cloud"

export async function POST(req: Request) {
  try {
    const { text } = await req.json()
    const audioContent = await generateSpeech(text);
    console.log(audioContent)
    return new Response(audioContent)
  } catch (error) {
    console.log(`Error when calling API --> ${error}`);
  }
}