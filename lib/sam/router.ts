import type { IntelligenceProvider } from './types'

export const providers: IntelligenceProvider[] = [
  { id: 'gateway-claude', name: 'Claude', family: 'AI Gateway', model: 'claude-sonnet-4.6', status: 'healthy', specialty: 'Strategy and orchestration', latency: '1.2s', privacy: 'cloud' },
  { id: 'gateway-gpt', name: 'ChatGPT', family: 'AI Gateway', model: 'gpt-5.2', status: 'healthy', specialty: 'General reasoning', latency: '1.4s', privacy: 'cloud' },
  { id: 'grok', name: 'Grok', family: 'AI Gateway', model: 'grok-4.1', status: 'ready', specialty: 'Live research and synthesis', latency: '1.8s', privacy: 'cloud' },
  { id: 'gemma', name: 'Gemma', family: 'Open models', model: 'gemma-3-27b', status: 'ready', specialty: 'Private structured analysis', latency: '2.1s', privacy: 'hybrid' },
  { id: 'llama', name: 'Llama', family: 'Open models', model: 'llama-4-maverick', status: 'ready', specialty: 'Code and document reasoning', latency: '1.9s', privacy: 'hybrid' },
  { id: 'huggingface', name: 'Hugging Face', family: 'Open models', model: 'router / open models', status: 'ready', specialty: 'Specialist model routing', latency: '2.4s', privacy: 'cloud' },
  { id: 'ollama', name: 'Ollama', family: 'Local inference', model: 'local model pool', status: 'unavailable', specialty: 'Air-gapped private inference', latency: '—', privacy: 'private' },
  { id: 'analytics', name: 'BuildVision analytics', family: 'Deterministic', model: 'rules + metrics', status: 'healthy', specialty: 'Evidence and risk scoring', latency: '120ms', privacy: 'private' },
]

export function selectProvider(intent: string, forcedProvider?: string) {
  if (forcedProvider) return providers.find((provider) => provider.id === forcedProvider) ?? providers[0]
  const value = intent.toLowerCase()
  if (value.includes('code') || value.includes('deploy')) return providers.find((provider) => provider.id === 'llama') ?? providers[0]
  if (value.includes('document') || value.includes('plan')) return providers.find((provider) => provider.id === 'gemma') ?? providers[0]
  if (value.includes('research') || value.includes('latest')) return providers.find((provider) => provider.id === 'grok') ?? providers[0]
  return providers[0]
}
