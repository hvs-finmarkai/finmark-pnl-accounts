export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { processQuery } from "@/ai/service"

export async function POST(request: NextRequest) {
  const { message } = await request.json()

  if (!message || !message.trim()) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 })
  }

  try {
    const response = await processQuery(message)
    return NextResponse.json({ response })
  } catch (error: any) {
    return NextResponse.json({ response: `Error processing query: ${error.message}. Please check that GROQ_API_KEY is configured.` })
  }
}
