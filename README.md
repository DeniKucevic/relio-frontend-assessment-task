# Selection Widget | Relio Frontend Assignment

A widget for selecting up to 3 elements from a large list, with search, filtering, and a virtualized scrollable list. Built for Relio's frontend assignment.

**Live demo:** _[add deployed URL here]_

## Tech stack

- **React 19** + **TypeScript**
- **Vite** - build tooling
- **MUI (Material UI)** - component library
- **@tanstack/react-virtual** - list virtualization
- **Vitest** + **React Testing Library** - testing
- **Oxlint** + **Prettier** - linting and formatting

## Getting started

```bash
npm install
npm run dev      # start dev server
npm run test      # run test suite
npm run build     # production build
```

## Architecture decisions

### State management: Context + `useReducer`

Selection state (`committed` vs `draft` items) lives in `context/selection-context.tsx`, managed with `useReducer` rather than multiple `useState` calls. The selection logic has several coordinated transitions (toggle with a max-3 cap, save copies draft → committed, cancel restores draft from committed), a reducer keeps all of that in one pure, testable function rather than scattered setters.

The widget owns its own `<SelectionProvider>` internally (see `widget/selection-widget.tsx`) rather than requiring the consumer to wrap it. This keeps the widget genuinely self-contained and drop-in reusable.

**State vs Dispatch are split into two separate contexts** (`SelectionStateContext` / `SelectionDispatchContext`). `dispatch` is referentially stable, so components that only need to dispatch actions (and never read state) don't re-render when state change. Standard React optimization for this pattern.

Panel open/close state is intentionally **separate** from selection data, in its own `PanelContext`, it's a UI concern, not selection data, and keeping it isolated means it's reusable for any future panel/modal in the app, not coupled to this specific widget.

### Why not Redux / Zustand

For a self-contained widget with no need to share state outside its own subtree, Context + `useReducer` is the right scope. It avoids an external dependency for state that only this widget's components need. The same action/reducer pattern maps directly to Redux Toolkit's `createSlice` if this logic ever needed to move into a larger, app-wide store.

### Virtualization

The list supports an arbitrary number of elements (15,000 in the demo data). Rendering all of them as DOM nodes would be slow. `@tanstack/react-virtual` renders only the rows currently in the visible viewport (~6–8 at a time), keeping scroll performance constant regardless of list size.

### Debounced search

Search input is debounced (200ms, see `shared/config.ts`) so filtering doesn't recompute on every keystroke against the full list.

### Sizing and copy tokens

Layout dimensions (`shared/sizing.ts`) and all user-facing strings (`shared/strings.ts`) are centralized rather than inlined. This keeps row height, viewport height, and the widget's max width in one place (important since some of these values, like row height, must stay in sync with the virtualizer's `estimateSize`), and keeps copy in one place ready for i18n if ever needed.

## Project structure

```
src/
  shared/              design tokens: config, sizing, strings, theme, types
  context/             SelectionContext, PanelContext, ToastContext
  hooks/                useDebounce, useItemSearch
  components/          reusable, presentation-only: TagList, ElementList, ConfirmDialog, ErrorBoundary
  widget/
    selection-widget.tsx   entry point - wraps providers around the widget
    widget-content.tsx     main page view (committed selection + trigger button)
    selection-panel/        the expandable selection panel, split into:
      selection-panel.tsx     orchestration
      panel-toolbar.tsx       search + filter row
      panel-footer.tsx        draft tags + Save/Cancel
  utils/               pure functions: filterItems, hasPendingChanges
  providers.tsx        composes all context providers in one place
```

## Testing

19 tests across reducer logic, pure utilities, a custom hook, and one integration test covering the trickiest behavioral bug found during development (selection state staying in sync when the panel is closed and reopened without saving). Run with `npm run test`.

## Beyond the spec

A few additions beyond the literal requirements, included as polish:
- Toast notifications on save/cancel/discard/remove
- Confirm-discard dialog when closing with unsaved changes
- Open/close animation (`Collapse`)
- Accessibility: dialog semantics, labeled form controls, ARIA labels on icon-only controls
- Error boundary around the widget

## What I'd add with more time / a real backend

- Persist `committed` selection (localStorage or backend) so it survives a page refresh. Not done here since the demo data is regenerated on every load
- Loading state on Save if it talked to a real API
- Configurable filter thresholds and max-selection count via props, rather than fixed in `shared/config.ts`, if the widget needed to support different use cases
- i18n via `react-i18next`, building on the existing centralized `strings.ts`
