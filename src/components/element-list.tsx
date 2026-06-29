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
    <List sx={{ height: 260, overflowY: 'auto' }}>
      {items.map((item) => (
        <ListItem key={item.id} disablePadding>
          <ListItemButton
            onClick={() => onToggle(item)}
            disabled={!selectedIds.has(item.id) && maxReached}
            selected={selectedIds.has(item.id)}
          >
            <ListItemIcon>
              <Checkbox checked={selectedIds.has(item.id)} disableRipple />
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}
