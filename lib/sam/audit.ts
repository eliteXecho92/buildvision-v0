export type AuditEvent = {
  correlationId: string
  actor: 'sam' | 'founder' | 'system'
  provider?: string
  intent: string
  target: string
  risk: 'low' | 'medium' | 'high'
  outcome: 'observed' | 'delegated' | 'executed' | 'blocked' | 'overridden'
  evidence: string[]
  createdAt: string
}

export function createAuditEvent(input: Omit<AuditEvent, 'createdAt'>): AuditEvent {
  return { ...input, createdAt: new Date().toISOString() }
}
