import { streamText, convertToModelMessages, type UIMessage } from 'ai'

export const maxDuration = 30

export async function POST(request: Request) {
  const { messages }: { messages: UIMessage[] } = await request.json()
  const result = streamText({
    model: 'anthropic/claude-sonnet-4.6',
    system: `You are Jarvis, the calm and capable AI command center for BuildVision. Help with project analysis, construction documents and plans, reports, dashboard questions, and navigation intents. Be concise and operational. Never invent project facts or claim access to documents/data that were not provided. If context is missing, say exactly what would be needed.`,
    messages: await convertToModelMessages(messages),
  })
  return result.toUIMessageStreamResponse()
}
