import { TagList } from '@/components/tag-list'
import { STRINGS } from '@/shared/strings'
import { Box, Button, Stack, Typography } from '@mui/material'

import type { Item } from '@/shared/types'

type PanelFooterProps = {
  draftItems: Item[]
  onRemoveDraft: (id: Item['id']) => void
  onSave: () => void
  onCancel: () => void
}

export const PanelFooter = ({
  draftItems,
  onRemoveDraft,
  onSave,
  onCancel,
}: PanelFooterProps) => (
  <>
    <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {STRINGS.panel.currentSelected}
      </Typography>
      <TagList items={draftItems} onRemove={onRemoveDraft} />
    </Box>
    <Stack
      direction="row"
      spacing={2}
      sx={{ p: 2, justifyContent: 'flex-end' }}
    >
      <Button variant="contained" color="primary" onClick={onSave}>
        {STRINGS.panel.save}
      </Button>
      <Button variant="outlined" color="inherit" onClick={onCancel}>
        {STRINGS.panel.cancel}
      </Button>
    </Stack>
  </>
)
