import { STRINGS } from '@/shared/strings'
import { Box, Chip } from '@mui/material'

import type { Item } from '@/shared/types'

type TagListProps = {
  items: Item[]
  onRemove?: (id: number) => void
}

export const TagList = ({ items, onRemove }: TagListProps) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {items.map((item) => (
        <Chip
          key={item.id}
          label={item.label}
          color="primary"
          variant="outlined"
          size="small"
          aria-label={
            onRemove ? STRINGS.aria.removeItem(item.label) : undefined
          }
          onDelete={onRemove ? () => onRemove(item.id) : undefined}
        />
      ))}
    </Box>
  )
}
