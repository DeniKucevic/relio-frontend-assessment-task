import { useRef } from 'react'

import {
  Box,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import { useVirtualizer } from '@tanstack/react-virtual'

import type { Item } from '@/types'

type ElementListProps = {
  items: Item[]
  selectedIds: Set<number>
  maxReached: boolean
  emptyText?: string
  onToggle: (item: Item) => void
}

export const ElementList = ({
  items,
  selectedIds,
  maxReached,
  emptyText,
  onToggle,
}: ElementListProps) => {
  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48, // MUI ListItem default height
  })

  if (items.length === 0) {
    return (
      <Box
        sx={{
          height: 260,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography color="text.secondary">
          {emptyText ?? 'No elements found.'}
        </Typography>
      </Box>
    )
  }

  return (
    <Box ref={parentRef} sx={{ height: 260, overflowY: 'auto' }}>
      <List
        sx={{
          height: virtualizer.getTotalSize(),
          position: 'relative',
          padding: 0,
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const item = items[virtualRow.index]
          const checked = selectedIds.has(item.id)
          const disabled = !checked && maxReached

          return (
            <ListItem
              key={item.id}
              disablePadding
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <ListItemButton
                onClick={() => onToggle(item)}
                disabled={disabled}
                selected={checked}
              >
                <ListItemIcon>
                  <Checkbox checked={checked} disableRipple />
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}
