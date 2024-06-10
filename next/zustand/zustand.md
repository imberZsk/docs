## zustand

- 不应该在服务端组件里使用
- [Setup with Next.js](https://docs.pmnd.rs/zustand/guides/nextjs)
- 对于嵌套的数据结构，不想用扩展运算符，可以和 `immer` 配合
- 对于协同文档 [zustand-middleware-yjs](https://github.com/joebobmiles/zustand-middleware-yjs)，[zustand-yjs](https://github.com/tandem-pt/zustand-yjs)
- [数据持久化](https://docs.pmnd.rs/zustand/integrations/persisting-store-data)
- 如果不是每个 `route` 都需要状态共享，可以把 `provider` 在组件里下沉

## provider

`src/providers/counter-store-provider.tsx`

```js
'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { type StoreApi, useStore } from 'zustand'

import {
  type CounterStore,
  createCounterStore,
  initCounterStore
} from '@/stores/counter-store'

export const CounterStoreContext = createContext<StoreApi<CounterStore> | null>(
  null
)

export interface CounterStoreProviderProps {
  children: ReactNode
}

export const CounterStoreProvider = ({
  children
}: CounterStoreProviderProps) => {
  const storeRef = useRef<StoreApi<CounterStore>>()
  if (!storeRef.current) {
    storeRef.current = createCounterStore(initCounterStore())
  }

  return (
    <CounterStoreContext.Provider value={storeRef.current}>
      {children}
    </CounterStoreContext.Provider>
  )
}

export const useCounterStore = <T,>(
  selector: (store: CounterStore) => T
): T => {
  const counterStoreContext = useContext(CounterStoreContext)

  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be use within CounterStoreProvider`)
  }

  return useStore(counterStoreContext, selector)
}
```

## store

`src/stores/counter-store.ts`

```js
import { createStore } from 'zustand/vanilla'

export type CounterState = {
  count: number
}

export type CounterActions = {
  decrementCount: () => void
  incrementCount: () => void
}

export type CounterStore = CounterState & CounterActions

export const defaultInitState: CounterState = {
  count: 0
}

export const createCounterStore = (
  initState: CounterState = defaultInitState
) => {
  return createStore<CounterStore>()((set) => ({
    ...initState,
    decrementCount: () => set((state) => ({ count: state.count - 1 })),
    incrementCount: () => set((state) => ({ count: state.count + 1 }))
  }))
}

export const initCounterStore = (): CounterState => {
  return { count: new Date().getFullYear() }
}
```

## 组件里使用

```js
import { useCounterStore } from '@/providers/counter-store-provider'

const { count, incrementCount, decrementCount } = useCounterStore(
  (state) => state
)
```
