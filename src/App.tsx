import { ElementList } from './components/element-list'
import { TagList } from './components/tag-list'

//TODO: remove mock data

const mockItems = [
  { id: 1, label: 'Item 1' },
  { id: 2, label: 'Item 2' },
  { id: 3, label: 'Item 3' },
]

const App = () => {
  return (
    <div>
      <TagList items={mockItems} onRemove={() => {}} />

      <ElementList
        items={mockItems}
        selectedIds={new Set()}
        maxReached={false}
        onToggle={() => {}}
      />
    </div>
  )
}

export default App
