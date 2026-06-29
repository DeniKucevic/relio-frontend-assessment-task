import { Box, Chip } from '@mui/material'

import type { Item } from '@/types'

type TagListProps = {
  items: Item[]
  onRemove: (id: number) => void
}

export const TagList = ({ items, onRemove }: TagListProps) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {items.map((item) => (
        <Chip
          key={item.id}
          label={item.label}
          onDelete={() => onRemove(item.id)}
        />
      ))}
    </Box>
  )
}
