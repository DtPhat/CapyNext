// // import { NextApiRequest, NextApiResponse } from "next"
// export async function GET() {
//   Response.json("Tao la Doan Tien Phat")
// }

import translateText from "../../lib/actions"

export async function POST(req: Request) {
  const {text} = await req.json()
  const translatedText = await translateText(text)
  return new Response(JSON.stringify({text: translatedText}))
}