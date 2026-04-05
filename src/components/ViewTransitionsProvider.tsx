'use client'

import { ViewTransitions } from 'next-view-transitions'

export function ViewTransitionsProvider({ children }: { children: React.ReactNode }) {
  return <ViewTransitions>{children}</ViewTransitions>
}
