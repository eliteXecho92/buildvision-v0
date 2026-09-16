import { convertToModelMessages, streamText, type UIMessage } from 'ai'
import { selectProvider } from '@/lib/sam/router'

export const maxDuration = 30

export async function POST(request: Request) {
  const { messages }: { messages: UIMessage[] } = await request.json()
  const latest = messages.at(-1)
  const intent = latest?.parts?.filter((part) => part.type === 'text').map((part) => part.text).join(' ') ?? 'general command'
  const provider = selectProvider(intent)

  const result = streamText({
    model: provider.id === 'gateway-claude' ? 'anthropic/claude-sonnet-4.6' : 'anthropic/claude-sonnet-4.6',
    system: `You are S.A.M. — Strategic AI Manager, BuildVision's founder-level autonomous engineering control plane. You are not a chatbot. Analyze the command, explain the decision, identify evidence and uncertainty, delegate conceptually to the best provider, and propose or execute the narrowest safe operational next step. Full autonomy is the default, but founder override is authoritative. Never invent access to systems or project facts. Current routed intelligence: ${provider.name} (${provider.model}), specialty: ${provider.specialty}. Format responses as concise operational updates with Decision, Evidence, Action, and Provenance sections when useful.`,
    messages: await convertToModelMessages(messages),
  })
  return result.toUIMessageStreamResponse()
}
