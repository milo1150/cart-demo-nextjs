import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AntdStoreState = {
  darkmode: boolean
  setDarkmode: (status: boolean) => void
}

const useAntdStore = create<AntdStoreState>()(
  persist(
    (set) => ({
      darkmode: false,
      setDarkmode: (status) => {
        set((state) => {
          const copyState = { ...state }
          copyState.darkmode = status
          return copyState
        })
      },
    }),
    { name: 'antd-store' }
  )
)

export { useAntdStore }
