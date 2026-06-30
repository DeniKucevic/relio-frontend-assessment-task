import type { Item } from '@/shared/types'

export function hasPendingChanges(draft: Item[], committed: Item[]): boolean {
  if (draft.length !== committed.length) return true
  const committedIds = new Set(committed.map((i) => i.id))
  return draft.some((i) => !committedIds.has(i.id))
}
