import Groq from "groq-sdk"

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" })

export interface AIMessage {
  role: "system" | "user" | "assistant"
  content: string
}

export async function generateResponse(messages: AIMessage[]): Promise<string> {
  if (!process.env.GROQ_API_KEY) {
    return fallbackResponse(messages[messages.length - 1].content)
  }

  const completion = await groq.chat.completions.create({
    messages,
    model: "llama-3.1-8b-instant",
    temperature: 0.3,
    max_tokens: 1024,
  })

  return completion.choices[0]?.message?.content || "I couldn't generate a response."
}

function fallbackResponse(query: string): string {
  return `I understand you're asking about "${query}". To enable AI-powered responses with real analysis, please configure the GROQ_API_KEY environment variable. You can get a free API key at https://console.groq.com`
}
