import { providers } from '@/lib/sam/router'

export const sam = {
  name: 'S.A.M. — Strategic AI Manager',
  model: 'anthropic/claude-sonnet-4.6',
  autonomy: 'full',
  founderOverride: true,
  providers: providers.map(({ id, name, status }) => ({ id, name, status })),
}

export default sam
