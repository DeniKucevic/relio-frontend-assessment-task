export const STRINGS = {
  widget: {
    title: 'Select items',
    selectChoice: 'Select items',
    changeChoice: 'Change my choice',
    noItemsSelected: 'No items selected.',
    selectedCount: (count: number) =>
      `You currently have ${count} item${count !== 1 ? 's' : ''} selected.`,
  },

  panel: {
    title: 'Select items',
    searchLabel: 'Search',
    searchPlaceholder: 'Search by name...',
    filterLabel: 'Filter',
    noItemsFound: 'No items found',
    currentSelected: 'Current selected items:',
    save: 'Save',
    cancel: 'Cancel',
  },

  elementList: {
    emptyDefault: 'No elements found.',
  },

  toast: {
    saved: 'Selection saved',
    cancelled: 'Selection cancelled',
    discarded: 'Changes discarded',
    itemRemoved: 'Item removed from selection',
    maxReached: (max: number) => `You can only select up to ${max} items`,
  },

  confirm: {
    title: 'Discard changes?',
    message: 'You have unsaved changes. Are you sure you want to discard them?',
    confirmLabel: 'Discard',
    cancelLabel: 'Keep editing',
  },

  aria: {
    panelLabel: 'Select items',
    closePanel: 'Close panel',
    removeItem: (label: string) => `Remove ${label}`,
    selectItem: (label: string) => `Select ${label}`,
  },
} as const
