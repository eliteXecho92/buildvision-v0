import { providers } from './router'
import type { SamSnapshot } from './types'

export const demoSnapshot: SamSnapshot = {
  mode: 'autonomous',
  systems: [
    { label: 'BuildVision core', status: 'nominal', detail: 'All services responding' },
    { label: 'Project operations', status: 'nominal', detail: '42 active workstreams' },
    { label: 'Documents and plans', status: 'nominal', detail: 'Index synchronized 2m ago' },
    { label: 'GitHub and Vercel', status: 'degraded', detail: 'Connector needs authorization' },
  ],
  providers,
  activeRun: { title: 'Risk sweep · Downtown Medical Center', phase: 'Correlating schedule variance', progress: 68, provider: 'Claude + BuildVision analytics' },
  activities: [
    { id: 'a1', kind: 'decision', title: 'Escalation path selected', detail: 'Schedule variance exceeds project policy threshold', time: '2m ago', provider: 'Claude', status: 'complete' },
    { id: 'a2', kind: 'delegation', title: 'Delegated document review', detail: 'Plan revision 08 → structural specialist', time: '4m ago', provider: 'Gemma', status: 'complete' },
    { id: 'a3', kind: 'observation', title: 'New signal observed', detail: 'Concrete delivery milestone moved by 3 days', time: '6m ago', provider: 'BuildVision analytics', status: 'complete' },
    { id: 'a4', kind: 'action', title: 'Founder override available', detail: 'GitHub connector authorization is the current blocker', time: '9m ago', status: 'blocked' },
  ],
}
