import { render, screen, waitFor } from '@testing-library/react'
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
  it('opens the panel when clicking Select items', async () => {
    const user = userEvent.setup()
    render(<SelectionWidget items={items} />)

    await user.click(screen.getByRole('button', { name: /select items/i }))
    expect(
      screen.getByRole('region', { name: /select items/i }),
    ).toBeInTheDocument()
  })

  it('closes the panel via Cancel when there are no changes', async () => {
    const user = userEvent.setup()
    render(<SelectionWidget items={items} />)

    await user.click(screen.getByRole('button', { name: /select items/i }))
    await user.click(screen.getByRole('button', { name: /^cancel$/i }))

    await waitFor(() =>
      expect(
        screen.queryByRole('region', { name: /select items/i }),
      ).not.toBeInTheDocument(),
    )
  })

  it('does not persist unsaved selections across close and reopen', async () => {
    const user = userEvent.setup()
    render(<SelectionWidget items={items} />)

    const openButton = screen.getByRole('button', { name: /select items/i })
    await user.click(openButton)

    const checkbox = screen.getByRole('checkbox', { name: /select element 1/i })
    await user.click(checkbox)
    expect(checkbox).toBeChecked()

    await user.click(screen.getByRole('button', { name: /^cancel$/i }))
    await user.click(await screen.findByRole('button', { name: /discard/i }))

    await waitFor(() =>
      expect(
        screen.queryByRole('region', { name: /select items/i }),
      ).not.toBeInTheDocument(),
    )

    await user.click(openButton)
    expect(
      await screen.findByRole('checkbox', { name: /select element 1/i }),
    ).not.toBeChecked()
  })

  it('saves the selection and reflects it on the main page', async () => {
    const user = userEvent.setup()
    render(<SelectionWidget items={items} />)

    await user.click(screen.getByRole('button', { name: /select items/i }))
    await user.click(
      screen.getByRole('checkbox', { name: /select element 1/i }),
    )
    await user.click(screen.getByRole('button', { name: /^save$/i }))

    // Panel closes...
    await waitFor(() =>
      expect(
        screen.queryByRole('region', { name: /select items/i }),
      ).not.toBeInTheDocument(),
    )

    // ...and the committed selection is now shown on the main page.
    expect(
      screen.getByText('You currently have 1 item selected.'),
    ).toBeInTheDocument()
    expect(screen.getByText('Element 1')).toBeInTheDocument()
    // With a selection present, the trigger label switches.
    expect(
      screen.getByRole('button', { name: /change my choice/i }),
    ).toBeInTheDocument()
  })
})
