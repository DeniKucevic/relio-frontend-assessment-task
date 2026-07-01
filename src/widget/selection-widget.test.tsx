// src/widget/selection-widget.test.tsx
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { SelectionWidget } from './selection-widget'

vi.mock('@tanstack/react-virtual', () => ({
  useVirtualizer: ({ count }: { count: number }) => ({
    getVirtualItems: () =>
      Array.from({ length: count }, (_, index) => ({
        index,
        start: index * 48,
        size: 48,
        key: index,
      })),
    getTotalSize: () => count * 48,
  }),
}))

const items = [
  { id: 1, label: 'Element 1' },
  { id: 2, label: 'Element 2' },
]

describe('SelectionWidget', () => {
  it('opens and closes the panel when clicking Change my choice', async () => {
    const user = userEvent.setup()
    render(<SelectionWidget items={items} />)

    const toggleButton = screen.getByRole('button', {
      name: /change my choice/i,
    })
    await user.click(toggleButton)
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.click(toggleButton)
    await waitForElementToBeRemoved(() => screen.queryByRole('dialog'))
  })

  it('does not persist unsaved selections across close and reopen', async () => {
    const user = userEvent.setup()
    render(<SelectionWidget items={items} />)

    const toggleButton = screen.getByRole('button', {
      name: /change my choice/i,
    })

    await user.click(toggleButton)

    const checkbox = screen.getByRole('checkbox', { name: /select element 1/i })
    await user.click(checkbox)
    expect(checkbox).toBeChecked()

    await user.click(toggleButton)
    await waitForElementToBeRemoved(() => screen.queryByRole('dialog'))

    await user.click(toggleButton)

    const reopenedCheckbox = screen.getByRole('checkbox', {
      name: /select element 1/i,
    })
    expect(reopenedCheckbox).not.toBeChecked()
  })
})
