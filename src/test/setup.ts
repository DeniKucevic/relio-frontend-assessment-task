import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

afterEach(() => {
  cleanup()
})

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.ResizeObserver =
  ResizeObserverMock as unknown as typeof ResizeObserver

Element.prototype.getBoundingClientRect = vi.fn(() => ({
  width: 600,
  height: 600,
  top: 0,
  left: 0,
  bottom: 600,
  right: 600,
  x: 0,
  y: 0,
  toJSON: () => {},
}))
