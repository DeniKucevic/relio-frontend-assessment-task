import type { Item } from '@/types'

type ElementListProps = {
  items: Item[]
  selectedIds: Set<number>
  maxReached: boolean
  onToggle: (item: Item) => void
}

export const ElementList = ({
  items,
  selectedIds,
  maxReached,
  onToggle,
}: ElementListProps) => {
  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center rounded bg-gray-200 px-2 py-1">
        No elements found
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between rounded bg-gray-200 px-2 py-1"
        >
          <span>{item.label}</span>
          <button
            onClick={() => onToggle(item)}
            className="rounded bg-blue-500 px-2 py-1 text-white"
          >
            {selectedIds.has(item.id) ? 'Remove' : 'Add'}
          </button>
        </div>
      ))}
    </div>
  )
}
