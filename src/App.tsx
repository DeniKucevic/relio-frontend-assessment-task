import { SelectionProvider } from './context/selection-context'
import { SelectionPanel } from './widget/selection-panel'

//TODO: remove mock data

const mockItems = [
  { id: 1, label: 'Item 1' },
  { id: 2, label: 'Item 2' },
  { id: 3, label: 'Item 3' },
]

const mockIds = new Set([1, 2])

const App = () => {
  return (
    <div>
      <SelectionProvider>
        <SelectionPanel
          items={mockItems}
          onSave={() => null}
          onCancel={() => null}
        />
      </SelectionProvider>
    </div>
  )
}

export default App
