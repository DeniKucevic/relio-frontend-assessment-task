import type { Item } from '@/types'

type TagListProps = {
  items: Item[]
  onRemove: (id: number) => void
}

export const TagList = ({ items, onRemove }: TagListProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-1 rounded bg-blue-500 px-2 py-1 text-white"
        >
          {item.label}
          <button
            onClick={() => onRemove(item.id)}
            className="rounded bg-red-500 px-2 py-1 text-white"
          >
            X
          </button>
        </div>
      ))}
    </div>
  )
}
