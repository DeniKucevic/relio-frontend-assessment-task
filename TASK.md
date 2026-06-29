# Relio Frontend Assignment — Implementation Checklist

## Setup

- [x] Create project: `npm create vite@latest . -- --template react-ts`
- ~~[ ] Install Tailwind: `npm install tailwindcss @tailwindcss/vite`~~
- ~~[ ] Configure Tailwind in `vite.config.ts` and `index.css`~~

> Note: Drop tailwind, I remember they use MUI

- [x] Install MUI: `npm install @mui/material @emotion/react @emotion/styled`
- [x] Delete all boilerplate from `App.tsx`, `App.css`, `index.css`

---

## Step 1 — Types (`src/types.ts`)

- [x] Define `Item = { id: number; label: string }`
- [x] Define `FilterOption = 'none' | '>100' | '>2500' | '>10000'`

---

## Step 2 — State (`src/context/SelectionContext.tsx`)

- [x] Define `State = { committed: Item[]; draft: Item[] }`
- [x] Define `Action` union type:
  - `OPEN_PANEL` — copies committed into draft
  - `TOGGLE_ITEM` — adds/removes item from draft (max 3)
  - `REMOVE_DRAFT` — removes item from draft by id
  - `REMOVE_COMMITTED` — removes item from committed by id
  - `SAVE` — copies draft into committed
  - `CANCEL` — restores draft from committed
- [x] Write `reducer(state, action)` — pure function, no side effects
- [x] Create `SelectionProvider` wrapping `useReducer`
- [x] Export `useSelection()` hook that throws if used outside provider

---

## Step 3 — Hooks (`src/hooks/useDebounce.ts`)

- [ ] `useDebounce<T>(value, delay)` — delays value update by `delay` ms
- [ ] Use `useEffect` + `setTimeout` + cleanup

---

## Step 4 — Dumb UI Components (no logic, just props)

### `src/components/TagList.tsx`

- [ ] Props: `items: Item[]`, `onRemove: (id: number) => void`
- [ ] Renders each item as a tag with a × button
- [ ] No state, no context — pure presentational

### `src/components/ElementList.tsx`

- [ ] Props: `items`, `selectedIds: Set<number>`, `maxReached: boolean`, `onToggle`
- [ ] Render a plain scrollable list for now (fixed height, overflow-y scroll)
- [ ] Row: MUI `Checkbox` + label, checked/disabled states
- [ ] Show "No elements found." when `items` is empty

---

## Step 5 — Smart Components (own logic, read context)

### `src/components/SelectionPanel.tsx`

- [ ] Local state: `search: string`, `filter: FilterOption`
- [ ] Call `useSelection()` — read `state.draft`, get `dispatch`
- [ ] `useMemo` for filtered list (apply filter then search)
- [ ] `useDebounce` on search input (200ms)
- [ ] `useMemo` for `selectedIds` as `Set<number>`
- [ ] `useEffect` — close on Escape key
- [ ] `useEffect` — focus panel on mount
- [ ] `role="dialog"` + `aria-modal="true"` on root div
- [ ] `autoFocus` on search input
- [ ] Render `ElementList` + `TagList` (draft) + Save/Cancel buttons

### `src/SelectionWidget.tsx`

- [ ] Wrap everything in `<SelectionProvider>`
- [ ] Local state: `panelOpen: boolean`
- [ ] `openPanel` — dispatch `OPEN_PANEL`, set `panelOpen(true)`
- [ ] `handleSave` — dispatch `SAVE`, close panel
- [ ] `handleCancel` — dispatch `CANCEL`, close panel
- [ ] Render committed tags (or "No items selected")
- [ ] Render "Change my choice" button
- [ ] Conditionally render `SelectionPanel`

---

## Step 6 — App (`src/App.tsx`)

- [ ] Generate items with `useMemo`: `Array.from({ length: 15000 }, (_, i) => ({ id: i + 1, label: \`Element ${i + 1}\` }))`
- [ ] Render `<SelectionWidget items={items} />`
- [ ] Nothing else

---

## Step 7 — Manual QA Checklist

Go through every requirement from the PDF:

- [ ] Main page shows selected items (max 3) as tags
- [ ] × on main page tag removes it from committed
- [ ] "Change my choice" opens the panel
- [ ] Panel shows full list, scrollable, fixed height
- [ ] Already-selected items have checked checkboxes on open
- [ ] Selected items shown as blocks at bottom of panel
- [ ] Search filters list by substring as you type
- [ ] Filter >100 works (only shows Element 101+)
- [ ] Filter >2500 works
- [ ] Filter >10000 works
- [ ] Search + filter combine (e.g. search "5" + filter >100)
- [ ] Can select max 3 — rest become disabled
- [ ] × on draft tag removes it from selection
- [ ] Save closes panel, main page updates
- [ ] Cancel closes panel, main page unchanged
- [ ] Escape key closes panel
- [ ] Search input is focused when panel opens

---

## Step 8 — Performance (once everything works)

- [ ] Install react-window: `npm install react-window && npm install -D @types/react-window`
- [ ] Replace plain list in `ElementList.tsx` with `List` from `react-window`
- [ ] Verify scrolling still works and checked state is preserved
- [ ] Install react-window: `npm install react-window`

---

## Step 9 — README.md

- [ ] Brief description of what the widget does
- [ ] Architecture decisions section:
  - Why Context + useReducer
  - Why virtual scrolling
  - Why debounced search
- [ ] How to run: `npm install && npm run dev`

---

## File Structure (target)

```
src/
  types.ts
  context/
    SelectionContext.tsx
  hooks/
    useDebounce.ts
  components/
    TagList.tsx
    ElementList.tsx
    SelectionPanel.tsx
  SelectionWidget.tsx
  App.tsx
  index.css
```
