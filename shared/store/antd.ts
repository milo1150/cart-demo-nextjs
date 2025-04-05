import { create } from 'zustand'

type AntdStoreState = {
  darkmode: boolean
  setDarkmode: (status: boolean) => void
}

const useAntdStore = create<AntdStoreState>()((set) => ({
  darkmode: false,
  setDarkmode: (status) => {
    set((state) => {
      const copyState = { ...state }
      copyState.darkmode = status
      return copyState
    })
  },
}))

export { useAntdStore }
