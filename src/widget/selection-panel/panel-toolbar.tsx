import { FILTER_OPTIONS } from '@/shared/config'
import { FILTER_SELECT_MIN_WIDTH } from '@/shared/sizing'
import { STRINGS } from '@/shared/strings'
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'

import type { FilterOption } from '@/shared/types'

type PanelToolbarProps = {
  searchQuery: string
  onSearchChange: (value: string) => void
  selectedFilter: FilterOption
  onFilterChange: (value: FilterOption) => void
}

export const PanelToolbar = ({
  searchQuery,
  onSearchChange,
  selectedFilter,
  onFilterChange,
}: PanelToolbarProps) => (
  <Box
    sx={{
      display: 'flex',
      gap: 2,
      alignItems: 'center',
      p: 2,
      borderBottom: 1,
      borderColor: 'divider',
    }}
  >
    <TextField
      variant="outlined"
      label={STRINGS.panel.searchLabel}
      placeholder={STRINGS.panel.searchPlaceholder}
      size="small"
      value={searchQuery}
      autoFocus
      sx={{ flexGrow: 1 }}
      onChange={(e) => onSearchChange(e.target.value)}
    />
    <FormControl
      size="small"
      sx={{ minWidth: FILTER_SELECT_MIN_WIDTH, flexShrink: 0 }}
    >
      <InputLabel>{STRINGS.panel.filterLabel}</InputLabel>
      <Select
        label={STRINGS.panel.filterLabel}
        value={selectedFilter}
        onChange={(e) => onFilterChange(e.target.value as FilterOption)}
      >
        {FILTER_OPTIONS.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>
)
