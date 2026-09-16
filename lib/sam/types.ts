export type ProviderStatus = 'healthy' | 'ready' | 'unavailable'
export type ProviderFamily = 'AI Gateway' | 'Local inference' | 'Open models' | 'Search intelligence' | 'Deterministic'

export type IntelligenceProvider = {
  id: string
  name: string
  family: ProviderFamily
  model: string
  status: ProviderStatus
  specialty: string
  latency: string
  privacy: 'cloud' | 'private' | 'hybrid'
}

export type SamMode = 'autonomous' | 'paused' | 'founder override'
export type ActivityKind = 'observation' | 'delegation' | 'action' | 'decision' | 'override'

export type SamActivity = {
  id: string
  kind: ActivityKind
  title: string
  detail: string
  time: string
  provider?: string
  status: 'complete' | 'running' | 'blocked'
}

export type SamSnapshot = {
  mode: SamMode
  systems: { label: string; status: 'nominal' | 'degraded' | 'offline'; detail: string }[]
  providers: IntelligenceProvider[]
  activities: SamActivity[]
  activeRun: { title: string; phase: string; progress: number; provider: string } | null
}
