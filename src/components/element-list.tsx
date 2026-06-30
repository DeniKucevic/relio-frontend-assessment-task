import { useRef } from 'react'

import { LIST_ROW_HEIGHT, LIST_VIEWPORT_HEIGHT } from '@/shared/sizing'
import { STRINGS } from '@/shared/strings'
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

import type { Item } from '@/shared/types'

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
    estimateSize: () => LIST_ROW_HEIGHT,
  })

  if (items.length === 0) {
    return (
      <Box
        sx={{
          height: LIST_VIEWPORT_HEIGHT,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography color="text.secondary">
          {emptyText ?? STRINGS.elementList.emptyDefault}
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      ref={parentRef}
      sx={{
        flex: 1,
        minHeight: 0,
        maxHeight: LIST_VIEWPORT_HEIGHT,
        overflowY: 'auto',
      }}
    >
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
                height: LIST_ROW_HEIGHT,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                transform: `translateY(${virtualRow.start}px)`,
                bgcolor:
                  virtualRow.index % 2 === 0 ? 'transparent' : 'action.hover',
              }}
            >
              <ListItemButton
                onClick={() => onToggle(item)}
                disabled={disabled}
                selected={checked}
                sx={{
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checked}
                    disableRipple
                    slotProps={{
                      input: {
                        'aria-label': STRINGS.aria.selectItem(item.label),
                      },
                    }}
                  />
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
