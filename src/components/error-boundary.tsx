import { Component, type ErrorInfo, type ReactNode } from 'react'

import { Alert, AlertTitle } from '@mui/material'

type Props = { children: ReactNode }
type State = { hasError: boolean }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('SelectionWidget crashed:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert severity="error">
          <AlertTitle>Something went wrong</AlertTitle>
          The selection widget couldn't be displayed. Please refresh the page.
        </Alert>
      )
    }
    return this.props.children
  }
}
